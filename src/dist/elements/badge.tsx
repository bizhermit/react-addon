import React, { FC, ReactNode } from "react";
import { Color, Size } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";

const cn = "bh-bde";

const Badge: FC<{
  $position?: "left" | "right" | "left-top" | "right-top" | "left-bottom" | "right-bottom";
  $color?: Color;
  $size?: Size;
  children?: ReactNode;
}> = (attrs) => {

  return (
    <div
      {...attributesWithoutChildren(attrs, cn)}
      data-color={attrs.$color}
      data-size={attrs.$size ?? "m"}
    >
      <div className={`${cn}-main`}></div>
      {attrs.children}
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
  background: black;
  top: 0px;
  right: 0px;
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  z-index: 9999;
}
`}</JsxStyle>

export default Badge;