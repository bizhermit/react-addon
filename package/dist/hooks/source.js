"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const react_1=require("react"),useSource=(e,r)=>{const[t,c]=(0,react_1.useState)(!0),[o,u]=(0,react_1.useState)((()=>Array.isArray(e)?e??[]:[]));return(0,react_1.useEffect)((()=>{if(!r?.preventSourceMemo&&!t)return void c(!1);if(null==e){const e=[];return r?.changeSource?.(e),u(e),void c(!1)}if(Array.isArray(e))return r?.changeSource?.(e),u(e),void c(!1);c(!0);const o=e();Array.isArray(o)?(u(o),c(!1)):o.then((e=>{const t=e??[];r?.changeSource?.(t),u(t),c(!1)})).catch((e=>{console.trace(e),c(!1)}))}),[e]),{loading:t,source:o}};exports.default=useSource;