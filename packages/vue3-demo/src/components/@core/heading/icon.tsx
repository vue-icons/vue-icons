import { defineComponent } from 'vue'

const BrandIcon = defineComponent({
  name: 'BrandIcon',
  setup() {
    return () => (
      <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-7b849662="">
        <path
          fill="#42b883"
          d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
          data-v-7b849662=""
        ></path>
        <path
          fill="#35495e"
          d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
          data-v-7b849662=""
        ></path>
      </svg>
    )
  }
})

export default BrandIcon
