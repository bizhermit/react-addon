import React, { cloneElement, Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import CssVar, { CssPV, Color, colorIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import Icon, { iconCn } from "../elements/icon";
import MaskContainer, { MaskHook, useMask } from "./mask";
import { _HookSetter } from "../utils/hook";
import { releaseCursor, setCursor } from "../utils/cursor";
import { isReactElement } from "../utils/attributes";
import usePortalElement from "../hooks/portal-element";
import { createPortal } from "react-dom";

const cn = "bh-dw";

export type DialogWindowProps = {
  showed?: () => void;
  closed?: (props?: {[key: string]: any}) => void;
  hid?: (props?: {[key: string]: any}) => void;
  props?: {[key: string]: any};
};

export type DialogWindowHook = {
  show: (props?: DialogWindowHook) => void;
  close: (props?: {[key: string]: any}) => void;
  hide: (props?: {[key: string]: any}) => void;
  isShowed: () => boolean;
};
type Hook = _HookSetter<DialogWindowHook>;

type DialogWindowState = DialogWindowProps & {
  $visible: boolean;
  $hide?: boolean;
  $hideRetProps?: {[key: string]: any};
  $closeRetProps?: {[key: string]: any};
};

type DialogWindowAttributes = {
  $hook: DialogWindowHook;
  $modal?: boolean;
  $title?: ReactNode;
  $hideHeader?: boolean;
  $hideCloseButton?: boolean;
  $hideMinimizeButton?: boolean;
  $preventMove?: boolean;
  $preventResize?: boolean;
  $fullScreen?: boolean;
  $clickMaskAction?: "none" | "hide" | "close";
  $top?: number | string;
  $left?: number | string;
  $height?: number | string;
  $width?: number | string;
  $color?: Color;
  $showed?: () => void;
  $closed?: (props?: {[key: string]: any}) => void;
  $hid?: (props?: {[key: string]: any}) => void;
  children?: ReactNode;
};

export type DialogWindowController = {
  close: (props?: {[key: string]: any}) => void;
  hide: (props?: {[key: string]: any}) => void;
};

export type DialogWindowFC<P = {}> = FC<P & {
  $$mask?: MaskHook;
  $$dialogWindowController?: DialogWindowController;
}>;

type Dispatchs = {
  toFront: () => void;
};

const DialogWindow: FC<DialogWindowAttributes> = (attrs) => {
  const [state, setState] = useState<DialogWindowState>({ $visible: false });
  const dispatchRef = useRef<Dispatchs>({
    toFront: () => {},
  });
  const showed = useRef(state.$visible);
  const portal = usePortalElement({ mount: (elem) => {
    elem.classList.add(`${cn}-root`);
  } });

  useEffect(() => {
    if (state.$visible) {
      showed.current = true;
      if (portal) {
        portal.style.removeProperty("display");
        portal.setAttribute("data-showed", "");
        attrs.$showed?.();
        state.showed?.();
        dispatchRef.current.toFront();
      }
    } else {
      showed.current = false;
      if (portal) {
        portal.style.display = "none";
        portal.removeAttribute("data-showed");
        if (state.$hide) {
          attrs.$hid?.(state.$hideRetProps);
          state.hid?.(state.$hideRetProps);
        } else {
          attrs.$closed?.(state.$closeRetProps);
          state.closed?.(state.$closeRetProps);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      show: (props) => {
        setTimeout(() => {
          setState({ ...props, $visible: true });
        }, 0);
      },
      close: (props) => {
        setState(s => {
          return { ...s, $visible: false, $hide: false, $closeRetProps: props };
        });
      },
      hide: (props) => {
        setState(s => {
          return { ...s, $visible: false, $hide: true, $hideRetProps: props };
        });
      },
      isShowed: () => showed.current,
    });
  }, [(attrs.$hook as Hook)?._set])

  return (
    <>
      {portal && (state.$visible || state.$hide) ?
        createPortal(
          <DialogWindowWrapper
            state={state}
            setState={setState}
            attrs={attrs}
            dispatch={dispatchRef.current}
          />
        , portal) :
        <></>
      }
      {Style}
    </>
  );
};

const dialogWindowBaseZIndex = 100000000;
const dialogWindowZIndexInterval = 5;
const getMostFrontZIndex = (self?: HTMLElement) => {
  let zindex = -1;
  document.querySelectorAll(`div.${cn}`).forEach(elem => {
    if (elem === self) return;
    zindex = Math.max(zindex, Number(elem.getAttribute("data-zindex") || "0"));
  });
  if (self) {
    const zidx = Number(self.getAttribute("data-zindex") || "0");
    if (zidx === zindex) return zindex;
  }
  return zindex + 1;
};

const DialogWindowWrapper: FC<{
  attrs: DialogWindowAttributes;
  state: DialogWindowState;
  setState: Dispatch<SetStateAction<DialogWindowState>>;
  dispatch: Dispatchs;
}> = ({
  attrs,
  state,
  setState,
  dispatch,
}) => {
  const ref = useRef<HTMLDivElement>();
  const mask = useMask();
  const [zIndex, setZIndex] = useState(getMostFrontZIndex(ref.current));
  const [sizeMode, setSizeMode] = useState<"maximize" | "">(() => attrs.$fullScreen ? "maximize" : "");

  const keydownMask = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") e.preventDefault();
  };
  const clickMask = () => {
    switch (attrs.$clickMaskAction) {
      case "close":
        setState(s => {
          return { ...s, $visible: false, $hide: false };
        });
        break;
      case "hide":
        setState(s => {
          return { ...s, $visible: false, $hide: true };
        });
        break;
      default:
        break;
    }
  };

  const moveStart = (elem: HTMLDivElement, posX: number, posY: number, isTouch?: boolean) => {
    if (attrs.$preventMove || sizeMode === "maximize") return;
    const rect = ref.current.getBoundingClientRect();
    const lPosX = rect.left, lPosY = rect.top;
    const pRect = document.body.getBoundingClientRect();
    const maxTop = pRect.height - rect.height, maxLeft = pRect.width - rect.width;
    const moveImpl = (cx: number, cy: number) => {
      ref.current.style.top = Math.max(0, Math.min(maxTop, lPosY + cy - posY)) + "px";
      ref.current.style.left = Math.max(0, Math.min(maxLeft, lPosX + cx - posX)) + "px"
    };
    if (isTouch) {
      const move = (e: TouchEvent) => moveImpl(e.touches[0].clientX, e.touches[0].clientY);
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      const move = (e: MouseEvent) => moveImpl(e.clientX, e.clientY);
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
      };
      setCursor(getComputedStyle(elem).cursor);
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
  };

  const dblclickHeader = () => {
    if (attrs.$preventResize) return;
    setSizeMode((cur) => {
      if (cur === "maximize") return "";
      return "maximize";
    });
  };

  const resizeStart = (elem: HTMLDivElement, posX: number, posY: number, x: boolean, left: boolean, y: boolean, top: boolean, isTouch?: boolean) => {
    if (attrs.$preventResize || sizeMode === "maximize") return;
    let lPosX = 0, lPosY = 0, lHeight = 0, lWidth = 0, minHeight = 0, maxHeight = 0,
      minWidth = 0, maxWidth = 0, maxTop = 0, maxLeft = 0,
      moveTop = false, moveLeft = false, resizeX = false, resizeY = false;
    const rect = ref.current.getBoundingClientRect();
    const pRect = document.body.getBoundingClientRect();
    if (x) {
      resizeX = true;
      if (left) {
        lPosX = ref.current.offsetLeft;
        lWidth = rect.width;
        maxWidth = ref.current.offsetLeft + rect.width;
        maxLeft = maxWidth - minWidth;
        moveLeft = true;
      } else {
        lPosX = rect.width;
        maxWidth = pRect.width - ref.current.offsetLeft;
      }
    }
    if (y) {
      resizeY = true;
      if (top) {
        lPosY = ref.current.offsetTop;
        lHeight = rect.height;
        maxHeight = ref.current.offsetTop + rect.height;
        maxTop = maxHeight - minHeight;
        moveTop = true;
      } else {
        lPosY = rect.height;
        maxHeight = pRect.height - ref.current.offsetTop;
      }
    }
    const moveImpl = (cx: number, cy: number) => {
      if (resizeX) {
        if (moveLeft) {
          ref.current.style.left = Math.max(0, Math.min(maxLeft, lPosX + cx - posX)) + "px";
          ref.current.style.width = Math.max(minWidth, Math.min(maxWidth, lWidth - cx + posX)) + "px";
        } else {
          ref.current.style.width = Math.max(minWidth, Math.min(maxWidth, lPosX + cx - posX)) + "px";
        }
      }
      if (resizeY) {
        if (moveTop) {
          ref.current.style.top = Math.max(0, Math.min(maxTop, lPosY + cy - posY)) + "px";
          ref.current.style.height = Math.max(minHeight, Math.min(maxHeight, lHeight - cy + posY)) + "px";
        } else {
          ref.current.style.height = Math.max(minHeight, Math.min(maxHeight, lPosY + cy - posY)) + "px";
        }
      }
    }
    if (isTouch) {
      const move = (e: TouchEvent) => moveImpl(e.touches[0].clientX, e.touches[0].clientY);
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      const move = (e: MouseEvent) => moveImpl(e.clientX, e.clientY);
      setCursor(getComputedStyle(elem).cursor);
      const resizeClassName = `div[class^="bh-resize-"]`;
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
        ref.current?.querySelectorAll(resizeClassName).forEach((elem) => {
          (elem as HTMLElement).style.cursor = elem.getAttribute("data-cursor");
        });
      };
      ref.current.querySelectorAll(resizeClassName).forEach((elem) => {
        (elem as HTMLElement).style.cursor = "inherit";
      });
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
  };

  const clickDialogWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    let isCurrent = false;
    const ascend = (elem: HTMLElement) => {
      if (elem == null) return;
      if (elem === ref.current) {
        isCurrent = true;
        return;
      }
      ascend(elem.parentElement);
    }
    ascend(e.target as HTMLElement);
    if (!isCurrent) return;
    setZIndex(getMostFrontZIndex(ref.current));
  };

  useEffect(() => {
    ref.current.setAttribute("data-zindex", String(zIndex));
  }, [zIndex]);

  useEffect(() => {
    const first = ref.current.style.visibility === "hidden";
    ref.current.style.removeProperty("display");
    setTimeout(() => {
      switch (sizeMode) {
        case "maximize":
          break;
        default:
          const rect = ref.current.getBoundingClientRect(), pRect = document.body.getBoundingClientRect();
          const height = Math.min(rect.height, pRect.height), width = Math.min(rect.width, pRect.width);
          ref.current.style.height = height + "px";
          ref.current.style.width = width + "px";
          if (first) {
            ref.current.style.top = Math.max(0, Math.min(attrs.$top != null ? rect.top : pRect.height, (pRect.height - height) / 2)) + "px";
            ref.current.style.left = Math.max(0, Math.min(attrs.$left != null ? rect.left : pRect.width, (pRect.width - width) / 2)) + "px";
          } else {
            if (rect.top + height > pRect.height) ref.current.style.top = (pRect.height - height) + "px";
            if (rect.left + width > pRect.width) ref.current.style.left = (pRect.width - width) + "px";
          }
          break;
      }
      if (first) ref.current.style.removeProperty("visibility");
    }, 0);
  }, [sizeMode]);

  const con = useMemo<DialogWindowController>(() => {
    return {
      close: (props) => {
        setState(s => {
          return { ...s, $visible: false, $hide: false, $closeRetProps: props };
        });
      },
      hide: (props) => {
        setState(s => {
          return { ...s, $visible: false, $hide: true, $hideRetProps: props };
        });
      },
    };
  }, []);

  useEffect(() => {
    dispatch.toFront = () => {
      setZIndex(getMostFrontZIndex(ref.current));
    }
  }, []);

  return (
    <>
    {attrs.$modal ?
      <div
        className={`${cn}-mask ${cn}-mask_d`}
        tabIndex={0}
        onClick={clickMask}
        onKeyDown={keydownMask}
        style={{
          zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval,
        }}
      /> : <></>
    }
    <div
      ref={ref}
      className={cn}
      onClick={clickDialogWindow}
      data-size={sizeMode}
      data-move={attrs.$preventMove !== true}
      style={{
        top: attrs.$top,
        left: attrs.$left,
        height: attrs.$height,
        width: attrs.$width,
        visibility: "hidden",
        zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval + 2
      }}
      data-color={attrs.$color}
      data-zindex={zIndex}
    >
      <div className={`${cn}-cont`}>
        {attrs.$hideHeader ? <></> :
          <div
            className={`${cn}-header`}
            onDoubleClick={dblclickHeader}
            onMouseDown={e => moveStart(e.currentTarget, e.clientX, e.clientY)}
            onTouchStart={e => moveStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true)}
            data-move={attrs.$preventMove !== true}
          >
            <div className={`${cn}-title`}>{attrs.$title}</div>
            {attrs.$hideMinimizeButton ? <></> : <>
              <div
                className={`${cn}-min`}
                onClick={() => { con.hide() }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Icon $image="minus" />
              </div>
            </>}
            {attrs.$hideCloseButton ? <></> : <>
              <div
                className={`${cn}-close`}
                onClick={() => { con.close() }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Icon $image="cross" />
              </div>
            </>}
          </div>
        }
        <MaskContainer
          $hook={mask}
          $fto="fy"
          $scroll
          className={`${cn}-body`}
        >
          {isReactElement(attrs.children) ?
            cloneElement(attrs.children, {
              ...state.props,
              $$mask: mask,
              $$dialogWindowController: con
            }) :
            attrs.children
          }
        </MaskContainer>
      </div>
      {attrs.$preventResize || sizeMode === "maximize" ? <></> : <>
        <div
          className={`${cn}-resize ${cn}-lt`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, true, true, true)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, true, true, true, true)}
        />
        <div
          className={`${cn}-resize ${cn}-ct`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, false, false, true, true)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, false, false, true, true, true)}
        />
        <div
          className={`${cn}-resize ${cn}-rt`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, false, true, true)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, false, true, true, true)}
        />
        <div
          className={`${cn}-resize ${cn}-lm`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, true, false, false)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, true, false, false, true)}
        />
        <div
          className={`${cn}-resize ${cn}-rm`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, false, false, false)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, false, false, false, true)}
        />
        <div
          className={`${cn}-resize ${cn}-lb`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, true, true, false)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, true, true, false, true)}
        />
        <div
          className={`${cn}-resize ${cn}-cb`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, false, false, true, false)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, false, false, true, false, true)}
        />
        <div
          className={`${cn}-resize ${cn}-rb`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY, true, false, true, false)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true, false, true, false, true)}
        />
      </>}
    </div>
    {attrs.$modal ?
      <div
        className={`${cn}-mask`} 
        tabIndex={0}
        onClick={clickMask}
        onKeyDown={keydownMask}
        style={{
          zIndex: dialogWindowBaseZIndex + zIndex * dialogWindowZIndexInterval + 1,
        }}
      /> : <></>
    }
    </>
  );
};

