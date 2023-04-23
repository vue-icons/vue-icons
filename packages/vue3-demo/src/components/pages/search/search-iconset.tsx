import Icon from '@/components/@core/icon'
import { getIcons } from '@/utils/getIcons'
import { defineComponent, h } from 'vue'

// import SearchPageIconLoading from "./loading";

export default defineComponent({
  name: 'SearchIconSet',
  props: {
    icon: Object,
    name: String,
    highlightPattern: String,
    query: String
  },
  render() {
    const child = (icons: any) => {
      const found = Object.keys(icons).filter((name) =>
        name.toLowerCase().includes(this.query || '')
      )
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

    return <IconSet>{child(this.icon)}</IconSet>
  }
})
