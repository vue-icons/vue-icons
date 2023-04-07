var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { defineComponent, h } from "vue";
import { DefaultContext } from "./iconContext";
function Tree2Element(tree) {
    return (tree &&
        tree.map(function (node, i) {
            return h(node.tag, __assign({ key: i }, node.attr), Tree2Element(node.child));
        }));
}
export function GenIcon(data) {
    return function (props) { return h(IconBase, __assign({ attr: __assign({}, data.attr) }, props), {
        default: function () { return Tree2Element(data.child); }
    }); };
}
export var IconBase = defineComponent({
    name: 'IconBase',
    setup: function (props, _a) {
        var slots = _a.slots, attrs = _a.attrs;
        var elem = function (conf) {
            var _a;
            var _b = attrs.attr, attr = _b === void 0 ? {} : _b, size = attrs.size, title = attrs.title, svgProps = __rest(attrs, ["attr", "size", "title"]);
            var computedSize = size || conf.size || "1em";
            var className;
            if (conf.className)
                className = conf.className;
            if (props.class)
                className = (className ? className + " " : "") + props.class;
            console.log(attr, 'props.attr');
            return h('svg', __assign(__assign(__assign(__assign({ 
                // @ts-ignore
                stroke: "currentColor", 
                // @ts-ignore
                fill: "currentColor", strokeWidth: "0" }, __assign({}, conf.attr)), __assign({}, attr)), __assign({}, svgProps)), { class: className, style: __assign({ color: props.color || conf.color }, conf.style), height: computedSize, width: computedSize, xmlns: "http://www.w3.org/2000/svg" }), [
                title ? h('title', title) : null,
                (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)
            ]);
        };
        return function () { return h(elem(DefaultContext)); };
    }
});
