import { defineComponent, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const ActiveLink = defineComponent({
  name: 'ActiveLink',
  props: {
    href: Object,
    activeClassName: {
      type: String,
      default: 'active'
    }
  },
  setup(props, { slots }) {
    const route = useRoute()

    const className = ref('')

    watch(route, () => {
      if (route.path === props.href?.path && props.activeClassName) {
        className.value = props.activeClassName
      }
    })

    return () => (
      <RouterLink to={props.href || { to: '/' }}>
        {slots.default?.({ class: className.value })}
      </RouterLink>
    )
  }
})

export default ActiveLink
