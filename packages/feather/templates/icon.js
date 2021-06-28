import { defineComponent, computed, h } from "vue"

export default defineComponent({
  name: "%%name%%",
  props: {
    size: {
      type: [Number, String],
      default: 24
    }
  },
  setup(props, context) {
    const data = "%%icon%%"

    const width = computed(() => context.attrs.width || props.size)
    const height = computed(() => context.attrs.height || props.size)

    return () =>
      h("svg", {
        ...data.attrs,
        width: width.value,
        height: height.value
      })
  }
})
