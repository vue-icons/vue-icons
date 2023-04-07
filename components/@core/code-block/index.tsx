import copy from 'copy-to-clipboard'
// @ts-ignore
import Vue3Prism from 'vue3-prism/lib/Vue3Prism.common.js'
import 'vue3-prism/lib/Vue3Prism.css'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import React from 'react'
import { IoMdClipboard } from 'react-icons/io'
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
      <Vue3Prism
        source={props.code!.trim()}
        language={props.language}
        onClick={copyToClipboard}
      ></Vue3Prism>
    )
  }
})

export default CodeBlock
