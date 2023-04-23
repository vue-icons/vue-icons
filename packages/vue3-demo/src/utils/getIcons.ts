import codegen from "babel-plugin-codegen/macro";

const fn = codegen`
const { IconsManifest } = require("vue3-icons/lib/cjs");
let codes = "(function (id) { switch (id) {";
IconsManifest.forEach(icon => {
  codes += 'case "' + icon.id + '":\\nreturn import("vue3-icons/' + icon.id +'/index");\\n'
})
codes += '}})';
module.exports = codes;
// module.exports = "import('react-icons/fa/index')"
`;

export function getIcons(iconsId: string) {
  /*
  Dynamic Import with improved performance.
  Macros are used to avoid bundling unnecessary modules.

  Similar to this code
  ```
  return import(`react-icons/${iconsId}/index`);
  ```
  */
  /* @vite-ignore */
  // return import(`/node_modules/vue3-icons/${iconsId}/index.esm.js`);
  return fn(iconsId)
 }
