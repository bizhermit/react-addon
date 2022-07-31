"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useAccordionContainer=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),core_style_1=require("../styles/core-style"),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),dom_1=require("../utils/dom"),icon_1=__importStar(require("./icon")),label_1=__importDefault(require("./label")),cn="bh-acd",defaultAnimationInterval=10,defaultAnimationDuration=200,AccordionContainer=react_1.default.forwardRef(((e,t)=>{const r=(0,react_1.useRef)();(0,react_1.useImperativeHandle)(t,(()=>r.current));const n=(0,react_1.useRef)(),[a,s]=(0,react_1.useState)(e.$close??!0!==e.$defaultClose),o=(0,react_1.useRef)(a),c=(0,react_1.useRef)(a||1==e.$defaultClose),i=t=>{if(e.$disabled)return;const r=t??!a;r&&(o.current=!0),s(r)};return(0,react_1.useEffect)((()=>{e.$hook?._set({open:()=>s(!0),close:()=>s(!1),toggle:()=>s((e=>!e))})}),[e.$hook?._set]),(0,react_1.useEffect)((()=>{let t=!0;if(n.current){const s=Math.max(Math.floor(Math.max(e.$animationDuration??200,1)/10),1);if(a){r.current.style.removeProperty("height"),null!=e.$height&&(r.current.style.maxHeight=r.current.style.height="number"==typeof e.$height?e.$height+"px":e.$height),n.current.style.visibility="hidden",n.current.style.overflow="hidden",n.current.style.removeProperty("display");const o=n.current.offsetHeight,i=Math.max(1,Math.floor(o/s));n.current.style.height=n.current.style.maxHeight=n.current.style.minHeight="0px",n.current.style.removeProperty("visibility");const d=()=>{n.current.style.removeProperty("overflow"),n.current.style.removeProperty("height"),n.current.style.removeProperty("max-height"),n.current.style.removeProperty("min-height"),r.current.style.removeProperty("max-height"),e.$height&&(r.current.style.height="number"==typeof e.$height?e.$height+"px":e.$height),e.$toggled?.(a)};if(c.current)d(),c.current=!1;else{let e=0;const r=async()=>{t&&(e+=i,e>o?d():(n.current.style.height=n.current.style.maxHeight=n.current.style.minHeight=`${e}px`,setTimeout(r,10)))};r()}}else{const o=()=>{n.current.style.removeProperty("overflow"),n.current.style.removeProperty("height"),n.current.style.removeProperty("max-height"),n.current.style.removeProperty("min-height"),n.current.style.display="none",n.current.style.visibility="hidden",r.current.style.height="auto !important",e.$toggled?.(a)};if(c.current)o(),c.current=!1;else{n.current.style.removeProperty("display");const e=n.current.offsetHeight,a=Math.max(1,Math.floor(e/s));n.current.style.overflow="hidden",n.current.style.removeProperty("visibility"),n.current.style.height=n.current.style.maxHeight=n.current.style.minHeight=`${e}px`,r.current.style.removeProperty("height");let c=e;const i=async()=>{t&&(c-=a,c<0?o():(n.current.style.height=n.current.style.maxHeight=n.current.style.minHeight=`${c}px`,setTimeout(i,10)))};i()}}}return()=>{t=!1}}),[a]),react_1.default.createElement("div",{...(0,attributes_1.attributesWithoutChildren)(e,cn,(0,attributes_1.ftoCn)(e.$fto)),ref:r,tabIndex:void 0,"data-signal":e.$signal,"data-opened":a,"data-disabled":e.$disabled,"data-borderless":e.$borderless},react_1.default.createElement("div",{className:`${cn}-header`,tabIndex:e.$disabled?null:e.tabIndex??0,onClick:()=>i(),onKeyDown:e=>(0,dom_1.pressPositiveKey)(e,(()=>i())),"data-iconpos":e.$iconPosition},e.$disabled||"none"===e.$iconPosition?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(icon_1.default,{$image:a?e.$openedIconImage??"pull-up":e.$closedIconImage??"pull-down"}),string_utils_1.default.isString(e.$header)?react_1.default.createElement(label_1.default,{className:`${cn}-lbl`},e.$header):e.$header),react_1.default.createElement("div",{ref:n,className:`${cn}-body ${core_style_1.sbCn}`,style:{display:e.$defaultClose?"none":void 0}},e.children),Style)})),useAccordionContainer=()=>{const e=(0,react_1.useRef)({});return{open:(0,react_1.useCallback)((()=>{e.current.open?.()}),[]),close:(0,react_1.useCallback)((()=>{e.current.close?.()}),[]),toggle:(0,react_1.useCallback)((()=>{e.current.toggle?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useAccordionContainer=useAccordionContainer;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex: none;\n  overflow: visible;\n  background: inherit;\n  color: inherit;\n}\n.${cn}-body {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex: 1;\n  min-height: 0px;\n  width: 100%;\n  z-index: 0;\n${(0,css_var_1.switchDesign)(e,{c:`border-radius: 0 0 ${css_var_1.default.bdr} ${css_var_1.default.bdr};`,fm:`\n  border-left: 1px solid ${css_var_1.default.bdc};\n  border-bottom: 1px solid ${css_var_1.default.bdc};\n  border-right: 1px solid ${css_var_1.default.bdc};\n`,neumorphism:`box-shadow: ${css_var_1.CssPV.ccvSd};`})}\n}\n.${cn}-header {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  overflow: visible;\n  width: 100%;\n  z-index: 1;\n  font-weight: bold;\n  min-height: ${css_var_1.default.size};\n  padding: 0px ${css_var_1.default.pdx};\n${(0,css_var_1.switchDesign)(e,{c:`border-radius: ${css_var_1.default.bdr};`,fm:`\n  background: inherit;\n  color: inherit;\n  border: 1px solid ${css_var_1.default.bdc};\n`,flat:"transition: background 0.1s, color 0.1s;",material:"transition: background 0.1s, color 0.1s, box-shadow 0.1s, top 0.1s;",neumorphism:`\n  box-shadow: ${css_var_1.CssPV.cvxSd};\n  transition: background 0.1s, color 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;\n`})}\n}\n.${cn}-header[data-iconpos="right"] {\n  flex-flow: row-reverse nowrap;\n}\n.${cn}:not([data-disabled="true"]) > .${cn}-header {\n  cursor: pointer;\n  user-select: none;\n}\n.${cn}[data-opened="true"] > .${cn}-header {\n  border-radius: ${css_var_1.default.bdr} ${css_var_1.default.bdr} 0 0;\n}\n${(0,css_var_1.switchDesign)(e,{fm:`\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {\n  background: ${css_var_1.default.hvrBgc};\n}\n${(0,css_var_1.switchDesign)(e,{flat:`\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {\n  background: ${css_var_1.default.actBgc};\n}`})}\n${(0,css_var_1.signalIterator)(((t,r,n)=>`\n.${cn}${n} > .${cn}-header {\n  background: ${r.btn.base.bgc};\n  color: ${r.btn.base.fc};\n}\n.${cn}${n} > .${cn}-header .${icon_1.iconCn} {\n  --bh-icon-fc: ${r.btn.base.fc};\n  --bh-icon-bc: ${r.btn.base.bgc};\n}\n.${cn}${n}:not([data-disabled="true"]) > .${cn}-header:hover {\n  background: ${r.btn.hvr.bgc};\n  color: ${r.btn.hvr.fc};\n  border-color: ${r.btn.hvr.bdc};\n}\n.${cn}${n}:not([data-disabled="true"]) > .${cn}-header:hover .${icon_1.iconCn} {\n  --bh-icon-fc: ${r.btn.hvr.fc};\n  --bh-icon-bc: ${r.btn.hvr.bgc};\n}\n${(0,css_var_1.switchDesign)(e,{flat:`\n.${cn}${n}:not([data-disabled="true"]) > .${cn}-header:hover:active {\n  background: ${r.btn.act.bgc};\n  color: ${r.btn.act.fc};\n  border-color: ${r.btn.act.bdc};\n}\n.${cn}${n}:not([data-disabled="true"]) > .${cn}-header:hover:active .${icon_1.iconCn} {\n  --bh-icon-fc: ${r.btn.act.fc};\n  --bh-icon-bc: ${r.btn.act.bgc};\n}`})}\n.${cn}${n} > .${cn}-body {\n  border-color: ${r.bdc};\n}\n`)).join("")}\n.${cn}[data-borderless="true"] > .${cn}-body {\n  border: unset;\n  border-radius: unset;\n}\n.${cn}[data-borderless="true"] > .${cn}-header {\n  border-radius: ${css_var_1.default.bdr};\n}`,material:`\n.${cn}:not([data-disabled="true"]) > .${cn}-header {\n  box-shadow: 0px 3px 4px -2px ${css_var_1.default.sdw.c};\n}\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {\n  box-shadow: 0px 4px 4px -2px ${css_var_1.default.sdw.c};\n}\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {\n  top: 1px;\n  box-shadow: unset;\n}`,neumorphism:`\n.${cn}:not([data-disabled="true"]) > .${cn}-header {\n  box-shadow: ${css_var_1.CssPV.cvxSd};\n}\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {\n  box-shadow: ${css_var_1.CssPV.cvxSdD};\n}\n.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {\n  box-shadow: ${css_var_1.CssPV.ccvSd};\n  margin-top: 1px;\n  margin-bottom: -1px;\n}\n.${cn}[data-borderless="true"] > .${cn}-header {\n  border-radius: ${css_var_1.default.bdr};\n}\n.${cn}[data-borderless="true"] > .${cn}-body {\n  box-shadow: unset;\n  border-radius: unset;\n}\n${(0,css_var_1.signalIterator)(((e,t,r)=>`\n.${cn}${r} > .${cn}-header {\n  color: ${t.fc};\n}\n.${cn}${r} > .${cn}-header .${icon_1.iconCn} {\n  --bh-icon-fc: ${t.fc};\n}\n`)).join("")}\n`})}\n`));exports.default=AccordionContainer;