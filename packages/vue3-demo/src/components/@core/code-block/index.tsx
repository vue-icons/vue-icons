import copy from 'copy-to-clipboard'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// import { HiOutlineClipboard } from 'vue3-icons/hi'

import { defineComponent, ref } from 'vue'

import { getHighlighter, setCDN, loadTheme } from 'shiki'

setCDN('./')

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

    const output = ref('')

    getHighlighter({
      theme: 'one-dark-pro'
    })
      .then((highlighter) => {
        const code: string = `const greet:string = "hello world!";
console.log(greet);`
        output.value = highlighter.codeToHtml(code, { lang: 'ts' })
      })
      .catch((error) => {
        console.error(error)
      })

    return () => (
      <div class="code-wrap" innerHTML={output.value}></div>
      // <pre>
      //   <code>{props.code!.trim()}</code>
      // </pre>
    )
  }
})

export default CodeBlock
