"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.labelCn=void 0;const react_1=__importDefault(require("react")),css_var_1=__importDefault(require("../styles/css-var")),jsx_style_1=__importDefault(require("../styles/jsx-style")),attributes_1=require("../utils/attributes"),cn="bh-lbl";exports.labelCn=cn;const Label=react_1.default.forwardRef(((t,e)=>react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("span",{...(0,attributes_1.attributes)(t,cn,(0,attributes_1.fgColorCn)(t.$color)),ref:e,"data-type":t.$type,"data-nowrap":t.$nowrap,"data-bold":t.$bold,"data-fill":t.$fill}),Style))),Style=react_1.default.createElement(jsx_style_1.default,{id:cn},(()=>`\n.${cn} {\n  box-sizing: border-box;\n  flex: none;\n  padding: 2px 5px 0px 5px;\n  color: inherit;\n  overflow: hidden;\n}\n.${cn}[data-nowrap="true"] {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.${cn}[data-bold="true"] {\n  font-weight: bold;\n}\n.${cn}[data-type="h0"] {\n  font-size: 2.5em;\n  font-weight: bold;\n}\n.${cn}[data-type="h1"] {\n  font-size: 2em;\n  font-weight: bold;\n}\n.${cn}[data-type="h2"] {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n.${cn}[data-type="h3"] {\n  font-size: 1.17em;\n  font-weight: bold;\n}\n.${cn}[data-type="h4"] {\n  font-weight: bold;\n}\n.${cn}[data-type="h5"] {\n  font-size: 0.83em;\n  font-weight: bold;\n}\n.${cn}[data-type="h6"] {\n  font-size: 0.67em;\n  font-weight: bold;\n}\n.${cn}[data-type="a"] {\n  text-decoration: underline;\n  color: ${css_var_1.default.anchor};\n  cursor: pointer;\n  user-select: none;\n}\n.${cn}[data-fill="true"] {\n  height: 100%;\n  width: 100%;\n}`));exports.default=Label;