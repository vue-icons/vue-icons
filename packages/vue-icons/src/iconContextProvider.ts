import { Prop, PropType, defineComponent, provide } from 'vue';
import { DefaultContext, IconContext, IconContextKey } from './iconContext';

export const IconContextProvider = defineComponent({
  name: 'IconContextProvider',
  props: {
    value: {
      type: Object as PropType<IconContext>,
      required: true,
    },
  },
  setup(props, { slots }) {
    provide(IconContextKey, { ...DefaultContext, ...props.value });
    return () => {
      return slots.default?.();
    };
  },
});
