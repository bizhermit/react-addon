import React, { FC, HTMLAttributes, ReactNode } from "react";
import { colorCn } from "../styles/core-style";
import { CssPV, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, shadowCn } from "../utils/attributes";
import Row, { RowAttributes } from "./row";

const cn = "bh-header";

const Footer: FC<HTMLAttributes<HTMLElement> & Omit<RowAttributes, "$fill"> & {
  children?: ReactNode;
}> = (attrs) => {
  return (
    <footer
      {...attributesWithoutChildren(attrs, cn, colorCn, shadowCn(attrs.$shadow))}
      data-color={attrs.$color || "default"}
      data-colortype={attrs.$colorType || "head"}
    >
      <Row
        $fill
        $padding={attrs.$padding}
        $center={attrs.$center}
        $middle={attrs.$middle}
        $nowrap={attrs.$nowrap}
        $right={attrs.$right}
        $top={attrs.$top}
      >{attrs.children}</Row>
      {Style}
    </footer>
  );
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  flex: none;
  width: 100%;
}
${switchDesign(design, {
material: `
.${cn}:not([class*="bh-sd-"]) {
  box-shadow: ${CssPV.cvxSd(2)};
}`,
neumorphism: `
.${cn}:not([class*="bh-sd-"]) {
  box-shadow: ${CssPV.nCvxSd(2)};
}`,
})}
`}</JsxStyle>

export default Footer;