import React, { FC, ReactNode } from "react";
import CssVar, { Color, colorIterator, CssPV, Size, sizeIterator, varFontSize } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";
import Label from "./label";

const cn = "bh-bde";

const Badge: FC<{
  $position?: "left-top" | "right-top" | "left-bottom" | "right-bottom";
  $color?: Color;
  $colorType?: "base" | "head" | "nav";
  $fill?: boolean;
  $shape?: "circle" | "square";
  $size?: Size;
  $content?: ReactNode;
  children?: ReactNode;
}> = (attrs) => {

  return (
    <div {...attributesWithoutChildren(attrs, cn)}>
      {attrs.children}
      <div
        className={`${cn}-main`}
        data-pos={attrs.$position || "right-top"}
        data-color={attrs.$color}
        data-colortype={attrs.$colorType || "base"}
        data-fill={attrs.$fill}
        data-size={attrs.$size ?? "m"}
        data-shape={attrs.$shape || "circle"}
      >{
        typeof attrs.$content === "string" || typeof attrs.$content === "number" ?
          <Label>{attrs.$content}</Label> : attrs.$content
      }</div>
      {BadgeStyle}
    </div>
  );
};

const BadgeStyle = <JsxStyle id={cn}>{() => `
.${cn} {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}
.${cn}-main {
  box-sizing: border-box;
  position: absolute;
  z-index: 999;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
}
.${cn}-main[data-pos="left-top"] {
  top: calc(${CssVar.pdy} * -0.5);
  left: calc(${CssVar.pdx} * -0.5);
}
.${cn}-main[data-pos="right-top"] {
  top: calc(${CssVar.pdy} * -0.5);
  right: calc(${CssVar.pdx} * -0.5);
}
.${cn}-main[data-pos="left-bottom"] {
  bottom: calc(${CssVar.pdy} * -0.5);
  left: calc(${CssVar.pdx} * -0.5);
}
.${cn}-main[data-pos="right-bottom"] {
  bottom: calc(${CssVar.pdy} * -0.5);
  right: calc(${CssVar.pdx} * -0.5);
}
.${cn}-main[data-shape="circle"] {
  border-radius: 9999px;
}
.${cn}-main[data-shape="square"] {
  border-radius: ${CssVar.bdr};
}
${sizeIterator(`${cn}-main`, {
xs: `
height: calc(${CssVar.size} * 0.4);
width: calc(${CssVar.size} * 0.4);
font-size: 1.0rem;
${varFontSize}: 1.1rem;
`,
s: `
height: calc(${CssVar.size} * 0.5);
width: calc(${CssVar.size} * 0.5);
font-size: 1.1rem;
${varFontSize}: 1.25rem;
`,
m: `
height: calc(${CssVar.size} * 0.6);
width: calc(${CssVar.size} * 0.6);
font-size: 1.2rem;
${varFontSize}: 1.4rem;
`,
l: `
height: calc(${CssVar.size} * 0.7);
width: calc(${CssVar.size} * 0.7);
font-size: 1.3rem;
${varFontSize}: 1.6rem;
`,
xl: `
height: calc(${CssVar.size} * 0.8);
width: calc(${CssVar.size} * 0.8);
font-size: 1.6rem;
${varFontSize}: 1.8rem;
`,
})}
${colorIterator((_c, v, s) => `
.${cn}-main${s}[data-colortype="base"] {
  background: ${v.bgc};
  color: ${v.fc};
  border: 1px solid ${v.bdc};
}
.${cn}-main${s}[data-colortype="head"] {
  background: ${v.head.bgc};
  color: ${v.head.fc};
  border: 1px solid ${v.head.bdc};
}
.${cn}-main${s}[data-colortype="nav"] {
  background: ${v.nav.bgc};
  color: ${v.nav.fc};
}
`).join("")}
`}</JsxStyle>

export default Badge;