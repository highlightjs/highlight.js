import HighlightJS from "./highlight.js";
// @ts-ignore
import * as builtIns from "builtInLanguages";

const hljs = HighlightJS;

for (const key of Object.keys(builtIns)) {
  const languageName = key.replace("grmr_", "");
  hljs.registerLanguage(languageName, builtIns[key]);
}
// console.log(hljs.listLanguages());

export default hljs;
