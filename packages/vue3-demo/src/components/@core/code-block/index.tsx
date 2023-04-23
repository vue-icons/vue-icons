import copy from 'copy-to-clipboard'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// import { HiOutlineClipboard } from 'vue3-icons/hi'

import { defineComponent } from 'vue'

export const CodeBlock = defineComponent({
  name: 'CodeBlock',
  props: {
    code: String,
    language: String
  },
  setup(props) {
    const copyToClipboard = () => {
      copy(props.code || '')
      toast.success(`Copied to clipboard`)
    }

    return () => (
      <pre>
        <code>{props.code!.trim()}</code>
      </pre>
    )
  }
})

export default CodeBlock
