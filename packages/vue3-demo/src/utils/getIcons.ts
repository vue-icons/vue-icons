
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
  return import(`/node_modules/vue-icons/${iconsId}/index.esm.js`);
}
