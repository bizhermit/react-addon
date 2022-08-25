import React from "react";
import { buttonCn } from "../elements/button";
import { iconCn } from "../elements/icon";
import CssVar, { CssPV, colorIterator, switchDesign } from "./css-var";
import JsxStyle from "./jsx-style";

export const inputCn = "bh-ipt";

export type InputBorder = "less" | "under" | "round";

const InputStyle = <JsxStyle id={inputCn} depsDesign>{({ design }) => `
.${inputCn} {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: flex-end;
  flex: none;
  overflow: visible;
  width: 160px;
${switchDesign(design, {
_: `
  padding: 0px;
  height: ${CssVar.size};
  min-height: ${CssVar.size};
  min-width: ${CssVar.size};
`,
c: `
  padding: ${CssVar.pdy} ${CssVar.pdx};
  height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
  min-width: calc(${CssVar.size} + ${CssVar.pdx} * 2);
`})}
}
.${inputCn}[data-placeholder] {
${switchDesign(design, {
_: `
  padding-top: ${CssVar.phsize};
  height: calc(${CssVar.size} + ${CssVar.phsize});
`,
c: `
  padding-top: calc(${CssVar.pdy} + ${CssVar.phsize});
  height: calc(${CssVar.size} + ${CssVar.pdy} * 2 + ${CssVar.phsize});
`})}
}
.${inputCn}[data-t="f"]::before {
  ${CssPV.ba}
  transition: border 0.1s;
  z-index: 0;
${switchDesign(design, {
_: `
  bottom: ${CssVar.pdy};
  left: ${CssVar.pdx};
  width: calc(100% - ${CssVar.pdx} * 2);
`,
fm: `
  bottom: ${CssVar.pdy};
  left: ${CssVar.pdx};
  width: calc(100% - ${CssVar.pdx} * 2);
  height: calc(100% - ${CssVar.pdy} * 2);
`,
neumorphism: `
  bottom: ${CssVar.pdy};
  left: ${CssVar.pdx};
  width: calc(100% - ${CssVar.pdx} * 2);
  height: calc(100% - ${CssVar.pdy} * 2);
  border-radius: ${CssVar.bdr};
  box-shadow: ${CssPV.ccvSd};
`})}
}
.${inputCn}[data-t="f"][data-round="true"]::before {
  border-radius: calc(${CssVar.size} / 2) !important;
}
.${inputCn}[data-placeholder][data-t="f"]::before {
${switchDesign(design, {
_: `height: calc(100% - ${CssVar.phsize});`,
c: `height: calc(100% - ${CssVar.pdy} * 2 - ${CssVar.phsize});`,
})}
}
.${inputCn}[data-placeholder]::after {
  ${CssPV.ba}
  top: calc(${CssVar.pdy} + ${CssVar.phsize} + 5px);
  left: calc(${CssVar.pdx} + 5px);
  content: attr(data-placeholder);
  background: transparent;
  opacity: 0.4;
  z-index: 0;
  white-space: nowrap;
  transition: left 0.3s, top 0.3s, font-size 0.3s, padding 0.3s, opacity 0.3s;
}
.${inputCn}[data-placeholder][data-round="true"]::after {
  left: calc(${CssVar.pdx} + ${CssVar.size} / 2);
}
.${inputCn}[data-placeholder]:not([data-v])::after {
  visibility: hidden;
}
.${inputCn}[data-placeholder]:focus-within::after,
.${inputCn}[data-placeholder][data-v="true"]::after,
.${inputCn}[data-placeholder][data-m="d"]::after,
.${inputCn}[data-placeholder][data-m="r"]::after,
.${inputCn}[data-placeholder]:not([data-v])::after {
  top: 0px;
  left: ${CssVar.pdx};
  font-size: 1.2rem;
  opacity: 1;
  visibility: visible;
}
.${inputCn} input,
.${inputCn} textarea {
  box-sizing: border-box;
  border: none;
  background: transparent;
  color: inherit;
  padding: 2px 5px 0px 5px;
  height: 100%;
  max-width: 100%;
  min-width: 0px;
  font-size: inherit;
  outline: none;
  z-index: 1;
  resize: none;
}
.${inputCn} textarea {
  padding-top: 8px;
  padding-bottom: 3px;
}
.${inputCn} input[data-align="center"],
.${inputCn} textarea[data-align="center"] {
  text-align: center;
}
.${inputCn} input[data-align="right"],
.${inputCn} textarea[data-align="right"] {
  text-align: right;
}
${colorIterator((_s, v, qs) => `
.${inputCn}${qs}::after {
  color: ${v.fc};
}
.${inputCn}${qs} input::placeholder,
.${inputCn}${qs} textarea::placeholder {
  color: ${v.fc};
  opacity: 0.4;
}`).join("")}
${switchDesign(design, {
fm: `
.${inputCn}_fld {
  border-radius: ${CssVar.bdr};
}
.${inputCn}[data-t="f"][data-border="round"]::before {
  border-radius: ${CssVar.bdr};
}
${colorIterator((_s, v, qs) => `
.${inputCn}${qs}[data-t="f"][data-border="under"]::before {
  border-bottom: 1px solid ${v.ipt.bdc};
  border-right: 1px solid transparent !important;
  border-left: 1px solid transparent !important;
  border-top: 1px solid transparent !important;
}
.${inputCn}${qs}[data-t="f"][data-border="round"]::before {
  border: 1px solid ${v.ipt.bdc};
}
.${inputCn}${qs} .${inputCn}_fld {
  color: ${v.ipt.fc};
}
.${inputCn}${qs}[data-t="f"]::before {
  background: ${v.ipt.bgc};
}
.${inputCn}${qs} > .${inputCn}-resize_x,
.${inputCn}${qs} > .${inputCn}-resize_y,
.${inputCn}${qs} > .${inputCn}-resize_xy {
  border-color: ${v.ipt.bdc};
}`).join("")}
.${inputCn}[data-v][data-m="e"][data-border="under"]:focus-within::before {
  border-bottom-width: 3px;
  border-bottom-style: double;
}
.${inputCn}[data-v][data-m="e"][data-border="round"]:focus-within::before {
  border-width: 3px;
  border-style: double;
}`,
neumorphism: `
.${inputCn}[data-m="r"]::before {
  box-shadow: ${CssPV.ccvSdS};
}`})}
.${inputCn}[data-m="d"]::before {
  display: none;
}
.${inputCn}[data-t="f"][data-m="r"]::before {
  background: transparent;
}
.${inputCn} > .${buttonCn} {
  margin: 0px calc(${CssVar.pdy} * -1) calc(${CssVar.pdx} * -1);
  z-index: 10;
}
.${inputCn} > .${buttonCn}:not(:last-child) > .${buttonCn}-body:not([data-round="true"]) {
  border-radius: 0px;
}
.${inputCn} > .${buttonCn}:last-child > .${buttonCn}-body:not([data-round="true"]) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.${inputCn}_btn {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  height: ${CssVar.size};
  width: ${CssVar.size};
  overflow: visible;
  cursor: pointer;
  z-index: 3;
${switchDesign(design, {
fm: `border: 1px solid transparent;`,
flat: `transition: background 0.1s, border-color 0.1s;`,
material: `transition: background 0.1s, box-shadow 0.1s, top 0.1s, border-color 0.1s;`,
neumorphism: `
  box-shadow: ${CssPV.cvxSd};
  background: ${CssVar.bgc};
  transition: background 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;
`})}
}
.${inputCn}_btn[data-border] {
  border-color: ${CssVar.default.ipt.bdc};
${switchDesign(design, {
material: `box-shadow: 0px 3px 4px -2px ${CssVar.sdw.c};`,
})}
}
.${inputCn}_btn[data-disabled="true"] {
  cursor: not-allowed !important;
  opacity: 0.3 !important;
}
.${inputCn}_btn + .${inputCn}_btn {
  border-left: none;
}
.${inputCn}_btn:last-child {
  border-radius: 0 ${CssVar.bdr} ${CssVar.bdr} 0;
}
.${inputCn}_btn[data-round="true"] {
  border-radius: calc(${CssVar.size} / 2);
}
${switchDesign(design, {
fm: `
${colorIterator((_s, v, qs) => `
.${inputCn}${qs} .${inputCn}_btn {
  color: ${v.fc};
}
.${inputCn}${qs} .${inputCn}_btn[data-border] {
  background: ${v.ipt.bgc};
  border-color: ${v.ipt.bdc};
}
.${inputCn}${qs} .${inputCn}_btn > .${iconCn} {
  --bh-icon-fc: ${v.fc};
  --bh-icon-bc: ${v.ipt.bgc};
}
.${inputCn}${qs} .${inputCn}_btn:hover {
  background: ${v.btn.hvr.bgc};
  border-color: ${v.btn.hvr.bdc};
  color: ${v.btn.hvr.fc};
}
.${inputCn}${qs} .${inputCn}_btn:hover > .${iconCn} {
  --bh-icon-fc: ${v.btn.hvr.fc};
  --bh-icon-bc: ${v.btn.hvr.bgc};
}
${switchDesign(design, {
flat: `
.${inputCn}${qs} .${inputCn}_btn:hover:active {
  background: ${v.btn.act.bgc};
  border-color: ${v.btn.act.bdc};
  color: ${v.btn.act.fc};
}
.${inputCn}${qs} .${inputCn}_btn:hover:active > .${iconCn} {
  --bh-icon-fc: ${v.btn.act.fc};
  --bh-icon-bc: ${v.btn.act.bgc};
}
`})}
`).join("")}`,
material: `
.${inputCn}_btn:hover {
  box-shadow: ${CssPV.cvxSdD};
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
}
.${inputCn}_btn:hover:active {
  margin-top: 1px;
  margin-bottom: -1px;
  box-shadow: none;
}`,
neumorphism: `
.${inputCn}_btn:hover {
  box-shadow: ${CssPV.cvxSdD};
}
.${inputCn}_btn:hover:active {
  top: 1px;
  box-shadow: ${CssPV.ccvSd};
}
.${inputCn} .${buttonCn}-body,
.${inputCn} .${buttonCn}:hover > .${buttonCn}-body {
  background: ${CssVar.bgc} !important;
}
${colorIterator((_s, v, qs) => `
.${inputCn}${qs} .${inputCn}_btn {
  color: ${v.fc};
  background: ${v.ipt.bgc};
}
.${inputCn}${qs} .${inputCn}_btn > .${iconCn} {
  --bh-icon-fc: ${v.fc};
  --bh-icon-bc: ${v.ipt.bgc};
}`).join("")
}`})}
.${inputCn}-hidden {
  height: 0px !important;
  width: 0px !important;
  opacity: 0 !important;
  visibility: hidden !important;
  user-select: none !important;
  padding: unset !important;
  margin: unset !important;
  z-index: -1;
}
`}</JsxStyle>;

export default InputStyle;