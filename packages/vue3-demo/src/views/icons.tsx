import IconsPageComponent from '@/components/pages/icons'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'IconPage',
  setup() {
    const route = useRoute()
    return () => <>{<IconsPageComponent iconId={route.query.name as string} />}</>
  }
})
