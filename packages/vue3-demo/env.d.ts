/// <reference types="vite/client" />

declare module 'virtual:icons' {
  export function getIcons (id: string): Promise<Module>
}
