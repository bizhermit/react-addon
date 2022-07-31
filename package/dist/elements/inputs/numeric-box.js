"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,n,t,r){void 0===r&&(r=t);var c=Object.getOwnPropertyDescriptor(n,t);c&&!("get"in c?!n.__esModule:c.writable||c.configurable)||(c={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,r,c)}:function(e,n,t,r){void 0===r&&(r=t),e[r]=n[t]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(n,e,t);return __setModuleDefault(n,e),n},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useNumericBox=void 0;const number_utils_1=__importStar(require("@bizhermit/basic-utils/dist/number-utils")),string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),value_1=__importDefault(require("../../hooks/value")),css_var_1=__importStar(require("../../styles/css-var")),input_style_1=__importStar(require("../../styles/input-style")),jsx_style_1=__importDefault(require("../../styles/jsx-style")),input_1=require("../../utils/input"),resizer_1=__importDefault(require("../resizer")),cn="bh-num",NumericBox=react_1.default.forwardRef(((e,n)=>{const t=(0,react_1.useRef)(),r=(0,react_1.useRef)(""),c=n=>e.$notThousandSeparator?String(n??""):(0,number_utils_1.numFormat)(n,{fpad:e.$float??0})??"",a=e=>{t.current&&(t.current.value=null==u?"":c(e))},{val:u,set:s,buf:i}=(0,value_1.default)(e,{mountEffect:a,bindEffect:a,stateEffect:e=>{document.activeElement!==t.current&&a(e)}}),o=(0,react_1.useRef)(u),l=n=>{if(string_utils_1.default.isEmpty(n))return o.current=void 0,"";let c=n,a=null;const u=e.$float??0;switch(e.$sign){case"only-positive":if(u>0){if(!new RegExp(`^[+-]?([0-9]*|0)(.[0-9]{0,${u}})?$`).test(n))return t.current.value=r.current;a=Number(n)}else{if(!/^[+-]?[0-9]*$/.test(n))return t.current.value=r.current;/^[+-]?[0-9]*|0$/.test(n)&&(a=Number(n))}break;case"only-negative":if(u>0){if(!new RegExp(`^[-]?([0-9]*|0)(.[0-9]{0,${u}})?$`).test(n))return t.current.value=r.current;a=Number(n)}else{if(!/^[-]?[0-9]*$/.test(n))return t.current.value=r.current;/^[-]?[0-9]*|0$/.test(n)&&(a=Number(n))}break;default:if(u>0){if(!new RegExp(`^[+-]?([0-9]*|0)(.[0-9]{0,${u}})?$`).test(n))return t.current.value=r.current;a=Number(n)}else{if(!/^[+-]?[0-9]*$/.test(n))return t.current.value=r.current;/^[+-]?[0-9]*|0$/.test(n)&&(a=Number(n))}}if(null!=a&&!isNaN(a)){let n=a;switch(null!=e.$max&&(n=Math.min(n,e.$max)),null!=e.$min&&(n=Math.max(n,e.$min)),e.$sign){case"only-positive":n=Math.max(0,n);break;case"only-negative":n=Math.min(0,n)}o.current=n,c=String(n),a!==n&&(t.current.value=c)}return r.current=c},d=n=>{const r=l(String((0,number_utils_1.add)(o.current??0,e.$incrementInterval??1)));!n||string_utils_1.default.isEmpty(r)?t.current.value=r:t.current.value=c(Number(r)),s.current(o.current)},$=n=>{const r=l(String((0,number_utils_1.minus)(o.current??0,e.$incrementInterval??1)));!n||string_utils_1.default.isEmpty(r)?t.current.value=r:t.current.value=c(Number(r)),s.current(o.current)},_=(0,react_1.useCallback)((e=>{e?d(!0):$(!0);let n=!0;const t=()=>{n=!1,window.removeEventListener("mouseup",t)};window.addEventListener("mouseup",t),setTimeout((()=>{const t=async()=>{setTimeout((()=>{n&&(e?d(!0):$(!0),t())}),30)};t()}),500)}),[]);return(0,react_1.useEffect)((()=>{e.$hook?._set({focus:()=>t.current.focus(),getValue:()=>i.current,setValue:e=>s.current(e)})}),[e.$hook?._set]),react_1.default.createElement("div",{...(0,input_1.inputFieldAttributes)(e,cn),ref:n,"data-v":null!=u,"data-round":e.$round},react_1.default.createElement("input",{ref:t,type:"text",className:`${input_style_1.inputCn}_fld ${cn}_fld`,tabIndex:e.tabIndex,inputMode:(e.$float??0)>0?"decimal":"numeric",disabled:e.$disabled,readOnly:e.$readOnly,max:e.$max,min:e.$min,required:e.$required,onKeyDown:n=>{switch(n.key){case"ArrowUp":if(e.$preventKeydownIncrement)return;e.$disabled||e.$readOnly||d();break;case"ArrowDown":if(e.$preventKeydownIncrement)return;e.$disabled||e.$readOnly||$();break;case"Enter":case"Tab":e.$disabled||e.$readOnly||s.current(o.current);break;case"Escape":t.current.value=r.current=String(number_utils_1.default.removeThousandsSeparator(c(o.current=i.current))??"")}},onChange:n=>{const c=n.currentTarget.value,a=e.$changing?.(c);!1!==a?l(c):t.current.value=r.current??""},onFocus:()=>{e.$readOnly||e.$readOnly||(t.current.value=r.current=t.current.value?.replace(/,/g,"")??"")},onBlur:()=>{s.current(o.current),t.current&&(t.current.value=c(o.current))},placeholder:e.placeholder,"data-align":e.$textAlign??"right",maxLength:16}),e.$hideButtons||e.$readOnly||e.$disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${cn}-btn`},react_1.default.createElement("div",{className:`${cn}-inc`,onMouseDown:()=>_(!0)}),react_1.default.createElement("div",{className:`${cn}-dec`,onMouseDown:()=>_(!1)})),e.$resize?react_1.default.createElement(resizer_1.default,{direction:"x"}):react_1.default.createElement(react_1.default.Fragment,null),input_style_1.default,Style)})),useNumericBox=()=>{const e=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{e.current.focus?.()}),[]),getValue:(0,react_1.useCallback)((()=>e.current.getValue?.()),[]),setValue:(0,react_1.useCallback)((n=>{e.current.setValue?.(n)}),[]),_set:(0,react_1.useCallback)((n=>{e.current=n}),[])}};exports.useNumericBox=useNumericBox;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn}_fld {\n  flex: 1;\n}\n.${cn}-btn {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: stretch;\n  width: calc(${css_var_1.default.size} * 0.8);\n  height: 100%;\n}\n.${cn}-inc, .${cn}-dec {\n  box-sizing: border-box;\n  position: relative;\n  flex: 1;\n  min-height: 0px;\n  cursor: pointer;\n${(0,css_var_1.switchDesign)(e,{fm:"border: 1px solid transparent;",flat:"transition: background 0.1s, border-color 0.1s;",material:"\n  transition: background 0.1s, box-shadow 0.1s, top 0.1s, border-color 0.1s;\n",neumorphism:`\n  box-shadow: ${css_var_1.CssPV.cvxSd};\n  background: ${css_var_1.default.bgc};\n  transition: background 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;\n`})}\n}\n.${cn}-inc {\n  border-radius: 0 ${css_var_1.default.bdr} 0 0;\n  z-index: 1;\n}\n.${cn}-dec {\n  border-radius: 0 0 ${css_var_1.default.bdr} 0;\n  z-index: 2;\n${(0,css_var_1.switchDesign)(e,{flat:"border-top: none;"})}\n}\n${(0,css_var_1.switchDesign)(e,{fm:`\n.${cn}-dec:not(:hover):not(:active) {\n  border-top: none;\n}`})}\n.${cn}-inc::before,\n.${cn}-dec::before {\n  ${css_var_1.CssPV.ba};\n  height: 40%;\n  width: 50%;\n  top: calc(25% + 1px);\n  left: 25%;\n  transition: background 0.1s;\n}\n.${cn}-inc::before {\n  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);\n}\n.${cn}-dec::before {\n  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);\n}\n${(0,css_var_1.switchDesign)(e,{fm:`\n${(0,css_var_1.signalIterator)(((n,t,r)=>`\n.${cn}${r} > .${cn}-btn > .${cn}-inc::before,\n.${cn}${r} > .${cn}-btn > .${cn}-dec::before {\n  background: ${t.fc};\n}\n.${cn}${r} > .${cn}-btn > .${cn}-inc:hover,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:hover {\n  background: ${t.btn.hvr.bgc};\n  border-color: ${t.btn.hvr.bdc};\n}\n.${cn}${r} > .${cn}-btn > .${cn}-inc:hover::before,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:hover::before {\n  background: ${t.btn.hvr.fc};\n}\n${(0,css_var_1.switchDesign)(e,{flat:`\n.${cn}${r} > .${cn}-btn > .${cn}-inc:active,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:active {\n  background: ${t.btn.act.bgc};\n  border-color: ${t.btn.act.bdc};\n}\n.${cn}${r} > .${cn}-btn > .${cn}-inc:active::before,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:active::before {\n  background: ${t.btn.act.fc};\n}`,material:`\n.${cn}${r} > .${cn}-btn > .${cn}-inc:active,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:active {\n  background: ${t.btn.hvr.bgc};\n  border-color: ${t.btn.hvr.bdc};\n}\n.${cn}${r} > .${cn}-btn > .${cn}-inc:active::before,\n.${cn}${r} > .${cn}-btn > .${cn}-dec:active::before {\n  background: ${t.btn.hvr.fc};\n}`})}\n`)).join("")}`,material:`\n.${cn} > .${cn}-btn > .${cn}-inc:hover,\n.${cn} > .${cn}-btn > .${cn}-dec:hover {\n  box-shadow: 0px 4px 4px -2px ${css_var_1.default.sdw.c};\n  z-index: 3;\n}\n.${cn} > .${cn}-btn > .${cn}-inc:active,\n.${cn} > .${cn}-btn > .${cn}-dec:active {\n  box-shadow: none;\n  margin-top: 1px;\n  margin-bottom: -1px;\n  z-index: 0;\n}`,neumorphism:`\n.${cn}-inc:hover,\n.${cn}-dec:hover {\n  box-shadow: ${css_var_1.CssPV.cvxSdD};\n}\n.${cn}-inc:active,\n.${cn}-dec:active {\n  box-shadow: ${css_var_1.CssPV.ccvSd};\n  top: 1px;\n}\n${(0,css_var_1.signalIterator)(((e,n,t)=>`\n.${cn}${t} > .${cn}-btn > .${cn}-inc::before,\n.${cn}${t} > .${cn}-btn > .${cn}-dec::before {\n  background: ${n.fc};\n}`)).join("")}\n`})}\n.${cn}[data-round="true"] > .${cn}_fld {\n  padding-left: calc(${css_var_1.default.size} / 2);\n}\n.${cn}[data-m="r"][data-round="true"] > .${cn}_fld,\n.${cn}[data-m="d"][data-round="true"] > .${cn}_fld {\n  padding-right: calc(${css_var_1.default.size} / 2);\n}\n.${cn}[data-round="true"] > .${cn}-btn {\n  width: ${css_var_1.default.size};\n}\n.${cn}[data-round="true"] > .${cn}-btn > .${cn}-inc {\n  border-top-right-radius: ${css_var_1.default.size};\n  border-top-left-radius: ${css_var_1.default.size};\n}\n.${cn}[data-round="true"] > .${cn}-btn > .${cn}-dec {\n  border-bottom-right-radius: ${css_var_1.default.size};\n  border-bottom-left-radius: ${css_var_1.default.size};\n}\n.${cn}[data-round="true"] > .${cn}-btn > .${cn}-inc::before,\n.${cn}[data-round="true"] > .${cn}-btn > .${cn}-dec::before {\n  width: 40%;\n  left: 30%;\n}\n`));exports.default=NumericBox;