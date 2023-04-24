// import codegen from "babel-plugin-codegen/macro";
// import preval from "preval.macro"
import { getIcons } from 'virtual:icons'
// const fn = codegen`
// import { IconsManifest } from "vue3-icons/lib/esm"
// let codes = "(function (id) { switch (id) {";
// IconsManifest.forEach(icon => {
//   codes += 'case "' + icon.id + '":\\nreturn import("vue3-icons/' + icon.id +'/index.esm.js");\\n'
// })
// codes += '}})';
// module.exports = codes;
// // module.exports = "import('react-icons/fa/index')"
// `;


export { getIcons }

// export function getIcons(iconsId: string) {
//   /*
//   Dynamic Import with improved performance.
//   Macros are used to avoid bundling unnecessary modules.

//   Similar to this code
//   ```
//   return import(`react-icons/${iconsId}/index`);
//   ```
//   */
//   /* @vite-ignore */
//   // return import(`vue3-icons/${iconsId}/index.esm.js`);
//   // return fn(iconsId)
//   console.log(iconsId)
//   const fn = preval`
//     const { IconsManifest } = require("vue3-icons/lib/cjs");
//     let codes = "(function (id) { switch (id) {";
//     IconsManifest.forEach(icon => {
//       codes += 'case "' + icon.id + '":\\nreturn require("vue3-icons/' + icon.id +'/index");\\n'
//     });
//     codes += "}})";
//     module.exports = codes
// `

// return new Function(iconsId, fn)
//   // return generateFunc(iconsId, `
//   //   IconsManifest.forEach(icon => {
//   //     switch (iconsId) {
//   //       case icon.id:
//   //         return require("vue3-icons/' + icon.id +'/index");
//   //     }
//   // `)
//   // return preval`
//   //   const { IconsManifest } = require(vue3-icons/lib/cjs);
//   //   let codes = "(function () { switch (${iconsId}) {";
//   //   IconsManifest.forEach(icon => {
//   //     codes += 'case "' + icon.id + '":\\nreturn require("vue3-icons/' + icon.id +'/index");\\n'
//   //   });
//   //   codes += "}})";
//   //   module.exports = codes
//   // `
//  }
