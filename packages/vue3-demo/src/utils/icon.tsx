import * as RiLib from 'vue3-icons/lib'

//@ts-ignore
export const ALL_ICONS = RiLib['IconsManifest']

export const getIconById = (id: string) => {
  return ALL_ICONS.find((i: any) => i.id === id)
}
