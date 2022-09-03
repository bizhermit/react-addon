import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { HTMLAttributes, ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter, Color, colorIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../utils/attributes";
import { pressPositiveKey } from "../utils/dom";
import { _HookSetter } from "../utils/hook";
import Icon, { iconCn, IconImage, varIconBc, varIconFc } from "./icon";
import Label from "./label";

const cn = "bh-acd";
const defaultAnimationInterval = 10;
const defaultAnimationDuration = 200;

export type AccordionContainerHook = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
type Hook = _HookSetter<AccordionContainerHook>;

export type AccordionContainerAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $hook?: AccordionContainerHook;
  $disabled?: boolean;
  $header?: ReactNode;
  $defaultClose?: boolean;
  $close?: boolean;
  $toggled?: (opened: boolean) => void;
  $animationDuration?: number;
  $height?: number;
  $borderless?: boolean;
  $color?: Color;
  $openedIconImage?: IconImage;
  $closedIconImage?: IconImage;
  $iconPosition?: "left" | "right" | "none";
};

const AccordionContainer = React.forwardRef<HTMLDivElement, AccordionContainerAttributes>((attrs, $ref) => {
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);
  const bref = useRef<HTMLDivElement>();
  const [opened, setOpen] = useState(attrs.$close ?? attrs.$defaultClose !== true);
  const mountedCont = useRef(opened);
  const animationOff = useRef(opened || attrs.$defaultClose == true);

  const toggle = (flag?: boolean) => {
    if (attrs.$disabled) return;
    const ret = flag ?? !opened;
    if (ret) mountedCont.current = true;
    setOpen(ret);
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(c => !c),
    });
  }, [(attrs.$hook as Hook)?._set]);

  useEffect(() => {
    let actKey = true;
    if (bref.current) {
      const animationCount = Math.max(Math.floor(Math.max((attrs.$animationDuration ?? defaultAnimationDuration), 1) / defaultAnimationInterval), 1);
      if (opened) {
        ref.current.style.removeProperty("height");
        if (attrs.$height != null) {
          ref.current.style.maxHeight = ref.current.style.height = typeof attrs.$height === "number" ? (attrs.$height + "px") : attrs.$height;
        }
        bref.current.style.visibility = "hidden";
        bref.current.style.overflow = "hidden";
        bref.current.style.removeProperty("display");
        const max = bref.current.offsetHeight;
        const interval = Math.max(1, Math.floor(max / animationCount));
        bref.current.style.height = bref.current.style.maxHeight = bref.current.style.minHeight = "0px";
        bref.current.style.removeProperty("visibility");
        const ended = () => {
          bref.current.style.removeProperty("overflow");
          bref.current.style.removeProperty("height");
          bref.current.style.removeProperty("max-height");
          bref.current.style.removeProperty("min-height");
          ref.current.style.removeProperty("max-height");
          if (attrs.$height) {
            ref.current.style.height = typeof attrs.$height === "number" ? (attrs.$height + "px") : attrs.$height;
          }
          attrs.$toggled?.(opened);
        }
        if (animationOff.current) {
          ended();
          animationOff.current = false;
        } else {
          let h = 0;
          const impl = async () => {
            if (!actKey) return;
            h += interval;
            if (h > max) {
              ended();
              return;
            }
            bref.current.style.height = bref.current.style.maxHeight = bref.current.style.minHeight = `${h}px`;
            setTimeout(impl, defaultAnimationInterval);
          };
          impl();
        }
      } else {
        const ended = () => {
          bref.current.style.removeProperty("overflow");
          bref.current.style.removeProperty("height");
          bref.current.style.removeProperty("max-height");
          bref.current.style.removeProperty("min-height");
          bref.current.style.display = "none";
          bref.current.style.visibility = "hidden";
          ref.current.style.height = "auto !important";
          attrs.$toggled?.(opened);
        };
        if (animationOff.current) {
          ended();
          animationOff.current = false;
        } else {
          bref.current.style.removeProperty("display");
          const max = bref.current.offsetHeight;
          const interval = Math.max(1, Math.floor(max / animationCount));
          bref.current.style.overflow = "hidden";
          bref.current.style.removeProperty("visibility");
          bref.current.style.height = bref.current.style.maxHeight = bref.current.style.minHeight = `${max}px`;
          ref.current.style.removeProperty("height");
          let h = max;
          const impl = async () => {
            if (!actKey) return;
            h -= interval;
            if (h < 0) {
              ended();
              return;
            }
            bref.current.style.height = bref.current.style.maxHeight = bref.current.style.minHeight = `${h}px`;
            setTimeout(impl, defaultAnimationInterval);
          };
          impl();
        }
      }
    }
    return () => {
      actKey = false;
    };
  }, [opened]);

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      ref={ref}
      tabIndex={undefined}
      data-color={attrs.$color}
      data-opened={opened}
      data-disabled={attrs.$disabled}
      data-borderless={attrs.$borderless}
    >
      <div
        className={`${cn}-header`}
        tabIndex={attrs.$disabled ? null : attrs.tabIndex ?? 0}
        onClick={() => toggle()}
        onKeyDown={e => pressPositiveKey(e, () => toggle())}
        data-iconpos={attrs.$iconPosition}
      >
        {attrs.$disabled || attrs.$iconPosition === "none" ? <></> : <Icon $image={opened ? attrs.$openedIconImage ?? "pull-up" : attrs.$closedIconImage ?? "pull-down"} $transition />}
        {StringUtils.isString(attrs.$header) ? <Label className={`${cn}-lbl`}>{attrs.$header}</Label> : attrs.$header}
      </div>
      <div
        ref={bref}
        className={`${cn}-body ${sbCn}`}
        style={{ display: attrs.$defaultClose ? "none" : undefined }}
      >
        {attrs.children}
      </div>
      {Style}
    </div>
  );
});

