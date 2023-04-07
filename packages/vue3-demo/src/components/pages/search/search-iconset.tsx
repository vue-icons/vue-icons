import Icon from '@/components/@core/icon'
import loadable from '@/loadable/component'
import React from 'react'
import { getIcons } from '@/utils/getIcons'
import { defineComponent, h } from 'vue'

// import SearchPageIconLoading from "./loading";

export default defineComponent({
  name: 'SearchIconSet',
  props: {
    icon: Object,
    name: String,
    highlightPattern: String
  },
  render() {
    const child = (icons: any) => {
      const found = Object.keys(icons).filter((name) => name.toLowerCase().includes(query))
      return (
        <>
          {found.map((name) => (
            <Icon
              key={name}
              icon={icons[name]}
              name={name}
              highlightPattern={this.highlightPattern}
            />
          ))}
        </>
      )
    }

    const IconSet = () => h(getIcons(this.icon?.id || ''))

    return <IconSet>{child()}</IconSet>
  }
})
