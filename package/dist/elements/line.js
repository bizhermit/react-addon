"use strict";var __importDefault=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.VLine=void 0;const array_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/array-utils")),react_1=__importDefault(require("react")),css_var_1=__importDefault(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),cn="bh-line",HLine=a=>react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("hr",{...(0,attributes_1.attributes)(a,`${cn}_h`),"data-b":a.$bold,"data-m":a.$margin,"data-p":a.$padding}),Style),VLine=a=>react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("hr",{...(0,attributes_1.attributes)(a,`${cn}_v`),"data-b":a.$bold,"data-m":a.$margin,"data-p":a.$padding}),Style);exports.VLine=VLine;const Style=react_1.default.createElement(jsx_style_1.default,{id:cn},(()=>`\n.${cn}_h,\n.${cn}_v {\n  box-sizing: border-box;\n  border: none;\n  margin: 0px;\n  padding: 0px;\n  background: ${css_var_1.default.bdc};\n  flex: none;\n  border-radius: 9999px;\n}\n.${cn}_h {\n  width: 100%;\n  height: ${css_var_1.default.bsize};\n}\n.${cn}_v {\n  height: 100%;\n  width: ${css_var_1.default.bsize};\n}\n.${cn}_h[data-m="true"] {\n  margin-top: calc(${css_var_1.default.pdy});\n  margin-bottom: calc(${css_var_1.default.pdy});\n}\n.${cn}_h[data-p="true"] {\n  margin-left: calc(${css_var_1.default.pdy} / 2);\n  width: calc(100% - ${css_var_1.default.pdy});\n}\n.${cn}_v[data-m="true"] {\n  margin-left: calc(${css_var_1.default.pdy});\n  margin-right: calc(${css_var_1.default.pdy});\n}\n.${cn}_v[data-p="true"] {\n  margin-top: calc(${css_var_1.default.pdy} / 2);\n  height: calc(100% - ${css_var_1.default.pdy});\n}\n${array_utils_1.default.generateArray(10,(a=>0===a?"":`\n.${cn}_h[data-m="${a}"] {\n  margin-top: calc(${css_var_1.default.pdy} * ${a});\n  margin-bottom: calc(${css_var_1.default.pdy} * ${a});\n}\n.${cn}_h[data-p="${a}"] {\n  margin-left: calc(${css_var_1.default.pdy} * ${a} / 2);\n  width: calc(100% - ${css_var_1.default.pdy} * ${a});\n}\n.${cn}_v[data-m="${a}"] {\n  margin-left: calc(${css_var_1.default.pdy} * ${a});\n  margin-right: calc(${css_var_1.default.pdy} * ${a});\n}\n.${cn}_v[data-p="${a}"] {\n  margin-top: calc(${css_var_1.default.pdy} * ${a} / 2);\n  height: calc(100% - ${css_var_1.default.pdy} * ${a});\n}`)).join("")}\n.${cn}_h[data-b="true"] {\n  height: calc(${css_var_1.default.bsize} * 2);\n}\n.${cn}_v[data-b="true"] {\n  width: calc(${css_var_1.default.bsize} * 2);\n}\n${array_utils_1.default.generateArray(6,(a=>{if(0===a)return"";const t=a+1;return`\n.${cn}_h[data-b="${a}"] {\n  height: calc(${css_var_1.default.bsize} * ${t});\n}\n.${cn}_v[data-b="${a}"] {\n  width: calc(${css_var_1.default.bsize} * ${t});\n}`})).join("")}\n`));exports.default=HLine;