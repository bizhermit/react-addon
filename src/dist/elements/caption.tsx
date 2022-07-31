import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { FC, HTMLAttributes, ReactNode } from "react";
import CssVar, { CssPV, Signal, signalIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";
import Label from "./label";

const cn = "bh-cap";

const Caption: FC<HTMLAttributes<HTMLDivElement> & {
  $signal?: Signal;
  $label?: ReactNode;
  $width?: number | string;
  $flow?: "row" | "column";
  $border?: boolean;
}> = (attrs) => {
  return (
    <div
      {...attributesWithoutChildren(attrs, cn)}
      data-signal={attrs.$signal}
      data-flow={attrs.$flow ?? "row"}
      data-border={attrs.$border}
    >
      <div className={`${cn}-lbl`} style={{ width: attrs.$width }}>
        {StringUtils.isString(attrs.$label) ? <Label>{attrs.$label}</Label> : attrs.$label}
      </div>
      <div className={`${cn}-body`}>
        {attrs.children}
      </div>
      {Style}
    </div>
  );
};

const Style = <JsxStyle id={cn}>{() => `
.${cn} {
  ${CssPV.flex}
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex: none;
  overflow: visible;
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
  border-radius: ${CssVar.bdr};
}
.${cn}[data-flow="row"] {
  flex-direction: row;
  align-items: center;
}
.${cn}[data-flow="column"] {
  flex-direction: column;
  align-items: flex-start;
}
.${cn}-lbl {
  box-sizing: border-box;
  position: relative;
  flex: none;
  font-weight: bold;
  padding-top: 2px;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  overflow: visible;
}
.${cn}[data-flow="column"] > .${cn}-body {
  margin-left: 10px;
}
.${cn}[data-border="true"] {
  border: 1px solid ${CssVar.bdc};
}
${signalIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-lbl {
  color: ${v.fc};
}
.${cn}${qs}[data-border="true"] {
  border: 1px solid ${v.bdc};
}`).join("")}
`}</JsxStyle>;

export default Caption;