import React, { createContext, FC, HTMLAttributes, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CssVar, { CssPV, FitToOuter } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import FlexBox, { flexBoxCn } from "../elements/flex-box";

const cn = "bh-mask";

export type MaskImage = "spin" | "flow";
export type MaskProps = {
  image?: MaskImage;
  content?: ReactNode;
};

type MaskState = MaskProps & {
  visible?: boolean;
};

export type MaskHook = {
  show: (props?: MaskProps) => void;
  close: () => void;
};
type Hook = _HookSetter<MaskHook>;

export type MaskAttributes = HTMLAttributes<HTMLDivElement> & {
  $hook: MaskHook;
  $fto?: FitToOuter;
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
  children?: ReactNode;
};

const MaskContainer = React.forwardRef<HTMLDivElement, MaskAttributes>((attrs, ref) => {
  const [state, setState] = useState<MaskState>();

  useMemo(() => {
    (attrs.$hook as Hook)?._set({
      show: (props) => setState({ ...props, visible: true}),
      close: () => setState({ visible: false }),
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      ref={ref}
    >
      <FlexBox
        $fto="f"
        $row={attrs.$row}
        $wrap={attrs.$wrap}
        $left={attrs.$left}
        $center={attrs.$center}
        $right={attrs.$right}
        $top={attrs.$top}
        $middle={attrs.$middle}
        $bottom={attrs.$bottom}
        $scroll={attrs.$scroll ?? true}
        $padding={attrs.$padding}
        className={attrs.$className}
        {...attrs.$data}
      >
        {attrs.children}
      </FlexBox>
      {state?.visible ? <MaskWall $state={state} /> : <></>}
      {Style}
    </div>
  );
});

const MaskWall: FC<HTMLAttributes<HTMLDivElement> & {
  $state: MaskState;
}> = (attrs) => {
  const ref = useRef<HTMLDivElement>();

  const keydown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const monitorFocus = useCallback((targetElement: HTMLElement) => {
    if (targetElement == null) return;
    const targets: Array<HTMLElement> = [];
    const root = ref.current?.parentElement;
    if (!root) return;
    root.childNodes.forEach((elem: HTMLElement) => {
      if (elem === root) return;
      targets.push(elem);
    });
    let hit = false;
    const upstream = (elem: HTMLElement) => {
      hit = targets.indexOf(elem) >= 0;
      if (hit || !elem.parentElement) return;
      upstream(elem.parentElement);
    };
    upstream(targetElement);
    if (hit) ref.current.focus();
    return hit;
  }, []);

  const blur = (e: React.FocusEvent) => {
    if (e.relatedTarget != null && e.relatedTarget.className.indexOf(cn) >= 0) return;
    monitorFocus(e.relatedTarget as HTMLElement);
  };

  useEffect(() => {
    ref.current.focus();
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setTimeout(() => {
          if (monitorFocus(document.activeElement as HTMLElement)) {
            (e.target as HTMLElement)?.focus?.();
          }
        }, 0);
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, []);

  return (
    <div
      {...attributesWithoutChildren(attrs, `${cn}-wall`)}
      ref={ref}
      tabIndex={0}
      onKeyDown={keydown}
      onBlur={blur}
    >
      {attrs.$state.image ? <div className={`${cn}-image`} data-image={attrs.$state.image}></div> : <></>}
      {attrs.$state.content ? <div className={`${cn}-cont`}>{attrs.$state.content}</div> : <></>}
    </div>
  );
};

const Style = <JsxStyle id={cn}>{({}) => `
.${cn} {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}
.${cn}-wall {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: none;
  z-index: 2000000000;
  flex: none;
  background: ${CssVar.mask.bgc};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.${cn}-image {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  margin-top: 10px;
}
.${cn} > .${flexBoxCn} {
  z-index: 0;
}
.${cn}-image::before,
.${cn}-image::after {
  ${CssPV.ba}
}
.${cn}-image[data-image="spin"] {
  height: calc(${CssVar.size} * 2);
  width: calc(${CssVar.size} * 2);
}
.${cn}-image[data-image="spin"]::before,
.${cn}-image[data-image="spin"]::after {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.${cn}-image[data-image="spin"]::before {
  border-left: 8px solid ${CssVar.mask.ifc};
  border-right: 8px double ${CssVar.mask.ifc};
  border-top: 8px double ${CssVar.mask.ifc};
  border-bottom: 8px double ${CssVar.mask.ifc};
  animation: maskSpin 1s linear 0s infinite normal;
}
.${cn}-image[data-image="spin"]::after {
  border-left: 8px solid ${CssVar.mask.ifc};
  border-right: 8px solid ${CssVar.mask.ifc};
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  animation: maskSpin 1.5s linear 0s infinite normal;
}
@keyframes maskSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.${cn}-image[data-image="flow"] {
  height: calc(${CssVar.size} / 2);
  width: 50%;
  border-radius: calc(${CssVar.size} / 4);
  border: 2px solid ${CssVar.mask.ifc};
}
.${cn}-image[data-image="flow"]::before {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 20%;
  border-radius: calc(${CssVar.size} / 4);
  background: ${CssVar.mask.ifc};
  animation: maskFlow 2s linear 0s infinite normal;
}
@keyframes maskFlow {
  0% { left: -20%; }
  100% { left: 120%; }
}
`}</JsxStyle>;

const MaskContext = createContext<MaskHook>({
  show: () => { console.log("not set") },
  close: () => { console.log("not set") },
});

export const MaskProvider: FC<Omit<MaskAttributes, "$hook"> & { initProps?: MaskProps; }> = (props) => {
  const mask = useMask({ ...props.initProps });
  
  return (
    <MaskContext.Provider value={mask}>
      <MaskContainer
        {...props}
        $fto={props.$fto ?? "f"}
        $hook={mask}
      >
        {props.children}
      </MaskContainer>
    </MaskContext.Provider>
  );
};

export const useMask = (initProps?: { show?: boolean; } & MaskProps): MaskHook => {
  const dispatch = useRef<Partial<MaskHook>>({});
  const ctx = useContext(MaskContext);
  
  useEffect(() => {
    if (dispatch.current?.show == null) {
      if ((ctx as Hook)._set != null) dispatch.current = ctx;
    }
    if (initProps?.show) {
      dispatch.current.show?.(initProps);
    }
  }, []);

  return {
    close: useCallback(() => {
      dispatch.current.close?.();
    }, []),
    show: useCallback((props) => {
      dispatch.current.show?.({ ...initProps, ...props });
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook;
};

export default MaskContainer;