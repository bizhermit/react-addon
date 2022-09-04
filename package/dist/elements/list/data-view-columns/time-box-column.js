"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,i){void 0===i&&(i=a);var r=Object.getOwnPropertyDescriptor(t,a);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,i,r)}:function(e,t,a,i){void 0===i&&(i=a),e[i]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0});const time_1=__importStar(require("@bizhermit/time")),react_1=__importStar(require("react")),attributes_1=require("../../../utils/attributes"),time_box_1=__importStar(require("../../inputs/time-box")),data_view_1=require("../data-view"),DataViewTimeBoxColumn=e=>{let t={value:void 0};const a=e.labelDataName??`__${e.name}`,i=e.mode??"hm";let r,n,o,u=e.unit;switch("function"==typeof e.format?n=e.format:(o=e.format,n=e=>"string"==typeof e?new time_1.default(e).format(o):"number"==typeof e?new time_1.default(time_1.TimeUtils.convertUnitToMilliseconds(e,u)).format(o):""),i){case"hms":r=127,u||(u="second"),o||(o="hh:mm:ss");break;case"ms":r=93,u||(u="second"),o||(o="mm:ss");break;case"h":r=58,u||(u="hour"),o||(o="hh");break;default:r=93,u||(u="minute"),o||(o="hh:mm")}return{resize:!1,width:r,cellTextAlign:"center",...e,name:a,vName:e.name,bodyClassNames:[...(0,attributes_1.convertClassNames)(e.bodyClassNames)??[],data_view_1.dataViewIptCn],initializeRowData:t=>{t[a]=n(t[e.name])},_beginEdit:e.disabled?void 0:({target:a})=>({node:react_1.default.createElement(EditColumn,{bind:t={value:a.data[e.name]},attrs:{...e.timeBoxAttributes,$mode:i,$unit:u,$dataType:e.dataType}}),effect:()=>{e.beganEdit?.(a.data[e.name],a)}}),_endEdit:(i,r)=>{const o=i.data[e.name],u=t.value;r&&(i.data[e.name]=u,i.data[a]=n(u)??""),e.endedEdit?.({before:o,after:r?u:o},i,r)}}},EditColumn=({bind:e,attrs:t})=>{const a=(0,time_box_1.useTimeBox)();return(0,react_1.useEffect)((()=>{a.focus()}),[]),react_1.default.createElement(time_box_1.default,{...t,$hook:a,$name:"value",$bind:e,$hidePickerButton:!0,style:{height:"100%",width:"100%"},onClick:()=>{a.showPicker()}})};exports.default=DataViewTimeBoxColumn;