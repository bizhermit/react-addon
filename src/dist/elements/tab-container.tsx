import React, { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter, Color, colorIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import { iconCn } from "./icon";
import { labelCn } from "./label";
import MaskContainer, { MaskHook, MaskProps, useMask } from "../popups/mask";

const cn = "bh-tab";

type TabKey = string | number;

export type TabContainerHook = {
  selectTab: (tabKey: TabKey) => void;
  showMask: (props?: MaskProps) => void;
  closeMask: () => void;
};
type Hook = _HookSetter<TabContainerHook>;

export type TabContentAttributes = {
  key: TabKey;
  title: string | ReactNode;
  $selected?: () => void;
  $color?: Color;
  children?: ReactNode;
};

export type TabContentWrapperFC<P = {}> = FC<P & TabContentAttributes>;

export type TabContentFC<P = {}> = TabContentWrapperFC<P & {
  $$mask?: MaskHook;
}>;

export const TabContentWrapper: TabContentWrapperFC = ({ children }) => {
  return <>{children}</>;
};

export type TabContainerAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $hook?: TabContainerHook;
  $defaultKey?: TabKey;
  $selected?: (key: TabKey) => void;
  $calcTabWidth?: boolean;
  $color?: Color;
  $navigationBackgroundColor?: boolean;
  children: ReactElement<TabContentAttributes> | Array<ReactElement<TabContentAttributes>>;
};

const TabContainer = React.forwardRef<HTMLDivElement, TabContainerAttributes>((attrs, ref) => {
  const mask = useMask();

  const [key, setKey] = useState<TabKey>(() => {
    if (attrs.$defaultKey != null) return attrs.$defaultKey;
    if (Array.isArray(attrs.children)) return attrs.children[0].key;
    return attrs.children.key;
  });

  const findContent = (key: TabKey) => {
    if (Array.isArray(attrs.children)) {
      return (attrs.children.find(c => String(c.key) === String(key)) ?? attrs.children[0]);
    }
    return attrs.children;
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      selectTab: (k) => setKey(k),
      showMask: (p) => mask.show(p),
      closeMask: () => mask.close(),
    });
  }, [(attrs.$hook as Hook)?._set]);

  const content = useMemo(() => {
    const cont = findContent(key);
    if (typeof cont.type === "string") return cloneElement(cont, { ...cont.props });
    return cloneElement(cont, { ...cont.props, $$mask: mask });
  }, [key, attrs.children]);

  useEffect(() => {
    content.props.$selected?.();
    attrs.$selected?.(key);
  }, [key]);

  return (
    <MaskContainer
      {...attributesWithoutChildren(attrs)}
      ref={ref}
      $hook={mask}
      $fto={attrs.$fto}
      $className={cn}
      $scroll={false}
    >
      <div className={`${cn}-list`} data-calc={attrs.$calcTabWidth} data-nav={attrs.$navigationBackgroundColor} data-color={attrs.$color}>
        {useMemo(() => {
          return (Array.isArray(attrs.children) ? attrs.children : [attrs.children]).map(cont => {
            return (
              <div
                key={cont.key}
                className={`${cn}-tab`}
                data-selected={String(key) === String(cont.key)}
                data-color={cont.props.$color}
                onClick={() => setKey(cont.key)}
              >{cont.props.title ?? ""}</div>
            );
          })
        }, [key, attrs.children])}
      </div>
      <div className={`${cn}-cont ${sbCn}`}>
        {content}
      </div>
      {Style}
    </MaskContainer>
  );
});

