"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Navigation=exports.useNavigationContainer=void 0;const react_1=__importStar(require("react")),react_2=require("react"),core_style_1=require("../styles/core-style"),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),cn="bh-nvg",defaultEdgeHeight="10%",defaultEdgeWidth="5%",defaultAnimationInterval=10,defaultAnimationDuration=200,NavigationContainer=react_1.default.forwardRef(((e,t)=>{const n=e.children[0],o=n.props.$position??"left",a=n.props.$mode??"visible",[r,i]=(0,react_1.useState)((()=>"visible"===a)),s=(0,react_1.useRef)();(0,react_2.useEffect)((()=>{e.$hook?._set({openNavigation:()=>i(!0),closeNavigation:()=>i(!1),toggleNavigation:()=>i((e=>!e))})}),[e.$hook?._set]);const l=(0,react_1.useCallback)((()=>{i(!1)}),[]);return(0,react_2.useEffect)((()=>{let t=!0;const i=s.current,d=()=>{n.props.$toggled?.(r),e.$toggled?.(r)};if(r)if("edge"===a||"manual"===a){const e=Math.max(Math.floor(Math.max(n.props.$animationDuration??200,1)/10),1);if("left"===o||"right"===o){i.style.visibility="hidden",i.style.removeProperty("width"),i.style.removeProperty("max-width"),i.style.removeProperty("min-width"),i.style.removeProperty("display"),i.style.removeProperty("overflow");let o=n.props.$edgeSize??"5%";const r=i.offsetWidth;"number"==typeof o&&(o+="px"),"manual"===a&&(o="0px"),i.style.width=i.style.maxWidth=i.style.minWidth=o;const s=i.offsetWidth,l=Math.max(1,Math.floor((r-s)/e));i.style.removeProperty("visibility");const c=()=>{i.style.removeProperty("width"),i.style.removeProperty("max-width"),i.style.removeProperty("min-width"),d()};let p=s;const y=async()=>{t&&(p+=l,p>r?c():(i.style.width=i.style.maxWidth=i.style.minWidth=`${p}px`,setTimeout(y,10)))};y()}else{i.style.visibility="hidden",i.style.removeProperty("height"),i.style.removeProperty("max-height"),i.style.removeProperty("min-height"),i.style.removeProperty("display"),i.style.removeProperty("overflow");let o=n.props.$edgeSize??"10%";const r=i.offsetHeight;"number"==typeof o&&(o+="px"),"manual"===a&&(o="0px"),i.style.height=i.style.maxHeight=i.style.minHeight=o;const s=i.offsetHeight,l=Math.max(1,Math.floor((r-s)/e));i.style.removeProperty("visibility");const c=()=>{i.style.removeProperty("height"),i.style.removeProperty("max-height"),i.style.removeProperty("min-height"),d()};let p=s;const y=async()=>{t&&(p+=l,p>r?c():(i.style.height=i.style.maxHeight=i.style.minHeight=`${p}px`,setTimeout(y,10)))};y()}}else d();else"edge"===a||"manual"===a?setTimeout((()=>{if(!t)return;const e=Math.max(Math.floor(Math.max(n.props.$animationDuration??200,1)/10),1);if("left"===o||"right"===o){let o=n.props.$edgeSize??"5%";"number"==typeof o&&(o+="px"),"manual"===a&&(o="0px");const r=()=>{i.style.width=i.style.maxWidth=i.style.minWidth=o,i.style.removeProperty("hidden"),d()};i.style.removeProperty("display");const s=i.offsetWidth;i.style.overflow="hidden",i.style.removeProperty("visibility"),i.style.width=i.style.maxWidth=i.style.minWidth=o;let l=i.offsetWidth;i.style.width=i.style.maxWidth=i.style.minWidth=`${s}px`;const c=Math.max(1,Math.floor((s-l)/e));let p=s;const y=async()=>{t&&(p-=c,p<l?r():(i.style.width=i.style.maxWidth=i.style.minWidth=`${p}px`,setTimeout(y,10)))};y()}else{let o=n.props.$edgeSize??"10%";"number"==typeof o&&(o+="px"),"manual"===a&&(o="0px");const r=()=>{i.style.height=i.style.maxHeight=i.style.minHeight=o,i.style.removeProperty("hidden"),d()};i.style.removeProperty("display");const s=i.offsetHeight;i.style.overflow="hidden",i.style.removeProperty("visibility"),i.style.height=i.style.maxHeight=i.style.minHeight=o;let l=i.offsetHeight;i.style.height=i.style.maxHeight=i.style.minHeight=`${s}px`;const c=Math.max(1,Math.floor((s-l)/e));let p=s;const y=async()=>{t&&(p-=c,p<l?r():(i.style.height=i.style.maxHeight=i.style.minHeight=`${p}px`,setTimeout(y,10)))};y()}}),100):d();return r&&"manual"===a&&!0!==n.props.$preventClickClose&&window.addEventListener("click",l),()=>{t=!1,r&&"manual"===a&&!0!==n.props.$preventClickClose&&window.removeEventListener("click",l)}}),[r]),(0,react_2.useEffect)((()=>{const e=s.current;switch(a){case"visible":e.style.removeProperty("display"),e.style.removeProperty("overflow"),e.style.removeProperty("width"),e.style.removeProperty("height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("visibility"),r||i(!0);break;case"edge":let t=n.props.$edgeSize??("left"===o||"right"===o?"5%":"10%");"number"==typeof t&&(t+="px"),"left"===o||"right"===o?(e.style.removeProperty("height"),e.style.removeProperty("max-height"),e.style.removeProperty("min-height"),e.style.width=e.style.maxWidth=e.style.minWidth=t):(e.style.removeProperty("width"),e.style.removeProperty("max-width"),e.style.removeProperty("min-width"),e.style.height=e.style.maxHeight=e.style.maxHeight=t),e.style.overflow="hidden",e.style.removeProperty("display"),e.style.removeProperty("visibility"),r&&i(!1);break;case"manual":"left"===o||"right"===o?(e.style.width=e.style.maxWidth=e.style.minWidth="0px",e.style.removeProperty("height"),e.style.removeProperty("min-height"),e.style.removeProperty("max-height")):(e.style.height=e.style.maxHeight=e.style.maxHeight="0px",e.style.removeProperty("width"),e.style.removeProperty("max-width"),e.style.removeProperty("min-width")),e.style.removeProperty("visibility"),e.style.overflow="hidden",e.style.display="none",r&&i(!1)}}),[a,o]),react_1.default.createElement("div",{...(0,attributes_1.attributesWithoutChildren)(e,cn,(0,attributes_1.ftoCn)(e.$fto)),ref:t,"data-pos":o,"data-mode":a},react_1.default.createElement("nav",{ref:s,...(0,attributes_1.attributesWithoutChildren)(n.props,`${cn}-nav`,core_style_1.sbCn,(0,attributes_1.colorCn)(n.props.$color,n.props.$colorType||"nav")),"data-opened":r,onMouseEnter:()=>{"edge"===a&&i(!0)},onMouseLeave:()=>{"edge"===a&&i(!1)},onClick:e=>{e.stopPropagation()}},(0,react_1.cloneElement)(n,{$$opened:r})),"edge"===a?react_1.default.createElement("div",{className:`${cn}-nav_dummy`,style:{width:n.props.$edgeSize??"5%",height:n.props.$edgeSize??"10%"}}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("div",{className:`${cn}-body ${core_style_1.sbCn}`},e.children.slice(1)),Style)})),useNavigationContainer=()=>{const e=(0,react_1.useRef)({});return{openNavigation:(0,react_1.useCallback)((()=>{e.current.openNavigation?.()}),[]),closeNavigation:(0,react_1.useCallback)((()=>{e.current.closeNavigation?.()}),[]),toggleNavigation:(0,react_1.useCallback)((()=>{e.current.toggleNavigation?.()}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useNavigationContainer=useNavigationContainer;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  ${css_var_1.CssPV.flex}\n  flex-wrap: nowrap;\n  overflow: visible;\n}\n.${cn}[data-pos="left"] {\n  flex-direction: row;\n}\n.${cn}[data-pos="right"] {\n  flex-direction: row-reverse;\n}\n.${cn}[data-pos="top"] {\n  flex-direction: column;\n}\n.${cn}[data-pos="bottom"] {\n  flex-direction: column-reverse;\n}\n.${cn}-nav_dummy {\n  box-sizing: border-box;\n  position: relative;\n  z-index: 0;\n}\n.${cn}-nav {\n  box-sizing: border-box;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  z-index: 2;\n  min-width: 0px;\n  min-height: 0px;\n  max-width: 100%;\n  max-height: 100%;\n}\n.${cn}[data-pos="left"] > .${cn}-nav,\n.${cn}[data-pos="right"] > .${cn}-nav {\n  flex-flow: column nowrap;\n  height: 100%;\n}\n.${cn}[data-pos="top"] > .${cn}-nav,\n.${cn}[data-pos="bottom"] > .${cn}-nav {\n  flex-flow: row nowrap;\n  width: 100%;\n}\n.${cn}[data-mode="visible"] > .${cn}-nav {\n  position: relative;\n}\n.${cn}[data-mode="edge"] > .${cn}-nav,\n.${cn}[data-mode="manual"] > .${cn}-nav {\n  position: absolute;\n}\n.${cn}[data-mode="edge"][data-pos="left"] > .${cn}-nav,\n.${cn}[data-mode="edge"][data-pos="top"] > .${cn}-nav,\n.${cn}[data-mode="manual"][data-pos="left"] > .${cn}-nav,\n.${cn}[data-mode="manual"][data-pos="top"] > .${cn}-nav {\n  top: 0px;\n  left: 0px;\n}\n.${cn}[data-mode="edge"][data-pos="right"] > .${cn}-nav,\n.${cn}[data-mode="manual"][data-pos="right"] > .${cn}-nav {\n  top: 0px;\n  right: 0px;\n}\n.${cn}[data-mode="edge"][data-pos="bottom"] > .${cn}-nav,\n.${cn}[data-mode="manual"][data-pos="bottom"] > .${cn}-nav {\n  bottom: 0px;\n  left: 0px;\n}\n.${cn}-body {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  z-index: 1;\n}\n.${cn}[data-pos="left"] > .${cn}-body,\n.${cn}[data-pos="right"] > .${cn}-body {\n  height: 100%;\n  flex: 1;\n  min-width: 0px;\n}\n.${cn}[data-pos="top"] > .${cn}-body,\n.${cn}[data-pos="bottom"] > .${cn}-body {\n  width: 100%;\n  flex: 1;\n  min-height: 0px;\n}\n${(0,css_var_1.switchDesign)(e,{flat:`\n.${cn}[data-pos="left"] > .${cn}-nav {\n  box-shadow: 2px 0 1px -2px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="right"] > .${cn}-nav {\n  box-shadow: -2px 0 1px -2px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="top"] > .${cn}-nav {\n  box-shadow: 0 2px 1px -2px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="bottom"] > .${cn}-nav {\n  box-shadow: 0 -2px 1px -2px ${css_var_1.default.sdw.c};\n}`,material:`\n.${cn}[data-pos="left"] > .${cn}-nav {\n  box-shadow: 5px 0 8px -4px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="right"] > .${cn}-nav {\n  box-shadow: -5px 0 8px -4px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="top"] > .${cn}-nav {\n  box-shadow: 0 5px 8px -4px ${css_var_1.default.sdw.c};\n}\n.${cn}[data-pos="bottom"] > .${cn}-nav {\n  box-shadow: 0 -5px 8px -4px ${css_var_1.default.sdw.c};\n}`,neumorphism:`\n.${cn} > .${cn}-nav {\n  box-shadow: ${css_var_1.CssPV.nCvxSd(4)};\n}`})}\n`)),Navigation=e=>react_1.default.createElement(react_1.default.Fragment,null,e.children);exports.Navigation=Navigation,exports.default=NavigationContainer;