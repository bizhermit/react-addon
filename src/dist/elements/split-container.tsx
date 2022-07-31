import React, { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Dispatch } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";
import { releaseCursor, setCursor } from "../utils/cursor";
import { _HookSetter } from "../utils/hook";
import MaskContainer, { MaskHook, MaskProps, useMask } from "../popups/mask";

const cn = "bh-spl";
const defaultSize = "calc(50% - 2.5px)";

export type SplitContainerHook = {
  setSecondarySize: (size?: number | string) => void;
  setVisible: Dispatch<{ primary?: boolean; secondary?: boolean; }>;
  showMask: (props?: MaskProps) => void;
  closeMask: () => void;
};
type Hook = _HookSetter<SplitContainerHook>;

export type SplitController = {
  dispatch: (params?: {[key: string]: any}) => SplitController;
  setDispatcher: (dispatcher: (params?: {[key: string]: any}) => void) => SplitController;
  setVisible: (visible: { self?: boolean; partner?: boolean; }) => SplitController;
  isVisibleSelf: () => boolean;
  isVisiblePartner: () => boolean;
};

export type SplitContentAttributes = {
  children?: ReactNode;
};

export type SplitContentWrapperFC<P = {}> = FC<P & SplitContentAttributes>;

export type SplitContentFC<P = {}> = SplitContentWrapperFC<P & {
  $$mask?: MaskHook;
  $$splitController?: SplitController;
}>;

export const SplitContentWrapper: SplitContentWrapperFC = ({ children }) => {
  return <>{children}</>;
};

export type SplitContainerAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $hook?: SplitContainerHook;
  $column?: boolean;
  $reverse?: boolean;
  $hidePrimary?: boolean;
  $defaultHidePrimary?: boolean;
  $secondarySize?: number | string;
  $defaultSecondarySize?: number | string;
  $hideSecondary?: boolean;
  $defaultHideSecondary?: boolean;
  $disabled?: boolean;
  children?: [ReactElement<SplitContentAttributes>, ReactElement<SplitContentAttributes>];
};

const SplitContainer = React.forwardRef<HTMLDivElement, SplitContainerAttributes>((attrs, ref) => {
  const mask = useMask();
  const c2 = useRef<HTMLDivElement>();
  const dispatcher = useRef<{ c1?: (_: {[key: string]: any}) => void; c2?: (_: {[key: string]: any}) => void; }>({});
  const [c1Attrs, setC1Attrs] = useState({});
  const [c2Attrs, setC2Attrs] = useState({});
  const vref = useRef({ c1: true, c2: true });
  const [visible, setVisible] = useReducer((state: { c1: boolean; c2: boolean; }, action: { primary?: boolean; secondary?: boolean; }) => {
    let c1 = action.primary ?? state.c1;
    let c2 = action.secondary ?? state.c2;
    if (attrs.$hidePrimary != null) c1 = !attrs.$hidePrimary;
    if (attrs.$hideSecondary != null) c2 = !attrs.$hideSecondary;
    if (!c1 && !c2) return vref.current = state;
    return vref.current = { c1, c2 };
  }, (() => {
    let c1 = true, c2 = true;
    if (attrs.$defaultHidePrimary) c1 = false;
    if (attrs.$hidePrimary != null) c1 = !attrs.$hidePrimary;
    if (attrs.$defaultHideSecondary) c2 = false;
    if (attrs.$hideSecondary != null) c2 = !attrs.$hideSecondary;
    if (!c1 && !c2) c1 = true;
    return vref.current = { c1, c2 };
  })());
  
  const c2Size = useRef<number | string>(attrs.$defaultSecondarySize ?? defaultSize);
  useMemo(() => {
    c2Size.current = attrs.$defaultSecondarySize ?? defaultSize;
  }, [attrs.$column]);

  const resizeStart = (helem: HTMLDivElement, cx: number, cy: number, isTouch?: boolean) => {
    if (attrs.$disabled === true) return;
    const celem = helem.parentElement, pos = attrs.$column ? cy : cx;
    let lastSize = 0, maxSize = 0, minSize = 0, cursor = "col-resize";
    let moveImpl: (num: number) => void;
    if (attrs.$column) {
      lastSize = c2.current.getBoundingClientRect().height;
      maxSize = celem.getBoundingClientRect().height - helem.getBoundingClientRect().height;
      minSize = 0;
      cursor = "row-resize";
      moveImpl = cy => c2.current.style.height =
        (c2Size.current = Math.max(minSize, Math.min(maxSize, lastSize + (pos - cy) * (attrs.$reverse ? -1 : 1)))) + "px";
    } else {
      lastSize = c2.current.getBoundingClientRect().width;
      maxSize = celem.getBoundingClientRect().width - helem.getBoundingClientRect().width;
      minSize = 0;
      cursor = "col-resize";
      moveImpl = cx => c2.current.style.width =
        (c2Size.current = Math.max(minSize, Math.min(maxSize, lastSize + (pos - cx) * (attrs.$reverse ? -1 : 1)))) + "px";
    }
    if (isTouch) {
      const move = attrs.$column ? 
        (e: TouchEvent) => moveImpl(e.touches[0].clientY) :
        (e: TouchEvent) => moveImpl(e.touches[0].clientX);
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      setCursor(cursor);
      const move = attrs.$column ?
        (e: MouseEvent) => moveImpl(e.clientY) :
        (e: MouseEvent) => moveImpl(e.clientX);
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
      };
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
  };

  const c1Con = useMemo<SplitController>(() => {
    return {
      dispatch: (params) => {
        if (dispatcher.current.c2 == null) setC2Attrs(params ?? {});
        else dispatcher.current.c2(params);
        return c1Con;
      },
      setDispatcher: (func) => {
        dispatcher.current.c1 = func;
        return c1Con;
      },
      setVisible: (v) => {
        setVisible({ primary: v.self, secondary: v.partner });
        return c1Con;
      },
      isVisibleSelf: () => vref.current.c1,
      isVisiblePartner: () => vref.current.c2,
    };
  }, []);

  const c2Con = useMemo<SplitController>(() => {
    return {
      dispatch: (params) => {
        if (dispatcher.current.c1 == null) setC1Attrs(params ?? {});
        else dispatcher.current.c1(params);
        return c2Con;
      },
      setDispatcher: (func) => {
        dispatcher.current.c2 = func;
        return c2Con;
      },
      setVisible: (v) => {
        setVisible({ primary: v.partner, secondary: v.self });
        return c2Con;
      },
      isVisibleSelf: () => vref.current.c2,
      isVisiblePartner: () => vref.current.c1,
    }
  }, []);

  useEffect(() => {
    setVisible({});
  }, [attrs.$hidePrimary, attrs.$hideSecondary]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      setSecondarySize: (size) => {
        const pelem = c2.current?.parentElement;
        if (pelem == null) return;
        const flow = pelem.getAttribute("data-flow");
        let s = size;
        if (s == null) s = defaultSize;
        if (typeof s === "number") s = s + "px";
        if (flow === "column") c2.current.style.height = s;
        else c2.current.style.width = s;
      },
      setVisible,
      showMask: (props) => mask.show(props),
      closeMask: () => mask.close(),
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <MaskContainer
      {...attributesWithoutChildren(attrs)}
      ref={ref}
      $hook={mask}
      $fto={attrs.$fto}
      $row={attrs.$column !== true}
      $className={cn}
      $scroll={false}
      $data={{ 
        "data-reverse": attrs.$reverse
      }}
    >
      <div
        className={`${cn}-c1 ${sbCn}`}
        style={{
          display: visible.c1 ? undefined : "none",
        }}
      >
        {cloneElement(attrs.children[0] as ReactElement, { ...c1Attrs, $$mask: mask, $$splitController: c1Con })}
      </div>
      {visible.c1 && visible.c2 && attrs.$disabled !== true && attrs.$secondarySize == null ?
        <div
          className={`${cn}-handle`}
          onMouseDown={e => resizeStart(e.currentTarget, e.clientX, e.clientY)}
          onTouchStart={e => resizeStart(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY, true)}
        /> : <></>
      }
      <div
        ref={c2}
        className={`${cn}-c2 ${sbCn}`}
        style={{
          display: visible.c2 ? undefined : "none",
          height: attrs.$column ? (attrs.$secondarySize ?? c2Size.current) : undefined,
          width: attrs.$column ? undefined : (attrs.$secondarySize ?? c2Size.current),
        }}
        data-fill={visible.c1 ? undefined : ""}
      >
        {cloneElement(attrs.children[1] as ReactElement, { ...c2Attrs, $$mask: mask, $$splitController: c2Con })}
      </div>
      {Style}
    </MaskContainer>
  );
});

