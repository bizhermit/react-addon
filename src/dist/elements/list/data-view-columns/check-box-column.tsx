import React from "react";
import { CssPV } from "../../../styles/css-var";
import JsxStyle from "../../../styles/jsx-style";
import { cloneDomElement } from "../../../utils/dom";
import { checkBoxCn, CheckButtonStyle } from "../../inputs/check-box";
import { dataViewCn, DataViewColumnFunction, DataViewEditColumnProps } from "../data-view";

const cn = "bh-dv_c-ckb";

const DataViewCheckBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<{ value: boolean | number | string; checked: boolean; }> & {
  checkedValue?: boolean | number | string;
  uncheckedValue?: boolean | number | string;
  batchCheck?: boolean;
  toggleRowClick?: boolean;
  checkBoxFill?: boolean;
}> = (props) => {
  const checkedValue = props.checkedValue ?? true;
  const uncheckedValue = props.uncheckedValue ?? false;
  let batchChecked = false;
  let batchCheckBoxElem: HTMLDivElement, lblElem: HTMLDivElement;

  return {
    width: -1,
    sort: false,
    resize: false,
    cellTextAlign: "center",
    ...props,
    bindedItems: (items) => {
      if (props.batchCheck === false) return;
      let checkedAll = true;
      if (items.length === 0) {
        checkedAll = false;
      } else {
        for (const item of items) {
          if (item[props.name] !== checkedValue) {
            checkedAll = false;
            break;
          }
        }
      }
      batchCheckBoxElem?.setAttribute("data-checked", String(batchChecked = checkedAll));
    },
    initialize: () => {
      const elem = document.createElement("div");
      elem.classList.add(cn, checkBoxCn);
      if (props.disabled) {
        elem.setAttribute("data-m", "d");
        elem.setAttribute("data-disabled", String(props.disabled === true));
      } else {
        elem.setAttribute("data-m", "e");
      }
      elem.setAttribute("data-fill", String(props.checkBoxFill === true));
      return { elem };
    },
    headerCellInitialize: props.batchCheck && !props.disabled ? (column, params) => {
      column.headerCellElement.classList.add(`${cn}-hcell`);
      const wrapElem = document.createElement("div");
      wrapElem.classList.add(`${cn}-hwrap`);
      if (typeof props.headerCellLabel === "string") column.headerCellLabelElement.textContent = props.headerCellLabel;
      wrapElem.appendChild(lblElem = column.headerCellLabelElement);
      if (props.headerCellLabel == null) {
        column.headerCellLabelElement.style.display = "none";
      }
      batchCheckBoxElem = cloneDomElement(params.elem);
      wrapElem.appendChild(batchCheckBoxElem);
      column.headerCellElement.appendChild(wrapElem);
    } : props.headerCellInitialize,
    headerCellLabel: props.batchCheck && !props.disabled ? (_e, items, originItems) => {
      let checkedAll = true;
      if (items.length === 0) {
        checkedAll = false;
      } else {
        for (const item of items) {
          if (item.data[props.name] !== checkedValue) {
            checkedAll = false;
            break;
          }
        }
      }
      batchCheckBoxElem?.setAttribute("data-checked", String(batchChecked = checkedAll));
      if (typeof props.headerCellLabel === "function") props.headerCellLabel(lblElem, items, originItems);
    } : props.headerCellLabel,
    clickHeaderCell: props.batchCheck && !props.disabled ? (colName, items, renderCells) => {
      if (props.disabled === true || props.batchCheck === false) return;
      if (batchChecked = !batchChecked) items.forEach(item => item.data[colName] = checkedValue);
      else items.forEach(item => item.data[colName] = uncheckedValue);
      batchCheckBoxElem?.setAttribute("data-checked", String(batchChecked));
      renderCells();
      props.clickHeaderCell?.(colName, items, renderCells);
    } : props.clickHeaderCell,
    cellInitialize: (cell, params) => {
      cell.element.classList.add(`${cn}-cell`);
      const elem = cloneDomElement(params.elem);
      cell.contentElements.push(elem);
      cell.element.appendChild(elem);
    },
    cellRender: ({ contentElements, row, cache, column }) => {
      const checked = row.item.data[column.name] === checkedValue;
      if (cache[column.name] !== checked) {
        contentElements[0].setAttribute("data-checked", String(cache[column.name] = checked));
      }
    },
    clickCell: props.toggleRowClick || props.disabled ? props.clickCell : (params, e) => {
      if (e?.ctrlKey || e?.shiftKey) {
        return props.clickCell?.(params, e);
      }
      const b = params.data[props.name];
      const a = params.data[props.name] = b === checkedValue ? uncheckedValue : checkedValue;
      const cells = params.getSelectedCells();
      cells.forEach(cell => {
        if (cell.columnName !== props.name) return;
        cell.data[cell.columnName] = a;
      });
      props.endedEdit?.({
        before: { value: b, checked: b === checkedValue },
        after: { value: a, checked: a === checkedValue }
      }, {
        columnName: props.name,
        data: params.data,
        index: params.rowNumber - 1,
        id: params.id
      }, true);
      if (props.clickCell) return props.clickCell(params, e);
      return {
        renderHeaderCell: true,
        renderFooterCell: true,
      };
    },
    clickRow: props.toggleRowClick && !props.disabled ? (params, e) => {
      if (e?.ctrlKey || e?.shiftKey) {
        return props.clickRow?.(params, e);
      }
      const b = params.data[props.name];
      const a = params.data[props.name] = b === checkedValue ? uncheckedValue : checkedValue;
      const rows = params.getSelectedRows();
      rows.forEach(row => {
        row.data[props.name] = a;
      })
      props.endedEdit?.({
        before: { value: b, checked: b === checkedValue },
        after: { value: a, checked: a === checkedValue }
      }, {
        columnName: props.name,
        data: params.data,
        index: params.rowNumber - 1,
        id: params.id
      }, true);
      if (props.clickRow) return props.clickRow(params, e);
      return {
        renderHeaderCells: true,
        renderFooterCells: true,
      };
    } : props.clickRow,
    _preventClearSelected: true,
    jsxStyle: <>{CheckButtonStyle}{Style}</>,
  };
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}-hwrap {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  padding-left: 1px;
  cursor: pointer;
  height: 100%;
  min-width: 0px;
  flex: 1;
}
.${cn}-hwrap > .${dataViewCn}-lbl {
  flex: none;
}
.${cn}-hcell[data-align="left"] .${cn}-hwrap {
  align-items: flex-start;
}
.${cn}-hcell[data-align="left"] .${cn}-hwrap > .${dataViewCn}-lbl {
  text-align: left;
}
.${cn}-hcell[data-align="center"] .${cn}-hwrap > .${dataViewCn}-lbl {
  text-align: center;
}
.${cn}-hcell[data-align="right"] .${cn}-hwrap {
  align-items: flex-end;
}
.${cn}-hcell[data-align="right"] .${cn}-hwrap > .${dataViewCn}-lbl {
  text-align: right;
}
.${cn}-cell[data-disabled="false"] {
  cursor: pointer;
}
.${cn}-cell[data-disabled="true"] > .${cn} {
  ${CssPV.inactOpacity}
}
.${cn}-cell > .${cn}::after {
  transition: unset;
}
`}</JsxStyle>;

export default DataViewCheckBoxColumn;