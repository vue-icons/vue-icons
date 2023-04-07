import CodeBlock from '@/components/@core/code-block'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconSetImport',
  props: {
    iconId: String
  },
  setup(props) {
    const importCode = `import { IconName } from "react-icons/${props.iconId}";`

    return () => (
      <>
        <h2>Import</h2>
        <CodeBlock language="jsx" code={importCode} />
      </>
    )
  }
})
