import React, { HTMLAttributes } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes, ColorAttributes, colorsCn, dBool, dPosX, dPosY, ftoCn, paddingCn, shadowCn } from "../utils/attributes";

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
  $shadow?: boolean | number;
  $hover?: boolean;
  $radius?: boolean;
  $scroll?: boolean;
  $padding?: boolean | number;
  $border?: boolean;
} & ColorAttributes;

const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxAttributes>((attrs, ref) => {
  return (
    <>
      <div
        {...attributes(attrs, cn, ...colorsCn(attrs), shadowCn(attrs.$shadow), paddingCn(attrs.$padding), ftoCn(attrs.$fto), attrs.$scroll ? sbCn : "")}
        ref={ref}
        data-flow={attrs.$row ? "row" : "col"}
        data-wrap={dBool(attrs.$wrap)}
        data-posx={dPosX(attrs.$left, attrs.$center, attrs.$right) ?? "l"}
        data-posy={dPosY(attrs.$top, attrs.$middle, attrs.$bottom) ?? "t"}
        data-border={attrs.$border}
        data-hover={attrs.$hover}
        data-radius={attrs.$radius}
      />
      {Style}
    </>
  );
});

const colCn = `${cn}[data-flow="col"]`;
const rowCn = `${cn}[data-flow="row"]`;
const Style = <JsxStyle id={cn} depsDesign>{() => `
.${cn} {
  ${CssPV.flex}
  transition: box-shadow 0.1s;
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
.${cn}[data-radius="true"] {
  border-radius: ${CssVar.bdr};
}
`}</JsxStyle>;

export default FlexBox;