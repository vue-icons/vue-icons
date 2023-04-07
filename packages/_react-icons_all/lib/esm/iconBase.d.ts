import { SVGAttributes } from "vue";
export interface IconTree {
    tag: string;
    attr: {
        [key: string]: string;
    };
    child: IconTree[];
}
export declare function GenIcon(data: IconTree): (props: IconBaseProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
export interface IconBaseProps extends SVGAttributes {
    children?: any;
    size?: string | number;
    color?: string;
    title?: string;
}
export type IconType = (props: IconBaseProps) => ReturnType<typeof GenIcon>;
export declare const IconBase: import("vue").DefineComponent<IconBaseProps & {
    attr?: Record<string, string> | undefined;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<IconBaseProps & {
    attr?: Record<string, string> | undefined;
}>, {
    children?: any;
    class?: any;
}>;
