import HighlightJS from "./highlight.js";
// @ts-ignore
import * as builtIns from "builtInLanguages"

const hljs = HighlightJS;

for (const languageName of Object.keys(builtIns)) {
  hljs.registerLanguage(languageName, builtIns[languageName]);
}
// console.log(hljs.listLanguages());

export default hljs;