export const useAccordionContainer = (): AccordionContainerHook => {
  const dispatcher = useRef<Partial<AccordionContainerHook>>({});

  return {
    open: useCallback(() => {
      dispatcher.current.open?.();
    }, []),
    close: useCallback(() => {
      dispatcher.current.close?.();
    }, []),
    toggle: useCallback(() => {
      dispatcher.current.toggle?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: visible;
  background: inherit;
  color: inherit;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: 0px;
  width: 100%;
  z-index: 0;
${switchDesign(design, {
c: `border-radius: 0 0 ${CssVar.bdr} ${CssVar.bdr};`,
fm: `
  border-left: 1px solid ${CssVar.bdc};
  border-bottom: 1px solid ${CssVar.bdc};
  border-right: 1px solid ${CssVar.bdc};
`,
neumorphism: `box-shadow: ${CssPV.nCcvSdActive};`
})}
}
.${cn}-header {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  overflow: visible;
  width: 100%;
  z-index: 1;
  font-weight: bold;
  min-height: ${CssVar.size};
  padding: 0px ${CssVar.pdx};
${switchDesign(design, {
c: `border-radius: ${CssVar.bdr};`,
fm: `
  background: inherit;
  color: inherit;
  border: 1px solid ${CssVar.bdc};
`,
flat: `transition: background 0.1s, color 0.1s;`,
material: `transition: background 0.1s, color 0.1s, box-shadow 0.1s, top 0.1s;`,
neumorphism: `
  box-shadow: ${CssPV.nCvxSdBase};
  transition: background 0.1s, color 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;
`})}
}
.${cn}-header[data-iconpos="right"] {
  flex-flow: row-reverse nowrap;
}
.${cn}:not([data-disabled="true"]) > .${cn}-header {
  cursor: pointer;
  user-select: none;
}
.${cn}[data-opened="true"] > .${cn}-header {
  border-radius: ${CssVar.bdr} ${CssVar.bdr} 0 0;
}
${switchDesign(design, {
fm: `
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {
  background: ${CssVar.hvrBgc};
}
${switchDesign(design, {
flat: `
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {
  background: ${CssVar.actBgc};
}`})}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-header {
  background: ${v.btn.base.bgc};
  color: ${v.btn.base.fgc};
}
.${cn}${qs} > .${cn}-header .${iconCn} {
  ${varIconFc}: ${v.btn.base.fgc};
  ${varIconBc}: ${v.btn.base.bgc};
}
.${cn}${qs}:not([data-disabled="true"]) > .${cn}-header:hover {
  background: ${v.btn.hvr.bgc};
  color: ${v.btn.hvr.fgc};
  border-color: ${v.btn.hvr.bdc};
}
.${cn}${qs}:not([data-disabled="true"]) > .${cn}-header:hover .${iconCn} {
  ${varIconFc}: ${v.btn.hvr.fgc};
  ${varIconBc}: ${v.btn.hvr.bgc};
}
${switchDesign(design, {
flat: `
.${cn}${qs}:not([data-disabled="true"]) > .${cn}-header:hover:active {
  background: ${v.btn.act.bgc};
  color: ${v.btn.act.fgc};
  border-color: ${v.btn.act.bdc};
}
.${cn}${qs}:not([data-disabled="true"]) > .${cn}-header:hover:active .${iconCn} {
  ${varIconFc}: ${v.btn.act.fgc};
  ${varIconBc}: ${v.btn.act.bgc};
}`})}
.${cn}${qs} > .${cn}-body {
  border-color: ${v.bdc};
}
`).join("")}
.${cn}[data-borderless="true"] > .${cn}-body {
  border: unset;
  border-radius: unset;
}
.${cn}[data-borderless="true"] > .${cn}-header {
  border-radius: ${CssVar.bdr};
}`,
material: `
.${cn}:not([data-disabled="true"]) > .${cn}-header {
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.c};
}
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
}
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {
  box-shadow: unset;
}`,
neumorphism: `
.${cn}:not([data-disabled="true"]) > .${cn}-header {
  box-shadow: ${CssPV.nCvxSdBase};
}
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover {
  box-shadow: ${CssPV.nCvxSdHover};
}
.${cn}:not([data-disabled="true"]) > .${cn}-header:hover:active {
  box-shadow: ${CssPV.nCcvSdActive};
}
.${cn}[data-borderless="true"] > .${cn}-header {
  border-radius: ${CssVar.bdr};
}
.${cn}[data-borderless="true"] > .${cn}-body {
  box-shadow: unset;
  border-radius: unset;
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-header {
  color: ${v.fgc};
}
.${cn}${qs} > .${cn}-header .${iconCn} {
  ${varIconFc}: ${v.fgc};
}
`).join("")}
`})}
`}</JsxStyle>;

export default AccordionContainer;