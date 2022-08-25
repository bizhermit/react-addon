import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React from "react";
import CssVar, { CssPV, Color, switchDesign } from "../../../styles/css-var";
import JsxStyle from "../../../styles/jsx-style";
import { cloneDomElement } from "../../../utils/dom";
import { iconChildCount, iconCn, IconImage, IconStyle } from "../../icon";
import { listViewCn, ListViewColumnFunction, ListViewColumnProps } from "../list-view";

const cn = "bh-lv_c-btn";

const ListViewButtonColumn: ListViewColumnFunction<ListViewColumnProps & {
  buttonLabel?: string;
  icon?: IconImage | {
    color?: Color;
    image?: IconImage;
    position?: "left" | "right";
  };
  title?: string;
  valid?: (itemData: { [key: string]: any }) => boolean | { valid: boolean, visible?: boolean, buttonLabel?: string };
}> = (props) => {
  const icon = StringUtils.isString(props.icon) ? { image: props.icon } : props.icon;
  return {
    sort: false,
    resize: false,
    cellTextAlign: "center",
    width: icon == null || StringUtils.isNotEmpty(props.buttonLabel) ? props.width : -1,
    ...props,
    initialize: () => {
      const elem = document.createElement("div");
      elem.classList.add(cn);
      if (props.title) elem.title = props.title;
      if (icon != null) {
        const iconElem = document.createElement("div");
        iconElem.classList.add(`${iconCn}`, `${iconCn}-${icon.image}`);
        iconElem.innerHTML = `<div class="${iconCn}_c" />`.repeat(iconChildCount(icon.image));
        if (icon.color) iconElem.setAttribute("data-color", icon.color);
        if (icon.position === "right") elem.setAttribute("data-iconright", "");
        elem.appendChild(iconElem);
      }
      if (!StringUtils.isEmpty(props.buttonLabel)) {
        const lblElem = document.createElement("div");
        lblElem.classList.add(`${listViewCn}-lbl`);
        lblElem.textContent = props.buttonLabel;
        elem.appendChild(lblElem);
      }
      if (icon != null && !StringUtils.isEmpty(props.buttonLabel)) {
        elem.setAttribute("data-icontext", "");
      }
      return { elem };
    },
    cellInitialize: (cell, params) => {
      cell.element.classList.add(`${cn}-cell`);
      const elem = cloneDomElement(params.elem);
      cell.contentElements.push(elem);
      cell.element.appendChild(elem);
    },
    cellRender: props.valid == null || props.disabled === true ? null : (cell) => {
      const ret = props.valid(cell.row.item.data);
      cell.element.setAttribute("data-disabled", String(!(typeof ret === "boolean" ? ret : ret.valid === true)));
    },
    clickCell: (params, e) => {
      if (props.disabled) return;
      if (props.clickCell == null) return;
      if (props.valid) {
        const ret = props.valid(params.data);
        if (typeof ret === "boolean") {
          if (ret !== true) return;
        } else {
          if (ret.valid !== true) return;
        }
      }
      return props.clickCell(params, e);
    },
    jsxStyle: <>{Style}{IconStyle}</>,
  };
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn}-cell {
  padding: 2px;
  justify-content: center;
}
.${cn} {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  width: 100%;
  height: 100%;
  border-radius: ${CssVar.bdr};
${switchDesign(design, {
fm: `border: 1px solid ${CssVar.bdc};`,
flat: `transition: background 0.1s;`,
material: `transition: box-shadow 0.1s, top 0.1s;`,
neumorphism: `transition: box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;`,
})}
}
.${cn}[data-iconright] {
  flex-flow: row-reverse nowrap;
}
.${cn}[data-icontext] {
  padding-left: 5px;
  padding-right: 5px;
}
.${cn}[data-icontext]:not([data-iconright]) > .${listViewCn}-lbl {
  padding-left: 3px;
}
.${cn}[data-icontext][data-iconright] > .${listViewCn}-lbl {
  padding-right: 3px;
}
.${cn}-lbl {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.${cn}-cell[data-align="left"] > .${cn} > .${listViewCn}-lbl {
  text-align: left;
}
.${cn}-cell[data-align="center"] > .${cn} > .${listViewCn}-lbl {
  text-align: center;
}
.${cn}-cell[data-align="right"] > .${cn} > .${listViewCn}-lbl {
  text-align: right;
}
.${cn}-cell[data-disabled="false"] {
  cursor: pointer;
}
${switchDesign(design, {
flat: `
.${cn}-cell[data-disabled="false"] > .${cn} {
  transition: background
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover {
  background: ${CssVar.hvrBgc};
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover:active {
  background: ${CssVar.actBgc};
}`,
material: `
.${cn}-cell[data-disabled="false"] > .${cn} {
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.c};
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover {
  background: ${CssVar.hvrBgc};
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover:active {
  box-shadow: none;
  top: 1px;
}`,
neumorphism: `
.${cn}-cell[data-disabled="false"] > .${cn} {
  box-shadow: ${CssPV.cvxSd};
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover {
  box-shadow: ${CssPV.cvxSdD};
}
.${cn}-cell[data-disabled="false"] > .${cn}:hover:active {
  box-shadow: ${CssPV.ccvSd};
  margin-top: 1px;
  margin-bottom: -1px;
}`,
})}
.${cn}-cell[data-disabled="true"] > .${cn} {
  ${CssPV.inactOpacity}
${switchDesign(design, {
neumorphism: `box-shadow: ${CssPV.ccvSdS};`
})}
}
`}</JsxStyle>;

export default ListViewButtonColumn;