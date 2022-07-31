import React, { CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useRef, useState, cloneElement } from "react";
import CssVar from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { isReactElement } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import usePortalElement from "../hooks/portal-element";
import { createPortal } from "react-dom";

const cn = "bh-pop";

type Position = {
  x?: "center" | "outer" | "inner" | "outer-left" | "outer-right" | "inner-left" | "inner-right";
  y?: "center" | "outer" | "inner" | "outer-bottom" | "outer-top" | "inner-bottom" | "inner-top";
};

export type PopupProps = {
  anchor?: HTMLElement | null;
  position?: Position;
  transparent?: boolean;
  style?: Omit<CSSProperties, "top" | "left" | "display" | "visibility">;
  showed?: () => void;
  closed?: () => void;
  hid?: () => void;
  props?: {[key: string]: any};
};

export type PopupHook = {
  show: (props?: PopupProps) => void;
  hide: () => void;
  close: () => void;
  reposition: (position?: Position) => void;
  isShowed: () => boolean;
  getElement: () => HTMLDivElement;
};
type Hook = _HookSetter<PopupHook>;

type PopupState = PopupProps & {
  $visible: boolean;
  $hide: boolean;
};

type PopupAttributes = {
  $hook: PopupHook;
  $row?: boolean;
  $wrap?: boolean;
  $left?: boolean;
  $center?: boolean;
  $right?: boolean;
  $top?: boolean;
  $middle?: boolean;
  $bottom?: boolean;
  $scroll?: boolean;
  $padding?: boolean;
  $className?: string;
  $data?: {[key: string]: any};
  $preventClickClose?: boolean;
  $position?: Position;
  $transparent?: boolean;
  $style?: Omit<CSSProperties, "top" | "left" | "display" | "visibility">;
  $showed?: () => void;
  $closed?: () => void;
  $hid?: () => void;
  $mask?: boolean;
  children?: ReactNode;
};

export type PopupController = {
  close: () => void;
  hide: () => void;
  reposition: (position: Position) => void;
  getElement: () => HTMLDivElement;
};

export type PopupWindowFC<P = {}> = FC<P & {
  $$popupController?: PopupController;
}>;

type Dispatchs = {
  reposition: (position?: Position) => void;
  getElement: () => HTMLDivElement;
};

