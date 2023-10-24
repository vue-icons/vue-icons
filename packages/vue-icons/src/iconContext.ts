import { CSSProperties, InjectionKey, SVGAttributes } from "vue";

export interface IconContext {
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: '1em',
  className: undefined,
  style: undefined,
  attr: undefined,
};


export const IconContextKey = Symbol('VueIconContextKey') as InjectionKey<IconContext>

//export const IconContext: React.Context<IconContext> = React.createContext && React.createContext(DefaultContext);
