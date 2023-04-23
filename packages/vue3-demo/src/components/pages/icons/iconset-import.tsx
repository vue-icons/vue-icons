import CodeBlock from '@/components/@core/code-block'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'IconSetImport',
  props: {
    iconId: String
  },
  setup(props) {
    const importCode = computed(() => `import { IconName } from "vue3-icons/${props.iconId}";`)

    console.log('🚀 ~ file: iconset-import.tsx:12 ~ setup ~ importCode:', importCode)
    return () => (
      <>
        <h2>Import</h2>
        <CodeBlock language="jsx" code={importCode.value} />
      </>
    )
  }
})
