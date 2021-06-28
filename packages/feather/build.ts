import feather from "feather-icons"
import prettier from "prettier"
import { dirname, join } from "path"
import { upperFirst, camelCase } from "lodash"
import fs from "fs-extra"

const input = "templates"
const output = "lib"

const iconBlob = fs.readFileSync(join(input, "icon.js"), "utf8")
const indexBlob = fs.readFileSync(join(input, "index.js"), "utf8")
const typesBlob = fs.readFileSync(join(input, "index.d.ts"), "utf8")

const templates = {
  icon: (name: string, icon: Record<string, unknown>) => {
    return iconBlob
      .replace(`"%%name%%"`, `"${name}"`)
      .replace(`"%%icon%%"`, `${JSON.stringify(icon)}`)
  },

  index: (exports: string) => {
    return indexBlob.replace(`// %%exports%%`, `${exports}`)
  },

  types: (declarations: string) => {
    return typesBlob.replace(`// %%declarations%%`, `${declarations}`)
  }
}

const formatter = async (): Promise<(blob: string) => string> => {
  const options = await prettier.resolveConfig(".")
  return (blob: string) => {
    return prettier.format(blob, { ...options, parser: "typescript" })
  }
}

const main = async () => {
  await fs.emptyDir(output)

  const format = await formatter()

  const index: string[] = []
  const types: string[] = []

  Object.keys(feather.icons).forEach(async (slug) => {
    const icon = {
      slug,
      name: upperFirst(camelCase(`${slug.replace(/-(\d+)/, "$1")}-icon`))
    }

    // Cleanup icon attributes
    const dirty = feather.icons[icon.slug]
    const { attrs } = dirty

    delete attrs["width"]
    delete attrs["height"]

    const data = {
      name: dirty.name,
      tags: dirty.tags,
      attrs: {
        ...attrs,
        innerHTML: dirty.contents
      }
    }

    index.push(`export { default as ${icon.name} } from "./${icon.name}"`)
    types.push(`export const ${icon.name}: Icon`)

    const blob = templates.icon(icon.name, data)
    const path = join(output, `${icon.name}.js`)

    await fs.ensureDir(dirname(path))
    await fs.writeFile(path, format(blob), "utf8")
  })

  const indexBlob = format(templates.index(index.join("\n")))
  await fs.outputFile(join(output, "index.js"), indexBlob, "utf8")

  const typesBlob = format(templates.types(types.join("\n")))
  await fs.outputFile(join(output, "index.d.ts"), typesBlob, "utf8")
}

try {
  main()
} catch (error) {
  console.log(error)
}
