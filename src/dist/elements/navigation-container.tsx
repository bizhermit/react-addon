import React, { cloneElement, FunctionComponent, HTMLAttributes, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter, Color, switchDesign, ColorType } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, colorCn, ftoCn } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";

const cn = "bh-nvg";

export type NavigationContainerHook = {
  openNavigation: () => void;
  closeNavigation: () => void;
  toggleNavigation: () => void;
};
type Hook = _HookSetter<NavigationContainerHook>;

type NavigationAttributes = HTMLAttributes<HTMLDivElement> & { 
  children?: ReactNode;
  $position?: "left" | "top" | "right" | "bottom";
  $mode?: "visible" | "edge" | "manual";
  $color?: Color;
  $colorType?: ColorType;
  $toggled?: (opened: boolean) => void;
  $edgeSize?: number | string;
  $preventClickClose?: boolean;
  $animationDuration?: number;
  $$opened?: boolean;
}
type NavigationElement = ReactElement<NavigationAttributes>;
export interface NavigationFC extends FunctionComponent<NavigationAttributes> {
  (props: NavigationAttributes, context?: any): NavigationElement;
};

const defaultEdgeHeight = "10%";
const defaultEdgeWidth = "5%";
const defaultAnimationInterval = 10;
const defaultAnimationDuration = 200;

export type NavigationContainerAttributes = HTMLAttributes<HTMLDivElement> & {
  $hook?: NavigationContainerHook;
  $fto?: FitToOuter;
  $toggled?: (opened: boolean) => void;
  children: [NavigationElement, ...Array<ReactElement>];
};

