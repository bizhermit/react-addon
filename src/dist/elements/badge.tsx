import React, { FC, HTMLAttributes, ReactNode } from "react";
import CssVar, { Color, colorIterator, Size, sizeIterator, varFontSize } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";
import { iconCn, varIconBc, varIconFc } from "./icon";
import Label from "./label";

const cn = "bh-bde";

const Badge: FC<HTMLAttributes<HTMLDivElement> & {
  $position?: "left-top" | "right-top" | "left-bottom" | "right-bottom";
  $color?: Color;
  $colorType?: "base" | "head" | "nav";
  $fill?: boolean;
  $shape?: "circle" | "square" | "none";
  $size?: Size;
  $title?: string;
  $borderless?: boolean;
  $visible?: boolean;
  $content?: ReactNode;
  children?: ReactNode;
}> = (attrs) => {

  const contentType = (() => {
    const t = typeof attrs.$content;
    if (t === "string") return "s";
    if (t === "number") return "s";
    if (t === "boolean") return "s";
    return "o";
  })();

  return (
    <div {...attributesWithoutChildren(attrs, `${cn}-wrap`)}>
      {attrs.children}
      {attrs.$visible === false ? <></> :
        <div
          className={cn}
          data-pos={attrs.$position || "right-top"}
          data-color={attrs.$color}
          data-colortype={attrs.$colorType || "nav"}
          data-fill={attrs.$fill}
          data-size={attrs.$size ?? "m"}
          data-shape={attrs.$shape || "circle"}
          data-borderless={attrs.$borderless}
          data-contenttype={contentType}
          title={attrs.$title}
        >{contentType === "s" ? <Label>{attrs.$content}</Label> : attrs.$content}</div>
      }
      {BadgeStyle}
    </div>
  );
};

const BadgeStyle = <JsxStyle id={cn}>{() => `
.${cn}-wrap {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}
.${cn} {
  box-sizing: border-box;
  position: absolute;
  z-index: 999;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: default;
  background: ${CssVar.bgc};
  color: ${CssVar.fc};
  border: 1px solid ${CssVar.bdc};
  overflow: hidden;
  width: fit-content;
}
.${cn}[data-pos="left-top"] {
  top: calc(${CssVar.pdy} * -0.8);
  left: calc(${CssVar.pdx} * -0.8);
}
.${cn}[data-pos="right-top"] {
  top: calc(${CssVar.pdy} * -0.8);
  right: calc(${CssVar.pdx} * -0.8);
}
.${cn}[data-pos="left-bottom"] {
  bottom: calc(${CssVar.pdy} * -0.8);
  left: calc(${CssVar.pdx} * -0.8);
}
.${cn}[data-pos="right-bottom"] {
  bottom: calc(${CssVar.pdy} * -0.8);
  right: calc(${CssVar.pdx} * -0.8);
}
.${cn}[data-shape="circle"] {
  border-radius: 9999px;
}
.${cn}[data-shape="square"] {
  border-radius: ${CssVar.bdr};
}
.${cn}[data-shape="none"] {
  background: transparent !important;
  border: none !important;
}
.${cn}[data-borderless="true"] {
  border: none !important;
}
${sizeIterator(cn, {
xs: `
min-height: calc(${CssVar.size} * 0.5);
min-width: calc(${CssVar.size} * 0.5);
font-size: 1.0rem;
${varFontSize}: 1.1rem;
`,
s: `
min-height: calc(${CssVar.size} * 0.6);
min-width: calc(${CssVar.size} * 0.6);
font-size: 1.1rem;
${varFontSize}: 1.25rem;
`,
m: `
min-height: calc(${CssVar.size} * 0.7);
min-width: calc(${CssVar.size} * 0.7);
font-size: 1.2rem;
${varFontSize}: 1.4rem;
`,
l: `
min-height: calc(${CssVar.size} * 0.8);
min-width: calc(${CssVar.size} * 0.8);
font-size: 1.3rem;
${varFontSize}: 1.6rem;
`,
xl: `
min-height: calc(${CssVar.size} * 0.9);
min-width: calc(${CssVar.size} * 0.9);
font-size: 1.6rem;
${varFontSize}: 1.8rem;
`,
})}
${colorIterator((_c, v, s) => `
.${cn}${s}[data-colortype="base"] {
  background: ${v.bgc};
  color: ${v.fc};
  border-color: ${v.bdc};
}
.${cn}${s}[data-colortype="base"] .${iconCn} {
  ${varIconFc}: ${v.fc};
  ${varIconBc}: ${v.bgc};
}
.${cn}${s}[data-colortype="head"] {
  background: ${v.head.bgc};
  color: ${v.head.fc};
  border-color: ${v.head.bdc};
}
.${cn}${s}[data-colortype="head"] .${iconCn} {
  ${varIconFc}: ${v.head.fc};
  ${varIconBc}: ${v.head.bgc};
}
.${cn}${s}[data-colortype="nav"] {
  background: ${v.nav.bgc};
  color: ${v.nav.fc};
  border-color: ${v.nav.bdc};
}
.${cn}${s}[data-colortype="nav"] .${iconCn} {
  ${varIconFc}: ${v.nav.fc};
  ${varIconBc}: ${v.nav.bgc};
}
`).join("")}
`}</JsxStyle>

export default Badge;