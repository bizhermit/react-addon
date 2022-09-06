"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0});const react_1=__importStar(require("react")),attributes_1=require("../../../utils/attributes"),select_box_1=__importStar(require("../../inputs/select-box")),data_view_1=require("../data-view"),DataViewSelectBox=e=>{let t={value:void 0};const a=e.labelDataName??`__${e.name}`,r=e.selectBoxAttributes?.$valueDataName??"value",i=e.selectBoxAttributes?.$labelDataName??"label";let n,l=[],u=!0;if(null==e.source)u=!1;else if(Array.isArray(e.source))l=e.source,u=!1;else{const t=e.source();Array.isArray(t)?(l=t??[],u=!1):t.then((e=>{l=e??[]})).catch((e=>{console.trace(e)})).finally((()=>{u=!1,n?.render()}))}const o={},s=e=>{if(u)return"";if(e in o)return o[e];const t=l.find((t=>t[r]===e));return null==t?"":o[e]=(t?t[i]:"")??""};return{...e,name:a,vName:e.name,bodyClassNames:[...(0,attributes_1.convertClassNames)(e.bodyClassNames)??[],data_view_1.dataViewIptCn],_dv:e=>{n=e},initializeRowData:t=>{if(u)return!1;t[a]=s(t[e.name])},_beginEdit:e.disabled?void 0:({target:a})=>({node:react_1.default.createElement(EditColumn,{bind:t={value:a.data[e.name]},attrs:{...e.selectBoxAttributes,$source:l}}),effect:()=>{e.beganEdit?.(a.data[e.name],a)}}),_endEdit:(r,i)=>{const n=r.data[e.name],l=t.value;i&&(r.data[e.name]=l,r.data[a]=s(l)),e.endedEdit?.({before:n,after:i?l:n},r,i)}}},EditColumn=({bind:e,attrs:t})=>{const a=(0,select_box_1.useSelectBox)();return(0,react_1.useEffect)((()=>{a.focus()}),[]),react_1.default.createElement(select_box_1.default,{...t,$hook:a,$name:"value",$bind:e,style:{height:"100%",width:"100%"}})};exports.default=DataViewSelectBox;