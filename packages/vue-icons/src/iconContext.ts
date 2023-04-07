import { CSSProperties, SVGAttributes } from "vue";

export interface IconContext {
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

//export const IconContext: React.Context<IconContext> = React.createContext && React.createContext(DefaultContext);
