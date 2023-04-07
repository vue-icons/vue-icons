import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentEl',
  setup(props, { slots }) {
    return () => <main class="container">{slots.default?.()}</main>
  }
})
