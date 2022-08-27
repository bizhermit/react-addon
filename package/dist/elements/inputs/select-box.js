"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var l=Object.getOwnPropertyDescriptor(t,r);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,l)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useSelectBox=void 0;const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importStar(require("react")),source_1=__importDefault(require("../../hooks/source")),value_1=__importStar(require("../../hooks/value")),input_style_1=__importStar(require("../../styles/input-style")),jsx_style_1=__importDefault(require("../../styles/jsx-style")),input_1=require("../../utils/input"),icon_1=__importDefault(require("../icon")),list_view_1=__importStar(require("../list/list-view")),popup_1=__importStar(require("../../popups/popup")),resizer_1=__importDefault(require("../resizer")),css_var_1=__importDefault(require("../../styles/css-var")),cn="bh-slb",SelectBox=react_1.default.forwardRef(((e,t)=>{const r=e.$labelDataName||"label",a=e.$valueDataName||"value",l=(0,react_1.useRef)();(0,react_1.useImperativeHandle)(t,(()=>l.current));const u=(0,react_1.useRef)(),n=(0,popup_1.usePopup)(),i=(0,react_1.useRef)(),c=(0,react_1.useRef)((0,list_view_1.listViewDefaultRowHeight)()),s=(0,list_view_1.useListView)(),{loading:o,source:d}=(0,source_1.default)(e.$source,{changeSource:e=>{u.current&&(u.current.value=e.find((e=>(0,value_1.equalValue)(e[a],m.current)))?.[r]??"")},preventSourceMemo:e.$preventSourceMemo}),_=e=>{o||u.current&&(u.current.value=d.find((t=>(0,value_1.equalValue)(t[a],e)))?.[r]??"")},{val:f,set:p,buf:m}=(0,value_1.default)(e,{setChangeCtx:e=>{const t=d.find((t=>(0,value_1.equalValue)(t[a],e.before))),r=d.find((t=>(0,value_1.equalValue)(t[a],e.after)));return{...e,beforeData:t,afterData:r}},effect:e=>{_(e)}}),[h,g]=(0,react_1.useState)(null),$=t=>{if(e.$disabled||e.$readOnly)return;const r=l.current.getBoundingClientRect(),u=Math.max(document.body.clientHeight-r.bottom,r.top)-5+"px";n.show({anchor:l.current,showed:()=>{i.current&&(setTimeout((()=>{s.select(s.getFilteredItems().findIndex((e=>(0,value_1.equalValue)(e.data[a],m.current))))}),50),t&&s.focus())},style:{maxHeight:u,width:l.current.offsetWidth+"px"}})},v=e=>{const t=u.current.value,l=d.find((e=>e[r]===t));(e||l)&&p.current(l?.[a])},y=e=>{if(e.relatedTarget===u.current||e.relatedTarget===i.current)return;const t=i.current?.childNodes;if(t)for(const r of t)if(r===e.relatedTarget)return;e.currentTarget===u.current&&v(),n.hide(),_(m.current)};(0,react_1.useEffect)((()=>{n.isShowed()&&s.setFilter(h)}),[h]);const b=(0,react_1.useCallback)((e=>{if(!n.isShowed())return;const t=n.getElement();t&&(t.style.height=Math.ceil(c.current*e.length)+"px"),n.reposition()}),[]);return(0,react_1.useEffect)((()=>{e.$hook?._set({focus:()=>u.current?.focus(),getValue:()=>m.current,setValue:e=>p.current(e)})}),[e.$hook?._set]),react_1.default.createElement("div",{...(0,input_1.inputFieldAttributes)(e,cn),ref:l,"data-v":null!=f,"data-round":e.$round},react_1.default.createElement("input",{ref:u,type:"text",className:`${input_style_1.inputCn}_fld ${cn}_fld`,tabIndex:e.tabIndex,disabled:e.$disabled,readOnly:e.$readOnly||e.$notInputText,placeholder:e.placeholder,"data-align":e.$textAlign??"left",onChange:e=>{const t=e.currentTarget.value;string_utils_1.default.isEmpty(t)&&g(null),g((()=>e=>string_utils_1.default.contains(e[r],t)))},onFocus:e=>{if(e.relatedTarget){if(e.relatedTarget===u.current||e.relatedTarget===i.current)return;const t=i.current?.childNodes;if(t)for(const r of t)if(r===e.relatedTarget)return}g(null),$()},onBlur:y,onKeyDown:t=>{if("ArrowDown"!==t.key&&"ArrowUp"!==t.key)return"Escape"===t.key?(n.hide(),void _(m.current)):"F2"===t.key?(g(null),void $(!0)):void("Enter"===t.key&&v(!0));e.$disabled||e.$readOnly||s?.focus()}}),e.$disabled||e.$readOnly?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`${input_style_1.inputCn}_btn`,tabIndex:-1,"data-round":e.$round,onClick:()=>{g(null),$(!0)}},react_1.default.createElement(icon_1.default,{$image:"pull-down",$transition:!0})),e.$resize?react_1.default.createElement(resizer_1.default,{direction:"x"}):react_1.default.createElement(react_1.default.Fragment,null),e.$disabled||e.$readOnly?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(popup_1.default,{$hook:n,$position:{x:"inner",y:"outer"},$preventClickClose:!0,$showed:()=>{const e=n.getElement();e&&(e.style.height=Math.ceil(c.current*d.length)+"px")}},react_1.default.createElement(list_view_1.default,{ref:i,$hook:s,$fto:"f",$columns:[{name:r,width:10,fill:!0,cellTextAlign:e.$textAlign}],$items:d,$options:{clickCell:e=>{p.current(e.data[a]),n.hide(),u.current.focus()},header:!1,footer:!1,rowNumber:!1,enterIsClick:!0,filtered:b},$preventOptionsMemo:!0,onBlur:y,onKeyDown:e=>{"Escape"===e.key&&u.current.focus()},className:`${cn}-list`,style:{height:d.length*c.current,maxHeight:"100%"}})),input_style_1.default,Style)})),useSelectBox=()=>{const e=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{e.current.focus?.()}),[]),getValue:(0,react_1.useCallback)((()=>e.current.getValue?.()),[]),setValue:(0,react_1.useCallback)((t=>e.current.setValue?.(t)),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useSelectBox=useSelectBox;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn},(()=>`\n.${cn}_fld {\n  flex: 1;\n}\n.${cn}-list .${list_view_1.listViewCn}-cell {\n  cursor: pointer;\n}\n.${cn}[data-round="true"] > .${cn}_fld {\n  padding-left: calc(${css_var_1.default.size} / 2);\n}\n.${cn}[data-m="r"][data-round="true"] > .${cn}_fld,\n.${cn}[data-m="d"][data-round="true"] > .${cn}_fld {\n  padding-right: calc(${css_var_1.default.size} / 2);\n}`));exports.default=SelectBox;