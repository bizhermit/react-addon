import React, { HTMLAttributes, useCallback, useEffect, useRef } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import { FitToOuter } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { ftoCn } from "../../utils/attributes";
import { releaseCursor, setCursor } from "../../utils/cursor";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";

const cn = "bh-esi";

export type ElectronicSignatureHook = InputHook<string> & {
  clear: (history?: boolean) => void;
  save: () => void;
  redo: () => boolean;
  undo: () => boolean;
  canRedo: () => boolean;
  canUndo: () => boolean;
  clearHistory: () => void;
};
type Hook = _HookSetter<ElectronicSignatureHook>;

export type ElectronicSignatureAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<string> & {
  $hook?: ElectronicSignatureHook;
  $fto?: FitToOuter;
  $border?: InputBorder;
  $height?: number | string | undefined;
  $width?: number | string | undefined;
  $lineWidth?: number;
  $lineColor?: string | CanvasGradient | CanvasPattern;
  $maxHistory?: number;
  $changing?: (ctx: CanvasRenderingContext2D) => void;
};

const ElectronicSignature = React.forwardRef<HTMLDivElement, ElectronicSignatureAttributes>((attrs, ref) => {
  const cref = useRef<HTMLCanvasElement>();
  const { set, buf } = useValue(attrs);
  const revision = useRef<number>(-1);
  const history = useRef<Array<ImageData>>([]);

  const clearHistory = () => {
    history.current.splice(0, history.current.length);
    const ctx = cref.current.getContext("2d");
    history.current.push(ctx.getImageData(0, 0, cref.current.width, cref.current.height));
    spillHistory();
    revision.current = history.current.length - 1;
  };

  const popHistory = () => {
    const popLen = history.current.length - 1 - revision.current;
    if (popLen > 0) {
      history.current.splice(revision.current + 1, popLen);
    }
  };

  const spillHistory = () => {
    const maxLen = Math.max(0, attrs.$maxHistory ?? 100);
    if (history.current.length > maxLen) history.current.splice(0, 1);
  };

  const pushHistory = (imageData: ImageData) => {
    history.current.push(imageData);
    spillHistory();
    revision.current = history.current.length - 1;
  };

  const drawStart = (baseX: number, baseY: number, isTouch?: boolean) => {
    if (attrs.$disabled || attrs.$readOnly || cref.current == null) return;
    const ctx = cref.current.getContext("2d");
    const lineWidth = Math.max(1, attrs.$lineWidth || 2);
    const lineColor = attrs.$lineColor || "black";
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    const rect = cref.current.getBoundingClientRect();
    const posX = rect.left, posY = rect.top;
    let lastX = 0, lastY = 0, curX = baseX - posX, curY = baseY - posY;
    const moveImpl = (x: number, y: number) => {
      lastX = curX;
      lastY = curY;
      curX = x - posX;
      curY = y - posY;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(curX, curY);
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.closePath();
    };
    const endImpl = () => {
      ctx.stroke();
      ctx.closePath();
      pushHistory(ctx.getImageData(0, 0, cref.current.width, cref.current.height));
      attrs.$changing?.(ctx);
    };
    if (isTouch) {
      const move = (e: TouchEvent) => moveImpl(e.touches[0].clientX, e.touches[0].clientY);
      const end = () => {
        endImpl();
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      setCursor("default");
      const move = (e: MouseEvent) => moveImpl(e.clientX, e.clientY);
      const end = () => {
        endImpl();
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
      };
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
    popHistory();
    ctx.beginPath();
    ctx.fillRect(curX - lineWidth / 2, curY - lineWidth / 2, lineWidth, lineWidth);
    ctx.closePath();
  };

  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawStart(e.clientX, e.clientY);
  };
  const touchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    drawStart(touch.clientX, touch.clientY, true);
  };
  
  const saveImpl = () => {
    if (cref.current == null) return;
    set.current(cref.current.toDataURL());
  };

  const clearImpl = (history?: boolean) => {
    if (cref.current == null) return;
    const ctx = cref.current.getContext("2d");
    popHistory();
    ctx.clearRect(0, 0, cref.current.width, cref.current.height);
    pushHistory(ctx.getImageData(0, 0, cref.current.width, cref.current.height));
    if (history) clearHistory();
    attrs.$changing?.(ctx);
  };

  const redoImpl = () => {
    if (revision.current >= history.current.length - 1) return false;
    revision.current = Math.min(history.current.length - 1, revision.current + 1);
    const ctx = cref.current.getContext("2d");
    ctx.putImageData(history.current[revision.current], 0, 0);
    attrs.$changing?.(ctx);
    return true;
  };

  const undoImpl = () => {
    if (revision.current <= 0) return false;
    revision.current = Math.max(0, revision.current - 1);
    const ctx = cref.current.getContext("2d");
    ctx.putImageData(history.current[revision.current], 0, 0);
    attrs.$changing?.(ctx);
    return true;
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => cref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
      clear: clearImpl,
      save: saveImpl,
      redo: redoImpl,
      undo: undoImpl,
      canRedo: () => revision.current >= -1 && revision.current < history.current.length - 1,
      canUndo: () => revision.current > 0,
      clearHistory,
    });
  }, [(attrs.$hook as Hook)?._set]);

  useEffect(() => {
    if (history.current.length > 0) return;
    clearHistory();
  }, []);

  return (
    <div
      {...inputFieldAttributes(attrs, cn, `${inputCn}`, ftoCn(attrs.$fto))}
      ref={ref}
    >
      <canvas
        ref={cref}
        className={`${cn}_main`}
        onMouseDown={mouseDown}
        onTouchStart={touchStart}
        width={attrs.$width}
        height={attrs.$height}
      />
      {InputStyle}
      {Style}
    </div>
  );
});

export const useElectronicSignature = (): ElectronicSignatureHook => {
  const dispatch = useRef<Partial<ElectronicSignatureHook>>({});
  return {
    focus: useCallback(() => {
      dispatch.current.focus?.();
    }, []),
    getValue: useCallback(() => {
      return dispatch.current.getValue?.();
    }, []),
    setValue: useCallback((v) => {
      dispatch.current.setValue?.(v);
    }, []),
    clear: useCallback((h) => {
      dispatch.current.clear?.(h);
    }, []),
    save: useCallback(() => {
      dispatch.current.save?.();
    }, []),
    redo: useCallback(() => {
      return dispatch.current.redo?.() ?? false;
    }, []),
    undo: useCallback(() => {
      return dispatch.current.undo?.() ?? false;
    }, []),
    canRedo: useCallback(() => {
      return dispatch.current.canRedo?.() ?? false;
    }, []),
    canUndo: useCallback(() => {
      return dispatch.current.canUndo?.() ?? false;
    }, []),
    clearHistory: useCallback(() => {
      dispatch.current.clearHistory?.();
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn}>{() => `
.${inputCn}.${cn} {
  width: unset;
  height: unset;
}
.${cn}_main {
  box-sizing: border-box;
  position: relative;
  flex: none;
  touch-action: none;
}`}</JsxStyle>;

export default ElectronicSignature;