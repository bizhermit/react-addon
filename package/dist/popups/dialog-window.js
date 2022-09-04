"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,a)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useDialogWindow=void 0;const react_1=__importStar(require("react")),css_var_1=__importStar(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),icon_1=__importStar(require("../elements/icon")),mask_1=__importStar(require("./mask")),cursor_1=require("../utils/cursor"),attributes_1=require("../utils/attributes"),portal_element_1=__importDefault(require("../hooks/portal-element")),react_dom_1=require("react-dom"),label_1=__importDefault(require("../elements/label")),cn="bh-dw",DialogWindow=e=>{const[t,n]=(0,react_1.useState)({$visible:!1}),r=(0,react_1.useRef)({toFront:()=>{}}),a=(0,react_1.useRef)(t.$visible),c=(0,portal_element_1.default)({mount:e=>{e.classList.add("bh-dw-root")}});return(0,react_1.useEffect)((()=>{t.$visible?(a.current=!0,c&&(c.style.removeProperty("display"),c.setAttribute("data-showed",""),e.$showed?.(),t.showed?.(),r.current.toFront())):(a.current=!1,c&&(c.style.display="none",c.removeAttribute("data-showed"),t.$hide?(e.$hid?.(t.$hideRetProps),t.hid?.(t.$hideRetProps)):(e.$closed?.(t.$closeRetProps),t.closed?.(t.$closeRetProps))))}),[t]),(0,react_1.useEffect)((()=>{e.$hook?._set({show:e=>{setTimeout((()=>{n({...e,$visible:!0})}),0)},close:e=>{n((t=>({...t,$visible:!1,$hide:!1,$closeRetProps:e})))},hide:e=>{n((t=>({...t,$visible:!1,$hide:!0,$hideRetProps:e})))},isShowed:()=>a.current})}),[e.$hook?._set]),react_1.default.createElement(react_1.default.Fragment,null,c&&(t.$visible||t.$hide)?(0,react_dom_1.createPortal)(react_1.default.createElement(DialogWindowWrapper,{state:t,setState:n,attrs:e,dispatch:r.current}),c):react_1.default.createElement(react_1.default.Fragment,null),Style)},dialogWindowBaseZIndex=1e8,dialogWindowZIndexInterval=5,getMostFrontZIndex=e=>{let t=-1;if(document.querySelectorAll("div.bh-dw").forEach((n=>{n!==e&&(t=Math.max(t,Number(n.getAttribute("data-zindex")||"0")))})),e){if(Number(e.getAttribute("data-zindex")||"0")===t)return t}return t+1},DialogWindowWrapper=({attrs:e,state:t,setState:n,dispatch:r})=>{const a=(0,react_1.useRef)(),c=(0,mask_1.useMask)(),[i,o]=(0,react_1.useState)(getMostFrontZIndex(a.current)),[s,l]=(0,react_1.useState)((()=>e.$fullScreen?"maximize":"")),d=e=>{"Tab"===e.key&&e.preventDefault()},u=()=>{switch(e.$clickMaskAction){case"close":n((e=>({...e,$visible:!1,$hide:!1})));break;case"hide":n((e=>({...e,$visible:!1,$hide:!0})))}},h=(t,n,r,c)=>{if(e.$preventMove||"maximize"===s)return;const i=a.current.getBoundingClientRect(),o=i.left,l=i.top,d=document.body.getBoundingClientRect(),u=d.height-i.height,h=d.width-i.width,m=(e,t)=>{a.current.style.top=Math.max(0,Math.min(u,l+t-r))+"px",a.current.style.left=Math.max(0,Math.min(h,o+e-n))+"px"};if(c){const e=e=>m(e.touches[0].clientX,e.touches[0].clientY),t=()=>{window.removeEventListener("touchmove",e),window.removeEventListener("touchend",t)};window.addEventListener("touchend",t),window.addEventListener("touchmove",e)}else{const e=e=>m(e.clientX,e.clientY),n=()=>{window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",n),(0,cursor_1.releaseCursor)()};(0,cursor_1.setCursor)(getComputedStyle(t).cursor),window.addEventListener("mouseup",n),window.addEventListener("mousemove",e)}},m=(t,n,r,c,i,o,l,d)=>{if(e.$preventResize||"maximize"===s)return;let u=0,h=0,m=0,_=0,f=0,w=0,b=0,p=0,v=!1,g=!1,x=!1,$=!1;const y=a.current.getBoundingClientRect(),z=document.body.getBoundingClientRect();c&&(x=!0,i?(u=a.current.offsetLeft,_=y.width,w=a.current.offsetLeft+y.width,p=w-0,g=!0):(u=y.width,w=z.width-a.current.offsetLeft)),o&&($=!0,l?(h=a.current.offsetTop,m=y.height,f=a.current.offsetTop+y.height,b=f-0,v=!0):(h=y.height,f=z.height-a.current.offsetTop));const E=(e,t)=>{x&&(g?(a.current.style.left=Math.max(0,Math.min(p,u+e-n))+"px",a.current.style.width=Math.max(0,Math.min(w,_-e+n))+"px"):a.current.style.width=Math.max(0,Math.min(w,u+e-n))+"px"),$&&(v?(a.current.style.top=Math.max(0,Math.min(b,h+t-r))+"px",a.current.style.height=Math.max(0,Math.min(f,m-t+r))+"px"):a.current.style.height=Math.max(0,Math.min(f,h+t-r))+"px")};if(d){const e=e=>E(e.touches[0].clientX,e.touches[0].clientY),t=()=>{window.removeEventListener("touchmove",e),window.removeEventListener("touchend",t)};window.addEventListener("touchend",t),window.addEventListener("touchmove",e)}else{const e=e=>E(e.clientX,e.clientY);(0,cursor_1.setCursor)(getComputedStyle(t).cursor);const n='div[class^="bh-resize-"]',r=()=>{window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",r),(0,cursor_1.releaseCursor)(),a.current?.querySelectorAll(n).forEach((e=>{e.style.cursor=e.getAttribute("data-cursor")}))};a.current.querySelectorAll(n).forEach((e=>{e.style.cursor="inherit"})),window.addEventListener("mouseup",r),window.addEventListener("mousemove",e)}};(0,react_1.useEffect)((()=>{a.current.setAttribute("data-zindex",String(i))}),[i]),(0,react_1.useEffect)((()=>{const t="hidden"===a.current.style.visibility;a.current.style.removeProperty("display"),setTimeout((()=>{if("maximize"===s);else{const n=a.current.getBoundingClientRect(),r=document.body.getBoundingClientRect(),c=Math.min(n.height,r.height),i=Math.min(n.width,r.width);a.current.style.height=c+"px",a.current.style.width=i+"px",t?(a.current.style.top=Math.max(0,Math.min(null!=e.$top?n.top:r.height,(r.height-c)/2))+"px",a.current.style.left=Math.max(0,Math.min(null!=e.$left?n.left:r.width,(r.width-i)/2))+"px"):(n.top+c>r.height&&(a.current.style.top=r.height-c+"px"),n.left+i>r.width&&(a.current.style.left=r.width-i+"px"))}t&&a.current.style.removeProperty("visibility")}),0)}),[s]);const _=(0,react_1.useMemo)((()=>({close:e=>{n((t=>({...t,$visible:!1,$hide:!1,$closeRetProps:e})))},hide:e=>{n((t=>({...t,$visible:!1,$hide:!0,$hideRetProps:e})))}})),[]);return(0,react_1.useEffect)((()=>{r.toFront=()=>{o(getMostFrontZIndex(a.current))}}),[]),react_1.default.createElement(react_1.default.Fragment,null,e.$modal?react_1.default.createElement("div",{className:"bh-dw-mask bh-dw-mask_d",tabIndex:0,onClick:u,onKeyDown:d,style:{zIndex:1e8+5*i}}):react_1.default.createElement(react_1.default.Fragment,null),react_1.default.createElement("div",{ref:a,className:cn,onClick:e=>{let t=!1;const n=e=>{null!=e&&(e!==a.current?n(e.parentElement):t=!0)};n(e.target),t&&o(getMostFrontZIndex(a.current))},"data-size":s,"data-move":!0!==e.$preventMove,style:{top:e.$top,left:e.$left,height:e.$height,width:e.$width,visibility:"hidden",zIndex:1e8+5*i+2},"data-zindex":i},react_1.default.createElement("div",{className:"bh-dw-cont"},e.$hideHeader?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement("div",{className:`bh-dw-header ${(0,attributes_1.colorCn)(e.$color,e.$colorType||"head")}`,onDoubleClick:()=>{e.$preventResize||l((e=>"maximize"===e?"":"maximize"))},onMouseDown:e=>h(e.currentTarget,e.clientX,e.clientY),onTouchStart:e=>h(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0),"data-move":!0!==e.$preventMove},react_1.default.createElement("div",{className:"bh-dw-title"},(0,attributes_1.isReactElement)(e.$title)?e.$title:react_1.default.createElement(label_1.default,{$bold:!0},e.$title)),e.$hideMinimizeButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:"bh-dw-min",onClick:()=>{_.hide()},onMouseDown:e=>e.stopPropagation()},react_1.default.createElement(icon_1.default,{$image:"minus",$transition:!0}))),e.$hideCloseButton?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:"bh-dw-close",onClick:()=>{_.close()},onMouseDown:e=>e.stopPropagation()},react_1.default.createElement(icon_1.default,{$image:"cross",$transition:!0})))),react_1.default.createElement(mask_1.default,{$hook:c,$fto:"fy",$scroll:!0,className:"bh-dw-body"},(0,attributes_1.isReactElement)(e.children)?(0,react_1.cloneElement)(e.children,{...t.props,$$mask:c,$$dialogWindowController:_}):e.children)),e.$preventResize||"maximize"===s?react_1.default.createElement(react_1.default.Fragment,null):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-lt",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!0,!0,!0),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!0,!0,!0,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-ct",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!1,!1,!0,!0),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!1,!1,!0,!0,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-rt",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!1,!0,!0),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!1,!0,!0,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-lm",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!0,!1,!1),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!0,!1,!1,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-rm",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!1,!1,!1),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!1,!1,!1,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-lb",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!0,!0,!1),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!0,!0,!1,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-cb",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!1,!1,!0,!1),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!1,!1,!0,!1,!0)}),react_1.default.createElement("div",{className:"bh-dw-resize bh-dw-rb",onMouseDown:e=>m(e.currentTarget,e.clientX,e.clientY,!0,!1,!0,!1),onTouchStart:e=>m(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY,!0,!1,!0,!1,!0)}))),e.$modal?react_1.default.createElement("div",{className:"bh-dw-mask",tabIndex:0,onClick:u,onKeyDown:d,style:{zIndex:1e8+5*i+1}}):react_1.default.createElement(react_1.default.Fragment,null))},useDialogWindow=()=>{const e=(0,react_1.useRef)({});return{show:(0,react_1.useCallback)((t=>{e.current.show?.(t)}),[]),close:(0,react_1.useCallback)((t=>{e.current.close?.(t)}),[]),hide:(0,react_1.useCallback)((t=>{e.current.hide?.(t)}),[]),_set:(0,react_1.useCallback)((t=>{e.current=t}),[])}};exports.useDialogWindow=useDialogWindow;const resizeSize="var(--bh-dw-resize, 6px)",Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.bh-dw {\n  box-sizing: border-box;\n  position: fixed;\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex: none;\n  background: transparent;\n  overflow: hidden;\n${e?`filter: drop-shadow(0 2px 3px ${css_var_1.default.sdw.c});`:""}\n}\n.bh-dw:not([data-size="maximize"]):not([data-move="false"]) {\n  padding: 6px;\n}\n.bh-dw[data-size="maximize"] {\n  top: 0px !important;\n  left: 0px !important;\n  height: 100% !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  max-height: 100% !important;\n}\n.bh-dw-cont {\n  ${css_var_1.CssPV.flex}\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  height: 100%;\n  width: 100%;\n  background: ${css_var_1.default.bgc};\n  color: ${css_var_1.default.fgc};\n  border-radius: ${css_var_1.default.bdr};\n  overflow: hidden;\n}\n.bh-dw-header {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  flex: none;\n  min-height: ${css_var_1.default.size};\n  width: 100%;\n  user-select: none;\n  z-index: 1;\n  overflow: hidden;\n${(0,css_var_1.switchDesign)(e,{flat:`\n  box-shadow: 0 0 1px ${css_var_1.default.sdw.c};\n  margin-bottom: 1px;\n`,material:`\n  box-shadow: 0 0 5px -1px ${css_var_1.default.sdw.c};\n  margin-bottom: 2px;\n`,neumorphism:`\n  box-shadow: 0px 3px 4px -2px ${css_var_1.default.sdw.d}, 0px -2.5px 1px -2px ${css_var_1.default.sdw.d} inset;\n  margin-bottom: 3px;\n  padding: 3px;\n`})}\n}\n.bh-dw-header[data-move="true"] {\n  cursor: move;\n}\n.bh-dw-title {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  white-space: nowrap;\n  flex: 1;\n  padding-left: 5px;\n  padding-right: 5px;\n  overflow: hidden;\n}\n.bh-dw-close,\n.bh-dw-min {\n  ${css_var_1.CssPV.flex}\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  flex: none;\n  cursor: pointer;\n  height: ${css_var_1.default.size};\n  width: ${css_var_1.default.size};\n  border-radius: ${css_var_1.default.bdr};\n  opacity: 0.8;\n${(0,css_var_1.switchDesign)(e,{fm:"transition: background 0.1s;",neumorphism:"transition: box-shadow 0.1s;"})}\n}\n${(0,css_var_1.switchDesign)(e,{fm:`\n.bh-dw-min:hover {\n  background: ${css_var_1.default.default.btn.hvr.bgc};\n  ${icon_1.varIconFc}: ${css_var_1.default.default.btn.hvr.fgc};\n  ${icon_1.varIconBc}: ${css_var_1.default.default.btn.hvr.bgc};\n}\n.bh-dw-min:hover:active {\n  background: ${css_var_1.default.default.btn.act.bgc};\n  ${icon_1.varIconFc}: ${css_var_1.default.default.btn.act.fgc};\n  ${icon_1.varIconBc}: ${css_var_1.default.default.btn.act.bgc};\n}\n.bh-dw-close:hover {\n  background: ${css_var_1.default.danger.btn.hvr.bgc};\n  ${icon_1.varIconFc}: ${css_var_1.default.danger.btn.hvr.fgc};\n  ${icon_1.varIconBc}: ${css_var_1.default.danger.btn.hvr.bgc};\n}\n.bh-dw-close:hover:active {\n  background: ${css_var_1.default.danger.btn.act.bgc};\n  ${icon_1.varIconFc}: ${css_var_1.default.danger.btn.act.fgc};\n  ${icon_1.varIconBc}: ${css_var_1.default.danger.btn.act.bgc};\n}`,neumorphism:`\n.bh-dw-min:hover {\n  box-shadow: ${css_var_1.CssPV.nCvxSdBase};\n}\n.bh-dw-close {\n  ${icon_1.varIconFc}: ${css_var_1.default.danger.fgc};\n  ${icon_1.varIconBc}: ${css_var_1.default.bgc};\n}\n.bh-dw-close:hover {\n  box-shadow: ${css_var_1.CssPV.nCvxSdBase};\n}\n.bh-dw-min:hover:active,\n.bh-dw-close:hover:active {\n  box-shadow: ${css_var_1.CssPV.nCcvSdActive};\n}\n`})}\n.bh-dw-body {\n  flex: none;\n  z-index: 0;\n}\n.bh-dw-resize {\n  background: transparent;\n  position: absolute;\n  touch-action: none;\n}\n.bh-dw-lt,\n.bh-dw-rb {\n  height: ${resizeSize};\n  width: ${resizeSize};\n  cursor: nwse-resize;\n}\n.bh-dw-lt {\n  top: 0px;\n  left: 0px;\n}\n.bh-dw-rb {\n  bottom: 0px;\n  right: 0px;\n}\n.bh-dw-rt,\n.bh-dw-lb {\n  height: ${resizeSize};\n  width: ${resizeSize};\n  cursor: nesw-resize;\n}\n.bh-dw-rt {\n  top: 0px;\n  right: 0px;\n}\n.bh-dw-lb {\n  bottom: 0px;\n  left: 0px;\n}\n.bh-dw-ct,\n.bh-dw-cb {\n  height: ${resizeSize};\n  width: calc(100% - ${resizeSize} * 2);\n  left: ${resizeSize};\n  cursor: ns-resize;\n}\n.bh-dw-ct {\n  top: 0px;\n}\n.bh-dw-cb {\n  bottom: 0px;\n}\n.bh-dw-lm,\n.bh-dw-rm {\n  height: calc(100% - ${resizeSize} * 2);\n  width: ${resizeSize};\n  top: ${resizeSize};\n  cursor: ew-resize;\n}\n.bh-dw-lm {\n  left: 0px;\n}\n.bh-dw-rm {\n  right: 0px;\n}\n.bh-dw-mask {\n  position: fixed;\n  box-sizing: border-box;\n  top: 0px;\n  left: 0px;\n  height: 100% !important;\n  width: 100% !important;\n  cursor: default;\n  background: ${css_var_1.default.mask.bgc};\n}\n.bh-dw-mask_d {\n  background: transparent;\n}\n`));exports.default=DialogWindow;