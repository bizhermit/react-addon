"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.equalValue=void 0;const react_1=require("react"),equalValue=(e,t)=>null==e&&null==t||e===t;exports.equalValue=equalValue;const useValue=(e,t)=>{const{$name:r,$bind:u,$defaultValue:a,$value:n,$dispatch:c,$change:l,$changed:f}=e,s=null!=u&&"$bind"in e&&r?.length,o=(0,react_1.useRef)(!1),i=(0,react_1.useRef)("$value"in e?n:s?u[r]:"$defaultValue"in e?a:void 0),[d,$]=(0,react_1.useState)(i.current),_=(0,react_1.useRef)((()=>{}));return _.current=e=>{let a=e,n=i.current;if((0,exports.equalValue)(a,n))return a;return!1===(t?.validation?.(a)??l?.(null==t?.setChangeCtx?{after:a,before:n}:t?.setChangeCtx({after:a,before:n})))&&(a=i.current),s&&(u[r]=a),i.current=a,$(a),t?.effect?.(a),c?.(a),f?.(null==t?.setChangeCtx?{after:a,before:n}:t?.setChangeCtx({after:a,before:n})),a},(0,react_1.useEffect)((()=>{if(o.current&&s){const e=_.current(u[r]);t?.bindEffect?.(e)}}),[u]),(0,react_1.useEffect)((()=>{o.current&&"$value"in e&&(_.current(n),t?.stateEffect?.(n))}),[n]),(0,react_1.useEffect)((()=>{o.current||(t?.effect?.(d),t?.mountEffect?.(d),o.current=!0)}),[]),{val:d,set:_,buf:i}};exports.default=useValue;