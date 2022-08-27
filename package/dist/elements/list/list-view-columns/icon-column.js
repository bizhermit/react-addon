"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils")),react_1=__importDefault(require("react")),dom_1=require("../../../utils/dom"),icon_1=require("../../icon"),cn="bh-lv_c-icon",ListViewIconColumn=e=>({name:e.name??string_utils_1.default.generateUuidV4(),fixed:e.fixed,cellTextAlign:e.cellTextAlign??"center",width:e.width??-1,initialize:()=>{const t=document.createElement("div");return t.classList.add(cn,icon_1.iconCn),e.defaultColor&&t.setAttribute("data-color",e.defaultColor),t.innerHTML=`<div class="${icon_1.iconCn}_c"></div>`.repeat(2),{elem:t}},cellInitialize:(e,t)=>{e.element.classList.add(`${cn}-cell`);const n=(0,dom_1.cloneDomElement)(t.elem);e.contentElements.push(n),e.element.appendChild(n)},cellRender:e.name?({row:t,column:n,cache:i,contentElements:l})=>{const a=t.item.data[n.name]||e.defaultIcon;if(i[n.name]!==a&&(i[n.name]&&l[0].classList.remove(`${icon_1.iconCn}-${i[n.name]}`),a&&l[0].classList.add(`${icon_1.iconCn}-${a}`),i[n.name]=a),e.colorDataName){const n=t.item.data[e.colorDataName]||e.defaultColor;i[e.colorDataName]!==n&&l[0].setAttribute("data-color",i[e.colorDataName]=n)}}:()=>{},jsxStyle:react_1.default.createElement(react_1.default.Fragment,null,icon_1.IconStyle)});exports.default=ListViewIconColumn;