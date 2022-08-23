import React, { FC, HTMLAttributes } from "react";
import { CssPV } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes, dPosX, dPosY } from "../utils/attributes";

const cn = "bh-row";

const Row: FC<HTMLAttributes<HTMLDivElement> & {
  $center?: boolean;
  $right?: boolean;
  $top?: boolean;
  $middle?: boolean;
  $fill?: boolean;
  $nowrap?: boolean;
}> = (attrs) => {
  return (
    <>
      <div
        {...attributes(attrs, cn)}
        data-fill={attrs.$fill}
        data-nowrap={attrs.$nowrap}
        data-posx={dPosX(undefined, attrs.$center, attrs.$right) ?? "l"}
        data-posy={dPosY(attrs.$top, attrs.$middle, undefined) ?? "b"}
      />
      {Style}
    </>
  );
};

const Style = <JsxStyle id={cn}>{() => `
.${cn} {
  ${CssPV.flex}
  flex-flow: row wrap;
  flex: none;
}
.${cn}[data-posx="l"] {
  justify-content: flex-start;
}
.${cn}[data-posx="c"] {
  justify-content: center;
}
.${cn}[data-posx="r"] {
  justify-content: flex-end;
}
.${cn}[data-posy="t"] {
  align-items: flex-start;
}
.${cn}[data-posy="m"] {
  align-items: center;
}
.${cn}[data-posy="b"] {
  align-items: flex-end;
}
.${cn}[data-fill="true"] {
  width: 100%;
}
.${cn}[data-nowrap="true"] {
  flex-wrap: nowrap;
}
.${cn} > .${cn} {
  flex: 1;
}
`}</JsxStyle>;

export default Row;