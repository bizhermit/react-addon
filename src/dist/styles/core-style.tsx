import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React from "react";
import { iconCn, varIconBc, varIconFc } from "../elements/icon";
import CssVar, { colorIterator, CssDarkVar, CssPV, switchDesign, varAnchor } from "./css-var";
import JsxStyle from "./jsx-style";

export const sbCn = "bh-sb";
export const colorCn = "bh-color";

const CoreStyle =
<>
<JsxStyle id="bh-c_core" depsColor>{({ color }) => `
${color==="dark" ? ` :root {${CssDarkVar}}` : ""}
`}</JsxStyle>

<JsxStyle id="bh-d_core" depsDesign>{({ design }) => `
html {
  background: ${CssVar.bgc};
  color: ${CssVar.fgc};
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
${switchDesign(design, {
fm: `
${ArrayUtils.generateArray(10, idx => `
.bh-sd-${idx} {box-shadow: ${CssPV.cvxSd(idx)};}
.bh-sd-${idx}[data-hover="true"]:hover {box-shadow: ${CssPV.cvxSd(idx*1.5)};}
`).join("")}
${ArrayUtils.generateArray(10, idx => `
.bh-sd-n${idx} {box-shadow: ${CssPV.ccvSd(idx)};}
.bh-sd-n${idx}[data-hover="true"]:hover {box-shadow: ${CssPV.ccvSd(idx*1.5)};}
`).join("")}
`,
neumorphism: `
${ArrayUtils.generateArray(10, idx => `
.bh-sd-${idx} {box-shadow: ${CssPV.nCvxSd(idx)};}
.bh-sd-${idx}[data-hover="true"]:hover {box-shadow: ${CssPV.nCvxSd(idx*1.5)};}
`).join("")}
${ArrayUtils.generateArray(10, idx => `
.bh-sd-n${idx} {box-shadow: ${CssPV.nCcvSd(idx)};}
.bh-sd-n${idx}[data-hover="true"]:hover {box-shadow: ${CssPV.nCcvSd(idx*1.5)};}
`).join("")}
`})}
`}</JsxStyle>

<JsxStyle id="bh-core">{() => `
body {
  font-size: ${CssVar.fs};
}
a:not(:disabled),
.bh-anchor:not(:disabled),
.bh-anchor:not([data-disabled="true"]) {
  text-decoration: underline;
  cursor: pointer;
  color: ${CssVar.anchor} !important;
}
.bh-fto {
  flex: none;
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
${colorIterator((c, v) => `
.bh-c_${c}_base{
  color:${v.fgc};
  background:${v.bgc};
  ${varAnchor}:${v.anc};
  --bh-bdc:${v.bdc};
}
.bh-c_${c}_base .${iconCn}{
  ${varIconFc}:${v.fgc};
  ${varIconBc}:${v.bgc};
}
.bh-fgc_${c}_base{color:${v.fgc}}
.bh-fgc_${c}_base .${iconCn}{${varIconFc}:${v.fgc}}
.bh-bgc_${c}_base{background:${v.bgc};${varAnchor}:${v.anc}}
.bh-bgc_${c}_base .${iconCn}{${varIconBc}:${v.bgc}}
.bh-bdc_${c}_base{--bh-bdc:${v.bdc}}
.bh-c_${c}_head{
  color:${v.head.fgc};
  background:${v.head.bgc};
  ${varAnchor}:${v.head.anc};
  --bh-bdc:${v.head.bdc};
}
.bh-c_${c}_head .${iconCn}{
  ${varIconFc}:${v.head.fgc};
  ${varIconBc}:${v.head.bgc};
}
.bh-fgc_${c}_head{color:${v.head.fgc}}
.bh-fgc_${c}_head .${iconCn}{${varIconFc}:${v.head.fgc}}
.bh-bgc_${c}_head{background:${v.head.bgc};${varAnchor}:${v.head.anc}}
.bh-bgc_${c}_head .${iconCn}{${varIconBc}:${v.head.bgc}}
.bh-bdc_${c}_head{--bh-bdc:${v.head.bdc}}
.bh-c_${c}_nav{
  color:${v.nav.fgc};
  background:${v.nav.bgc};
  ${varAnchor}:${v.nav.anc};
  --bh-bdc:${v.nav.bdc};
}
.bh-c_${c}_nav .${iconCn}{
  ${varIconFc}:${v.nav.fgc};
  ${varIconBc}:${v.nav.bgc};
}
.bh-fgc_${c}_nav{color:${v.nav.fgc}}
.bh-fgc_${c}_nav .${iconCn}{${varIconFc}:${v.nav.fgc}}
.bh-bgc_${c}_nav{background:${v.nav.bgc};${varAnchor}:${v.nav.anc}}
.bh-bgc_${c}_nav .${iconCn}{${varIconBc}:${v.nav.bgc}}
.bh-bdc_${c}_nav{--bh-bdc:${v.nav.bdc}}
`).join("")}
${ArrayUtils.generateArray(10, idx => `
.bh-dsd-n${idx} {filter: ${CssPV.dropSd(idx)};}
.bh-dsd-n${idx}[data-hover="true"]:hover {filter: ${CssPV.dropSd(idx*1.5)};}
`).join("")}
${ArrayUtils.generateArray(10, (idx) => `.bh-pad-${idx} {padding:${idx*4}px}`).join("")}
`}</JsxStyle>
</>;

export default CoreStyle;