const NavigationContainer = React.forwardRef<HTMLDivElement, NavigationContainerAttributes>((attrs, ref) => {
  const navCont = attrs.children[0];
  const pos = navCont.props.$position ?? "left";
  const mode = navCont.props.$mode ?? "visible";
  const [opened, setOpen] = useState(() => {
    if (mode === "visible") return true;
    return false;
  });
  const nref = useRef<HTMLElement>();

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      openNavigation: () => setOpen(true),
      closeNavigation: () => setOpen(false),
      toggleNavigation: () => setOpen(c => !c),
    });
  }, [(attrs.$hook as Hook)?._set]);

  const mouseEnter = () => {
    if (mode !== "edge") return;
    setOpen(true);
  };
  const mouseLeave = () => {
    if (mode !== "edge") return;
    setOpen(false);
  };

  const closeEvent = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    let actKey = true;
    const nav = nref.current;
    const toggled = () => {
      navCont.props.$toggled?.(opened);
      attrs.$toggled?.(opened);
    };
    if (opened) {
      // open
      if (mode === "edge" || mode === "manual") {
        const animationCount = Math.max(Math.floor(Math.max((navCont.props.$animationDuration ?? defaultAnimationDuration), 1) / defaultAnimationInterval), 1);
        if (pos === "left" || pos === "right") {
          nav.style.visibility = "hidden";
          nav.style.removeProperty("width");
          nav.style.removeProperty("max-width");
          nav.style.removeProperty("min-width");
          nav.style.removeProperty("display");
          nav.style.removeProperty("overflow");
          let s = navCont.props.$edgeSize ?? defaultEdgeWidth;
          const max = nav.offsetWidth;
          if (typeof s === "number") s = s + "px";
          if (mode === "manual") s = "0px"
          nav.style.width = nav.style.maxWidth = nav.style.minWidth = s;
          const min = nav.offsetWidth;
          const interval = Math.max(1, Math.floor((max - min)/ animationCount));
          nav.style.removeProperty("visibility");
          const ended = () => {
            nav.style.removeProperty("width");
            nav.style.removeProperty("max-width");
            nav.style.removeProperty("min-width");
            toggled();
          };
          let w = min;
          const impl = async () => {
            if (!actKey) return;
            w += interval;
            if (w > max) {
              ended();
              return;
            }
            nav.style.width = nav.style.maxWidth = nav.style.minWidth = `${w}px`;
            setTimeout(impl, defaultAnimationInterval);
          };
          impl();
        } else {
          nav.style.visibility = "hidden";
          nav.style.removeProperty("height");
          nav.style.removeProperty("max-height");
          nav.style.removeProperty("min-height");
          nav.style.removeProperty("display");
          nav.style.removeProperty("overflow");
          let s = navCont.props.$edgeSize ?? defaultEdgeHeight;
          const max = nav.offsetHeight;
          if (typeof s === "number") s = s + "px";
          if (mode === "manual") s = "0px"
          nav.style.height = nav.style.maxHeight = nav.style.minHeight = s;
          const min = nav.offsetHeight;
          const interval = Math.max(1, Math.floor((max - min)/ animationCount));
          nav.style.removeProperty("visibility");
          const ended = () => {
            nav.style.removeProperty("height");
            nav.style.removeProperty("max-height");
            nav.style.removeProperty("min-height");
            toggled();
          };
          let w = min;
          const impl = async () => {
            if (!actKey) return;
            w += interval;
            if (w > max) {
              ended();
              return;
            }
            nav.style.height = nav.style.maxHeight = nav.style.minHeight = `${w}px`;
            setTimeout(impl, defaultAnimationInterval);
          };
          impl();
        }
      } else {
        toggled();
      }
    } else {
      // close
      if (mode === "edge" || mode === "manual") {
        setTimeout(() => {
          if (!actKey) return;
          const animationCount = Math.max(Math.floor(Math.max((navCont.props.$animationDuration ?? defaultAnimationDuration), 1) / defaultAnimationInterval), 1);
          if (pos === "left" || pos === "right") {
            let s = navCont.props.$edgeSize ?? defaultEdgeWidth;
            if (typeof s === "number") s = s + "px";
            if (mode === "manual") s = "0px";
            const ended = () => {
              nav.style.width = nav.style.maxWidth = nav.style.minWidth = s as string;
              nav.style.removeProperty("hidden");
              toggled();
            };
            nav.style.removeProperty("display");
            const max = nav.offsetWidth;
            nav.style.overflow = "hidden";
            nav.style.removeProperty("visibility");
            nav.style.width = nav.style.maxWidth = nav.style.minWidth = s;
            let min = nav.offsetWidth;
            nav.style.width = nav.style.maxWidth = nav.style.minWidth = `${max}px`;
            const interval = Math.max(1, Math.floor((max - min) / animationCount));
            let w = max;
            const impl = async () => {
              if (!actKey) return;
              w -= interval;
              if (w < min) {
                ended();
                return;
              }
              nav.style.width = nav.style.maxWidth = nav.style.minWidth = `${w}px`;
              setTimeout(impl, defaultAnimationInterval);
            };
            impl();
          } else {
            let s = navCont.props.$edgeSize ?? defaultEdgeHeight;
            if (typeof s === "number") s = s + "px";
            if (mode === "manual") s = "0px";
            const ended = () => {
              nav.style.height = nav.style.maxHeight = nav.style.minHeight = s as string;
              nav.style.removeProperty("hidden");
              toggled();
            };
            nav.style.removeProperty("display");
            const max = nav.offsetHeight;
            nav.style.overflow = "hidden";
            nav.style.removeProperty("visibility");
            nav.style.height = nav.style.maxHeight = nav.style.minHeight = s;
            let min = nav.offsetHeight;
            nav.style.height = nav.style.maxHeight = nav.style.minHeight = `${max}px`;
            const interval = Math.max(1, Math.floor((max - min) / animationCount));
            let w = max;
            const impl = async () => {
              if (!actKey) return;
              w -= interval;
              if (w < min) {
                ended();
                return;
              }
              nav.style.height = nav.style.maxHeight = nav.style.minHeight = `${w}px`;
              setTimeout(impl, defaultAnimationInterval);
            };
            impl();
          }
        }, 100);
      } else {
        toggled();
      }
    }
    if (opened && mode === "manual" && navCont.props.$preventClickClose !== true) {
      window.addEventListener("click", closeEvent);
    }
    return () => {
      actKey = false;
      if (opened && mode === "manual" && navCont.props.$preventClickClose !== true) {
        window.removeEventListener("click", closeEvent);
      }
    };
  }, [opened]);

  useEffect(() => {
    const nav = nref.current;
    switch (mode) {
      case "visible":
        nav.style.removeProperty("display");
        nav.style.removeProperty("overflow");
        nav.style.removeProperty("width");
        nav.style.removeProperty("height");
        nav.style.removeProperty("max-width");
        nav.style.removeProperty("max-height");
        nav.style.removeProperty("min-width");
        nav.style.removeProperty("min-height");
        nav.style.removeProperty("visibility");
        if (!opened) setOpen(true);
        break;
      case "edge":
        let s = navCont.props.$edgeSize ?? (pos === "left" || pos === "right" ? defaultEdgeWidth : defaultEdgeHeight);
        if (typeof s === "number") s = s + "px";
        if (pos === "left" || pos === "right") {
          nav.style.removeProperty("height");
          nav.style.removeProperty("max-height");
          nav.style.removeProperty("min-height");
          nav.style.width = nav.style.maxWidth = nav.style.minWidth = s;
        } else {
          nav.style.removeProperty("width");
          nav.style.removeProperty("max-width");
          nav.style.removeProperty("min-width");
          nav.style.height = nav.style.maxHeight = nav.style.maxHeight = s;
        }
        nav.style.overflow = "hidden";
        nav.style.removeProperty("display");
        nav.style.removeProperty("visibility");
        if (opened) setOpen(false);
        break;
      case "manual":
        if (pos === "left" || pos === "right") {
          nav.style.width = nav.style.maxWidth = nav.style.minWidth = "0px"
          nav.style.removeProperty("height");
          nav.style.removeProperty("min-height");
          nav.style.removeProperty("max-height");
        } else {
          nav.style.height = nav.style.maxHeight = nav.style.maxHeight = "0px";
          nav.style.removeProperty("width");
          nav.style.removeProperty("max-width");
          nav.style.removeProperty("min-width");
        }
        nav.style.removeProperty("visibility");
        nav.style.overflow = "hidden";
        nav.style.display = "none";
        if (opened) setOpen(false);
        break;
      default:
        break;
    }
  }, [mode, pos]);

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      ref={ref}
      data-pos={pos}
      data-mode={mode}
    >
      <nav
        ref={nref}
        {...attributesWithoutChildren(navCont.props, `${cn}-nav`, sbCn, colorCn(navCont.props.$color, navCont.props.$colorType || "nav"))}
        data-opened={opened}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={(e) => { e.stopPropagation() }}
      >
        {cloneElement(navCont, { $$opened: opened })}
      </nav>
      {mode === "edge" ?
        <div
          className={`${cn}-nav_dummy`}
          style={{
            width: navCont.props.$edgeSize ?? defaultEdgeWidth,
            height: navCont.props.$edgeSize ?? defaultEdgeHeight,
          }}
        /> : <></>
      }
      <div className={`${cn}-body ${sbCn}`}>
        {attrs.children.slice(1)}
      </div>
      {Style}
    </div>
  )
});

