"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,i){void 0===i&&(i=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,i,a)}:function(e,t,r,i){void 0===i&&(i=r),e[i]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0});const react_1=__importStar(require("react")),attributes_1=require("../../../utils/attributes"),text_box_1=__importStar(require("../../inputs/text-box")),list_view_1=require("../list-view"),ListViewTextBoxColumn=e=>{let t={value:""};return{...e,bodyClassNames:[...(0,attributes_1.convertClassNames)(e.bodyClassNames)??[],list_view_1.listViewIptCn],_beginEdit:e.disabled?void 0:({target:r})=>({node:react_1.default.createElement(EditColumn,{bind:t={value:r.data[e.name]??""},attrs:e.textBoxAttributes}),effect:()=>{e.beganEdit?.(r.data[e.name],r)}}),_endEdit:(r,i)=>{const a=r.data[e.name],n=t.value;i&&(r.data[e.name]=n),e.endedEdit?.({before:a,after:i?n:a},r,i)}}},EditColumn=({bind:e,attrs:t})=>{const r=(0,text_box_1.useTextBox)();return(0,react_1.useEffect)((()=>{r.focus()}),[]),react_1.default.createElement(text_box_1.default,{...t,$hook:r,$name:"value",$bind:e,style:{height:"100%",width:"100%"}})};exports.default=ListViewTextBoxColumn;