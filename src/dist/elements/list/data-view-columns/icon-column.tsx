import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React from "react";
import { Color } from "../../../styles/css-var";
import { cloneDomElement } from "../../../utils/dom";
import { iconCn, IconImage, IconStyle } from "../../icon";
import { DataViewColumnFunction } from "../data-view";

const cn = "bh-dv_c-icon";

const DataViewIconColumn: DataViewColumnFunction<{
  name?: string;
  colorDataName?: string;
  fixed?: boolean;
  cellTextAlign?: "left" | "center" | "right";
  width?: number;
  defaultIcon?: IconImage;
  defaultColor?: Color;
}> = (props) => {
  return {
    name: props.name ?? StringUtils.generateUuidV4(),
    fixed: props.fixed,
    cellTextAlign: props.cellTextAlign ?? "center",
    width: props.width ?? -1,
    initialize: () => {
      const elem = document.createElement("div");
      elem.classList.add(cn, iconCn);
      if (props.defaultColor) {
        elem.setAttribute("data-color", props.defaultColor);
      }
      elem.innerHTML = `<div class="${iconCn}_c"></div>`.repeat(2);
      return { elem };
    },
    cellInitialize: (cell, params) => {
      cell.element.classList.add(`${cn}-cell`);
      const elem = cloneDomElement(params.elem);
      cell.contentElements.push(elem);
      cell.element.appendChild(elem);
    },
    cellRender: props.name ? ({ row, column, cache, contentElements }) => {
      const image = row.item.data[column.name] || props.defaultIcon;
      if (cache[column.name] !== image) {
        if (cache[column.name]) contentElements[0].classList.remove(`${iconCn}-${cache[column.name]}`);
        if (image) contentElements[0].classList.add(`${iconCn}-${image}`);
        cache[column.name] = image;
      }
      if (props.colorDataName) {
        const color = row.item.data[props.colorDataName] || props.defaultColor;
        if (cache[props.colorDataName] !== color) {
          contentElements[0].setAttribute("data-color", cache[props.colorDataName] = color);
        }
      }
    } : () => {},
    jsxStyle: <>{IconStyle}</>,
  };
};

export default DataViewIconColumn;