import React from "react";
import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import CssVar, { CssPV, Color, colorIterator } from "../../../styles/css-var";
import { DataViewClass, dataViewCn, DataViewColumnFunction } from "../data-view";
import JsxStyle from "../../../styles/jsx-style";
import { cloneDomElement, getDomEventManager } from "../../../utils/dom";
import { releaseCursor, setCursor } from "../../../utils/cursor";

const cn = "bh-dv_c-gtc";

type GanttChartColumnData = {
  dataName: string;
  fromDataName: string;
  toDataName: string;
  barLabelDataName?: string;
  rateDataName?: string;
  barClassName?: string;
  disabled?: boolean;
  defaultColor?: Color;
};

type GanttChartUnit = "day" | "week" | "month";

type InitParams = {
  headerRowElem: HTMLDivElement;
  rowElem: HTMLDivElement;
  barElement: HTMLDivElement;
  barLabelElement: HTMLDivElement;
  barDragElement: HTMLDivElement;
  differenceElement: HTMLDivElement;
};

type GanttChartStruct = {
  id: string;
  from: Date;
  to: Date;
  length: number;
  left: number;
  barLabel: string;
  diff: number;
  title: string;
  color: Color;
};

const DataViewGanttChartColumn: DataViewColumnFunction<{
  name: string;
  disabled?: boolean;
  term: {
    from: Date;
    to: Date;
  };
  dateCellWidth?: number;
  dataNames: Array<GanttChartColumnData>;
  dataType?: "string" | "number" | "date";
  dateFormat?: string;
  progressLine?: boolean;
  unit?: GanttChartUnit;
  barTitleFormat?: (params: { from: Date; to: Date; length: number; }) => string;
  defaultColor?: Color;
}> = (props) => {
  const dcWidth = props.dateCellWidth ?? 30;
  const unit = props.unit ?? "day";
  const defaultColor = props.defaultColor ?? "default";
  const showProgressLine = props.progressLine !== false;
  const termFrom = DatetimeUtils.removeTime(DatetimeUtils.copy(props.term.from)), termTo = DatetimeUtils.removeTime(DatetimeUtils.copy(props.term.to));
  let barTitleFormat = props.barTitleFormat, disabled = props.disabled === true;
  switch (unit) {
    case "month":
      disabled = true;
      termFrom.setDate(1);
      if (barTitleFormat == null) barTitleFormat = (p) => `${DatetimeUtils.format(p.from, "yyyy/MM/dd")} <-> ${DatetimeUtils.format(p.to, "yyyy/MM/dd")}`;
      break;
    case "week":
      disabled = true;
      if (barTitleFormat == null) barTitleFormat = (p) => `${DatetimeUtils.format(p.from, "yyyy/MM/dd")} <-> ${DatetimeUtils.format(p.to, "yyyy/MM/dd")}`;
      break;
    default:
      if (barTitleFormat == null) barTitleFormat = (p) => `${DatetimeUtils.format(p.from, "yyyy/MM/dd")} <-> ${DatetimeUtils.format(p.to, "yyyy/MM/dd")} (${p.length})`;
      break;
  }
  const cellArr: Array<{ y: number; m: number; d: number; w: number; today: boolean; }> = [];
  const date = DatetimeUtils.copy(termFrom), toNum = termTo.getTime();
  const today = DatetimeUtils.getDate();
  const todayLeft = calcBarLeft(termFrom, today, unit) + 1;
  let hasToday = today.getTime() < date.getTime();
  while (date.getTime() <= toNum) {
    let isToday = false;
    switch (unit) {
      case "month":
        isToday = !hasToday && true;
        break;
      case "week":
        isToday = !hasToday && (hasToday = date.getTime() >= today.getTime());
        break;
      default:
        isToday = !hasToday && (hasToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear());
        break;
    }
    cellArr.push({
      y: date.getFullYear(),
      m: date.getMonth(),
      d: date.getDate(),
      w: date.getDay(),
      today: isToday,
    });
    switch (unit) {
      case "month":
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        break;
      case "week":
        date.setDate(date.getDate() + 7);
        break;
      default:
        date.setDate(date.getDate() + 1);
        break;
    }
  }
  const convertValueToData = (data: { [key: string]: any }, dn: GanttChartColumnData, id?: string) => {
    const fval = data[dn.fromDataName], tval = data[dn.toDataName];
    const fdate = DatetimeUtils.convert(fval);
    const tdate = DatetimeUtils.convert(tval);
    DatetimeUtils.removeTime(fdate);
    DatetimeUtils.removeTime(tdate);
    const length = calcBarLength(fdate, tdate, unit, termFrom);
    let diff = null;
    if (showProgressLine && dn.rateDataName != null && tdate != null) {
      const rval = data[dn.rateDataName];
      const rate = typeof rval === "number" ? Math.min(100, Math.max(0, rval)) : 0;
      if (fdate.getTime() <= today.getTime()) {
        if (rate === 100 && tdate.getTime() <= today.getTime()) {
          diff = null;
        } else {
          const cdate = new Date(fdate);
          cdate.setDate(cdate.getDate() + Math.floor(length * rate / 100));
          diff = calcBarLeft(today, cdate, unit) - 1;
        }
      } else {
        if (rate === 0) {
          diff = null;
        } else {
          const cdate = new Date(fdate);
          const hoge = Math.floor(length * rate / 100);
          cdate.setDate(cdate.getDate() + hoge);
          diff = calcBarLeft(today, cdate, unit) - 1;
        }
      }
    }
    let title = "";
    if (fdate) title = barTitleFormat({ from: fdate, to: tdate, length });
    return {
      id: id ?? StringUtils.generateUuidV4(),
      from: fdate,
      to: tdate,
      length,
      left: calcBarLeft(termFrom, fdate, unit),
      barLabel: dn.barLabelDataName == null ? "" : (data[dn.barLabelDataName] ?? ""),
      diff,
      title,
      color: dn.defaultColor ?? defaultColor,
    } as GanttChartStruct;
  };
  const convertDateToData = (date: Date) => {
    if (date == null) return undefined;
    switch (props.dataType) {
      case "number":
        return Number(DatetimeUtils.format(date, "yyyyMMdd"));
      case "date":
        return date;
      default:
        return DatetimeUtils.format(date, props.dateFormat);
    }
  }
  const event = getDomEventManager();
  let activeBars: {
    [key: string]: {
      index: number;
      data: GanttChartStruct;
      barElem: HTMLElement;
      originData: { [key: string]: any };
      dataName: GanttChartColumnData;
    }
  } = {};
  const clearActiveBars = () => { activeBars = {}; };
  let dragMode: "l" | "r" | "m" | "" = "", lastPos = 0, draged = false, dataView: DataViewClass;
  const moveEventImpl = (cx: number) => {
    const num = Math.round((cx - lastPos) / dcWidth);
    if (num !== 0) draged = true;
    if (dragMode === "r") {
      Object.keys(activeBars).forEach((id) => {
        const ab = activeBars[id];
        if (ab.barElem == null) return;
        ab.barElem.style.width = `${Math.max(1, ab.data.length + num) * dcWidth}px`;
      });
      return;
    }
    if (dragMode === "l") {
      Object.keys(activeBars).forEach((id) => {
        const ab = activeBars[id];
        if (ab.barElem == null) return;
        const left = ab.data.left + num;
        ab.barElem.style.left = `${left * dcWidth}px`;
        ab.barElem.style.width = `${Math.max(1, ab.data.length - (left - ab.data.left)) * dcWidth}px`;
      });
      return;
    }
    if (dragMode === "m") {
      Object.keys(activeBars).forEach((id) => {
        const ab = activeBars[id];
        if (ab.barElem == null) return;
        ab.barElem.style.left = `${(ab.data.left + num) * dcWidth}px`;
      });
      return;
    }
  };
  const mousemoveEvent = (e: MouseEvent) => {
    moveEventImpl(e.clientX);
  };
  const mouseupEvent = (e: MouseEvent) => {
    changeCommit(Math.round((e.clientX - lastPos) / dcWidth));
  };
  const touchmoveEvent = (e: TouchEvent) => {
    moveEventImpl(e.touches[0].clientX);
  };
  const touchendEvent = (e: TouchEvent) => {
    changeCommit(Math.round((e.changedTouches[0].clientX - lastPos) / dcWidth));
  };
  const changeCommit = (num: number) => {
    if (num !== 0) {
      Object.keys(activeBars).forEach((id) => {
        const ab = activeBars[id];
        switch (dragMode) {
          case "r":
            ab.data.length = Math.max(1, ab.data.length + num);
            break;
          case "l":
            const left = ab.data.left + num;
            ab.data.length = Math.max(1, ab.data.length - (left - ab.data.left));
            ab.data.left = left;
            break;
          case "m":
            ab.data.left += num;
            break;
          default:
            break;
        }
        const f = new Date(termFrom);
        f.setDate(f.getDate() + ab.data.left);
        const t = new Date(f);
        t.setDate(t.getDate() + ab.data.length - 1);
        ab.originData[ab.dataName.fromDataName] = convertDateToData(f);
        ab.originData[ab.dataName.toDataName] = convertDateToData(t);
      });
      Object.keys(activeBars).forEach((id) => {
        dataView?.renderByOriginData(activeBars[id].originData, true);
      });
    }
    releaseCursor();
    window.removeEventListener("mouseup", mouseupEvent);
    window.removeEventListener("mousemove", mousemoveEvent);
    dragMode = "";
  };
  const deleteBar = () => {
    Object.keys(activeBars).forEach((id) => {
      const ab = activeBars[id];
      ab.originData[ab.dataName.fromDataName] = null;
      ab.originData[ab.dataName.toDataName] = null;
    });
    Object.keys(activeBars).forEach((id) => {
      dataView?.renderByOriginData(activeBars[id].originData, true);
    });
  };
  return {
    name: props.name ?? StringUtils.generateUuidV4(),
    disabled,
    resize: false,
    sort: false,
    width: cellArr.length * dcWidth,
    notScrollFocusWhenTabStop: true,
    _dv: (dv) => {
      dataView = dv;
    },
    initialize: () => {
      const div = document.createElement("div");
      const mcElem = cloneDomElement(div);
      mcElem.classList.add(`${cn}-month_wrap`);
      const mElem = cloneDomElement(div);
      mElem.classList.add(`${cn}-month`);
      const dcElem = cloneDomElement(div);
      dcElem.classList.add(`${cn}-date_wrap`);
      const dElem = cloneDomElement(div);
      dElem.style.width = `${dcWidth}px`;
      dElem.classList.add(`${cn}-date`);
      dElem.setAttribute("data-name", "datecell");
      const rElem = cloneDomElement(div);
      rElem.classList.add(`${cn}-row`);
      const hrElem = cloneDomElement(rElem);
      let ly = -1, lm = -1;
      let dcelem: HTMLDivElement = null, hdcelem: HTMLDivElement = null, melem: HTMLDivElement = null, cellCount = 0;
      for (const date of cellArr) {
        if (ly !== date.y || lm !== date.m) {
          if (melem) melem.style.width = `${cellCount * dcWidth}px`;
          const mcelem = cloneDomElement(mcElem);
          melem = cloneDomElement(mElem);
          melem.textContent = unit === "month" ? `${date.y}` : `${date.y}/${date.m + 1}`;
          mcelem.appendChild(melem);
          hdcelem = cloneDomElement(dcElem);
          mcelem.appendChild(hdcelem);
          hrElem.appendChild(mcelem);
          dcelem = cloneDomElement(dcElem);
          dcelem.style.height = "100%";
          rElem.appendChild(dcelem);
          ly = date.y;
          lm = date.m;
          cellCount = 0;
        }
        cloneDomElement(dElem, (elem) => {
          cellCount++;
          elem.setAttribute("data-y", String(date.y));
          elem.setAttribute("data-m", String(date.m));
          elem.setAttribute("data-d", String(date.d));
          if (unit === "day") elem.setAttribute("data-w", String(date.w));
          elem.setAttribute("data-today", String(date.today));
          dcelem.appendChild(elem);
          hdcelem.appendChild(cloneDomElement(elem, (elem) => {
            elem.textContent = unit === "month" ? `${date.m + 1}月` : String(date.d);
            hdcelem.appendChild(elem);
          }));
        });
      }
      melem.style.width = `${cellCount * dcWidth}px`;
      return {
        headerRowElem: hrElem,
        rowElem: rElem,
        barElement: cloneDomElement(div, (elem) => {
          elem.style.display = "none";
          elem.style.visibility = "hidden";
          elem.classList.add(`${cn}-bar_wrap`);
          elem.setAttribute("data-name", "bar");
          elem.setAttribute("data-color", defaultColor);
          elem.appendChild(cloneDomElement(div, elem => elem.classList.add(`${cn}-bar`)));
        }),
        barLabelElement: cloneDomElement(div, (elem) => elem.classList.add(`${cn}-bar_lbl`)),
        barDragElement: cloneDomElement(div, (elem) => elem.classList.add(`${cn}-bar_drag`)),
        differenceElement: cloneDomElement(div, (elem) => elem.classList.add(`${cn}-diff`)),
      };
    },
    cellDispose: (cell) => {
      event.removeEventIterator((de) => de.element === cell.element || cell.contentElements.find(elem => elem === de.element) != null);
    },
    bindedItems: () => {
      clearActiveBars();
    },
    initializeRowData: (data) => {
      for (const dn of props.dataNames) {
        data[dn.dataName] = convertValueToData(data, dn);
      }
    },
    headerCellInitialize: (column, initParams: InitParams) => {
      column.headerCellElement.classList.add(`${cn}-hcell`);
      if (showProgressLine) column.headerCellElement.setAttribute("data-progressline", "");
      column.headerCellLabelElement.classList.remove(`${dataViewCn}-lbl`);
      column.headerCellLabelElement.classList.add(`${cn}-wrap`);
      column.headerCellLabelElement.appendChild(initParams.headerRowElem);
    },
    cellInitialize: (cell, initParams: InitParams) => {
      const elem = cell.element;
      elem.classList.add(`${cn}-cell`);
      if (showProgressLine) elem.setAttribute("data-progressline", "");
      const dblclick = (e: MouseEvent) => {
        const dcelem = e.target as HTMLDivElement;
        const name = dcelem.getAttribute("data-name");
        if (name !== "datecell") return;
        const key = dcelem.getAttribute("data-key");
        const dn = props.dataNames[Number(key)];
        const data = cell.row.item?.data;
        if (data == null) return;
        const d = data[dn.dataName] as GanttChartStruct;
        if (d.from == null) {
          const f = DatetimeUtils.convert(`${dcelem.getAttribute("data-y")}-${Number(dcelem.getAttribute("data-m")) + 1}-${dcelem.getAttribute("data-d")}`);
          data[dn.fromDataName] = convertDateToData(f);
          data[dn.toDataName] = convertDateToData(new Date(f));
          dataView.renderByOriginData(data, true);
        }
      };
      event.addEvent(elem, "dblclick", dblclick);
      for (let i = 0, il = props.dataNames.length; i < il; i++) {
        const dn = props.dataNames[i], key = String(i);
        const relem = cloneDomElement(initParams.rowElem, (elem) => {
          elem.querySelectorAll("div[data-name='datecell']").forEach((e) => {
            e.setAttribute("data-key", key);
          });
          elem.setAttribute("data-disabled", String(props.disabled === true || dn.disabled === true));
        });
        const belem = cloneDomElement(initParams.barElement, (elem) => {
          cell.contentElements.push(elem);
          elem.setAttribute("data-key", key);
          if (dn.barClassName) elem.classList.add(dn.barClassName);
          if (!disabled && dn.disabled !== true) {
            elem.tabIndex = 0;
            const commonListener = () => {
              Object.keys(activeBars).forEach((key) => {
                const ab = activeBars[key];
                for (const c of cell.column.cells) {
                  if (c.row.item == null) continue;
                  if (c.row.item.data[ab.dataName.dataName].id !== key) continue;
                  ab.barElem = c.contentElements[ab.index * 5];
                  break;
                }
              });
            };
            const mouseCommonListener = (e: MouseEvent) => {
              e.stopPropagation();
              window.addEventListener("mouseup", mouseupEvent);
              window.addEventListener("mousemove", mousemoveEvent);
              commonListener();
              lastPos = e.clientX;
            };
            const touchCommonListener = (e: TouchEvent) => {
              e.stopPropagation();
              window.addEventListener("touchend", touchendEvent);
              window.addEventListener("touchmove", touchmoveEvent);
              commonListener();
              lastPos = e.touches[0].clientX;
            };
            const moveListener = (e: MouseEvent) => {
              if (activeBars[cell.row.item.data[dn.dataName].id] == null) return;
              mouseCommonListener(e);
              setCursor("move");
              dragMode = "m";
            };
            event.addEvent(elem, "mousedown", moveListener);
            const touchMoveListener = (e: TouchEvent) => {
              if (activeBars[cell.row.item.data[dn.dataName].id] == null) return;
              touchCommonListener(e);
              dragMode = "m";
            };
            event.addEvent(elem, "touchstart", touchMoveListener);
            elem.appendChild(cloneDomElement(initParams.barDragElement, (celem) => {
              celem.classList.add(`${cn}-bar_drag_l`);
              const listener = (e: MouseEvent) => {
                mouseCommonListener(e);
                setCursor("col-resize");
                dragMode = "l";
              };
              event.addEvent(celem, "mousedown", listener);
              const touchListener = (e: TouchEvent) => {
                touchCommonListener(e);
                dragMode = "l";
              };
              event.addEvent(celem, "touchstart", touchListener);
              cell.contentElements.push(celem);
            }));
            elem.appendChild(cloneDomElement(initParams.barDragElement, (celem) => {
              celem.classList.add(`${cn}-bar_drag_r`);
              const listener = (e: MouseEvent) => {
                mouseCommonListener(e);
                setCursor("col-resize");
                dragMode = "r";
              };
              event.addEvent(celem, "mousedown", listener);
              const touchListener = (e: TouchEvent) => {
                touchCommonListener(e);
                dragMode = "r";
              };
              event.addEvent(celem, "touchstart", touchListener);
              cell.contentElements.push(celem);
            }));
            const keydown = (e: KeyboardEvent) => {
              if (disabled || dn.disabled === true) return;
              switch (e.key) {
                case "Escape":
                  dataView?.focus();
                  e.stopPropagation();
                  e.preventDefault();
                  break;
                case "ArrowLeft":
                  if (e.ctrlKey) dragMode = "r";
                  else dragMode = "m";
                  changeCommit(-1);
                  e.stopPropagation();
                  e.preventDefault();
                  break;
                case "ArrowRight":
                  if (e.ctrlKey) dragMode = "r";
                  else dragMode = "m";
                  changeCommit(1);
                  e.stopPropagation();
                  e.preventDefault();
                  break;
                case "Delete":
                  deleteBar();
                  e.stopPropagation();
                  e.preventDefault();
                  break;
                case "Tab":
                  clearActiveBars();
                  dataView?.focus();
                  break;
                default:
                  break;
              }
            };
            event.addEvent(elem, "keydown", keydown);
          } else {
            cell.contentElements.push(null);
            cell.contentElements.push(null);
          }
        });
        const blelem = cloneDomElement(initParams.barLabelElement, (elem) => {
          cell.contentElements.push(elem);
        });
        if (showProgressLine) {
          cloneDomElement(initParams.differenceElement, (elem) => {
            elem.style.display = "none";
            elem.style.visibility = "hidden";
            relem.appendChild(elem);
            cell.contentElements.push(elem);
          });
        } else {
          cell.contentElements.push(null);
        }
        belem.appendChild(blelem);
        relem.appendChild(belem);
        elem.appendChild(relem);
      }
    },
    cellRender: (cell) => {
      const data = cell.row.item.data;
      for (let i = 0, il = props.dataNames.length; i < il; i++) {
        const dn = props.dataNames[i].dataName;
        const d = data[dn] as GanttChartStruct;
        const belem = cell.contentElements[i * 5];
        const v = d.left != null, a = activeBars[d.id] != null;
        if (cell.cache[dn] == null) cell.cache[dn] = {};
        if (cell.cache[dn].visible !== v) {
          if (cell.cache[dn].visible = v) {
            belem.style.removeProperty("display");
            belem.style.removeProperty("visibility");
          } else {
            belem.style.display = "none";
            belem.style.visibility = "hidden";
          }
        }
        let notSameTitle = false;
        if (cell.cache[dn].left !== d.left) {
          belem.style.left = `${(cell.cache[dn].left = d.left) * dcWidth}px`;
          notSameTitle = true;
        }
        if (cell.cache[dn].length !== d.length) {
          belem.style.width = `${(cell.cache[dn].length = d.length) * dcWidth}px`;
          notSameTitle = true;
        }
        if (notSameTitle) belem.title = d.title;
        if (cell.cache[dn].active !== a) belem.setAttribute("data-active", String(cell.cache[dn].active = a));
        if (cell.cache[dn].label !== d.barLabel) cell.contentElements[i * 5 + 3].textContent = cell.cache[dn].label = d.barLabel;
        if (cell.cache[dn].color !== d.color) belem.setAttribute("data-color", cell.cache[dn].color = d.color);
        if (showProgressLine) {
          const plelem = cell.contentElements[i * 5 + 4];
          if (cell.cache[dn].diff !== d.diff) {
            plelem.setAttribute("data-latedate", String(cell.cache[dn].diff = d.diff));
            if (d.diff == null) {
              plelem.style.display = "none";
              plelem.style.visibility = "hidden";
            } else {
              plelem.style.removeProperty("display");
              plelem.style.removeProperty("visibility");
              plelem.style.width = `${Math.abs(d.diff) * dcWidth}px`;
              plelem.style.left = d.diff > 0 ? `${todayLeft * dcWidth}px` : `${(todayLeft + d.diff) * dcWidth}px`;
            }
            const l = d.diff < 0;
            if (cell.cache[dn].late !== l) plelem.setAttribute("data-late", String(cell.cache[dn].late = l));
          }
        }
      }
    },
    clickCell: (params, e) => {
      const elem = e.target as HTMLDivElement;
      const name = elem.getAttribute("data-name");
      if (StringUtils.isEmpty(name)) return;
      const key = elem.getAttribute("data-key");
      const dn = props.dataNames[Number(key)];
      const data = params.data[dn.dataName] as GanttChartStruct;
      if (name === "datecell") {
        draged = false;
        clearActiveBars();
      } else if (name === "bar") {
        let item = activeBars[data.id];
        if (draged) {
          draged = false;
          if (!e.ctrlKey && item == null) clearActiveBars();
        } else {
          if (!e.ctrlKey) clearActiveBars();
        }
        if (disabled || dn.disabled === true) {
          clearActiveBars();
          return;
        }
        if (e.ctrlKey && item != null) {
          delete activeBars[data.id];
          return;
        }
        if (item == null) {
          activeBars[data.id] = {
            index: Number(key),
            data,
            barElem: null,
            originData: params.data,
            dataName: dn,
          };
          setTimeout(() => elem.focus(), 0);
          return;
        }
      }
    },
    clickRow: (params) => {
      if (params.columnName === props.name) return;
      clearActiveBars();
    },
    editedRowData: (data) => {
      for (const dn of props.dataNames) {
        const d = data[dn.dataName] as GanttChartStruct;
        const ret = convertValueToData(data, dn, d.id);
        d.from = ret.from;
        d.to = ret.to;
        d.left = ret.left;
        d.length = ret.length;
        d.barLabel = ret.barLabel
        d.diff = ret.diff;
        d.title = ret.title;
      }
    },
    _beginEdit: ({ endEdit, cell }) => {
      endEdit(false);
      const elem = cell.contentElements.find(elem => elem.getAttribute("data-name") === "bar") as HTMLDivElement;
      if (elem == null) return;
      return null;
    },
    dispose: () => {
      event.dispose();
    },
    jsxStyle: Style,
  };
};

