"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(n,t,e,c){void 0===c&&(c=e);var r=Object.getOwnPropertyDescriptor(t,e);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[e]}}),Object.defineProperty(n,c,r)}:function(n,t,e,c){void 0===c&&(c=e),n[c]=t[e]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(n,t){Object.defineProperty(n,"default",{enumerable:!0,value:t})}:function(n,t){n.default=t}),__importStar=this&&this.__importStar||function(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var e in n)"default"!==e&&Object.prototype.hasOwnProperty.call(n,e)&&__createBinding(t,n,e);return __setModuleDefault(t,n),t},__importDefault=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useButton=exports.buttonCn=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),icon_1=__importStar(require("./icon")),label_1=__importDefault(require("./label")),cn="bh-btn";exports.buttonCn=cn;const Button=react_1.default.forwardRef(((n,t)=>{const e=(0,react_1.useRef)();(0,react_1.useImperativeHandle)(t,(()=>e.current));const[c,r]=(0,react_1.useState)(n.disabled??!1),a=n=>{r(!1),!0!==n&&e.current?.focus()};return(0,react_1.useEffect)((()=>{a(!0)}),[n.disabled]),(0,react_1.useEffect)((()=>{n.$hook?._set({focus:()=>e.current?.focus()})}),[n.$hook?._set]),react_1.default.createElement("button",{...(0,attributes_1.attributesWithoutChildren)(n,cn),ref:e,disabled:n.disabled||c,onClick:t=>{n.disabled||c||(n.$stopPropagation&&t.stopPropagation(),r(!0),(async()=>{const e=n.$click?.((n=>a(n)),t);null==e&&a(!0)})())},"data-size":n.$size??"m"},react_1.default.createElement("div",{className:`${cn}-body`,"data-color":n.$color,"data-round":n.$round,"data-content":null!=n.children,"data-icon":null!=n.$icon,"data-iconright":n.$iconRight,"data-filllabel":n.$fillLabel,"data-trp":(0,attributes_1.dBool)(n.$transparent),"data-bdl":n.$borderless},null==n.$icon?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(icon_1.default,{...string_utils_1.default.isString(n.$icon)?{$image:n.$icon}:n.$icon,$transition:!0}),string_utils_1.default.isString(n.children)?react_1.default.createElement(label_1.default,{className:`${cn}-lbl`},n.children):n.children),ButtonStyle)})),useButton=()=>{const n=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{n.current.focus?.()}),[]),_set:(0,react_1.useCallback)((t=>{n.current=t}),[])}};exports.useButton=useButton;const varBtnSize="--btn-size",btnSize="var(--btn-size)",ButtonStyle=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:n})=>`\n.${cn},\n.${cn}-body {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  flex: none;\n}\n.${cn} {\n  justify-content: stretch;\n  align-items: stretch;\n  background: transparent;\n  color: inherit;\n  border: none;\n  box-shadow: none;\n  cursor: pointer;\n  user-select: none;\n  overflow: visible;\n  padding: ${css_var_1.default.pdy} ${css_var_1.default.pdx};\n  min-height: calc(${btnSize} + ${css_var_1.default.pdy} * 2);\n  min-width: calc(${btnSize} + ${css_var_1.default.pdx} * 2);\n  font-size: var(${css_var_1.varFontSize});\n${(0,css_var_1.switchDesign)(n,{neumorphism:"background: inherit;"})}\n}\n${(0,css_var_1.sizeIterator)(cn,{xs:`--btn-size: calc(${css_var_1.default.size} * 0.75);${css_var_1.varFontSize}: 1.2rem;`,s:`--btn-size: calc(${css_var_1.default.size} * 0.9);${css_var_1.varFontSize}: 1.4rem;`,m:`--btn-size: ${css_var_1.default.size};${css_var_1.varFontSize}: 1.6rem;`,l:`--btn-size: calc(${css_var_1.default.size} * 1.2);${css_var_1.varFontSize}: 1.8rem;`,xl:`--btn-size: calc(${css_var_1.default.size} * 1.5);${css_var_1.varFontSize}: 2.0rem;`})}\n.${cn}-body {\n  justify-content: center;\n  align-items: center;\n  min-height: 100%;\n  width: 100%;\n  color: inherit;\n  border-radius: ${css_var_1.default.bdr};\n  overflow: hidden;\n${(0,css_var_1.switchDesign)(n,{flat:`\n  border: 1.5px solid ${css_var_1.default.bdc};\n  transition: background 0.1s, color 0.1s, border-color 0.1s;\n`,material:`\n  border: 1.5px solid ${css_var_1.default.bdc};\n  box-shadow: ${css_var_1.CssPV.cvxSdBase};\n  transition: background 0.1s, color 0.1s, box-shadow 0.1s, top 0.1s, border-color 0.1s;\n`,neumorphism:`\n  box-shadow: ${css_var_1.CssPV.nCvxSdBase};\n  transition: background 0.1s, color 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;\n`})}\n}\n.${cn}-body[data-iconright="true"] {\n  flex-direction: row-reverse;\n}\n.${cn}-body[data-icon="false"][data-content="true"],\n.${cn}-body[data-icon="true"][data-content="true"] {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n.${icon_1.iconCn} + .${cn}-lbl {\n  padding-left: 3px;\n}\n.${cn}-body[data-iconright="true"] > .${icon_1.iconCn} + .${cn}-lbl {\n  padding-right: 3px;\n}\n.${cn}-body[data-filllabel="true"] > .${cn}-lbl {\n  flex: 1;\n}\n.${cn}-body[data-round="true"] {\n  border-radius: calc(${btnSize} / 2 + 1px);\n}\n.${cn}:disabled {\n  ${css_var_1.CssPV.inactOpacity}\n  cursor: inherit;\n  pointer-events: none;\n}\n.${cn}-body > .${icon_1.iconCn} {\n  max-height: calc(${btnSize} - 4px);\n  max-width: calc(${btnSize}  - 4px);\n}\n${(0,css_var_1.switchDesign)(n,{flat:`\n.${cn}:hover > .${cn}-body {\n  background: ${css_var_1.default.hvrBgc};\n}\n.${cn}:hover:active > .${cn}-body {\n  background: ${css_var_1.default.actBgc};\n}\n${(0,css_var_1.colorIterator)(((n,t,e)=>`\n.${cn}-body${e} {\n  background: ${t.btn.base.bgc};\n  color: ${t.btn.base.fc};\n  border-color: ${t.btn.base.bdc};\n}\n.${cn}-body[data-trp="true"]${e} {\n  background: transparent;\n  color: ${t.fc};\n}\n.${cn}-body[data-trp="true"]${e}:not([data-bdl="true"]) {\n  border-color: ${t.btn.base.bdc};\n}\n.${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.base.fc};\n  --bh-icon-bc: ${t.btn.base.bgc};\n}\n.${cn}-body[data-trp="true"]${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.fc};\n}\n.${cn}:hover > .${cn}-body${e} {\n  background: ${t.btn.hvr.bgc};\n  color: ${t.btn.hvr.fc};\n  border-color: ${t.btn.hvr.bdc};\n}\n.${cn}:hover > .${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.hvr.fc};\n  --bh-icon-bc: ${t.btn.hvr.bgc};\n}\n.${cn}:hover:active > .${cn}-body${e} {\n  background: ${t.btn.act.bgc};\n  color: ${t.btn.act.fc};\n  border-color: ${t.btn.act.bdc};\n}\n.${cn}:hover:active > .${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.act.fc};\n  --bh-icon-bc: ${t.btn.act.bgc};\n}`)).join("")}\n.${cn}-body[data-bdl="true"] {\n  border-color: transparent;\n}`,material:`\n.${cn}:hover > .${cn}-body {\n  background: ${css_var_1.default.hvrBgc};\n}\n.${cn}-body[data-trp="true"] {\n  box-shadow: 0px 1px 2px ${css_var_1.default.sdw.d}, 1px 1px 2px ${css_var_1.default.sdw.d} inset;\n}\n${(0,css_var_1.colorIterator)(((n,t,e)=>`\n.${cn}-body${e} {\n  background: ${t.btn.base.bgc};\n  color: ${t.btn.base.fc};\n  border-color: ${t.btn.base.bdc};\n}\n.${cn}-body[data-trp="true"]${e} {\n  background: transparent;\n  color: ${t.fc};\n}\n.${cn}-body[data-trp="true"]${e}:not([data-bdl="true"]) {\n  border-color: ${t.btn.base.bdc};\n}\n.${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.base.fc};\n  --bh-icon-bc: ${t.btn.base.bgc};\n}\n.${cn}-body[data-trp="true"]${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.fc};\n}\n.${cn}:hover > .${cn}-body${e} {\n  background: ${t.btn.hvr.bgc};\n  color: ${t.btn.hvr.fc};\n  border-color: ${t.btn.hvr.bdc};\n}\n.${cn}:hover > .${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.hvr.fc};\n  --bh-icon-bc: ${t.btn.hvr.bgc};\n}`)).join("")}\n.${cn}:hover:active > .${cn}-body,\n.${cn}:disabled > .${cn}-body {\n  box-shadow: none;\n}\n.${cn}-body[data-bdl="true"] {\n  border-color: transparent;\n}\n.${cn}-body[data-bdl="true"][data-trp="true"] {\n  box-shadow: none;\n}\n.${cn}:hover > .${cn}-body {\n  box-shadow: ${css_var_1.CssPV.cvxSdHover};\n}`,neumorphism:`\n.${cn}-body[data-trp="true"] {\n  background: transparent;\n  box-shadow: 0 0 0px 1px ${css_var_1.default.bdc} inset, 0.5px 0.5px 2px ${css_var_1.default.sdw.d}, -0.5px -0.5px 2px ${css_var_1.default.sdw.b}, 1px 1px 2px ${css_var_1.default.sdw.d} inset, -1px -1px 2px ${css_var_1.default.sdw.b} inset;\n}\n.${cn}-body .${icon_1.iconCn} {\n  --bh-icon-bc: ${css_var_1.default.bgc};\n}\n.${cn}:hover > .${cn}-body,\n.${cn}:hover > .${cn}-body[data-trp="true"] {\n  background: inherit;\n  box-shadow: ${css_var_1.CssPV.nCvxSdHover};\n}\n.${cn}:hover:active > .${cn}-body {\n  box-shadow: ${css_var_1.CssPV.nCcvSdActive};\n}\n.${cn}:disabled > .${cn}-body {\n  box-shadow: ${css_var_1.CssPV.nCcvSdDisabled};\n}\n.${cn}:disabled > .${cn}-body[data-trp="true"] {\n  box-shadow: 0 0 0px 1px ${css_var_1.default.bdc} inset, ${css_var_1.CssPV.nCcvSdDisabled};\n}\n${(0,css_var_1.colorIterator)(((n,t,e)=>`\n.${cn}-body${e}[data-bdl="true"]:not([data-trp="true"]) {\n  background: ${t.btn.base.bgc};\n  color: ${t.btn.base.fc};\n}\n.${cn}-body${e}:not([data-trp="true"]) {\n  background: ${t.bgc};\n  color: ${t.fc};\n}\n.${cn}:hover > .${cn}-body${e},\n.${cn}:hover > .${cn}-body${e}[data-trp="true"] {\n  background: ${t.bgc};\n  color: ${t.fc};\n}\n.${cn}-body[data-trp="true"]${e} {\n  box-shadow: 0 0 0px 1px ${t.btn.base.bdc} inset, 0.5px 0.5px 2px ${css_var_1.default.sdw.d}, -0.5px -0.5px 2px ${css_var_1.default.sdw.b}, 1px 1px 2px ${css_var_1.default.sdw.d} inset, -1px -1px 2px ${css_var_1.default.sdw.b} inset;\n  color: ${t.fc};\n}\n.${cn}-body${e} .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.fc};\n}\n.${cn}-body${e}[data-bdl="true"]:not([data-trp="true"]):not(:hover) .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.btn.base.fc};\n  --bh-icon-bc: ${t.btn.base.bgc};\n}\n.${cn}-body${e}:not([data-trp="true"]) .${icon_1.iconCn} {\n  --bh-icon-bc: ${t.bgc};\n}\n.${cn}:disabled > .${cn}-body[data-trp="true"]${e} {\n  box-shadow: 0 0 0px 1px ${t.btn.base.bdc} inset, ${css_var_1.CssPV.nCcvSdDisabled};\n}`)).join("")}\n.${cn}-body[data-bdl="true"],\n.${cn}-body[data-bdl="true"][data-trp="true"] {\n  box-shadow: none;\n}`})}\n.${cn}-body[data-trp="true"] .${icon_1.iconCn} {\n  --bh-icon-bc: ${css_var_1.default.bgc};\n}\n.${cn}:disabled > .${cn}-body[data-bdl="true"] {\n  box-shadow: none !important;\n}\n`));exports.default=Button;