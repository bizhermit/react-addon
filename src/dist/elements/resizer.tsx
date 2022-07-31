import React, { FC } from "react";
import CssVar from "../styles/css-var";
import { inputCn } from "../styles/input-style";
import JsxStyle from "../styles/jsx-style";
import { releaseCursor, setCursor } from "../utils/cursor";

const cn = "bh-rsz";
export const resizeCn = cn;

export type ResizeAttributes = {
  direction?: "x" | "y" | "xy";
  reverse?: boolean;
  resizing?: () => void;
  resized?: () => void;
};

const Resizer: FC<ResizeAttributes> = ({ direction, reverse, resizing, resized }) => {
  const resizeStart = (elem: HTMLDivElement, cx: number, cy: number, isTouch?: boolean) => {
    if (!direction) return;
    const pelem = elem.parentElement;
    const prect = pelem.getBoundingClientRect();
    let posX = cx, posY = cy, lastX = prect.width, lastY = prect.height, cursor = "", move: (e: Event) => void;
    if (direction === "x") {
      const moveImpl = (x: number) => {
        pelem.style.width = (x - posX) * (reverse ? -1 : 1) + lastX + "px";
        resizing?.();
      };
      cursor = "col-resize";
      if (isTouch) {
        move = (e: TouchEvent) => moveImpl(e.touches[0].clientX);
      } else {
        move = (e: MouseEvent) => moveImpl(e.clientX);
      }
    } else if (direction === "y") {
      const moveImpl = (y: number) => {
        pelem.style.height = (y - posY) * (reverse ? -1 : 1) + lastY + "px";
        resizing?.();
      };
      cursor = "row-resize";
      if (isTouch) {
        move = (e: TouchEvent) => moveImpl(e.touches[0].clientY);
      } else {
        move = (e: MouseEvent) => moveImpl(e.clientY);
      }
    } else {
      const moveImpl = (x: number, y: number) => {
        pelem.style.width = (x - posX) * (reverse ? -1 : 1) + lastX + "px";
        pelem.style.height = (y - posY) * (reverse ? -1 : 1) + lastY + "px";
        resizing?.();
      };
      cursor = "nwse-resize";
      if (isTouch) {
        move = (e: TouchEvent) => moveImpl(e.touches[0].clientX, e.touches[0].clientY);
      } else {
        move = (e: MouseEvent) => moveImpl(e.clientX, e.clientY);
      }
    }
    if (isTouch) {
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
        resized?.();
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      setCursor(cursor);
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
        resized?.();
      };
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
  };
  if (direction == null) return <></>;
  return (
    <div className={`${cn}_${String(direction)}`}
      onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY)}
      onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true)}
    >{Style}</div>
  );
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}_x,
.${cn}_y,
.${cn}_xy {
  box-sizing: border-box;
  position: absolute;
  flex: none;
  background: transparent;
  z-index: 999;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.1s;
}
*:hover > .${cn}_x,
*:hover > .${cn}_y,
*:hover > .${cn}_xy,
.${cn}_x:active,
.${cn}_y:active,
.${cn}_xy:active {
  opacity: 0.3;
}
.${cn}_x {
  height: calc(100% - ${CssVar.pdy} * 2);
  width: 5px;
  top: ${CssVar.pdy};
  right: 0px;
  cursor: col-resize;
}
.${inputCn}[data-placeholder] > .${cn}_x {
  top: calc(${CssVar.pdy} + ${CssVar.phsize});
  height: calc(100% - ${CssVar.pdy} * 2 - ${CssVar.phsize});
}
.${cn}_x {
  border-right: 3px double ${CssVar.bdc};
}
.${cn}_y {
  width: calc(100% - ${CssVar.pdx} * 2);
  height: 5px;
  bottom: 0px;
  left: ${CssVar.pdx};
  cursor: row-resize;
}
.${cn}_y {
  border-bottom: 3px double ${CssVar.bdc};
}
.${cn}_xy {
  width: 8px;
  height: 8px;
  bottom: 0px;
  right: 0px;
  cursor: nwse-resize;
}
.${cn}_xy {
  border-bottom: 3px double ${CssVar.bdc};
  border-right: 3px double ${CssVar.bdc};
}
`}</JsxStyle>;

export default Resizer;