import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React from "react";
import { ListViewColumnProps, ListViewClass } from "../list-view";
import JsxStyle from "../../../styles/jsx-style";
import CssVar, { CssPV } from "../../../styles/css-var";
import { cloneDomElement, getDomEventManager } from "../../../utils/dom";
import { releaseCursor, setCursor } from "../../../utils/cursor";

const cn = "bh-lv_c-rod";

type Props = {
  name?: string;
  width?: number;
  disabled?: boolean;
  range?: "cell" | "row";
  fixed?: boolean;
  borderless?: boolean;
};
const ListViewReorderColumn: (props?: Props) => ListViewColumnProps = (props) => {
  const range = props?.range ?? "cell", disabled = props?.disabled === true;
  let listView: ListViewClass;
  let pinchingRowElem: HTMLDivElement, conElem: HTMLDivElement;
  let pinchingRowIndex = -1, lastPos = 0, pos = 0, lastTop = 0;
  let mouseup = (_m: number) => { }, mouseSpace = (_r: number) => { };
  const event = getDomEventManager();
  const bodyScrollEvent = () => mouseSpace(lastTop);
  const mousemoveEvent = (e: MouseEvent) => mouseSpace(e.clientY - pos + lastPos);
  const mouseupEvent = (e: MouseEvent) => {
    mouseup(e.clientY - pos + lastPos);
    conElem.removeChild(pinchingRowElem);
    event.removeEvent(conElem, "scroll", bodyScrollEvent);
    conElem = null;
    releaseCursor();
    window.removeEventListener("mouseup", mouseupEvent);
    window.removeEventListener("mousemove", mousemoveEvent);
  };
  const touchmoveEvent = (e: TouchEvent) => mouseSpace(e.touches[0].clientY - pos + lastPos);
  const touchendEvent = (e: TouchEvent) => {
    mouseup(e.changedTouches[0].clientY - pos + lastPos);
    conElem.removeChild(pinchingRowElem);
    event.removeEvent(conElem, "scroll", bodyScrollEvent);
    conElem = null;
    window.removeEventListener("touchend", touchendEvent);
    window.removeEventListener("touchmove", touchmoveEvent);
  };

  return {
    name: props?.name ?? StringUtils.generateUuidV4(),
    sort: false,
    resize: false,
    width: props?.width ?? (range === "row" ? 0 : -1),
    cellTextAlign: "center",
    fixed: props?.fixed,
    disabled: props?.disabled,
    tabStop: false,
    initialize: () => {
      const elem = document.createElement("div");
      elem.classList.add(cn);
      return { elem };
    },
    _lv: (lv) => {
      listView = lv;
    },
    cellInitialize: (cell, params) => {
      if (disabled !== true) {
        const listenerImpl = (isTouch?: boolean) => {
          const rowElem = cell.row.element;
          lastPos = rowElem.offsetTop;
          pinchingRowElem = cloneDomElement(rowElem);
          pinchingRowElem.classList.add(`${cn}-pinching`);
          pinchingRowElem.style.top = rowElem.offsetTop + "px";
          pinchingRowElem.style.left = rowElem.offsetLeft + "px";
          if (conElem == null) {
            conElem = listView.getBodyElement();
            event.addEvent(conElem, "scroll", bodyScrollEvent);
          }
          const bodyScrollTop = listView.getBodyScrollTop();
          conElem.appendChild(pinchingRowElem);
          pinchingRowIndex = cell.row.index;
          mouseup = (top: number) => {
            listView.dropMoveRow(pinchingRowIndex, top - bodyScrollTop + listView.getBodyScrollTop());
          };
          mouseSpace = (top: number) => {
            const t = (lastTop = top) - bodyScrollTop + listView.getBodyScrollTop();
            listView.dragMovingRow(pinchingRowIndex, t);
            pinchingRowElem.style.top = t + "px";
          };
          if (isTouch) {
            window.addEventListener("touchend", touchendEvent);
            window.addEventListener("touchmove", touchmoveEvent);
          } else {
            setCursor("move");
            window.addEventListener("mouseup", mouseupEvent);
            window.addEventListener("mousemove", mousemoveEvent);
          }
        };
        const listener = (e: MouseEvent) => {
          e.stopPropagation();
          pos = e.clientY;
          listenerImpl();
        };
        const targetElem = range === "row" ? cell.row.element : cell.element;
        targetElem.classList.add(`${cn}-range`);
        event.addEvent(targetElem, "mousedown", listener);
        const touchListener = (e: TouchEvent) => {
          e.preventDefault();
          pos = e.touches[0].clientY;
          listenerImpl(true);
        }
        event.addEvent(targetElem, "touchstart", touchListener);
      }
      cell.element.appendChild(cloneDomElement(params.elem));
    },
    cellDispose: (cell) => {
      event.removeEventIterator(de => de.element === (range === "row" ? cell.row.element : cell.element));
    },
    dispose: () => {
      event.dispose();
    },
    jsxStyle: Style,
  };
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}-range {
  cursor: move;
}
.${cn}::before,
.${cn}::after {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 4px;
  width: 50%;
  left: 25%;
  background: ${CssVar.fgc};
  opacity: 0.7;
}
.${cn}::before {
  top: calc(50% - 6px);
}
.${cn}::after {
  bottom: calc(50% - 6px);
}
.${cn}[data-disabled="true"] > .${cn}-icon {
  ${CssPV.inactOpacity}
}
.${cn}[data-disabled="false"] {
  touch-action: none;
}
.${cn}-pinching {
  position: absolute;
  z-index: 1000;
  filter: drop-shadow(0 2px 3px ${CssVar.sdw.c});
}
`}</JsxStyle>;

export default ListViewReorderColumn;