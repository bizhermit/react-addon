import React, { HTMLAttributes } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter, Color, colorIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes, dBool, dPosX, dPosY, ftoCn } from "../utils/attributes";

const cn = "bh-fbx";
export const flexBoxCn = cn;

export type FlexBoxAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $row?: boolean;
  $wrap?: boolean;
  $left?: boolean;
  $center?: boolean;
  $right?: boolean;
  $top?: boolean;
  $middle?: boolean;
  $bottom?: boolean;
  $shadow?: boolean;
  $radius?: boolean;
  $scroll?: boolean;
  $padding?: boolean;
  $border?: boolean | Color;
  $color?: Color;
};

const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxAttributes>((attrs, ref) => {
  return (
    <>
      <div
        {...attributes(attrs, cn, ftoCn(attrs.$fto), attrs.$scroll ? sbCn : "")}
        ref={ref}
        data-flow={attrs.$row ? "row" : "col"}
        data-wrap={dBool(attrs.$wrap)}
        data-posx={dPosX(attrs.$left, attrs.$center, attrs.$right) ?? "l"}
        data-posy={dPosY(attrs.$top, attrs.$middle, attrs.$bottom) ?? "t"}
        data-border={attrs.$border ?? attrs.$color}
        data-color={attrs.$color ?? attrs.$color}
        data-shadow={attrs.$shadow}
        data-radius={attrs.$radius}
        data-padding={attrs.$padding}
      />
      {Style}
    </>
  );
});

const colCn = `${cn}[data-flow="col"]`;
const rowCn = `${cn}[data-flow="row"]`;
const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex: none;
}
.${colCn} {
  flex-direction: column;
}
.${rowCn} {
  flex-direction: row;
}
.${cn}[data-wrap="true"] {
  flex-wrap: wrap;
}
.${cn}[data-wrap="false"] {
  flex-wrap: nowrap;
}
.${colCn}[data-posx="l"],
.${rowCn}[data-posy="t"] {
  align-items: flex-start;
}
.${colCn}[data-posx="c"],
.${rowCn}[data-posy="m"] {
  align-items: center;
}
.${colCn}[data-posx="r"],
.${rowCn}[data-posy="b"] {
  align-items: flex-end;
}
.${colCn}[data-posy="t"],
.${rowCn}[data-posx="l"] {
  justify-content: flex-start;
}
.${colCn}[data-posy="m"],
.${rowCn}[data-posx="c"] {
  justify-content: center;
}
.${colCn}[data-posy="b"],
.${rowCn}[data-posx="r"] {
  justify-content: flex-end;
}
.${cn}[data-border="true"] {
  border: 1px solid ${CssVar.bdc};
}
.${cn}[data-shadow="true"] {
${switchDesign(design, {
fm: `box-shadow: 0px 3px 3px -2px ${CssVar.sdw.c};`,
neumorphism: `box-shadow: ${CssPV.cvxSd};`,
})}
}
.${cn}[data-radius="true"] {
  border-radius: ${CssVar.bdr};
}
.${cn}[data-padding="true"] {
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
${colorIterator((s, v) => `
.${cn}[data-border="${s}"] {
  border: 1px solid ${v.bdc};
}
.${cn}[data-color="${s}"] {
  background: ${v.bgc};
  color: ${v.fc};
}
`).join("")}
`}</JsxStyle>;

export default FlexBox;