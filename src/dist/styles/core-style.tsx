import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React from "react";
import { iconCn, varIconBc, varIconFc } from "../elements/icon";
import { labelCn } from "../elements/label";
import CssVar, { colorIterator, CssDarkVar, CssPV, switchDesign } from "./css-var";
import JsxStyle from "./jsx-style";

export const sbCn = "bh-sb";
export const colorCn = "bh-color";
export const shadowCn = "bh-shadow";
export const paddingCn = "bh-padding";

const CoreStyle =
<JsxStyle id="bh-core" depsColor depsDesign>{({ color, design }) => `
html {
  background: ${CssVar.bgc};
  color: ${CssVar.fc};
  font-size: 62.5%;
${switchDesign(design, {
flat: `
--bh-bdr: 2px;
--bh-pdx: 3px;
--bh-pdy: 3px;
`,
material: `
--bh-bdr: 2px;
--bh-pdx: 4px;
--bh-pdy: 4px;
`,
neumorphism: `
--bh-bdr: 5px;
--bh-pdx: 5px;
--bh-pdy: 5px;
`,
})}
}
body {
  font-size: ${CssVar.fs};
}
a:not(:disabled),
.bh-anchor:not([data-disabled="true"]) {
  text-decoration: underline;
  cursor: pointer;
  color: ${CssVar.anchor} !important;
}
.bh-fto-f {
  height: 100%;
  width: 100%;
  flex: none;
}
.bh-fto-fx {
  flex: 1;
  height: 100%;
  min-width: 0px;
}
.bh-fto-fy {
  flex: 1;
  width: 100%;
  min-height: 0px;
}
.bh-fto-y {
  height: 100%;
}
.bh-fto-x {
  width: 100%;
}
.${sbCn} {
  overflow: auto;
  overflow: overlay;
}
.${sbCn}::-webkit-scrollbar {
  border-radius: 2px;
  background: transparent;
  height: 4px;
  width: 4px;
}
.${sbCn}:hover::-webkit-scrollbar {
  height: ${CssVar.sb.size};
  width: ${CssVar.sb.size};
}
.${sbCn}::-webkit-scrollbar:hover {
  background: ${CssVar.sb.bgc};
}
.${sbCn}::-webkit-scrollbar-track-piece,
.${sbCn}::-webkit-scrollbar-track,
.${sbCn}::-webkit-scrollbar-corner {
  background: transparent;
}
.${sbCn}::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: ${CssVar.sb.thumb.bgc};
  border: 1px solid ${CssVar.sb.bgc};
}
.${sbCn}:hover::-webkit-scrollbar-thumb {
  background: ${CssVar.sb.thumb.hvr_cont_bgc};
}
.${sbCn}::-webkit-scrollbar-thumb:hover {
  background: ${CssVar.sb.thumb.hvr_bgc};
}
.${sbCn}::-webkit-scrollbar-thumb:active {
  background: ${CssVar.sb.thumb.act_bgc};
}
@media (max-width: 640px) {
:root[data-bh-touch="true"] {
  --bh-size: 40px;
}
:root[data-bh-touch="true"] .${sbCn} {
  --bh-sb-size: 3px;
  overflow: overlay;
}
:root[data-bh-touch="true"] .${sbCn}::-webkit-scrollbar {
  background: transparent;
}
:root[data-bh-touch="true"] .${sbCn}::-webkit-scrollbar-thumb {
  opacity: 0.9;
}
}
${color==="dark" ? ` :root {${CssDarkVar}}` : ""}
${colorIterator((c, v, qs) => `
.${colorCn}${qs} {
  background: ${v.bgc};
  color: ${v.fc};
}
.${colorCn}${qs}[data-border="true"] {
  border: 1px solid ${v.bdc};
}
.${colorCn}${qs} .${iconCn} {
  ${varIconBc}: ${v.bgc};
  ${varIconFc}: ${v.fc};
}
.${colorCn}${qs}[data-colortype="head"] {
  background: ${v.head.bgc};
  color: ${v.head.fc};
}
.${colorCn}${qs}[data-colortype="head"][data-border="true"] {
  border-color: ${v.head.bdc};
}
.${colorCn}${qs}[data-colortype="head"] .${iconCn} {
  ${varIconBc}: ${v.head.bgc};
  ${varIconFc}: ${v.head.fc};
}
.${colorCn}${qs}[data-colortype="nav"] {
  background: ${v.nav.bgc};
  color: ${v.nav.fc};
}
.${colorCn}${qs}[data-colortype="nav"] .${iconCn} {
  ${varIconBc}: ${v.nav.bgc};
  ${varIconFc}: ${v.nav.fc};
}
.${colorCn}${qs}[data-colortype="nav"] .${labelCn}[data-type="a"],
.${colorCn}${qs}[data-colortype="nav"] .bh-anchor {
  color: ${v.nav.anchor};
}
.${colorCn}[data-border="${c}"] {
  border: 1px solid ${v.bdc};
}
.${colorCn}[data-border="${c}"][data-colortype="head"] {
  border: 1px solid ${v.head.bdc};
}
`).join("")}
${switchDesign(design, {
fm: `
.${shadowCn}[data-shadow="true"] {
  box-shadow: ${CssPV.cvxSdBase};
}
.${shadowCn}[data-hover="true"] {
  transition: box-shadow 0.1s;
}
${ArrayUtils.generateArray(10, idx => `
.${shadowCn}[data-shadow="${idx}"] {
  box-shadow: ${CssPV.cvxSd(idx)};
}
.${shadowCn}[data-shadow="${idx}"][data-hover="true"]:hover {
  box-shadow: ${CssPV.cvxSd(idx*1.5)};
}`).join("")}
${ArrayUtils.generateArray(10, idx => `
.${shadowCn}[data-shadow="-${idx}"] {
  box-shadow: ${CssPV.ccvSd(idx)};
}
.${shadowCn}[data-shadow="-${idx}"][data-hover="true"]:hover {
  box-shadow: ${CssPV.ccvSd(idx*1.5)};
}`).join("")}
`,
neumorphism: `
.${shadowCn}[data-shadow="true"] {
  box-shadow: ${CssPV.nCvxSdBase};
}
.${shadowCn}[data-hover="true"] {
  transition: box-shadow 0.1s;
}
${ArrayUtils.generateArray(10, idx => `
.${shadowCn}[data-shadow="${idx}"] {
  box-shadow: ${CssPV.nCvxSd(idx)};
}
.${shadowCn}[data-shadow="${idx}"][data-hover="true"]:hover {
  box-shadow: ${CssPV.nCvxSd(idx*1.5)};
}`).join("")}
${ArrayUtils.generateArray(10, idx => `
.${shadowCn}[data-shadow="-${idx}"] {
  box-shadow: ${CssPV.nCcvSd(idx)};
}
.${shadowCn}[data-shadow="-${idx}"][data-hover="true"]:hover {
  box-shadow: ${CssPV.nCcvSd(idx*1.5)};
}`).join("")}
`})}
.${paddingCn}[data-padding="true"] {
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
${ArrayUtils.generateArray(10, (idx) => `.${paddingCn}[data-padding="${idx}"] {padding:${4*idx}px}`).join("")}
`}</JsxStyle>;

export default CoreStyle;