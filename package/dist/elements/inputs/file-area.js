"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,n)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useFileArea=void 0;const number_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/number-utils")),react_1=__importStar(require("react")),css_var_1=__importStar(require("../../styles/css-var")),input_style_1=__importStar(require("../../styles/input-style")),jsx_style_1=__importDefault(require("../../styles/jsx-style")),attributes_1=require("../../utils/attributes"),dom_1=require("../../utils/dom"),input_1=require("../../utils/input"),icon_1=require("../icon"),label_1=__importDefault(require("../label")),resizer_1=__importDefault(require("../resizer")),cn="bh-fla",FileArea=react_1.default.forwardRef(((e,t)=>{const r=(0,react_1.useRef)(),a=(0,react_1.useRef)(),n=(0,react_1.useRef)([]),[c,s]=(0,react_1.useState)({size:0,count:0}),i=(0,react_1.useCallback)((()=>{let e=0,t=0;for(const r of n.current)e=number_utils_1.default.add(r.size,e),t++;s({size:e,count:t}),a.current.value=""}),[]);return(0,react_1.useEffect)((()=>{const t=e.$changed?.({files:[...n.current],...c});t&&(n.current=[],c.count=0,c.size=0)}),[c]),(0,react_1.useEffect)((()=>{e.$hook?._set({focus:()=>r.current.focus(),getValue:()=>n.current,setValue:e=>{n.current=[],e.forEach((e=>{n.current.push(e)})),i()},clear:()=>{n.current=[],i()}})}),[e.$hook?._set]),react_1.default.createElement("div",{...(0,attributes_1.attributesWithoutChildren)(e,cn,(0,attributes_1.ftoCn)(e.$fto)),"data-color":e.$color??"default","data-m":(0,input_1.inputMode)(e),"data-fill":e.$noPadding,ref:t,tabIndex:void 0},react_1.default.createElement("div",{ref:r,className:`${cn}-drop_area`,onClick:()=>{e.$disabled||a.current.click()},onDragOver:t=>{e.$disabled||(t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy",t.currentTarget.setAttribute("data-active",""))},onDragLeave:t=>{e.$disabled||(t.stopPropagation(),t.preventDefault(),t.currentTarget.removeAttribute("data-active"))},onDrop:t=>{if(!e.$disabled){t.stopPropagation(),t.preventDefault(),t.currentTarget.removeAttribute("data-active");for(const r of t.dataTransfer.files){if(e.$accept){const t=r.name.split(".").pop().toLowerCase();let a=!1;for(const r of e.$accept)if(r.toLowerCase()===t){a=!0;break}if(!a)continue}n.current.push(r)}i()}},tabIndex:e.tabIndex??0,onKeyDown:t=>{e.$disabled||(0,dom_1.pressPositiveKey)(t,(()=>{a.current.click()}))}},e.children??react_1.default.createElement(label_1.default,null,"click or drop")),e.$resize?react_1.default.createElement(resizer_1.default,{direction:"boolean"==typeof e.$resize?"xy":e.$resize}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("input",{ref:a,className:`${input_style_1.inputCn}-hidden`,type:"file",accept:e.$accept?.join(",")??".",tabIndex:-1,onChange:t=>{if(!e.$disabled){for(const e of t.target.files)n.current.push(e);i()}},multiple:!0}),input_style_1.default,Style)})),useFileArea=()=>{const e=(0,react_1.useRef)({});return{focus:(0,react_1.useCallback)((()=>{e.current.focus?.()}),[]),getValue:(0,react_1.useCallback)((()=>e.current.getValue?.()),[]),setValue:(0,react_1.useCallback)((t=>{e.current.setValue?.(t)}),[]),clear:(0,react_1.useCallback)((()=>{e.current.clear?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useFileArea=useFileArea;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  box-sizing: border-box;\n  position: relative;\n  min-height: ${css_var_1.default.size};\n  min-width: ${css_var_1.default.size};\n  padding: ${css_var_1.default.pdy} ${css_var_1.default.pdx};\n}\n.${cn}[data-fill="true"] {\n  padding: 0px;\n}\n.${cn}[data-m="d"] {\n  ${css_var_1.CssPV.inactOpacity}\n}\n.${cn}-drop_area {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: center;\n  align-items: center;\n  flex: none;\n  height: 100%;\n  width: 100%;\n  user-select: none;\n  border-radius: ${css_var_1.default.bdr};\n  overflow: hidden;\n  outline: none;\n  transition: background 0.1s;\n${(0,css_var_1.switchDesign)(e,{fm:`border: 1.5px dotted ${css_var_1.default.bdc};`})}\n}\n.${cn}[data-m="e"] > .${cn}-drop_area {\n  cursor: pointer;\n${(0,css_var_1.switchDesign)(e,{neumorphism:`box-shadow: ${css_var_1.CssPV.nCcvSdActive};`})}\n}\n${(0,css_var_1.switchDesign)(e,{c:`\n.${cn}[data-m="e"] > .${cn}-drop_area:hover {\n  background: ${css_var_1.default.hvrBgc};\n}\n.${cn}[data-m="e"] > .${cn}-drop_area:hover:active,\n.${cn}[data-m="e"] > .${cn}-drop_area[data-active] {\n  background: ${css_var_1.default.actBgc};\n}\n${(0,css_var_1.colorIterator)(((e,t,r)=>`\n.${cn}${r} > .${cn}-drop_area {\n  border-color: ${t.ipt.bdc};\n  color: ${t.fgc};\n  background: ${t.ipt.bgc};\n}\n.${cn}${r} {\n  ${icon_1.varIconFc}: ${t.fgc};\n}\n`)).join("")}\n.${cn}[data-m="d"] > .${cn}-drop_area {\n  background: transparent;\n${(0,css_var_1.switchDesign)(e,{neumorphism:`box-shadow: ${css_var_1.CssPV.nCcvSdDisabled};`})}\n}`})}\n`));exports.default=FileArea;