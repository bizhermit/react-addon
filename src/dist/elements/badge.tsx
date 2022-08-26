import React, { FC, ReactNode } from "react";
import { Color, colorIterator, Size, sizeIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";

const cn = "bh-bde";

const Badge: FC<{
  $position?: "left" | "right" | "left-top" | "right-top" | "left-bottom" | "right-bottom";
  $color?: Color;
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
        data-fill={attrs.$fill}
        data-size={attrs.$size ?? "m"}
        data-shape={attrs.$shape || "circle"}
      >{attrs.$content}</div>
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
}
.${cn}-main[data-pos="left"] {

}
.${cn}-main[data-pos="right"] {

}
.${cn}-main[data-pos="left-top"] {

}
.${cn}-main[data-pos="right-top"] {

}
.${cn}-main[data-pos="left-bottom"] {

}
.${cn}-main[data-pos="right-bottom"] {

}
${sizeIterator(cn, {
xs: ``,
s: ``,
m: ``,
l: ``,
xl: ``,
})}
${colorIterator((_c, v, s) => `
.${cn}-main${s} {
  background: ${v.nav.bgc};
  color: ${v.nav.fc};
}
`).join("")}
`}</JsxStyle>

export default Badge;