const Popup: FC<PopupAttributes> = (attrs) => {
  const [state, setState] = useState<PopupState>({ $visible: false, $hide: false });
  const dispatchRef = useRef<Dispatchs>({
    reposition: () => {},
    getElement: () => undefined,
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
        dispatchRef.current.reposition();
      }
    } else {
      showed.current = false;
      if (portal) {
        portal.style.display = "none";
        portal.setAttribute("data-showed", "false");
        if (state.$hide) {
          attrs.$hid?.();
          state.hid?.();
        } else {
          attrs.$closed?.();
          state.closed?.();
        }
      }
    }
  }, [state]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      show: (props) => {
        setTimeout(() => {
          setState({ ...props, $visible: true, $hide: false, });
        }, 0);
      },
      hide: () => {
        setState(s => {
          return { ...s, $visible: false, $hide: true };
        });
      },
      close: () => {
        setState(s => {
          return { ...s, $visible: false, $hide: false };
        });
      },
      reposition: (pos) => {
        dispatchRef.current.reposition(pos);
      },
      getElement: () => {
        return dispatchRef.current.getElement();
      },
      isShowed: () => showed.current,
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <>
      {portal && (state.$visible || state.$hide) ?
        createPortal(
          <PopupWrapper
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

const PopupWrapper: FC<{
  attrs: PopupAttributes;
  state: PopupState;
  setState: Dispatch<SetStateAction<PopupState>>;
  dispatch: Dispatchs;
}> = ({
  attrs,
  state,
  setState,
  dispatch,
}) => {
  const ref = useRef<HTMLDivElement>();
  const positionRef = useRef<Position>();

  const keydownMask = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") e.preventDefault();
  };

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(s => {
          return { ...s, $visible: false };
        });
      }
    };
    const clickBackground = () => {
      if (attrs.$preventClickClose) return;
      setState(s => {
        return { ...s, $visible: false };
      });
    }
    if (!attrs.$preventClickClose) window.addEventListener("click", clickBackground);
    window.addEventListener("keydown", keydownEvent);
    return () => {
      if (!attrs.$preventClickClose) window.removeEventListener("click", clickBackground);
      window.removeEventListener("keydown", keydownEvent);
    }
  }, []);

  const reposition = useCallback((position?: Position) => {
    setTimeout(() => {
      if (!ref.current) return;
      const pos = position ?? positionRef.current;
      positionRef.current = pos;
      const cRect = ref.current.getBoundingClientRect();
      const cw = document.body.clientWidth, ch = document.body.clientHeight;
      const aelem = state.anchor ?? document.body;
      const aRect = aelem.getBoundingClientRect();
      const maxX = Math.max(0, cw - cRect.width), maxY = Math.max(0, ch - cRect.height);
      const optimizeX = (x: number) => {
        return Math.max(0, Math.min(maxX, x)) + "px";
      };
      switch (pos?.x) {
        case "outer":
          if (aRect.right > maxX) {
            ref.current.style.left = optimizeX(aRect.left - cRect.width);
          } else {
            ref.current.style.left = optimizeX(aRect.right);
          }
          break;
        case "outer-left":
          ref.current.style.left = optimizeX(aRect.left - cRect.width);
          break;
        case "outer-right":
          ref.current.style.left = optimizeX(aRect.right);
          break;
        case "inner":
          if (aRect.left > maxX) {
            ref.current.style.left = optimizeX(aRect.right - cRect.width);
          } else {
            ref.current.style.left = optimizeX(aRect.left);
          }
          break;
        case "inner-left":
          ref.current.style.left = optimizeX(aRect.left);
          break;
        case "inner-right":
          ref.current.style.left = optimizeX(aRect.right - cRect.width);
          break;
        default:
          ref.current.style.left = optimizeX(aRect.left + (aRect.width - cRect.width) / 2);
          break;
      }
      const optimizeY = (y: number) => {
        return Math.max(0, Math.min(maxY, y)) + "px";
      };
      switch (pos?.y) {
        case "outer":
          if (aRect.bottom > maxY) {
            ref.current.style.top = optimizeY(aRect.top - cRect.height);
          } else {
            ref.current.style.top = optimizeY(aRect.bottom);
          }
          break;
        case "outer-top":
          ref.current.style.top = optimizeY(aRect.top - cRect.height);
          break;
        case "outer-bottom":
          ref.current.style.top = optimizeY(aRect.bottom);
          break;
        case "inner":
          if (aRect.top > maxY) {
            ref.current.style.top = optimizeY(aRect.bottom - cRect.height);
          } else {
            ref.current.style.top = optimizeY(aRect.top);
          }
          break;
        case "inner-top":
          ref.current.style.top = optimizeY(aRect.top);
          break;
        case "inner-bottom":
          ref.current.style.top = optimizeY(aRect.bottom - cRect.height);
          break;
        default:
          ref.current.style.top = optimizeY(aRect.top + (aRect.height - cRect.height) / 2);
          break;
      }
    }, 0);
  }, []);

  useEffect(() => {
    positionRef.current = state.position ?? attrs.$position;
    dispatch.reposition = reposition;
    dispatch.getElement = () => ref.current;
  }, []);

  const con = useMemo<PopupController>(() => {
    return {
      close: () => {
        setState(s => {
          return { ...s, $visible: false, $hide: false };
        });
      },
      hide: () => {
        setState(s => {
          return { ...s, $visible: false, $hide: true };
        });
      },
      reposition,
      getElement: () => ref.current,
    };
  }, []);

  return (
    <>
      {attrs.$mask ?
        <div
          className={`${cn}-mask ${cn}-mask_d`}
          tabIndex={0}
          onKeyDown={keydownMask}
        />
        : <></>
      }
      <div
        className={cn}
        ref={ref}
        data-transparent={(state.transparent ?? attrs.$transparent) === true}
        style={(state.style ?? attrs.$style)}
      >
        {isReactElement(attrs.children) ?
          cloneElement(attrs.children, {
            ...state.props,
            $$popupController: con
          }) :
          attrs.children
        }
      </div>
      {attrs.$mask ?
        <div
          className={`${cn}-mask`} 
          tabIndex={0}
          onKeyDown={keydownMask}
        />
        : <></>
      }
    </>
  );
};

export const usePopup = () => {
  const dispatch = useRef<Partial<PopupHook>>({});
  return {
    show: useCallback((p) => {
      dispatch.current.show?.(p);
    }, []),
    hide: useCallback(() => {
      dispatch.current.hide?.();
    }, []),
    close: useCallback(() => {
      dispatch.current.close?.();
    }, []),
    reposition: useCallback(() => {
      dispatch.current.reposition?.();
    }, []),
    isShowed: useCallback(() => {
      return dispatch.current.isShowed?.();
    }, []),
    getElement: useCallback(() => {
      return dispatch.current.getElement?.();
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  z-index: 1000000001;
  position: fixed;
  border-radius: ${CssVar.bdr};
  overflow: hidden;
}
.${cn}[data-transparent="false"] {
  background: ${CssVar.bgc};
  color: ${CssVar.fc};
${design ? `filter: drop-shadow(0 2px 3px ${CssVar.sdw.c});` : ""}
}
.${cn}[data-transparent="true"] {
  background: transpatent;
${design ? `filter: drop-shadow(0 2px 3px ${CssVar.sdw.c});` : ""}
}
.${cn}-mask {
  position: fixed;
  z-index: 1000000000;
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
`}</JsxStyle>;

export default Popup;