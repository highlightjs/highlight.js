const rollup = require('rollup')
const fs = require("fs")
const BUILD_DIR = "build"
const CJS = { format: "cjs", strict: false }

const reorderDependencies = (languages) => {
  var languages = [...languages] // clone
  var moved
  do {
    moved = false
    let loaded = []
    for (let lang of languages) {
      loaded.push(lang.name)
      if (lang.requires.length === 0) continue;
      for (let needed of lang.requires) {
        if (loaded.includes(needed)) continue;
        moved = true

        let i = languages.findIndex((el) => el.name == needed)
        let removed = languages.splice(i, 1)
        let me = languages.findIndex((el) => el.name == lang.name)
        languages.splice(me,0, ...removed)

        loaded.push(needed)
      }
    }
  } while(moved===true)
  return languages
}

function buildNodeIndex(languages) {
  const header = "var hljs = require('./highlight');"
  const footer = "module.exports = hljs;"

  const registration = reorderDependencies(languages).map((lang) =>
    `hljs.registerLanguage('${lang.name}', require('./languages/${lang.name}'));`
  )

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`
  fs.writeFile(`${BUILD_DIR}/lib/index.js`, index, (err) => 0)
}

 async function buildNodeLanguage (language) {
  const input = { input: `src/languages/${language.name}.js` }
  const output = { ...CJS,  file: `${BUILD_DIR}/lib/languages/${language.name}.js` }
  build(input, output)
}

async function buildNodeHighlightJS() {
  const input = { input: `src/highlight.js` }
  const output = { ...CJS, file: `${BUILD_DIR}/lib/highlight.js` }
  build(input, output)
}

const REQUIRES_REGEX = /\/\*.*Requires: (.*?)\n/s

class Language {

  constructor(name, path) {
    this.name = name
    this.requires = []

    this.data = fs.readFileSync(path, {encoding: "utf8"})
    this.determineRequires()
  }

  determineRequires() {
    var requiresMatch = REQUIRES_REGEX.exec(this.data)
    if (requiresMatch)
      this.requires = requiresMatch[1].split(", ").map((n) => n.replace(".js",""))
  }

  static fromFile(filename) {
    var path = `./src/languages/${filename}`
    return new Language(
      filename.replace(".js",""),
      path
    )
  }
}

function getLanguages() {
  let languages = []
  fs.readdirSync("./src/languages/").forEach((file) => {
    languages.push(Language.fromFile(file))
  })
  return languages
}

function install(file, dest) {
  fs.copyFileSync(file, `${BUILD_DIR}/${dest}`)
}

function mkdir(dirname) {
  fs.mkdirSync(`${BUILD_DIR}/${dirname}`, {recursive: true})
}

// tasks.buildPackage = function(json, blob, done) {
//   let result,
//       lines = blob.result.split(/\r?\n/),
//       regex = /^- (.*) <(.*)>$/;

//   json.contributors = _.transform(lines, function(result, line) {
//     let matches = line.match(regex);

//     if(matches) {
//       result.push({
//         name: matches[1],
//         email: matches[2]
//       });
//     }
//   }, []);

//   result = JSON.stringify(json, null, '  ');

//   return done(null, new gear.Blob(result, blob));
// };

function buildPackageJSON() {
  const CONTRIBUTOR = /^- (.*) <(.*)>$/

  var authors = fs.readFileSync("AUTHORS.en.txt", {encoding: "utf8"})
  var lines = authors.split(/\r?\n/)
  var json = require("./package")
  json.contributors = lines.reduce((acc, line) => {
    let matches = line.match(CONTRIBUTOR)

    if (matches) {
      acc.push({
        name: matches[1],
        email: matches[2]
      })
    }
    return acc;
  }, [])
  fs.writeFileSync(`${BUILD_DIR}/package.json`, JSON.stringify(json, null, '   '))
}

async function build_node() {
  mkdir("lib/languages")
  mkdir("scss")
  mkdir("styles")

  install("./LICENSE", "LICENSE")
  install("./README.md","README.md")
  fs.readdirSync("./src/styles/").forEach((file) => {
    install(`./src/styles/${file}`,`styles/${file}`)
    install(`./src/styles/${file}`,`scss/${file.replace(".css",".scss")}`)
  })
  buildPackageJSON()

  const languages = getLanguages()
  // filter languages

  buildNodeIndex(languages)
  languages.forEach(async (lang) =>  {
    await buildNodeLanguage(lang)
  })
  await buildNodeHighlightJS()


}

async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions).catch(err => console.log(err));;

  // console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate code
  const { output } = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      // For assets, this contains
      // {
      //   fileName: string,              // the asset file name
      //   source: string | Buffer        // the asset source
      //   type: 'asset'                  // signifies that this is an asset
      // }
      // console.log('Asset', chunkOrAsset);
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   imports: string[],             // external modules imported statically by the chunk
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      //   type: 'chunk',                 // signifies that this is a chunk
      // }
      // console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions)
}

build_node()
