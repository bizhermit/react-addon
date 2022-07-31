"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,l,n){void 0===n&&(n=l);var i=Object.getOwnPropertyDescriptor(t,l);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(e,n,i)}:function(e,t,l,n){void 0===n&&(n=l),e[n]=t[l]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&__createBinding(t,e,l);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const number_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/number-utils")),react_1=__importStar(require("react")),css_var_1=__importStar(require("../../../styles/css-var")),jsx_style_1=__importDefault(require("../../../styles/jsx-style")),dom_1=require("../../../utils/dom"),slider_1=__importStar(require("../../inputs/slider")),list_view_1=require("../list-view"),cn="bh-lv_c-sld",ListViewSliderColumn=e=>{let t={value:void 0};const l=e.labelDataName??`__${e.name}`,n=e.format??(e=>number_utils_1.default.format(e));return{dataType:"number",...e,name:l,vName:e.name,initializeRowData:t=>{t[l]=n(t[e.name])},initialize:()=>{const t=document.createElement("div");t.classList.add(cn),t.setAttribute("data-align",e.barAlign??"left"),e.hideBar&&(t.style.display="none");const l=document.createElement("div");return l.classList.add(`${list_view_1.listViewCn}-lbl`,`${cn}-lbl`),{elem:l,belem:t}},cellInitialize:(t,l)=>{const n=(0,dom_1.cloneDomElement)(l.belem);if(t.contentElements.push(n),t.element.appendChild(n),!0!==e.hideLabel){const e=(0,dom_1.cloneDomElement)(l.elem);t.contentElements.push(e),t.element.appendChild(e)}},cellRender:({cache:t,row:n,contentElements:i})=>{if(t.val!==n.item.data[e.name]){const s=n.item.data[e.name];!0!==e.hideLabel&&(i[1].textContent=n.item.data[l]),e.progressbarRender?.(s,i[0]),t.val=s,i[0].style.width=`${Math.min(100,Math.max(0,s??0))}%`,e.signal&&i[0].setAttribute("data-signal",e.signal(s))}},_beginEdit:e.disabled?void 0:({target:l})=>({node:react_1.default.createElement(EditColumn,{bind:t={value:l.data[e.name]},attrs:e.sliderAttributes}),effect:()=>{e.beganEdit?.(l.data[e.name],l)}}),_endEdit:(i,s)=>{const a=i.data[e.name],r=t.value;s&&(i.data[e.name]=r,i.data[l]=n(r)??""),e.endedEdit?.({before:a,after:s?r:a},i,s)},jsxStyle:Style}},EditColumn=({bind:e,attrs:t})=>{const l=(0,slider_1.useSlider)();return(0,react_1.useEffect)((()=>{l.focus()}),[]),react_1.default.createElement(slider_1.default,{...t,$hook:l,$name:"value",$bind:e,style:{height:"100%",width:"100%"}})},Style=react_1.default.createElement(jsx_style_1.default,{id:cn,depsDesign:!0},(({design:e})=>`\n.${cn} {\n  box-sizing: border-box;\n  position: absolute;\n  height: 60%;\n  top: 20%;\n  max-width: 100%;\n  z-index: -1;\n  background: ${css_var_1.default.hvrBgc};\n}\n.${cn}[data-align="left"] {\n  left: 0px;\n}\n.${cn}[data-align="right"] {\n  right: 0px;\n}\n${(0,css_var_1.switchDesign)(e,{c:`\n.${list_view_1.listViewCn}-row[data-oddeven="odd"] .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.bg.b)}\n}\n.${list_view_1.listViewCn}-row[data-oddeven="even"] .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.bg.d)}\n}\n.${list_view_1.listViewCn}-row:hover .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.hvr.row.bgc)}\n}\n.${list_view_1.listViewCn}-cell:hover .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.hvr.cell.bgc)}\n}\n.${list_view_1.listViewCn}-body.bh-select-row .${list_view_1.listViewCn}-row.bh-_selected .${cn} + .${cn}-lbl,\n.${list_view_1.listViewCn}-body.bh-select-cell .${list_view_1.listViewCn}-cell.bh-_selected .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.act.bgc)}\n}\n.${list_view_1.listViewCn}-body.bh-select-row .${list_view_1.listViewCn}-row.bh-_selected .${list_view_1.listViewCn}-cell:hover .${cn} + .${cn}-lbl,\n.${list_view_1.listViewCn}-body.bh-select-cell .${list_view_1.listViewCn}-cell.bh-_selected:hover .${cn} + .${cn}-lbl {\n  ${css_var_1.CssPV.textSd(css_var_1.default.lv.cell.act.hvr.bgc)}\n}\n${(0,css_var_1.signalIterator)(((e,t,l)=>`\n.${cn}${l} {\n  background: ${t.ipt.on};\n}\n`)).join("")}`})}\n`));exports.default=ListViewSliderColumn;