<template>
  <pre
    ref="preNode"
    :class="'language-' + language"
  ><code :class="'language-'+language" v-html="prismHTML" ></code></pre>
</template>

<script lang="ts">
import Prism from 'prismjs'

// default theme --> prism-a11y-dark
// https://github.com/PrismJS/prism-themes/blob/master/themes/prism-a11y-dark.css
import './theme/prism-a11y-dark.css'

// import { ref } from "@vue/reactivity";

// https://icode.best/i/57529645443554
// import { onMounted } from "@vue/runtime-core";
import { onBeforeUnmount, onMounted, ref } from 'vue'

export default {
  name: 'Vue3Prism',
  // use like this
  // <Prism source="console.log('Prism');" language="javascript" theme="a11y-dark" copy="Copy the snippet!"></Prism>
  props: {
    source: {
      type: String,
      default: "console.log('Prism');"
    },
    language: {
      type: String,
      default: 'javascript'
    },
    // TODO
    theme: {
      type: String,
      default: 'a11y-dark'
    },
    copy: {
      type: String,
      default: 'Copy the snippet!'
    },
    copiedTip: {
      type: String,
      default: 'Copied!'
    }
  },
  setup(props) {
    const preNode = ref<HTMLElement | null>(null)
    onMounted(() => {
      // 1. line-numbers
      const lineNumbersDiv = document.createElement('div')
      lineNumbersDiv.setAttribute('class', 'line-numbers-span')
      preNode.value?.append(lineNumbersDiv)

      lineNumbersDiv.style.position = 'absolute'
      lineNumbersDiv.style.top = '1.5em'
      lineNumbersDiv.style.left = '0em'
      lineNumbersDiv.style.width = '3em'
      lineNumbersDiv.style.borderRight = '1px solid #999'
      lineNumbersDiv.style.textAlign = 'center'

      prismHTML.split('\n').forEach((_: any, index: number) => {
        let span = document.createElement('span')
        let br = document.createElement('br')
        br.style.userSelect = 'none'
        span.innerHTML = String(index + 1)
        span.style.color = '#999'
        lineNumbersDiv.append(span)
        lineNumbersDiv.append(br)
      })

      // 2. copy-to-clipboard
      const copySpan = document.createElement('span')
      copySpan.setAttribute('class', 'copy-span')
      preNode.value?.append(copySpan)

      copySpan.innerHTML = props.copy
      copySpan.style.position = 'absolute'
      copySpan.style.top = '0.3em'
      copySpan.style.right = '0em'
      copySpan.style.padding = '0 0.5em'
      copySpan.style.cursor = 'pointer'
      copySpan.style.borderRadius = '0.5em'
      copySpan.style.color = '#bbb'
      copySpan.style.backgroundColor = 'rgba(224, 224, 224, 0.2)'
      copySpan.style.boxShadow = '0 2px 0 0 rgb(0 0 0 / 20%)'

      copySpan.style.opacity = '0'
      copySpan.onclick = () => {
        // change content
        // copySpan.innerHTML = "Copied!";
        copySpan.innerHTML = props.copiedTip
        // https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
        if (navigator.clipboard) {
          // clipboard api
          navigator.clipboard.writeText(props.source)
        } else {
          const textarea = document.createElement('textarea')
          document.body.appendChild(textarea)
          // hide textarea
          textarea.style.position = 'fixed'
          // This property is deprecated. Use clip-path instead: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
          // textarea.style.clip = "rect(0 0 0 0)";
          // css-tricks clip-path: https://css-tricks.com/almanac/properties/c/clip-path/
          textarea.style.clipPath = 'circle(0)'
          textarea.style.top = '10px'
          // assign value
          textarea.value = props.source
          textarea.select()
          document.execCommand('copy', true)
          // remove
          document.body.removeChild(textarea)
        }
        setTimeout(() => {
          // recover content
          copySpan.innerHTML = props.copy
        }, 1000)
      }

      const onmouseover = () => {
        copySpan.style.opacity = '1'
      }
      const onmouseout = () => {
        copySpan.style.opacity = '0'
      }
      preNode.value?.addEventListener('mouseover', onmouseover, false)
      preNode.value?.addEventListener('onmouseout', onmouseout, false)

      onBeforeUnmount(() => {
        preNode.value?.removeEventListener('mouseover', onmouseover, false)
        preNode.value?.removeEventListener('onmouseout', onmouseout, false)
      })

      // 3. show language
      const languageSpan = document.createElement('span')
      languageSpan.setAttribute('class', 'language-span')
      preNode.value?.append(languageSpan)

      languageSpan.innerHTML = props.language
      languageSpan.style.position = 'absolute'
      languageSpan.style.bottom = '0.25em'
      languageSpan.style.right = '0.25em'
      languageSpan.style.color = '#00e0e0'

      // 4. show Prism
      const prismSpan = document.createElement('span')
      prismSpan.setAttribute('class', 'prism-span')
      preNode.value?.append(prismSpan)

      prismSpan.innerHTML = 'Hightlighted with ❤️ by '
      prismSpan.style.position = 'absolute'
      prismSpan.style.bottom = '0.25em'
      prismSpan.style.right = '50%'
      prismSpan.style.borderTop = '1px solid #999'
      prismSpan.style.transform = 'translateX(50%)'
      prismSpan.style.color = '#999'

      const a = document.createElement('a')
      prismSpan.append(a)
      a.innerHTML = 'Prism'
      a.href = 'https://prismjs.com/'
      a.style.color = '#00e0e0'
    })

    // highlight function: https://prismjs.com/docs/Prism.html#.highlight
    const prismHTML = Prism.highlight(
      `${props.source}`,
      Prism.languages[props.language],
      'javascript'
    )
    return {
      preNode,
      prismHTML
    }
  }
}
</script>

<style lang="scss" scoped>
// circle left | circle diameter | circle offset
$mac-left: 0.5em;
$mac-diameter: 0.5em;
$mac-offset: calc((3em - $mac-left - $mac-diameter) / 2); // 1em

pre {
  margin: 1rem auto;
  width: fit-content;
  box-sizing: border-box;
  max-width: 90%;
  padding-left: 3.8em;
  padding-top: 1.5em;
  padding-bottom: 2em;
  position: relative;
  // mac circle
  &::before {
    position: absolute;
    content: ' ';
    top: 0.3em;
    left: $mac-left;
    width: $mac-diameter;
    height: $mac-diameter;
    background-color: #f96057;
    border-radius: 50%;
    // box-shadow: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
    box-shadow: $mac-offset 0 0 0 #f8ce52, calc(2 * $mac-offset) 0 0 0 #5fcf65;
    z-index: 10;
  }
}
</style>