export const useSplitContainer = (): SplitContainerHook => {
  const dispatch = useRef<Partial<SplitContainerHook>>({});

  return {
    setSecondarySize: useCallback((size) => {
      dispatch.current.setSecondarySize?.(size);
    }, []),
    setVisible: useCallback(({ primary, secondary }) => {
      dispatch.current.setVisible?.({ primary, secondary });
    }, []),
    showMask: useCallback((p) => {
      dispatch.current.showMask?.(p);
    }, []),
    closeMask: useCallback(() => {
      dispatch.current.closeMask?.();
    }, []),
    _set: useCallback((dispatcher) => {
      dispatch.current = dispatcher;
    }, []),
  } as Hook;
};


const Style = <JsxStyle id={cn}>{() => `
.${cn}[data-flow="col"][data-reverse="true"] {
  flex-direction: column-reverse;
}
.${cn}[data-flow="row"][data-reverse="true"] {
  flex-direction: row-reverse;
}
.${cn}-handle {
  background: ${CssVar.bdc};
  touch-action: none;
  opacity: 0.2;
  transition: opacity 0.1s;
}
.${cn}-handle:hover {
  opacity: 0.4;
}
.${cn}-handle:active {
  opacity: 0.5;
}
.${cn}-c1, .${cn}-c2 {
  ${CssPV.flex}
  flex: none;
  max-height: 100%;
  max-width: 100%;
}
.${cn}-c1,
.${cn}-c2[data-fill] {
  flex: 1;
}
.${cn}[data-flow="row"] > .${cn}-handle {
  height: 100%;
  width: 5px;
  cursor: col-resize;
}
.${cn}[data-flow="row"] > .${cn}-c1,
.${cn}[data-flow="row"] > .${cn}-c2 {
  height: 100%;
}
.${cn}[data-flow="col"] > .${cn}-handle {
  height: 5px;
  width: 100%;
  cursor: row-resize;
}
.${cn}[data-flow="col"] > .${cn}-c1,
.${cn}[data-flow="col"] > .${cn}-c2 {
  width: 100%;
}
`}</JsxStyle>;

export default SplitContainer;