const calcBarLength = (from: Date, to: Date, unit: GanttChartUnit, termFrom: Date) => {
  if (from == null) return undefined;
  if (to == null) return 1;
  switch (unit) {
    case "month":
      return (to.getFullYear() * 12 + to.getMonth()) - (from.getFullYear() * 12 + from.getMonth()) + 1;
    case "week":
      if (to.getTime() - from.getTime() < 0) return undefined;
      return Math.floor((to.getTime() - termFrom.getTime()) / (86400000 * 7)) - Math.floor((from.getTime() - termFrom.getTime()) / (86400000 * 7)) + 1;
    default:
      const dm = to.getTime() - from.getTime();
      if (dm < 0) return undefined;
      return dm / 86400000 + 1;
  }
};
const calcBarLeft = (termFrom: Date, barFrom: Date, unit: GanttChartUnit) => {
  if (termFrom == null || barFrom == null) return undefined;
  switch (unit) {
    case "month":
      return (barFrom.getFullYear() * 12 + barFrom.getMonth()) - (termFrom.getFullYear() * 12 + termFrom.getMonth());
    case "week":
      return Math.floor((barFrom.getTime() - termFrom.getTime()) / 604800000);
    default:
      return (barFrom.getTime() - termFrom.getTime()) / 86400000;
  }
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${dataViewCn}-cell.${cn}-hcell {
  padding: 0px;
}
.${dataViewCn}-cell.${cn}-cell {
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}
.${cn}-wrap {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}
.${cn}-row {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  min-height: 0px;
  overflow: hidden;
}
.${cn}-month_wrap {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  height: 100%;
  overflow: hidden;
}
.${cn}-month {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  min-height: 0px;
  overflow: hidden;
  padding: 2px 5px 0px 5px;
  border-bottom: 1px solid ${CssVar.dataview.header.bdc};
}
.${dataViewCn}-row[data-bdl] .${cn}-month {
  border-bottom: none;
}
.${cn}-date_wrap {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.${cn}-date {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  height: 100%;
  padding-top: 2px;
}
.${cn}-bar_wrap {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  jusitify-content: flex-start;
  align-items: center;
  z-index: 1;
  top: 0px;
  min-height: 100%;
  height: 100%;
  overflow: visible;
}
.${cn}-bar_wrap[data-active="true"] {
  cursor: move;
}
.${cn}-row[data-disabled="false"] > .${cn}-bar-wrap {
  touch-action: none;
}
.${cn}-bar {
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  height: ${CssVar.size};
  max-height: 100%;
  width: 100%;
  user-select: none;
  pointer-events: none;
${design ? `
  height: 80%;
  margin: 0 6px;
  width: calc(100% - 13px);
  opacity: 0.8;
` : ""}
}
${design ? `
.${cn}-bar::before,
.${cn}-bar::after {
  ${CssPV.ba}
  height: 100%;
  width: 7px;
  top: 0px;
  user-select: none;
}
.${cn}-bar::before {
  left: -6px;
  clip-path: polygon(0% 50%, 80% 0%, 100% 0%, 100% 100%, 80% 100%);
}
.${cn}-bar::after {
  right: -6px;
  clip-path: polygon(0% 0%, 20% 0%, 100% 50%, 20% 100%, 0% 100%);
}` : ""}
.${cn}-bar_lbl {
  box-sizing: border-box;
  position: relative;
  pointer-events: none;
  user-select: none;
  z-index: 2;
  display: block;
  overflow: visible;
  white-space: nowrap;
  padding: 2px 5px 0px 5px;
${design ? `
  margin-left: 6px;
` : ""}
}
.${cn}-bar_wrap[data-active="true"] > .${cn}-bar_lbl {
  left: 100%;
  margin-left: 0px;
}
.${cn}-bar_drag {
  box-sizing: border-box;
  position: absolute;
  height: ${CssVar.size};
  max-height: 100%;
  min-width: 5px;
  z-index: 3;
  width: 9px;
  display: block;
}
.${cn}-bar_wrap[data-active="true"] > .${cn}-bar_drag {
  cursor: col-resize;
}
.${cn}-bar_drag_l {
  left: 0px;
}
.${cn}-bar_drag_r {
  right: 0px;
}
.${cn}-diff {
  box-sizing: border-box;
  position: absolute;
  min-height: 1px;
  bottom: 0px;
  height: 6px;
  z-index: 3;
}
.${dataViewCn}-cell[data-bdl] .${cn}-date {
  border-right: none !important;
}
.${cn}-row:last-child,
.${dataViewCn}-row[data-bdl] .${cn}-row {
  border-bottom: none !important;
}
${design ? `
.${cn}-hcell .${cn}-date {
  border-right: 1px solid ${CssVar.dataview.header.bdc};
}
.${dataViewCn}-row[data-oddeven="odd"] > .${cn}-cell .${cn}-date {
  border-right: 1px solid ${CssVar.dataview.cell.bd.b};
}
.${dataViewCn}-row[data-oddeven="odd"] > .${cn}-cell > .${cn}-row {
  border-bottom: 1px solid ${CssVar.dataview.cell.bd.b};
}
.${dataViewCn}-row[data-oddeven="even"] > .${cn}-cell .${cn}-date {
  border-right: 1px solid ${CssVar.dataview.cell.bd.d};
}
.${dataViewCn}-row[data-oddeven="even"] > .${cn}-cell > .${cn}-row {
  border-bottom: 1px solid ${CssVar.dataview.cell.bd.d};
}
.${dataViewCn}-row:hover > .${cn}-cell .${cn}-date,
.${dataViewCn}-row:hover > .${cn}-cell > .${cn}-row {
  border-color: ${CssVar.dataview.cell.hvr.row.bdc};
}
.${dataViewCn}-row:hover > .${cn}-cell:hover .${cn}-date,
.${dataViewCn}-row:hover > .${cn}-cell:hover > .${cn}-row {
  border-color: ${CssVar.dataview.cell.hvr.cell.bdc};
}
.${cn}-date[data-w="0"] {
  background: ${CssVar.week.sun.bgc};
  color: ${CssVar.week.sun.fgc};
}
.${cn}-date[data-w="6"] {
  background: ${CssVar.week.sat.bgc};
  color: ${CssVar.week.sat.fgc};
}
.${dataViewCn}-row:hover .${cn}-cell {
  background: ${CssVar.dataview.cell.hvr.row.bgc} !important;
}
.${dataViewCn}-row:hover .${cn}-cell[data-selected] {
  background: ${CssVar.dataview.cell.act.bgc} !important;
}
.${cn}-cell[data-selected]:hover {
  background: ${CssVar.dataview.cell.act.bgc} !important;
}
.${cn}-date:hover {
  background: ${CssVar.dataview.cell.hvr.cell.bgc};
}
.${cn}-date[data-today="true"] {
  background: ${CssVar.dataview.cell.act.bgc};
}
.${cn}-cell[data-selected]:hover .${cn}-date:hover,
.${cn}-date[data-today="true"]:hover {
  background: ${CssVar.dataview.cell.act.hvr.bgc};
}
.${cn}-hcell[data-progressline] .${cn}-date[data-today="true"]::before,
.${cn}-cell[data-progressline] .${cn}-date[data-today="true"]::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2.5px;
  background: ${CssVar.warning.bdc};
}
.${cn}-diff[data-late="true"] {
  border-top: 4px solid transparent;
  border-left: 2.5px solid ${CssVar.danger.bdc};
  border-bottom: 2.5px solid ${CssVar.danger.bdc};
}
.${cn}-diff[data-late="true"][data-latedate="-1"] {
  border-left: 2.5px solid ${CssVar.warning.bdc};
  border-bottom: 2.5px solid ${CssVar.warning.bdc};
}
.${cn}-diff[data-late="false"] {
  border-top: 4px solid transparent;
  border-right: 2.5px solid ${CssVar.secondary.bdc};
  border-bottom: 2.5px solid ${CssVar.secondary.bdc};
}
.${cn}-bar_wrap[data-active="true"] > .${cn}-bar {
  filter: drop-shadow(0 0 1px ${CssVar.sdw.c});
}
${colorIterator((_s, v, qs) => `
.${cn}-bar_wrap${qs} > .${cn}-bar,
.${cn}-bar_wrap${qs} > .${cn}-bar::before,
.${cn}-bar_wrap${qs} > .${cn}-bar::after {
  background: ${v.ipt.on};
}
.${cn}-bar_wrap[data-active="true"]${qs} > .${cn}-bar {
  border-top: 1px solid ${v.ipt.bdc};
  border-bottom: 1px solid ${v.ipt.bdc};
}
.${cn}-bar_wrap[data-active="true"]${qs} > .${cn}-bar::before,
.${cn}-bar_wrap[data-active="true"]${qs} > .${cn}-bar::after {
  background: ${v.ipt.bdc};
}
`).join("")}
` : ""}
`}</JsxStyle>;

export default DataViewGanttChartColumn;