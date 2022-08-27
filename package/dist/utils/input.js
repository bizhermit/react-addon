"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.inputFieldAttributes=exports.inputAttributes=exports.inputMode=void 0;const input_style_1=require("../styles/input-style"),attributes_1=require("./attributes"),inputMode=(t,e)=>t.$disabled||e?.d?"d":t.$readOnly||e?.r?"r":"e";exports.inputMode=inputMode;const inputAttributes=(t,...e)=>{const r=(0,attributes_1.attributesWithoutChildren)(t,...e);return"tabIndex"in r&&delete r.tabIndex,r.className=`${input_style_1.inputCn} ${r.className??""}`,r["data-color"]=t.$color??"default",r["data-m"]=(0,exports.inputMode)(t),t.$placeholder&&(r["data-placeholder"]=t.$placeholder),r};exports.inputAttributes=inputAttributes;const inputFieldAttributes=(t,...e)=>{const r=(0,exports.inputAttributes)(t,...e);return r["data-t"]="f",r["data-border"]=t.$border??"round",r};exports.inputFieldAttributes=inputFieldAttributes;