export const useDialogWindow = () => {
  const diaptch = useRef<Partial<DialogWindowHook>>({});
  return {
    show: useCallback((p) => {
      diaptch.current.show?.(p);
    }, []),
    close: useCallback((p) => {
      diaptch.current.close?.(p);
    }, []),
    hide: useCallback((p) => {
      diaptch.current.hide?.(p);
    }, []),
    _set: useCallback((d) => {
      diaptch.current = d;
    }, []),
  } as Hook;
};

const resizeSize = `var(--bh-dw-resize, 6px)`;
const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  background: transparent;
  overflow: hidden;
${design ? `filter: drop-shadow(0 2px 3px ${CssVar.sdw.c});` : ""}
}
.${cn}:not([data-size="maximize"]):not([data-move="false"]) {
  padding: 6px;
}
.${cn}[data-size="maximize"] {
  top: 0px !important;
  left: 0px !important;
  height: 100% !important;
  width: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background: ${CssVar.bgc};
  color: ${CssVar.fc};
  border-radius: ${CssVar.bdr};
  overflow: hidden;
}
.${cn}-header {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  min-height: ${CssVar.size};
  width: 100%;
  user-select: none;
  z-index: 1;
  overflow: hidden;
${switchDesign(design, {
flat: `
  box-shadow: 0 0 1px ${CssVar.sdw.c};
  margin-bottom: 1px;
`,
material: `
  box-shadow: 0 0 5px -1px ${CssVar.sdw.c};
  margin-bottom: 2px;
`,
neumorphism: `
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.d}, 0px -2.5px 1px -2px ${CssVar.sdw.d} inset;
  margin-bottom: 3px;
  padding: 3px;
`
})}
}
.${cn}-header[data-move="true"] {
  cursor: move;
}
.${cn}-title {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
  overflow: hidden;
}
.${cn}-close,
.${cn}-min {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  cursor: pointer;
  height: ${CssVar.size};
  width: ${CssVar.size};
  border-radius: ${CssVar.bdr};
  opacity: 0.8;
${switchDesign(design, {
fm: `transition: background 0.1s;`,
neumorphism: `transition: box-shadow 0.1s;`
})}
}
${switchDesign(design, {
fm: `
.${cn}-min:hover {
  background: ${CssVar.default.btn.hvr.bgc};
}
.${cn}-min:hover > .${iconCn} {
  --bh-icon-fc: ${CssVar.default.btn.hvr.fc};
  --bh-icon-bc: ${CssVar.default.btn.hvr.bgc};
}
.${cn}-min:hover:active {
  background: ${CssVar.default.btn.act.bgc};
}
.${cn}-min:hover:active > .${iconCn} {
  --bh-icon-fc: ${CssVar.default.btn.act.fc};
  --bh-icon-bc: ${CssVar.default.btn.act.bgc};
}
.${cn}-close:hover {
  background: ${CssVar.danger.btn.hvr.bgc};
}
.${cn}-close:hover > .${iconCn} {
  --bh-icon-fc: ${CssVar.danger.btn.hvr.fc};
  --bh-icon-bc: ${CssVar.danger.btn.hvr.bgc};
}
.${cn}-close:hover:active {
  background: ${CssVar.danger.btn.act.bgc};
}
.${cn}-close:hover:active > .${iconCn} {
  --bh-icon-fc: ${CssVar.danger.btn.act.fc};
  --bh-icon-bc: ${CssVar.danger.btn.act.bgc};
}`,
neumorphism: `
.${cn}-min:hover {
  box-shadow: ${CssPV.cvxSd};
}
.${cn}-close > .${iconCn} {
  --bh-icon-fc: ${CssVar.danger.fc};
  --bh-icon-bc: ${CssVar.bgc};
}
.${cn}-close:hover {
  box-shadow: ${CssPV.cvxSd};
}
.${cn}-min:hover:active,
.${cn}-close:hover:active {
  box-shadow: ${CssPV.ccvSd};
}
`})}
.${cn}-body {
  flex: none;
  z-index: 0;
}
.${cn}-resize {
  background: transparent;
  position: absolute;
  touch-action: none;
}
.${cn}-lt,
.${cn}-rb {
  height: ${resizeSize};
  width: ${resizeSize};
  cursor: nwse-resize;
}
.${cn}-lt {
  top: 0px;
  left: 0px;
}
.${cn}-rb {
  bottom: 0px;
  right: 0px;
}
.${cn}-rt,
.${cn}-lb {
  height: ${resizeSize};
  width: ${resizeSize};
  cursor: nesw-resize;
}
.${cn}-rt {
  top: 0px;
  right: 0px;
}
.${cn}-lb {
  bottom: 0px;
  left: 0px;
}
.${cn}-ct,
.${cn}-cb {
  height: ${resizeSize};
  width: calc(100% - ${resizeSize} * 2);
  left: ${resizeSize};
  cursor: ns-resize;
}
.${cn}-ct {
  top: 0px;
}
.${cn}-cb {
  bottom: 0px;
}
.${cn}-lm,
.${cn}-rm {
  height: calc(100% - ${resizeSize} * 2);
  width: ${resizeSize};
  top: ${resizeSize};
  cursor: ew-resize;
}
.${cn}-lm {
  left: 0px;
}
.${cn}-rm {
  right: 0px;
}
.${cn}-mask {
  position: fixed;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  height: 100% !important;
  width: 100% !important;
  cursor: default;
  background: ${CssVar.mask.bgc};
}
.${cn}-mask_d {
  background: transparent;
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-cont > .${cn}-header {
  background: ${v.head.bgc};
  color: ${v.head.fc};
}
`).join("")}
`}</JsxStyle>;

export default DialogWindow;