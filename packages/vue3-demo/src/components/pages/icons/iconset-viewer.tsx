import Icon from '@/components/@core/icon'
import { getIcons } from '@/utils/getIcons'
//import IconsPageLoading from './loading'
import { defineComponent, h, ref } from 'vue'
import type { IconType } from 'vue3-icons/lib'

export const IconSetViewer = defineComponent({
  name: 'IconSetViewer',
  props: {
    icon: Object
  },
  setup(props) {
    return () => {
      const icons = ref<IconType[]>([])
      getIcons(props.icon?.id).then((res: any) => {
        console.log(res)
        icons.value = res
      })
      // const IconSet = () => icons.value.map((icon: any) => h(icon))

      return (
        <>
          <h2>Icons</h2>
          <div class="icons">
            {Object.keys(icons.value).map((name) => {
              return <Icon key={name} icon={icons.value?.[name as any]} name={name} />
            })}
          </div>
          {/* {icons.value.map((icon) => {
            return (
              <div className="icons">
                {Object.keys(icon || {}).map((name) => (
                  <Icon key={name} icon={props.icon?.[name]} name={name} />
                ))}
              </div>
            )
          })} */}
        </>
      )
    }
  }
})

export default IconSetViewer
