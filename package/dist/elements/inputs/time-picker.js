"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var c=Object.getOwnPropertyDescriptor(t,n);c&&!("get"in c?!t.__esModule:c.writable||c.configurable)||(c={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,c)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useTimePicker=void 0;const time_1=__importStar(require("@bizhermit/time")),react_1=__importStar(require("react")),value_1=__importDefault(require("../../hooks/value")),core_style_1=require("../../styles/core-style"),css_var_1=__importStar(require("../../styles/css-var")),input_style_1=__importStar(require("../../styles/input-style")),jsx_style_1=__importDefault(require("../../styles/jsx-style")),input_1=require("../../utils/input"),label_1=__importDefault(require("../label")),cn="bh-tmp",TimePicker=react_1.default.forwardRef(((e,t)=>{const n=(0,react_1.useRef)(),r=(0,react_1.useRef)(),c=(0,react_1.useRef)(),a=(0,react_1.useRef)(),[s,l]=(0,react_1.useState)(0),u=e.$disabled||e.$readOnly,o=e.$mode??"hm",i=(0,react_1.useRef)((()=>{if(e.$unit)return e.$unit;switch(o){case"h":return"hour";case"hm":return"minute";case"hms":return"second";default:return"millisecond"}})()),d=e=>null==e?new time_1.default:"string"==typeof e?new time_1.default(e):new time_1.default(time_1.TimeUtils.convertUnitToMilliseconds(e,i.current)),{set:_,buf:f}=(0,value_1.default)(e,{effect:e=>{$.current=d(e),b($.current.getHours()),h($.current.getMinutes()),g($.current.getSeconds()),l((e=>e+1))}}),$=(0,react_1.useRef)(d(f.current)),[m,b]=(0,react_1.useState)($.current.getHours()),[p,h]=(0,react_1.useState)($.current.getMinutes()),[v,g]=(0,react_1.useState)($.current.getSeconds()),y=()=>{let t;if("string"===e.$dataType)_.current(t=$.current.format());else _.current(t=time_1.TimeUtils.convertMillisecondsToUnit($.current.getTime(),i.current));e.$clickPositive&&setTimeout((()=>{e.$clickPositive(t)}),0),l((e=>e+1))},x=(0,react_1.useMemo)((()=>{const t=[];if("hm"===o||"hms"===o||"h"===o){const n=e.$hourInterval??1;for(let e=0;e<24;e++)e%n==0&&t.push(react_1.default.createElement("div",{key:e,className:`${cn}-cell`,"data-selected":e===m,onClick:u?void 0:()=>{$.current.setHours(e),b(e)},onDoubleClick:u?void 0:()=>{$.current.setHours(e),b(e),y()}},`00${e}`.slice(-2)))}return t}),[m,o,u]),w=(0,react_1.useMemo)((()=>{const t=[];if("hm"===o||"hms"===o||"ms"===o){const n=e.$minuteInterval??1;for(let e=0;e<60;e++)e%n==0&&t.push(react_1.default.createElement("div",{key:e,className:`${cn}-cell`,"data-selected":e===p,onClick:u?void 0:()=>{$.current.setMinutes(e),h(e)},onDoubleClick:u?void 0:()=>{$.current.setMinutes(e),h(e),y()}},`00${e}`.slice(-2)))}return t}),[p,o,u]),k=(0,react_1.useMemo)((()=>{const t=[];if("hms"===o||"ms"===o){const n=e.$secondInterval??1;for(let e=0;e<60;e++)e%n==0&&t.push(react_1.default.createElement("div",{key:e,className:`${cn}-cell`,"data-selected":e===v,onClick:u?void 0:()=>{$.current.setSeconds(e),g(e)},onDoubleClick:u?void 0:()=>{$.current.setSeconds(e),g(e),y()}},`00${e}`.slice(-2)))}return t}),[v,o,u]);return(0,react_1.useEffect)((()=>{setTimeout((()=>{const e=`.${cn}-cell[data-selected="true"]`;if(r.current){const t=r.current?.querySelector(e);t&&(r.current.scrollTop=t.offsetTop-(r.current.clientHeight-t.offsetHeight)/2)}if(c.current){const t=c.current?.querySelector(e);t&&(c.current.scrollTop=t.offsetTop-(c.current.clientHeight-t.offsetHeight)/2)}if(a.current){const t=a.current?.querySelector(e);t&&(a.current.scrollTop=t.offsetTop-(a.current.clientHeight-t.offsetHeight)/2)}}),0)}),[s,o,u]),(0,react_1.useEffect)((()=>{e.$hook?._set({focus:()=>n.current?.focus(),getValue:()=>f.current,setValue:e=>_.current(e),scrollToCurrent:()=>l((e=>e+1))})}),[e.$hook?._set]),react_1.default.createElement("div",{...(0,input_1.inputAttributes)(e,cn),ref:t,"data-mode":o,"data-border":e.$border??"round"},react_1.default.createElement("div",{className:`${cn}-body`,ref:n,tabIndex:e.tabIndex??0},"hm"===o||"hms"===o||"h"===o?react_1.default.createElement("div",{className:`${cn}-h ${core_style_1.sbCn}`,ref:r},x):react_1.default.createElement(react_1.default.Fragment,null),"hm"===o||"hms"===o?react_1.default.createElement("span",{className:`${cn}-sep`},":"):react_1.default.createElement(react_1.default.Fragment,null),"hm"===o||"hms"===o||"ms"===o?react_1.default.createElement("div",{className:`${cn}-m ${core_style_1.sbCn}`,ref:c},w):react_1.default.createElement(react_1.default.Fragment,null),"hms"===o||"ms"===o?react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("span",{className:`${cn}-sep`},":"),react_1.default.createElement("div",{className:`${cn}-s ${core_style_1.sbCn}`,ref:a},k)):react_1.default.createElement(react_1.default.Fragment,null)),u?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${cn}-btns`},react_1.default.createElement("div",{className:`${input_style_1.inputCn}_btn ${cn}-btn_lbl`,onClick:()=>{$.current=d(f.current),b($.current.getHours()),h($.current.getMinutes()),g($.current.getSeconds()),e.$clickNegative?.(),l((e=>e+1))},tabIndex:0,"data-border":!0},e.$negativeButtonLabel??react_1.default.createElement(label_1.default,null,"キャンセル")),react_1.default.createElement("div",{className:`${input_style_1.inputCn}_btn ${cn}-btn_lbl`,onClick:y,tabIndex:0,"data-border":!0},e.$positiveButtonLabel??react_1.default.createElement(label_1.default,null,"OK"))),input_style_1.default,Style)})),useTimePicker=()=>{const e=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{e.current.focus?.()}),[]),getValue:(0,react_1.useCallback)((()=>e.current.getValue?.()),[]),setValue:(0,react_1.useCallback)((t=>{e.current.setValue?.(t)}),[]),scrollToCurrent:(0,react_1.useCallback)((()=>{e.current.scrollToCurrent?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useTimePicker=useTimePicker;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${input_style_1.inputCn}.${cn} {\n  flex-direction: column;\n  height: calc(${css_var_1.default.size} * 9);\n  width: calc(${css_var_1.default.size} * 6);\n  user-select: none;\n}\n.${cn}[data-mode="hms"] {\n  width: calc(${css_var_1.default.size} * 9);\n}\n.${cn}[data-mode="hm"],\n.${cn}[data-mode="ms"] {\n  width: calc(${css_var_1.default.size} * 7);\n}\n.${cn}[data-mode="h"] {\n  width: calc(${css_var_1.default.size} * 6);\n}\n.${cn}-body {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: 1;\n  min-height: 0px;\n  width: 100%;\n  overflow: visible;\n  outline: none;\n}\n.${cn}[data-m="e"] > .${cn}-body {\n  border-radius: ${css_var_1.default.bdr} ${css_var_1.default.bdr} 0 0;\n}\n.${cn}[data-m="r"] > .${cn}-body,\n.${cn}[data-m="d"] > .${cn}-body {\n  border-radius: ${css_var_1.default.bdr};\n}\n.${cn}-btns {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  width: 100%;\n}\n.${cn}-btn_lbl {\n  flex: 1;\n}\n.${cn}-btn_lbl:first-child {\n  border-radius: ${css_var_1.default.bdr} 0 0 ${css_var_1.default.bdr};\n}\n.${cn}-sep {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  white-space: nowrap;\n  flex: none;\n  height: ${css_var_1.default.size};\n}\n.${cn}-h,\n.${cn}-m,\n.${cn}-s {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  height: 100%;\n  min-width: 0px;\n  flex: 1;\n${(0,css_var_1.switchDesign)(e,{neumorphism:`padding: 0 ${css_var_1.default.pdx};`})}\n}\n.${cn}-cell {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  flex: none;\n  padding-top: 2px;\n  white-space: nowrap;\n  border-radius: ${css_var_1.default.bdr};\n  height: ${css_var_1.default.size};\n  width: 100%;\n${(0,css_var_1.switchDesign)(e,{fm:"transition: background 0.1s, color 0.1s;",neumorphism:"transition: background 0.1s, color 0.1s, box-shadow 0.1s;"})}\n}\n.${cn}-cell:first-child {\n  margin-top: calc(${css_var_1.default.size} * 3.5);\n}\n.${cn}-cell:last-child {\n  margin-bottom: calc(${css_var_1.default.size} * 3.5);\n}\n.${cn}-cell:hover {\n  background: ${css_var_1.default.hvrBgc};\n}\n.${cn}-cell:hover:active {\n  background: ${css_var_1.default.actBgc};\n}\n.${cn}[data-m="e"] > .${cn}-body > .${cn}-h > .${cn}-cell,\n.${cn}[data-m="e"] > .${cn}-body > .${cn}-m > .${cn}-cell,\n.${cn}[data-m="e"] > .${cn}-body > .${cn}-s > .${cn}-cell {\n  cursor: pointer;\n}\n${(0,css_var_1.switchDesign)(e,{fm:`\n.${cn}[data-m="e"][data-border="round"] > .${cn}-btns > .${cn}-btn_lbl {\n  border-top: none;\n  border-top-left-radius: 0px;\n  border-top-right-radius: 0px;\n}\n${(0,css_var_1.colorIterator)(((e,t,n)=>`\n.${cn}${n} > .${cn}-body {\n  color: ${t.ipt.fc};\n}\n.${cn}${n}[data-m="e"] > .${cn}-body {\n  background: ${t.ipt.bgc};\n}\n.${cn}${n}[data-m="e"][data-border="round"] > .${cn}-body,\n.${cn}${n}[data-m="r"][data-border="round"] > .${cn}-body {\n  border: 1px solid ${t.ipt.bdc};\n}\n.${cn}${n} > .${cn}-body > .${cn}-h > .${cn}-cell[data-selected="true"],\n.${cn}${n} > .${cn}-body > .${cn}-m > .${cn}-cell[data-selected="true"],\n.${cn}${n} > .${cn}-body > .${cn}-s > .${cn}-cell[data-selected="true"] {\n  background: ${t.ipt.on};\n  color: ${t.ipt.on_fc??t.ipt.fc};\n}\n`)).join("")}`,neumorphism:`\n.${cn}-cell[data-selected="true"] {\n  box-shadow: ${css_var_1.CssPV.nCcvSdActive};\n}\n.${cn}[data-m="r"] .${cn}-cell[data-selected="true"], \n.${cn}[data-m="d"] .${cn}-cell[data-selected="true"] {\n  box-shadow: ${css_var_1.CssPV.nCcvSdDisabled};\n}\n${(0,css_var_1.colorIterator)(((e,t,n)=>`\n.${cn}${n} > .${cn}-body {\n  color: ${t.ipt.fc};\n}\n.${cn}${n}[data-m="e"] > .${cn}-body {\n  background: ${t.ipt.bgc};\n}\n.${cn}${n} > .${cn}-body > .${cn}-h > .${cn}-cell[data-selected="true"],\n.${cn}${n} > .${cn}-body > .${cn}-m > .${cn}-cell[data-selected="true"],\n.${cn}${n} > .${cn}-body > .${cn}-s > .${cn}-cell[data-selected="true"] {\n  background: ${t.ipt.on};\n  color: ${t.ipt.on_fc??t.ipt.fc};\n}\n`)).join("")}`})}\n`));exports.default=TimePicker;