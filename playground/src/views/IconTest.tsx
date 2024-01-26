import { defineComponent } from "vue";

import { AiFillAccountBook } from 'vue3-icons/ai'

export default defineComponent({
  name: 'IconTest',
  setup() {

    return () => (
      <ul>
        <li><AiFillAccountBook /></li>
      </ul>
    )
  }
})
