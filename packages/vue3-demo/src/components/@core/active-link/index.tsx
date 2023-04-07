import { defineComponent, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const ActiveLink = defineComponent({
  name: 'ActiveLink',
  props: {
    href: String,
    activeClassName: {
      type: String,
      default: 'active'
    }
  },
  setup(props, { slots }) {
    const route = useRoute()

    const className = ref('')

    watch(route, () => {
      if (route.path === props.href && props.activeClassName) {
        className.value = props.activeClassName
      }
    })

    return () => (
      <RouterLink to={{ path: props.href || '/' }}>
        {slots.default?.({ class: className.value })}
      </RouterLink>
    )
  }
})

export default ActiveLink
