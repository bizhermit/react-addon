"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var u=Object.getOwnPropertyDescriptor(t,r);u&&!("get"in u?!t.__esModule:u.writable||u.configurable)||(u={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,u)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useTimeBox=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),time_1=__importStar(require("@bizhermit/time")),react_1=__importStar(require("react")),value_1=__importDefault(require("../../hooks/value")),css_var_1=__importStar(require("../../styles/css-var")),input_style_1=__importStar(require("../../styles/input-style")),jsx_style_1=__importDefault(require("../../styles/jsx-style")),input_1=require("../../utils/input"),icon_1=__importDefault(require("../icon")),popup_1=__importStar(require("../../popups/popup")),time_picker_1=__importStar(require("./time-picker")),cn="bh-tmb",TimeBox=react_1.default.forwardRef(((e,t)=>{const r=(0,react_1.useRef)();(0,react_1.useImperativeHandle)(t,(()=>r.current));const n=(0,react_1.useRef)(),u=(0,react_1.useRef)(),a=(0,react_1.useRef)(),c=e.$mode??"hm",l=(0,react_1.useRef)((()=>{if(e.$unit)return e.$unit;switch(c){case"h":return"hour";case"hm":return"minute";case"hms":return"second";default:return"millisecond"}})()),s=(0,time_picker_1.useTimePicker)(),i=(0,popup_1.usePopup)(),o=(0,react_1.useRef)({}),d=()=>{switch(c){case"hms":if(null!=o.current.h||null!=o.current.m||null!=o.current.s)return(new time_1.default).setHours(o.current.h??0).setMinutes(o.current.m??0).setSeconds(o.current.s??0);break;case"ms":if(null!=o.current.m||null!=o.current.s)return(new time_1.default).setMinutes(o.current.m??0).setSeconds(o.current.s??0);break;case"h":if(null!=o.current.h)return(new time_1.default).setHours(o.current.h);break;default:if(null!=o.current.h||null!=o.current.m)return(new time_1.default).setHours(o.current.h??0).setMinutes(o.current.m??0)}},_=e=>{const t=(e=>{if(null!=e)return"string"==typeof e?new time_1.default(e):new time_1.default(time_1.TimeUtils.convertUnitToMilliseconds(e,l.current))})(e);if(null==t)return n.current&&(n.current.value=""),u.current&&(u.current.value=""),a.current&&(a.current.value=""),void(o.current={});n.current?n.current.value=String(o.current.h=t.getHours()):o.current.h=0,u.current?u.current.value=String(o.current.m=t.getMinutes()):o.current.m=0,a.current?a.current.value=String(o.current.s=t.getSeconds()):o.current.s=0},{val:m,set:f,buf:p}=(0,value_1.default)(e,{effect:_}),h=()=>{e.$disabled||e.$readOnly||i.show({anchor:r.current})},$=()=>{i.hide(),a.current?a.current.focus():u.current?u.current.focus():n.current&&n.current.focus()},g=()=>{const t=d();if(null==t)_(void 0),f.current(void 0);else if("string"===e.$dataType)f.current(t.format());else f.current(time_1.TimeUtils.convertMillisecondsToUnit(t.getTime(),l.current))},v=()=>{null==o.current.h&&(o.current.h=0),null==o.current.m&&(o.current.m=0),null==o.current.s&&(o.current.s=0);const e=d();_(time_1.TimeUtils.convertMillisecondsToUnit(e.getTime(),l.current))};return(0,react_1.useEffect)((()=>{_(m)}),[c]),(0,react_1.useEffect)((()=>{e.$hook?._set({focus:()=>{n.current?n.current.focus():u.current?u.current.focus():a.current&&a.current.focus()},getValue:()=>p.current,setValue:e=>f.current(e),showPicker:()=>i.show({anchor:r.current})})}),[e.$hook?._set,c]),react_1.default.createElement("div",{...(0,input_1.inputFieldAttributes)(e,cn),ref:r,"data-v":null!=m},react_1.default.createElement("div",{className:`${input_style_1.inputCn}_fld ${cn}_fld`,onBlur:e=>{e.relatedTarget!==n.current&&e.relatedTarget!==u.current&&e.relatedTarget!==a.current&&g()}},"hm"===c||"hms"===c||"h"===c?react_1.default.createElement("input",{className:`${cn}-h`,ref:n,readOnly:e.$readOnly||e.$notInputText,disabled:e.$disabled,maxLength:2,onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?(o.current.h=""===t?void 0:Number(t),2===t.length&&u.current?.focus()):n.current.value=String(o.current.h??""));var t},onKeyDown:t=>{switch(t.key){case"F2":h();break;case"Enter":g();break;case"ArrowUp":null!=o.current.h&&(o.current.h+=e.$hourInterval??1),v();break;case"ArrowDown":null!=o.current.h&&(o.current.h-=e.$hourInterval??1),v();break;case"Tab":if(e.$disabled||e.$readOnly)return;"h"===c||t.shiftKey?g():t.stopPropagation()}},onFocus:e=>e.currentTarget.select()}):react_1.default.createElement(react_1.default.Fragment,null),"hm"===c||"hms"===c?react_1.default.createElement("span",{className:`${cn}-sep`},":"):react_1.default.createElement(react_1.default.Fragment,null),"hm"===c||"hms"===c||"ms"===c?react_1.default.createElement("input",{className:`${cn}-m`,ref:u,readOnly:e.$readOnly||e.$notInputText,disabled:e.$disabled,maxLength:2,onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?(o.current.m=""===t?void 0:Number(t),2===t.length&&a.current?.focus()):u.current.value=String(o.current.m??""));var t},onKeyDown:t=>{switch(t.key){case"F2":h();break;case"Enter":g();break;case"Backspace":0===t.currentTarget.value.length&&n.current?.focus();break;case"ArrowUp":null!=o.current.m&&(o.current.m+=e.$minuteInterval??1),v();break;case"ArrowDown":null!=o.current.m&&(o.current.m-=e.$minuteInterval??1),v();break;case"Tab":if(e.$disabled||e.$readOnly)return;"hms"===c||"hm"===c&&t.shiftKey||"ms"===c&&!t.shiftKey?t.stopPropagation():g()}},onFocus:e=>e.currentTarget.select()}):react_1.default.createElement(react_1.default.Fragment,null),"hms"===c||"ms"===c?react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("span",{className:`${cn}-sep`},":"),react_1.default.createElement("input",{className:`${cn}-s`,ref:a,readOnly:e.$readOnly||e.$notInputText,disabled:e.$disabled,maxLength:2,onChange:e=>{return t=e.currentTarget.value,void(isNumericOrEmpty(t)?o.current.s=""===t?void 0:Number(t):a.current.value=String(o.current.s??""));var t},onKeyDown:t=>{switch(t.key){case"F2":h();break;case"Enter":g();break;case"Backspace":0===t.currentTarget.value.length&&u.current?.focus();break;case"ArrowUp":null!=o.current.s&&(o.current.s+=e.$secondInterval??1),v();break;case"ArrowDown":null!=o.current.s&&(o.current.s-=e.$secondInterval??1),v();break;case"Tab":if(e.$disabled||e.$readOnly)return;t.shiftKey?t.stopPropagation():g()}},onFocus:e=>e.currentTarget.select()})):react_1.default.createElement(react_1.default.Fragment,null)),e.$hidePickerButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${input_style_1.inputCn}_btn`,tabIndex:-1,onClick:()=>h()},react_1.default.createElement(icon_1.default,{$image:"clock",$transition:!0})),e.$hideClearButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${input_style_1.inputCn}_btn`,tabIndex:-1,onClick:()=>{_(void 0),f.current(void 0)}},react_1.default.createElement(icon_1.default,{$image:"cross",$transition:!0})),react_1.default.createElement(popup_1.default,{$hook:i,$position:{x:"inner",y:"outer"},$showed:()=>{s.focus(),s.scrollToCurrent()}},react_1.default.createElement(time_picker_1.default,{$hook:s,$mode:e.$mode,$dataType:e.$dataType,$value:m,$border:"less",$clickNegative:()=>{$()},$clickPositive:e=>{f.current(e),$()},onClick:e=>e.stopPropagation()})),input_style_1.default,Style)})),isNumericOrEmpty=e=>!!string_utils_1.default.isEmpty(e)||/^[0-9]+$/.test(e),useTimeBox=()=>{const e=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{e.current.focus?.()}),[]),getValue:(0,react_1.useCallback)((()=>e.current.getValue?.()),[]),setValue:(0,react_1.useCallback)((t=>{e.current.setValue?.(t)}),[]),showPicker:(0,react_1.useCallback)((()=>{e.current.showPicker?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useTimeBox=useTimeBox;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn},(()=>`\n.${input_style_1.inputCn}.${cn} {\n  width: unset;\n}\n.${cn}_fld {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  height: 100%;\n  min-width: 0px;\n}\n.${cn} input {\n  text-align: center;\n  flex: none;\n  padding-left: 0px;\n  padding-right: 0px;\n}\n.${cn}-h,\n.${cn}-m,\n.${cn}-s {\n  width: 28px;\n}\n.${cn}-sep {\n  padding-top: 2px;\n  font-size: calc(${css_var_1.default.fs} * 0.9);\n  opacity: 0;\n}\n.${cn}[data-m="e"]:focus-within > .${cn}_fld > .${cn}-sep,\n.${cn}[data-v="true"] > .${cn}_fld > .${cn}-sep {\n  opacity: 1;\n}\n`));exports.default=TimeBox;