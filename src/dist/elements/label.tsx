import React, { HTMLAttributes } from "react";
import CssVar, { Color, colorIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-lbl";
export const labelCn = cn;

export type LabelAttributes = HTMLAttributes<HTMLSpanElement> & {
  $nowrap?: boolean;
  $bold?: boolean;
  $color?: Color;
  $type?: "h0" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
  $fill?: boolean;
};

const Label = React.forwardRef<HTMLSpanElement, LabelAttributes>((attrs, ref) => {
  return (
    <>
      <span
        {...attributes(attrs, cn)}
        ref={ref}
        data-color={attrs.$color}
        data-type={attrs.$type}
        data-nowrap={attrs.$nowrap}
        data-bold={attrs.$bold}
        data-fill={attrs.$fill}
      />
      {Style}
    </>
  );
});

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  flex: none;
  padding: 2px 5px 0px 5px;
  color: inherit;
  overflow: hidden;
}
.${cn}[data-nowrap="true"] {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.${cn}[data-bold="true"] {
  font-weight: bold;
}
.${cn}[data-type="h0"] {
  font-size: 2.5em;
  font-weight: bold;
}
.${cn}[data-type="h1"] {
  font-size: 2em;
  font-weight: bold;
}
.${cn}[data-type="h2"] {
  font-size: 1.5em;
  font-weight: bold;
}
.${cn}[data-type="h3"] {
  font-size: 1.17em;
  font-weight: bold;
}
.${cn}[data-type="h4"] {
  font-weight: bold;
}
.${cn}[data-type="h5"] {
  font-size: 0.83em;
  font-weight: bold;
}
.${cn}[data-type="h6"] {
  font-size: 0.67em;
  font-weight: bold;
}
.${cn}[data-type="a"] {
  text-decoration: underline;
  color: ${CssVar.anchor};
  cursor: pointer;
  user-select: none;
}
.${cn}[data-fill="true"] {
  height: 100%;
  width: 100%;
}
${design ? `${colorIterator((_s, v, qs) => `
.${cn}${qs} {
  color: ${v.fgc};
}`).join("")}
` : ""}`}</JsxStyle>;

export default Label;