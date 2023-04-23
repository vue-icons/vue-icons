import { BRAND_TITLE_MONO } from '@/utils/constants'

import ActiveLink from '../active-link'
import BrandIcon from './icon'
import { watch, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'HeadingEl',
  props: {
    isOpen: Boolean
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const route = useRoute()

    const toggleMenu = () => {
      emit('update:isOpen', !props.isOpen)
    }

    watch(route, () => {
      emit('update:isOpen', false)
    })

    return () => (
      <div class="brand">
        <ActiveLink href={{ path: '/' }}>
          <a>
            <BrandIcon />
            <span>{BRAND_TITLE_MONO}</span>
          </a>
        </ActiveLink>
        <div class="brand--navmenu">
          <button class={`menu ${props.isOpen && 'active'}`} onClick={toggleMenu}>
            <div>Menu</div>
          </button>
        </div>
      </div>
    )
  }
})
