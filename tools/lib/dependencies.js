const MAX_REORDER_ATTEMPTS = 10

/**
 * Reorders languages, moving dependencies above the languages
 * that depend on them.
 *
 * @param {array<Language>} languages list of languages to be reordered
 * @returns {array<Language>} ordered list of languages
*/

const reorderDependencies = (languages) => {
  var languages = [...languages] // clone
  var moved
  var attempts = 0
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
    attempts += 1
  } while(moved===true && attempts <= MAX_REORDER_ATTEMPTS)
  if (attempts > MAX_REORDER_ATTEMPTS) {
    let topOfStack = languages.slice(0,2).map((el) => el.name)
    console.error("[ERROR] You have recursive dependencies:", topOfStack)
    process.exit(1)
  }
  return languages
}

/**
 * Filters languages by group (common, etc)
 *
 * Groups are currently defined inside each language file with `Category`
 *
 * @param {array<Language>} languages full list of languages
 * @returns {array<Language>} filtered list
*/

const languagesByGroup = (languages, groupName) => {
  return languages.filter((el) => el.categories.includes(groupName))
}
const isGroupName = (name) => name[0] == ":"


/**
 * Filters languages by a list of languages or categories
 *
 * This also resolves any requires and dependency ordering issues.
 * The returned list can be registered sequentially and should "just work".
 *
 * @param {array<Lanuage>} allLanguages - full list of languages
 * @param {array<name|group_name>} includes - which languages or groups to include
 *   example: ":common elixir ruby"
 * @returns {array<Language>} filtered list if languages
*/
const filter = (allLanguages, includes) => {
  if (includes==undefined || includes.length==0)
    return reorderDependencies(allLanguages);

  let languages = [];
  for (let lang of includes) {
    if (isGroupName(lang)) {
      let group = lang.substr(1)
      languages = languages.concat(languagesByGroup(allLanguages,group))
    } else {
      let found = allLanguages.find((el) => el.name == lang )
      if (found)
        languages.push(found)
      else {
        console.error(`[ERROR] Language '${lang}' could not be found.`)
        process.exit(1)
      }
    }
  }

  // resolve requires
  for (let lang of languages) {
    lang.requires.forEach(needed => {
      if (!languages.find((el) => el.name == needed)) {
        console.info(`[INFO] Adding ${needed}... ${lang.name} requires ${needed}.`)
        languages.push(allLanguages.find((el) => el.name == needed))
      }
    });
  }

  // make sure our dependencies are in the correct order
  return reorderDependencies(languages);
}

module.exports = { reorderDependencies, filter }
