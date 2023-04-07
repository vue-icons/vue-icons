import copy from 'copy-to-clipboard'
import { defineComponent } from 'vue'
import { toast } from 'vue3-toastify'

const Icon = defineComponent({
  props: {
    icon: [Function, String],
    name: String,
    highlightPattern: String
  },
  setup(props) {
    const copyToClipboard = () => {
      copy(props.name || '')
      toast.success(`Copied '${props.name}' to clipboard`, {
        position: 'bottom-center'
      })
    }

    const highlightedName = () => {
      if (props.highlightPattern)
        return props
          .name!.split(props.highlightPattern)
          .map((part) => (part.match(props.highlightPattern!) ? <b>{part}</b> : part))
      return props.name
    }

    return (
      <div class="item" tabIndex={0} onClick={copyToClipboard} key={props.name}>
        <div class="icon h2">{typeof props.icon === 'function' && props.icon?.()}</div>
        <div class="name">{highlightedName()}</div>
      </div>
    )
  }
})

export default Icon
