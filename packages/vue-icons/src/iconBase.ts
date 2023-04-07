
import { SVGAttributes, defineComponent, h } from "vue";
import { DefaultContext } from "./iconContext";

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child: IconTree[];
}

function Tree2Element(tree: IconTree[]): any {
  return (
    tree &&
    tree.map((node, i) =>
      h(
        node.tag,
        { key: i, ...node.attr },
        Tree2Element(node.child)
      )
    )
  );
}
export function GenIcon(data: IconTree) {
  return (props: IconBaseProps) => h(IconBase, { attr: {...data.attr}, ...props }, {
    default: () => Tree2Element(data.child)
  })
}

export interface IconBaseProps extends SVGAttributes {
  children?: any;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (props: IconBaseProps) => ReturnType<typeof GenIcon>

export const IconBase = defineComponent<IconBaseProps & { attr?: Record<string, string> }>({
  name: 'IconBase',
  setup(props, { slots, attrs }) {
    const elem = (conf: any) => {
      const { attr = {}, size, title, ...svgProps } = attrs;
      const computedSize = size || conf.size || "1em";
      let className;
      if (conf.className) className = conf.className;
      if (props.class)
        className = (className ? className + " " : "") + props.class;
  
      console.log(attr, 'props.attr')
      return h('svg', {
        // @ts-ignore
        stroke: "currentColor",
        // @ts-ignore
        fill: "currentColor",
        strokeWidth: "0",
        ...{...conf.attr},
        ...{...(attr as any)},
        ...{...svgProps},
        class: className,
        style: {
          color: props.color || conf.color,
          ...conf.style,
        },
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        title ? h('title', title) : null,
        slots.default?.()
      ])
    };

    return () => h(elem(DefaultContext));
  }
})
