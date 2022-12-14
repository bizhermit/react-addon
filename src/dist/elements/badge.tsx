import React, { FC, HTMLAttributes, ReactNode } from "react";
import CssVar, { Color, ColorType, CssPV, Size, sizeIterator, switchDesign, varFontSize } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, colorCn, dropShadowCn } from "../utils/attributes";

const cn = "bh-bde";

const Badge: FC<HTMLAttributes<HTMLDivElement> & {
  $position?: "left-top" | "right-top" | "left-bottom" | "right-bottom";
  $fill?: boolean;
  $shape?: "circle" | "square" | "none";
  $size?: Size;
  $shadow?: boolean | number;
  $title?: string;
  $border?: boolean;
  $visible?: boolean;
  $fixedSize?: boolean;
  $content?: ReactNode;
  $color?: Color;
  $colorType?: ColorType;
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
          className={`${cn} ${dropShadowCn(attrs.$shadow)} ${colorCn(attrs.$color || "default", attrs.$colorType)}`}
          data-pos={attrs.$position || "right-top"}
          data-fill={attrs.$fill}
          data-size={attrs.$size ?? "m"}
          data-fsize={attrs.$fixedSize}
          data-shape={attrs.$shape || "circle"}
          data-border={attrs.$border}
          title={attrs.$title}
        >{contentType === "s" ? <span className={`${cn}-lbl`}>{attrs.$content}</span> : attrs.$content}</div>
      }
      {BadgeStyle}
    </div>
  );
};

const BadgeStyle = <JsxStyle id={cn} depsDesign>{({ design }) => `
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
  overflow: hidden;
  width: fit-content;
  user-select: none;
}
.${cn}-lbl {
  padding: 2px 3px 0px 3px;
  text-align: center;
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
${switchDesign(design, {
fm: `
.${cn}[data-border="true"] {
  border: 1px solid ${CssVar.bdc};
}`,
neumorphism: `
.${cn}[data-border="true"] {
  box-shadow: ${CssPV.nCvxSdShallow};
}`
})}
.${cn}[data-shape="circle"] {
  border-radius: 9999px;
}
.${cn}[data-shape="square"] {
  border-radius: ${CssVar.bdr};
}
.${cn}[data-shape="none"] {
  background: transparent !important;
  border: none !important;
${switchDesign(design, {
neumorphism: `box-shadow: none !important;`
})}
}
${switchDesign(design, {
c: `
.${cn}:not([class*="bh-dsd-"]) {
  filter: ${CssPV.dropSd(2)};
}`})}
${sizeIterator(cn, {
xs: `
height: calc(${CssVar.size} * 0.5);
min-width: calc(${CssVar.size} * 0.5);
font-size: 1.0rem;
${varFontSize}: 1.1rem;
`,
s: `
height: calc(${CssVar.size} * 0.6);
min-width: calc(${CssVar.size} * 0.6);
font-size: 1.1rem;
${varFontSize}: 1.25rem;
`,
m: `
height: calc(${CssVar.size} * 0.7);
min-width: calc(${CssVar.size} * 0.7);
font-size: 1.2rem;
${varFontSize}: 1.4rem;
`,
l: `
height: calc(${CssVar.size} * 0.8);
min-width: calc(${CssVar.size} * 0.8);
font-size: 1.3rem;
${varFontSize}: 1.6rem;
`,
xl: `
height: calc(${CssVar.size} * 0.9);
min-width: calc(${CssVar.size} * 0.9);
font-size: 1.6rem;
${varFontSize}: 1.8rem;
`,
})}
${sizeIterator(`${cn}[data-fsize="true"]`, {
xs: `
height: calc(${CssVar.size} * 0.5);
width: calc(${CssVar.size} * 0.5);
`,
s: `
height: calc(${CssVar.size} * 0.6);
width: calc(${CssVar.size} * 0.6);
`,
m: `
height: calc(${CssVar.size} * 0.7);
width: calc(${CssVar.size} * 0.7);
`,
l: `
height: calc(${CssVar.size} * 0.8);
width: calc(${CssVar.size} * 0.8);
`,
xl: `
height: calc(${CssVar.size} * 0.9);
width: calc(${CssVar.size} * 0.9);
`,
})}
`}</JsxStyle>

export default Badge;