export const useTabContainer = (): TabContainerHook => {
  const dispatcher = useRef<Partial<TabContainerHook>>({});

  return {
    selectTab: useCallback((tabKey) => {
      dispatcher.current.selectTab?.(tabKey);
    }, []),
    showMask: useCallback((p) => {
      dispatcher.current.showMask?.(p);
    }, []),
    closeMask: useCallback(() => {
      dispatcher.current.closeMask?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn}-list {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  z-index: 1;
  overflow-y: visible;
  overflow-x: auto;
  overflow-x: overlay;
${switchDesign(design, {
flat: `
  box-shadow: 0 2px 1px -2px ${CssVar.sdw.c};
  margin-bottom: 1px;
`,
material: `
  box-shadow: 0 4px 5px -5px ${CssVar.sdw.c};
  margin-bottom: 3px;
`,
neumorphism: `
  padding-top: ${CssVar.pdy};
  box-shadow: 0px 4px 3px -2px ${CssVar.sdw.d}, 0px -2.5px 1px -2px ${CssVar.sdw.d} inset;
`})}
}
.${cn}-list::-webkit-scrollbar {
  height: 3px !important;
  width: 0px;
  background: transparent !important;
}
.${cn}-list::-webkit-scrollbar-thumb {
  background: ${CssVar.sb.thumb.bgc};
  border-radius: 2px;
}
.${cn}-tab {
  ${CssPV.flex}
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  flex: none;
  user-select: none;
  padding: 2px 10px 0px 10px;
  white-space: nowrap;
  flex: 1;
  overflow: visible;
${switchDesign(design, {
_: `min-height: ${CssVar.size};`,
c: `border-radius: ${CssVar.bdr} ${CssVar.bdr} 0 0;`,
fm: `transition: box-shadow 0.2s, background 0.2s, color 0.2s;`,
flat: `min-height: ${CssVar.size};`,
material: `min-height: calc(${CssVar.size} + 1px);`,
neumorphism: `
  min-height: calc(${CssVar.size} + 2px);
  transition: box-shadow 0.2s;
`})}
}
.${cn}-tab:not([data-selected="true"]) {
  cursor: pointer;
}
.${cn}-list[data-calc="true"] > .${cn}-tab {
  flex: none;
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: 0px;
  width: 100%;
  z-index: 0;
}
${switchDesign(design, {
fm: `
.${cn}-tab[data-selected="true"] {
  box-shadow: 0 -4.5px 0px -2px ${CssVar.bdc} inset;
}
${colorIterator((_s, v, qs) => `
.${cn}-tab${qs} {
  color: ${v.fc};
}
.${cn}-tab${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}-tab${qs}:not([data-selected="true"]):hover {
  background: ${v.btn.base.bgc};
  color: ${v.btn.base.fc};
}
.${cn}-tab${qs}:not([data-selected="true"]):hover .${iconCn} {
  --bh-icon-fc: ${v.btn.base.fc};
  --bh-icon-bc: ${v.btn.base.bgc};
}
.${cn}-list[data-nav="true"]${qs} {
  background: ${v.nav.bgc};
  color: ${v.nav.fc};
}
.${cn}-list[data-nav="true"]${qs} > .${cn}-tab {
  color: ${v.nav.fc};
}
.${cn}-list[data-nav="true"]${qs} > .${cn}-tab .${iconCn} {
  --bh-icon-fc: ${v.nav.fc};
  --bh-icon-bc: ${v.nav.bgc};
}
.${cn}-list[data-nav="true"]${qs} .${labelCn}[data-type="a"],
.${cn}-list[data-nav="true"]${qs} .bh-anchor {
  color: ${v.nav.anchor};
}
${switchDesign(design, {
flat: `
.${cn}-tab${qs}:not([data-selected="true"]):hover:active {
  background: ${v.btn.act.bgc};
  color: ${v.btn.act.fc};
}
.${cn}-tab${qs}:not([data-selected="true"]):hover:active .${iconCn} {
  --bh-icon-fc: ${v.btn.act.fc};
  --bh-icon-bc: ${v.btn.act.bgc};
}`})}
.${cn}-tab${qs}[data-selected="true"] {
  box-shadow: 0 -4.5px 0px -2px ${v.bdc} inset;
}`).join("")}`,
flat: `
.${cn}-tab:not([data-selected="true"]):hover {
  background: ${CssVar.hvrBgc};
}
.${cn}-tab:not([data-selected="true"]):hover:active {
  background: ${CssVar.actBgc};
}`,
material: `
.${cn}-tab:not([data-selected="true"]):hover {
  background: ${CssVar.hvrBgc};
}`,
neumorphism: `
.${cn}-tab[data-selected="true"] {
  box-shadow: 0 -4.5px 0px -2px ${CssVar.bdc} inset;
}
${colorIterator((_s, v, qs) => `
.${cn}-tab${qs} {
  color: ${v.fc};
}
.${cn}-tab${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}-tab${qs}[data-selected="true"] {
  box-shadow: 0 -4.5px 0px -2px ${v.bdc} inset;
}`).join("")}
.${cn}-tab:not([data-selected="true"]):hover {
  box-shadow: ${CssPV.cvxSdD};
}
.${cn}-tab:not([data-selected="true"]):hover:active {
  box-shadow: ${CssPV.ccvSd};
}`})}
`}</JsxStyle>;

export default TabContainer;