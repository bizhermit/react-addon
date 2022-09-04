"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,a)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useTabContainer=exports.TabContentWrapper=void 0;const react_1=__importStar(require("react")),core_style_1=require("../styles/core-style"),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),mask_1=__importStar(require("../popups/mask")),cn="bh-tab",TabContentWrapper=({children:e})=>react_1.default.createElement(react_1.default.Fragment,null,e);exports.TabContentWrapper=TabContentWrapper;const TabContainer=react_1.default.forwardRef(((e,t)=>{const n=(0,mask_1.useMask)(),[r,a]=(0,react_1.useState)((()=>null!=e.$defaultKey?e.$defaultKey:Array.isArray(e.children)?e.children[0].key:e.children.key));(0,react_1.useEffect)((()=>{e.$hook?._set({selectTab:e=>a(e),showMask:e=>n.show(e),closeMask:()=>n.close()})}),[e.$hook?._set]);const s=(0,react_1.useMemo)((()=>{const t=(t=>Array.isArray(e.children)?e.children.find((e=>String(e.key)===String(t)))??e.children[0]:e.children)(r);return"string"==typeof t.type?(0,react_1.cloneElement)(t,{...t.props}):(0,react_1.cloneElement)(t,{...t.props,$$mask:n})}),[r,e.children]);return(0,react_1.useEffect)((()=>{s.props.$selected?.(),e.$selected?.(r)}),[r]),react_1.default.createElement(mask_1.default,{...(0,attributes_1.attributesWithoutChildren)(e),ref:t,$hook:n,$fto:e.$fto,$className:cn,$scroll:!1},react_1.default.createElement("div",{className:`${cn}-list ${(0,attributes_1.fgColorCn)(e.$color,e.$colorType)} ${(0,attributes_1.bgColorCn)(e.$color,e.$colorType)}`,"data-calc":e.$calcTabWidth},(0,react_1.useMemo)((()=>(Array.isArray(e.children)?e.children:[e.children]).map((t=>react_1.default.createElement("div",{key:t.key,className:`${cn}-tab`,"data-selected":String(r)===String(t.key),"data-color":t.props.$color||"default","data-colortype":e.$colorType,onClick:()=>a(t.key)},t.props.title??"")))),[r,e.children])),react_1.default.createElement("div",{className:`${cn}-cont ${core_style_1.sbCn}`},s),Style)})),useTabContainer=()=>{const e=(0,react_1.useRef)({});return{selectTab:(0,react_1.useCallback)((t=>{e.current.selectTab?.(t)}),[]),showMask:(0,react_1.useCallback)((t=>{e.current.showMask?.(t)}),[]),closeMask:(0,react_1.useCallback)((()=>{e.current.closeMask?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useTabContainer=useTabContainer;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn}-list {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: stretch;\n  width: 100%;\n  z-index: 1;\n  overflow-y: visible;\n  overflow-x: auto;\n  overflow-x: overlay;\n${(0,css_var_1.switchDesign)(e,{flat:`\n  box-shadow: 0 2px 1px -2px ${css_var_1.default.sdw.c};\n  margin-bottom: 1px;\n`,material:`\n  box-shadow: 0 4px 5px -5px ${css_var_1.default.sdw.c};\n  margin-bottom: 3px;\n`,neumorphism:`\n  padding-top: ${css_var_1.default.pdy};\n  box-shadow: 0px 4px 3px -2px ${css_var_1.default.sdw.d}, 0px -2.5px 1px -2px ${css_var_1.default.sdw.d} inset;\n`})}\n}\n.${cn}-list::-webkit-scrollbar {\n  height: 3px !important;\n  width: 0px;\n  background: transparent !important;\n}\n.${cn}-list::-webkit-scrollbar-thumb {\n  background: ${css_var_1.default.sb.thumb.bgc};\n  border-radius: 2px;\n}\n.${cn}-tab {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row wrap;\n  justify-content: center;\n  align-items: center;\n  flex: none;\n  user-select: none;\n  padding: 2px 10px 0px 10px;\n  white-space: nowrap;\n  flex: 1;\n  overflow: visible;\n${(0,css_var_1.switchDesign)(e,{_:`min-height: ${css_var_1.default.size};`,c:`border-radius: ${css_var_1.default.bdr} ${css_var_1.default.bdr} 0 0;`,fm:"transition: box-shadow 0.2s, background 0.2s, color 0.2s;",flat:`min-height: ${css_var_1.default.size};`,material:`min-height: calc(${css_var_1.default.size} + 1px);`,neumorphism:`\n  min-height: calc(${css_var_1.default.size} + 2px);\n  transition: box-shadow 0.2s;\n`})}\n}\n.${cn}-tab:not([data-selected="true"]) {\n  cursor: pointer;\n}\n.${cn}-list[data-calc="true"] > .${cn}-tab {\n  flex: none;\n}\n.${cn}-cont {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex: 1;\n  min-height: 0px;\n  width: 100%;\n  z-index: 0;\n}\n${(0,css_var_1.switchDesign)(e,{c:`\n.${cn}-tab[data-selected="true"]::before {\n  ${css_var_1.CssPV.ba}\n  bottom: 0px;\n  left: 0px;\n  height: 2px;\n  width: 100%;\n  background: ${css_var_1.default.fgc};\n}\n${(0,css_var_1.colorIterator)(((e,t,n)=>`\n.${cn}-tab${n}[data-selected="true"]::before {\n  background: ${t.ipt.on};\n}`)).join("")}`,fm:`\n.${cn}-tab:not([data-selected="true"]):hover {\n  background: ${css_var_1.default.hvrBgc};\n  z-index: 1;\n}\n.${cn}-tab:not([data-selected="true"]):hover:active {\n  background: ${css_var_1.default.actBgc};\n}`,neumorphism:`\n.${cn}-tab:not([data-selected="true"]):hover {\n  box-shadow: ${css_var_1.CssPV.nCvxSdHover};\n  z-index: 1;\n}\n.${cn}-tab:not([data-selected="true"]):hover:active,\n.${cn}-tab[data-selected="true"] {\n  box-shadow: ${css_var_1.CssPV.nCcvSdActive};\n}`})}\n`));exports.default=TabContainer;