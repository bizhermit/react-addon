"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,n){void 0===n&&(n=a);var l=Object.getOwnPropertyDescriptor(t,a);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,n,l)}:function(e,t,a,n){void 0===n&&(n=a),e[n]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useCalendar=void 0;const datetime_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/datetime-utils")),react_1=__importStar(require("react")),react_2=require("react"),react_3=require("react"),core_style_1=require("../styles/core-style"),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),button_1=__importDefault(require("./button")),date_box_1=__importDefault(require("./inputs/date-box")),row_1=__importDefault(require("./row")),cn="bh-cal",weekTextsJa=["日","月","火","水","木","金","土"],weekTextsEn=["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."],Calendar=react_1.default.forwardRef(((e,t)=>{const[a,n]=(0,react_1.useState)(datetime_utils_1.default.getFirstDateAtMonth(datetime_utils_1.default.removeTime(datetime_utils_1.default.convert(e.$defaultDate??new Date),!0))),l=(0,react_3.useRef)(a),r=(0,react_1.useMemo)((()=>null==e.$weekTexts||"ja"===e.$weekTexts?weekTextsJa:"en"===e.$weekTexts?weekTextsEn:7!==e.$weekTexts.length?weekTextsJa:e.$weekTexts),[e.$weekTexts]),c=(0,react_1.useMemo)((()=>{const t=[];for(let a=0;a<7;a++){const n=(a+(e.$startWeek??0))%7;t.push(react_1.default.createElement("div",{key:n,className:`${cn}-cell`,"data-week":n},r[n]))}return t}),[r,e.$startWeek]),s=(0,react_1.useMemo)((()=>{const t=[];let n=new Date(a.getFullYear(),a.getMonth()+1,0);const l=n.getDate();n.setDate(1),n.setMonth(a.getMonth()),n.setFullYear(a.getFullYear());const r=n.getDay(),c=e.$startWeek??0;n.setDate(0);const s=n.getDate();let u=(r-c+7)%7||7;7===u&&(u-=7);let i=n.getFullYear(),_=n.getMonth(),d=-1;for(let a=0,n=u;a<n;a++)d=s-u+a+1,t.push(react_1.default.createElement("div",{...e.children.props,key:`${i}${_}${d}`,className:`${cn}-cell ${core_style_1.sbCn}`},(0,react_1.cloneElement)(e.children,{$$date:new Date(i,_,d),$$currentYM:!1})));i=a.getFullYear(),_=a.getMonth();for(let a=0,n=l;a<n;a++)d=a+1,t.push(react_1.default.createElement("div",{key:`${i}${_}${d}`,className:`${cn}-cell ${core_style_1.sbCn}`},(0,react_1.cloneElement)(e.children,{$$date:new Date(i,_,d),$$currentYM:!0})));n=new Date(a.getFullYear(),a.getMonth()+1,1),i=n.getFullYear(),_=n.getMonth(),u=7-t.length%7,7===u&&(u-=7);for(let a=0,n=u;a<n;a++)d=a+1,t.push(react_1.default.createElement("div",{...e.children.props,key:`${i}${_}${d}`,className:`${cn}-cell ${core_style_1.sbCn}`},(0,react_1.cloneElement)(e.children,{$$date:new Date(i,_,d),$$currentYM:!1})));return t}),[a,e.$startWeek,e.children]);return(0,react_2.useEffect)((()=>{const t=l.current;l.current=a,e.$changed?.({before:t,after:a})}),[a]),(0,react_2.useEffect)((()=>{e.$hook?._set({getDate:()=>l.current,setDate:e=>{n(datetime_utils_1.default.getFirstDateAtMonth(datetime_utils_1.default.removeTime(datetime_utils_1.default.convert(e??new Date),!0)))}})}),[e.$hook?._set]),react_1.default.createElement("div",{...(0,attributes_1.attributesWithoutChildren)(e,cn,(0,attributes_1.ftoCn)(e.$fto)),ref:t},react_1.default.createElement(row_1.default,{$center:!0,$fill:!0},e.$disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(button_1.default,{$icon:e.$prevYearButtonIcon??"pull-left-d",$signal:e.$signal,$click:()=>{n(datetime_utils_1.default.getPrevYearDate(a))}}),react_1.default.createElement(button_1.default,{$icon:e.$prevMonthButtonIcon??"pull-left",$signal:e.$signal,$click:()=>{n(datetime_utils_1.default.getPrevMonthDate(a))}})),react_1.default.createElement(date_box_1.default,{$mode:"ym",$hideClearButton:!0,$dataType:"date",$value:a,$dispatch:n,$disabled:e.$disabled,$signal:e.$signal}),e.$disabled?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(button_1.default,{$icon:e.$nextMonthButtonIcon??"pull-right",$signal:e.$signal,$click:()=>{n(datetime_utils_1.default.getNextMonthDate(a))}}),react_1.default.createElement(button_1.default,{$icon:e.$nextYearButtonIcon??"pull-right-d",$signal:e.$signal,$click:()=>{n(datetime_utils_1.default.getNextYearDate(a))}}))),react_1.default.createElement("div",{className:`${cn}-body`},react_1.default.createElement("div",{className:`${cn}-w`},c),react_1.default.createElement("div",{className:`${cn}-d`,"data-rows":s.length/7},s)),Style)})),useCalendar=()=>{const e=(0,react_3.useRef)({});return{setDate:(0,react_1.useCallback)((t=>{e.current.setDate?.(t)}),[]),getDate:(0,react_1.useCallback)((()=>e.current.getDate?.()),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useCalendar=useCalendar;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.${cn}-body {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  flex: 1;\n  min-height: 0px;\n}\n.${cn}-cell {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  flex: none;\n  width: 14.285%;\n}\n.${cn}-w {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  height: ${css_var_1.default.size};\n}\n.${cn}-w > .${cn}-cell {\n  padding-top: 3px;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n${(0,css_var_1.switchDesign)(e,{c:`\n.${cn}-w > .${cn}-cell[data-week="0"] {\n  background: ${css_var_1.default.week.sun.bgc};\n  color: ${css_var_1.default.week.sun.fc};\n}\n.${cn}-w > .${cn}-cell[data-week="6"] {\n  background: ${css_var_1.default.week.sat.bgc};\n  color: ${css_var_1.default.week.sat.fc};\n}\n.${cn}-w > .${cn}-cell:first-child {\n  border-top-left-radius: ${css_var_1.default.bdr};\n}\n.${cn}-w > .${cn}-cell:last-child {\n  border-top-right-radius: ${css_var_1.default.bdr};\n}`})}\n.${cn}-d {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  flex: 1;\n  min-height: 0px;\n}\n.${cn}-d > .${cn}-cell {\n  justify-content: flex-start;\n  align-items: flex-start;\n  height: 16.666%;\n}\n.${cn}-d[data-rows="5"] > .${cn}-cell {\n  height: 20%;\n}\n.${cn}-d[data-rows="4"] > .${cn}-cell {\n  height: 25%;\n}\n`));exports.default=Calendar;