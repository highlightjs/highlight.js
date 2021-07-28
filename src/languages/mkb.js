/*
Language: MKB
Description: BASIC Scripting language interpretted by the minecraft macro/keybind mod.
Author: Mumfrey
Website: https://beta.mkb.gorlem.ml/docs/actions/
Category: scripting
*/

export default function(hljs) {
  return {
    name: 'MKB',
    keywords:
      'macro keybind mod liteconfig',
    contains: [
      hljs.COMMENT('//','$')
    ]
  };
}
