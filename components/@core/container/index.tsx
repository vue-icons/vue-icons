import React from 'react'
import { defineComponent } from 'vue'

export const Container = defineComponent({
  name: 'ContainerEl',
  props: {
    title: String
  },
  setup(props, { slots }) {
    return () => (
      <div class="p3">
        <h1 class="main">{props.title}</h1>
        {slots.default?.()}
      </div>
    )
  }
})
