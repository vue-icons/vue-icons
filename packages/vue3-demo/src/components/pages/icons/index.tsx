import Container from '@/components/@core/container'
import { getIconById } from '@/utils/icon'

import IconSetImport from './iconset-import'
import IconSetInfo from './iconset-info'
import IconSetViewer from './iconset-viewer.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'IconsPageComponent',
  props: {
    iconId: String
  },
  setup(props) {
    const icon = computed(() => getIconById(props.iconId || ''))
    return () => (
      <Container title={icon.value.name}>
        <IconSetInfo icon={icon.value} />
        <IconSetImport iconId={icon.value.id} />
        <IconSetViewer icon={icon.value} />
      </Container>
    )
  }
})