export const useNavigationContainer = (): NavigationContainerHook => {
  const dispatcher = useRef<Partial<NavigationContainerHook>>({});

  return {
    openNavigation: useCallback(() => {
      dispatcher.current.openNavigation?.();
    }, []),
    closeNavigation: useCallback(() => {
      dispatcher.current.closeNavigation?.();
    }, []),
    toggleNavigation: useCallback(() => {
      dispatcher.current.toggleNavigation?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, [])
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex-wrap: nowrap;
  overflow: visible;
}
.${cn}[data-pos="left"] {
  flex-direction: row;
}
.${cn}[data-pos="right"] {
  flex-direction: row-reverse;
}
.${cn}[data-pos="top"] {
  flex-direction: column;
}
.${cn}[data-pos="bottom"] {
  flex-direction: column-reverse;
}
.${cn}-nav_dummy {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
}
.${cn}-nav {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  z-index: 2;
  background: ${CssVar.bgc};
  min-width: 0px;
  min-height: 0px;
  max-width: 100%;
  max-height: 100%;
}
.${cn}[data-pos="left"] > .${cn}-nav,
.${cn}[data-pos="right"] > .${cn}-nav {
  flex-flow: column nowrap;
  height: 100%;
}
.${cn}[data-pos="top"] > .${cn}-nav,
.${cn}[data-pos="bottom"] > .${cn}-nav {
  flex-flow: row nowrap;
  width: 100%;
}
.${cn}[data-mode="visible"] > .${cn}-nav {
  position: relative;
}
.${cn}[data-mode="edge"] > .${cn}-nav,
.${cn}[data-mode="manual"] > .${cn}-nav {
  position: absolute;
}
.${cn}[data-mode="edge"][data-pos="left"] > .${cn}-nav,
.${cn}[data-mode="edge"][data-pos="top"] > .${cn}-nav,
.${cn}[data-mode="manual"][data-pos="left"] > .${cn}-nav,
.${cn}[data-mode="manual"][data-pos="top"] > .${cn}-nav {
  top: 0px;
  left: 0px;
}
.${cn}[data-mode="edge"][data-pos="right"] > .${cn}-nav,
.${cn}[data-mode="manual"][data-pos="right"] > .${cn}-nav {
  top: 0px;
  right: 0px;
}
.${cn}[data-mode="edge"][data-pos="bottom"] > .${cn}-nav,
.${cn}[data-mode="manual"][data-pos="bottom"] > .${cn}-nav {
  bottom: 0px;
  left: 0px;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
}
.${cn}[data-pos="left"] > .${cn}-body,
.${cn}[data-pos="right"] > .${cn}-body {
  height: 100%;
  flex: 1;
  min-width: 0px;
}
.${cn}[data-pos="top"] > .${cn}-body,
.${cn}[data-pos="bottom"] > .${cn}-body {
  width: 100%;
  flex: 1;
  min-height: 0px;
}
${switchDesign(design, {
fm: `
.${cn}[data-pos="left"] > .${cn}-nav {
  box-shadow: 2px 0 1px -2px ${CssVar.sdw.c};
}
.${cn}[data-pos="right"] > .${cn}-nav {
  box-shadow: -2px 0 1px -2px ${CssVar.sdw.c};
}
.${cn}[data-pos="top"] > .${cn}-nav {
  box-shadow: 0 2px 1px -2px ${CssVar.sdw.c};
}
.${cn}[data-pos="bottom"] > .${cn}-nav {
  box-shadow: 0 -2px 1px -2px ${CssVar.sdw.c};
}`,
material: `
.${cn}[data-pos="left"] > .${cn}-nav {
  box-shadow: 5px 0 5px -1px ${CssVar.sdw.c};
}
.${cn}[data-pos="right"] > .${cn}-nav {
  box-shadow: -5px 0 5px -1px ${CssVar.sdw.c};
}
.${cn}[data-pos="top"] > .${cn}-nav {
  box-shadow: 0 5px 5px -1px ${CssVar.sdw.c};
}
.${cn}[data-pos="bottom"] > .${cn}-nav {
  box-shadow: 0 -5px 5px -1px ${CssVar.sdw.c};
}`,
neumorphism: `
.${cn} > .${cn}-nav {
  box-shadow: ${CssPV.nCvxSd(4)};
}`})}
`}</JsxStyle>;

export const Navigation: NavigationFC = (props: NavigationAttributes) => {
  return <>{props.children}</>;
};

export default NavigationContainer;