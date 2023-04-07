import Icon from '@/components/@core/icon'
import { getIcons } from '@/utils/getIcons'
//import IconsPageLoading from './loading'
import { defineComponent, h } from 'vue'

export const IconSetViewer = defineComponent({
  name: 'IconSetViewer',
  props: {
    icon: Object
  },
  setup(props) {
    return () => {
      const IconSet = () => h(getIcons(props.icon?.id))

      return (
        <>
          <h2>Icons</h2>
          <IconSet>
            <div className="icons">
              {Object.keys(props.icon || {}).map((name) => (
                <Icon key={name} icon={props.icon?.[name]} name={name} />
              ))}
            </div>
          </IconSet>
        </>
      )
    }
  }
})

export default IconSetViewer
