import React, { HTMLAttributes, ReactNode } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, Signal, signalIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";

const cn = "bh-grp";

export type GroupBoxAttributes = HTMLAttributes<HTMLDivElement> & {
  $caption?: ReactNode;
  $signal?: Signal;
  $padding?: boolean;
};

const GroupBox = React.forwardRef<HTMLDivElement, GroupBoxAttributes>((attrs, ref) => {
  return (
    <div
      {...attributesWithoutChildren(attrs, cn)}
      ref={ref}
      data-signal={attrs.$signal}
    >
      <div className={`${cn}-cap`}>
        <div className={`${cn}-cap_prefix`} />
        <div className={`${cn}-cap_cont`}>{attrs.$caption}</div>
        <div className={`${cn}-cap_suffix`} />
      </div>
      <div
        className={`${cn}-cont ${sbCn}`}
        data-padding={attrs.$padding}
      >
        {attrs.children}
      </div>
      {Style}
    </div>
  );
});

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  flex: none;
}
.${cn}-cap {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  flex: none;
  overflow: hidden;
  width: 100%;
  font-weight: bold;
${switchDesign(design, {
c: `min-height: ${CssVar.size};`,
neumorphism: `
  border-radius: ${CssVar.bdr} ${CssVar.bdr} 0 0;
  box-shadow: ${CssPV.cvxSdS};
`})}
}
.${cn}-cap_prefix,
.${cn}-cap_suffix {
  box-sizing: border-box;
  position: relative;
  min-height: 0px;
  height: 50%;
}
.${cn}-cap_prefix {
  flex: none;
  ${switchDesign(design, {
fm: `
  border-top: 1.5px solid ${CssVar.bdc};
  border-left: 1.5px solid ${CssVar.bdc};
  border-radius: ${CssVar.bdr} 0 0 0;
  width: 10px;
`})}
}
.${cn}-cap_suffix {
  flex: 1;
${switchDesign(design, {
fm: `
  border-top: 1.5px solid ${CssVar.bdc};
  border-right: 1.5px solid ${CssVar.bdc};
  border-radius: 0 ${CssVar.bdr} 0 0;
  min-width: 10px;
`})}
}
.${cn}-cap_cont {
  padding: 0px 5px;
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: 0px;
  width: 100%;
${switchDesign(design, {
fm: `
  border-left: 1.5px solid ${CssVar.bdc};
  border-right: 1.5px solid ${CssVar.bdc};
  border-bottom: 1.5px solid ${CssVar.bdc};
  border-radius: 0 0 ${CssVar.bdr} ${CssVar.bdr};
`,
neumorphism: `
  box-shadow: ${CssPV.ccvSdS};
  border-radius: 0 0 ${CssVar.bdr} ${CssVar.bdr};
`})}
}
.${cn}-cont[data-padding="true"] {
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
${switchDesign(design, {
fm: `
${signalIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-cap > .${cn}-cap_prefix,
.${cn}${qs} > .${cn}-cap > .${cn}-cap_suffix,
.${cn}${qs} > .${cn}-cont {
  border-color: ${v.bdc};
}
.${cn}${qs} > .${cn}-cap {
  color: ${v.fc};
}
`).join("")}
`,
neumorphism: `
${signalIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-cap {
  background: ${v.head.bgc};
  color: ${v.head.fc};
}
`).join("")}`
})}
`}</JsxStyle>;

export default GroupBox;