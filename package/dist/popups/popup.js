"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.usePopup=void 0;const react_1=__importStar(require("react")),css_var_1=__importDefault(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),portal_element_1=__importDefault(require("../hooks/portal-element")),react_dom_1=require("react-dom"),cn="bh-pop",Popup=e=>{const[t,r]=(0,react_1.useState)({$visible:!1,$hide:!1}),n=(0,react_1.useRef)({reposition:()=>{},getElement:()=>{}}),a=(0,react_1.useRef)(t.$visible),s=(0,portal_element_1.default)({mount:e=>{e.classList.add(`${cn}-root`)}});return(0,react_1.useEffect)((()=>{t.$visible?(a.current=!0,s&&(s.style.removeProperty("display"),s.setAttribute("data-showed",""),e.$showed?.(),t.showed?.(),n.current.reposition())):(a.current=!1,s&&(s.style.display="none",s.setAttribute("data-showed","false"),t.$hide?(e.$hid?.(),t.hid?.()):(e.$closed?.(),t.closed?.())))}),[t]),(0,react_1.useEffect)((()=>{e.$hook?._set({show:e=>{setTimeout((()=>{r({...e,$visible:!0,$hide:!1})}),0)},hide:()=>{r((e=>({...e,$visible:!1,$hide:!0})))},close:()=>{r((e=>({...e,$visible:!1,$hide:!1})))},reposition:e=>{n.current.reposition(e)},getElement:()=>n.current.getElement(),isShowed:()=>a.current})}),[e.$hook?._set]),react_1.default.createElement(react_1.default.Fragment,null,s&&(t.$visible||t.$hide)?(0,react_dom_1.createPortal)(react_1.default.createElement(PopupWrapper,{state:t,setState:r,attrs:e,dispatch:n.current}),s):react_1.default.createElement(react_1.default.Fragment,null),Style)},PopupWrapper=({attrs:e,state:t,setState:r,dispatch:n})=>{const a=(0,react_1.useRef)(),s=(0,react_1.useRef)(),c=e=>{"Tab"===e.key&&e.preventDefault()};(0,react_1.useEffect)((()=>{const t=e=>{"Escape"===e.key&&r((e=>({...e,$visible:!1})))},n=()=>{e.$preventClickClose||r((e=>({...e,$visible:!1})))};return e.$preventClickClose||window.addEventListener("click",n),window.addEventListener("keydown",t),()=>{e.$preventClickClose||window.removeEventListener("click",n),window.removeEventListener("keydown",t)}}),[]);const o=(0,react_1.useCallback)((e=>{setTimeout((()=>{if(!a.current)return;const r=e??s.current;s.current=r;const n=a.current.getBoundingClientRect(),c=document.body.clientWidth,o=document.body.clientHeight,l=(t.anchor??document.body).getBoundingClientRect(),i=Math.max(0,c-n.width),u=Math.max(0,o-n.height),d=e=>Math.max(0,Math.min(i,e))+"px";switch(r?.x){case"outer":l.right>i?a.current.style.left=d(l.left-n.width):a.current.style.left=d(l.right);break;case"outer-left":a.current.style.left=d(l.left-n.width);break;case"outer-right":a.current.style.left=d(l.right);break;case"inner":l.left>i?a.current.style.left=d(l.right-n.width):a.current.style.left=d(l.left);break;case"inner-left":a.current.style.left=d(l.left);break;case"inner-right":a.current.style.left=d(l.right-n.width);break;default:a.current.style.left=d(l.left+(l.width-n.width)/2)}const p=e=>Math.max(0,Math.min(u,e))+"px";switch(r?.y){case"outer":l.bottom>u?a.current.style.top=p(l.top-n.height):a.current.style.top=p(l.bottom);break;case"outer-top":a.current.style.top=p(l.top-n.height);break;case"outer-bottom":a.current.style.top=p(l.bottom);break;case"inner":l.top>u?a.current.style.top=p(l.bottom-n.height):a.current.style.top=p(l.top);break;case"inner-top":a.current.style.top=p(l.top);break;case"inner-bottom":a.current.style.top=p(l.bottom-n.height);break;default:a.current.style.top=p(l.top+(l.height-n.height)/2)}}),0)}),[]);(0,react_1.useEffect)((()=>{s.current=t.position??e.$position,n.reposition=o,n.getElement=()=>a.current}),[]);const l=(0,react_1.useMemo)((()=>({close:()=>{r((e=>({...e,$visible:!1,$hide:!1})))},hide:()=>{r((e=>({...e,$visible:!1,$hide:!0})))},reposition:o,getElement:()=>a.current})),[]);return react_1.default.createElement(react_1.default.Fragment,null,e.$mask?react_1.default.createElement("div",{className:`${cn}-mask ${cn}-mask_d`,tabIndex:0,onKeyDown:c}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("div",{className:cn,ref:a,"data-transparent":!0===(t.transparent??e.$transparent),style:t.style??e.$style},(0,attributes_1.isReactElement)(e.children)?(0,react_1.cloneElement)(e.children,{...t.props,$$popupController:l}):e.children),e.$mask?react_1.default.createElement("div",{className:`${cn}-mask`,tabIndex:0,onKeyDown:c}):react_1.default.createElement(react_1.default.Fragment,null))},usePopup=()=>{const e=(0,react_1.useRef)({});return{show:(0,react_1.useCallback)((t=>{e.current.show?.(t)}),[]),hide:(0,react_1.useCallback)((()=>{e.current.hide?.()}),[]),close:(0,react_1.useCallback)((()=>{e.current.close?.()}),[]),reposition:(0,react_1.useCallback)((()=>{e.current.reposition?.()}),[]),isShowed:(0,react_1.useCallback)((()=>e.current.isShowed?.()),[]),getElement:(0,react_1.useCallback)((()=>e.current.getElement?.()),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.usePopup=usePopup;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  box-sizing: border-box;\n  z-index: 1000000001;\n  position: fixed;\n  border-radius: ${css_var_1.default.bdr};\n  overflow: hidden;\n}\n.${cn}[data-transparent="false"] {\n  background: ${css_var_1.default.bgc};\n  color: ${css_var_1.default.fgc};\n${e?`filter: drop-shadow(0 2px 3px ${css_var_1.default.sdw.c});`:""}\n}\n.${cn}[data-transparent="true"] {\n  background: transpatent;\n${e?`filter: drop-shadow(0 2px 3px ${css_var_1.default.sdw.c});`:""}\n}\n.${cn}-mask {\n  position: fixed;\n  z-index: 1000000000;\n  box-sizing: border-box;\n  top: 0px;\n  left: 0px;\n  height: 100% !important;\n  width: 100% !important;\n  cursor: default;\n  background: ${css_var_1.default.mask.bgc};\n}\n.${cn}-mask_d {\n  background: transparent;\n}\n`));exports.default=Popup;