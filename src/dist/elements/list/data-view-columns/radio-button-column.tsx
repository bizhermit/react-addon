import React from "react";
import { radioButtonCn, RadioButtonStyle } from "../../inputs/radio-buttons";
import JsxStyle from "../../../styles/jsx-style";
import { DataViewColumnFunction, DataViewEditColumnProps } from "../data-view";
import { CssPV } from "../../../styles/css-var";
import { cloneDomElement } from "../../../utils/dom";

const cn = "bh-dv_c-rdb";

const DataViewRadioButtonColumn: DataViewColumnFunction<DataViewEditColumnProps<{ [key: string]: any }> & {
  selectedValue?: number | string | boolean;
  unselectedValue?: number | string | boolean;
  selectRowClick?: boolean;
}> = (props) => {
  const selectedValue = props.selectedValue ?? true;
  const unselectedValue = props.unselectedValue ?? null;

  return {
    width: -1,
    sort: false,
    resize: false,
    cellTextAlign: "center",
    ...props,
    bindedItems: (items) => {
      let hasSelected = false;
      items.forEach(item => {
        if (hasSelected) {
          item[props.name] = unselectedValue;
          return;
        }
        if (item[props.name] === selectedValue) hasSelected = true;
      });
      if (props.disabled) return;
      if (!hasSelected && items.length > 0) items[0][props.name] = selectedValue;
    },
    initialize: () => {
      const elem = document.createElement("div");
      elem.classList.add(cn, radioButtonCn);
      if (props.disabled) {
        elem.setAttribute("data-m", "d");
        elem.setAttribute("data-disabled", String(props.disabled === true));
      } else {
        elem.setAttribute("data-m", "e");
      }
      return { elem };
    },
    cellInitialize: (cell, params) => {
      cell.element.classList.add(`${cn}-cell`);
      const elem = cloneDomElement(params.elem);
      cell.contentElements.push(elem);
      cell.element.appendChild(elem);
    },
    cellRender: ({ contentElements, row, column, cache }) => {
      const selected = row.item.data[column.name] === selectedValue;
      if (cache[column.name] !== selected) {
        contentElements[0].setAttribute("data-selected", String(cache[column.name] = selected));
      }
    },
    clickCell: props.selectRowClick || props.disabled ? props.clickCell : (params, e) => {
      if (props.clickCell) return props.clickCell(params, e);
      let b = undefined;
      for (const item of params.originItems()) {
        if (item[props.name] === selectedValue) b = item;
        item[props.name] = unselectedValue;
      }
      params.data[props.name] = selectedValue;
      props.endedEdit?.({
        before: b,
        after: params.data
      }, {
        columnName: params.columnName,
        data: params.data,
        index: params.rowNumber - 1,
        id: params.id
      }, true);
      return {
        renderHeaderCell: true,
        renderFooterCell: true,
      };
    },
    clickRow: props.selectRowClick && !props.disabled ? (params, e) => {
      if (props.clickRow) return props.clickRow(params, e);
      let b = undefined;
      for (const item of params.originItems()) {
        if (item[props.name] === selectedValue) b = item;
        item[props.name] = unselectedValue;
      }
      params.data[props.name] = selectedValue;
      props.endedEdit?.({
        before: b,
        after: params.data
      }, {
        columnName: params.columnName,
        data: params.data,
        index: params.rowNumber - 1,
        id: params.id
      }, true);
      return {
        renderHeaderCells: true,
        renderFooterCells: true,
      };
    } : props.clickRow,
    jsxStyle: <>{RadioButtonStyle}{Style}</>,
  };
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}-cell[data-disabled="false"] {
  cursor: pointer;
}
.${cn}-cell[data-disabled="true"] > .${cn} {
  ${CssPV.inactOpacity}
}
.${cn}-cell > .${cn}::after {
  transition: unset;
}
`}</JsxStyle>

export default DataViewRadioButtonColumn;