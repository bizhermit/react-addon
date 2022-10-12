import React, { HTMLAttributes, useCallback, useEffect, useRef } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import { FitToOuter } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { ftoCn } from "../../utils/attributes";
import { releaseCursor, setCursor } from "../../utils/cursor";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Resizer from "../resizer";

const cn = "bh-esi";

export type ElectronicSignatureHook = InputHook<string> & {
  clear: (preventSave?: boolean) => void;
  save: () => void;
};
type Hook = _HookSetter<ElectronicSignatureHook>;

export type ElectronicSignatureAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<string> & {
  $hook?: ElectronicSignatureHook;
  $fto?: FitToOuter;
  $border?: InputBorder;
  $resize?: boolean | "x" | "y" | "xy";
  $height?: number | string | undefined;
  $width?: number | string | undefined;
  $lineWidth?: number;
  $lineColor?: string | CanvasGradient | CanvasPattern;
};

const ElectronicSignature = React.forwardRef<HTMLDivElement, ElectronicSignatureAttributes>((attrs, ref) => {
  const cref = useRef<HTMLCanvasElement>();
  const { set, buf } = useValue(attrs);

  const drawStart = (baseX: number, baseY: number, isTouch?: boolean) => {
    if (attrs.$disabled || attrs.$readOnly || cref.current == null) return;
    const context = cref.current.getContext("2d");
    const lineWidth = Math.max(1, attrs.$lineWidth || 2);
    const lineColor = attrs.$lineColor || "black";
    context.strokeStyle = lineColor;
    context.fillStyle = lineColor;
    context.lineWidth = lineWidth;
    const rect = cref.current.getBoundingClientRect();
    const posX = rect.left, posY = rect.top;
    let lastX = 0, lastY = 0, curX = baseX - posX, curY = baseY - posY;
    const moveImpl = (x: number, y: number) => {
      lastX = curX;
      lastY = curY;
      curX = x - posX;
      curY = y - posY;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(curX, curY);
      context.lineWidth = lineWidth;
      context.stroke();
      context.closePath();
    };
    const endImpl = () => {
      context.stroke();
      context.closePath();
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
    context.beginPath();
    context.fillRect(curX - lineWidth / 2, curY - lineWidth / 2, lineWidth, lineWidth);
    context.closePath();
  };

  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawStart(e.clientX, e.clientY);
  };
  const touchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    drawStart(touch.clientX, touch.clientY, true);
  };
  
  const save = () => {
    if (cref.current == null) return;
    set.current(cref.current.toDataURL());
  };
  const clear = (preventSave?: boolean) => {
    if (cref.current == null) return;
    cref.current
      .getContext("2d")
      .clearRect(0, 0, cref.current.width, cref.current.height);
    if (preventSave) return;
    save();
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => cref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
      clear,
      save,
    })
  }, [(attrs.$hook as Hook)?._set]);

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
      >
        {attrs.$resize ? <Resizer direction={typeof attrs.$resize === "boolean" ? "xy" : attrs.$resize} /> : <></>}
      </canvas>
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
    clear: useCallback((ps) => {
      dispatch.current.clear?.(ps);
    }, []),
    save: useCallback(() => {
      dispatch.current.save?.();
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