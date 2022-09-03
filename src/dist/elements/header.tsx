import React, { FC, HTMLAttributes, ReactNode } from "react";
import { CssPV, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, colorsCn, shadowCn } from "../utils/attributes";
import Row, { RowAttributes } from "./row";

const cn = "bh-header";

const Header: FC<HTMLAttributes<HTMLElement> & Omit<RowAttributes, "$fill"> & {
  children?: ReactNode;
}> = (attrs) => {
  return (
    <header {...attributesWithoutChildren(attrs, cn, ...colorsCn({...attrs, $color: attrs.$color || "default"}, "head"), shadowCn(attrs.$shadow))}>
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
    </header>
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

export default Header;