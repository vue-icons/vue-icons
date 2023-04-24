import type { Plugin } from 'vite'
import { IconsManifest } from 'vue3-icons/lib/cjs'
export const IconPlugin = (): Plugin => {
  const virtualModuleId = 'virtual:icons'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'vite-plugin-icon-virtual',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        let codes = `
        export const getIcons = (id) => {
          switch (id) {`
            
          IconsManifest.forEach(icon => {
            codes += `
            case "${icon.id}":
              return import("vue3-icons/${icon.id}/index.esm")
            `
          })

        codes+=  `}
        }`

        return codes
      }
    }
  }
}
