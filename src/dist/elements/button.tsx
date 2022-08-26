import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { ButtonHTMLAttributes, MouseEvent, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import CssVar, { CssPV, Color, colorIterator, switchDesign, Size, sizeIterator, varFontSize } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, dBool } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import Icon, { iconCn, IconImage } from "./icon";
import Label from "./label";

const cn = "bh-btn";
export const buttonCn = cn;

export type ButtonHook = {
  focus?: () => void;
};
type Hook = _HookSetter<ButtonHook>;

export type ButtonIconProps = IconImage | {
  $image: IconImage;
  $color?: Color;
  $round?: boolean;
};

export type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  $hook?: ButtonHook;
  $color?: Color;
  $size?: Size;
  $click?: (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => void;
  $round?: boolean;
  $transparent?: boolean;
  $fillLabel?: boolean;
  $icon?: ButtonIconProps;
  $iconRight?: boolean;
  $borderless?: boolean;
  $stopPropagation?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonAttributes>((attrs, $ref) => {
  const ref = useRef<HTMLButtonElement>();
  useImperativeHandle($ref, () => ref.current);
  const [disabled, setDisabled] = useState(attrs.disabled ?? false);

  const lock = () => {
    setDisabled(true);
  };
  const unlock = (preventFocus?: boolean) => {
    setDisabled(false);
    if (preventFocus !== true) ref.current?.focus();
  };

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    if (attrs.disabled || disabled) return;
    if (attrs.$stopPropagation) e.stopPropagation();
    lock();
    (async () => {
      const ret = attrs.$click?.((pf) => unlock(pf), e);
      if (ret == null) unlock(true);
    })();
  };

  useEffect(() => {
    unlock(true);
  }, [attrs.disabled]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => ref.current?.focus(),
    });
  }, [(attrs.$hook as Hook)?._set])

  return (
    <button
      {...attributesWithoutChildren(attrs, cn)}
      ref={ref}
      disabled={attrs.disabled || disabled}
      onClick={click}
      data-size={attrs.$size ?? "m"}
    >
      <div
        className={`${cn}-body`}
        data-color={attrs.$color}
        data-round={attrs.$round}
        data-content={attrs.children != null}
        data-icon={attrs.$icon != null}
        data-iconright={attrs.$iconRight}
        data-filllabel={attrs.$fillLabel}
        data-trp={dBool(attrs.$transparent)}
        data-bdl={attrs.$borderless}
      >
        {attrs.$icon == null ? <></> : <Icon {...(StringUtils.isString(attrs.$icon) ? { $image: attrs.$icon } : attrs.$icon)} $transition />}
        {StringUtils.isString(attrs.children) ? <Label className={`${cn}-lbl`}>{attrs.children}</Label> : attrs.children}
      </div>
      {ButtonStyle}
    </button>
  );
});

export const useButton = (): ButtonHook => {
  const dispatcher = useRef<ButtonHook>({});
  return {
    focus: useCallback(() => {
      dispatcher.current.focus?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const varBtnSize = "--btn-size";
const btnSize = `var(${varBtnSize})`;

const ButtonStyle = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn},
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  flex: none;
}
.${cn} {
  justify-content: stretch;
  align-items: stretch;
  background: transparent;
  color: inherit;
  border: none;
  box-shadow: none;
  cursor: pointer;
  user-select: none;
  overflow: visible;
  padding: ${CssVar.pdy} ${CssVar.pdx};
  min-height: calc(${btnSize} + ${CssVar.pdy} * 2);
  min-width: calc(${btnSize} + ${CssVar.pdx} * 2);
  font-size: var(${varFontSize});
${switchDesign(design, {
neumorphism: `background: inherit;`
})}
}
${sizeIterator(cn, {
xs: `${varBtnSize}: calc(${CssVar.size} * 0.75);${varFontSize}: 1.2rem;`,
s: `${varBtnSize}: calc(${CssVar.size} * 0.9);${varFontSize}: 1.4rem;`,
m: `${varBtnSize}: ${CssVar.size};${varFontSize}: 1.6rem;`,
l: `${varBtnSize}: calc(${CssVar.size} * 1.2);${varFontSize}: 1.8rem;`,
xl: `${varBtnSize}: calc(${CssVar.size} * 1.5);${varFontSize}: 2.0rem;`,
})}
.${cn}-body {
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  color: inherit;
  border-radius: ${CssVar.bdr};
  overflow: hidden;
${switchDesign(design, {
flat: `
  border: 1.5px solid ${CssVar.bdc};
  transition: background 0.1s, color 0.1s, border-color 0.1s;
`,
material: `
  border: 1.5px solid ${CssVar.bdc};
  box-shadow: ${CssPV.cvxSdBase};
  transition: background 0.1s, color 0.1s, box-shadow 0.1s, top 0.1s, border-color 0.1s;
`,
neumorphism: `
  box-shadow: ${CssPV.nCvxSdBase};
  transition: background 0.1s, color 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;
`})}
}
.${cn}-body[data-iconright="true"] {
  flex-direction: row-reverse;
}
.${cn}-body[data-icon="false"][data-content="true"],
.${cn}-body[data-icon="true"][data-content="true"] {
  padding-left: 5px;
  padding-right: 5px;
}
.${iconCn} + .${cn}-lbl {
  padding-left: 3px;
}
.${cn}-body[data-iconright="true"] > .${iconCn} + .${cn}-lbl {
  padding-right: 3px;
}
.${cn}-body[data-filllabel="true"] > .${cn}-lbl {
  flex: 1;
}
.${cn}-body[data-round="true"] {
  border-radius: calc(${btnSize} / 2 + 1px);
}
.${cn}:disabled {
  ${CssPV.inactOpacity}
  cursor: inherit;
  pointer-events: none;
}
.${cn}-body > .${iconCn} {
  max-height: calc(${btnSize} - 4px);
  max-width: calc(${btnSize}  - 4px);
}
${switchDesign(design, {
flat: `
.${cn}:hover > .${cn}-body {
  background: ${CssVar.hvrBgc};
}
.${cn}:hover:active > .${cn}-body {
  background: ${CssVar.actBgc};
}
${colorIterator((_s, v, qs) => `
.${cn}-body${qs} {
  background: ${v.btn.base.bgc};
  color: ${v.btn.base.fc};
  border-color: ${v.btn.base.bdc};
}
.${cn}-body[data-trp="true"]${qs} {
  background: transparent;
  color: ${v.fc};
}
.${cn}-body[data-trp="true"]${qs}:not([data-bdl="true"]) {
  border-color: ${v.btn.base.bdc};
}
.${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.btn.base.fc};
  --bh-icon-bc: ${v.btn.base.bgc};
}
.${cn}-body[data-trp="true"]${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}:hover > .${cn}-body${qs} {
  background: ${v.btn.hvr.bgc};
  color: ${v.btn.hvr.fc};
  border-color: ${v.btn.hvr.bdc};
}
.${cn}:hover > .${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.btn.hvr.fc};
  --bh-icon-bc: ${v.btn.hvr.bgc};
}
.${cn}:hover:active > .${cn}-body${qs} {
  background: ${v.btn.act.bgc};
  color: ${v.btn.act.fc};
  border-color: ${v.btn.act.bdc};
}
.${cn}:hover:active > .${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.btn.act.fc};
  --bh-icon-bc: ${v.btn.act.bgc};
}`).join("")}
.${cn}-body[data-bdl="true"] {
  border-color: transparent;
}`,
material: `
.${cn}:hover > .${cn}-body {
  background: ${CssVar.hvrBgc};
}
.${cn}-body[data-trp="true"] {
  box-shadow: 0px 1px 2px ${CssVar.sdw.d}, 1px 1px 2px ${CssVar.sdw.d} inset;
}
${colorIterator((_s, v, qs) => `
.${cn}-body${qs} {
  background: ${v.btn.base.bgc};
  color: ${v.btn.base.fc};
  border-color: ${v.btn.base.bdc};
}
.${cn}-body[data-trp="true"]${qs} {
  background: transparent;
  color: ${v.fc};
}
.${cn}-body[data-trp="true"]${qs}:not([data-bdl="true"]) {
  border-color: ${v.btn.base.bdc};
}
.${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.btn.base.fc};
  --bh-icon-bc: ${v.btn.base.bgc};
}
.${cn}-body[data-trp="true"]${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}:hover > .${cn}-body${qs} {
  background: ${v.btn.hvr.bgc};
  color: ${v.btn.hvr.fc};
  border-color: ${v.btn.hvr.bdc};
}
.${cn}:hover > .${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.btn.hvr.fc};
  --bh-icon-bc: ${v.btn.hvr.bgc};
}`).join("")}
.${cn}:hover:active > .${cn}-body,
.${cn}:disabled > .${cn}-body {
  box-shadow: none;
}
.${cn}-body[data-bdl="true"] {
  border-color: transparent;
}
.${cn}-body[data-bdl="true"][data-trp="true"] {
  box-shadow: none;
}
.${cn}:hover > .${cn}-body {
  box-shadow: ${CssPV.cvxSdHover};
}`,
neumorphism: `
.${cn}-body[data-trp="true"] {
  background: transparent;
  box-shadow: 0 0 0px 1px ${CssVar.bdc} inset, 0.5px 0.5px 2px ${CssVar.sdw.d}, -0.5px -0.5px 2px ${CssVar.sdw.b}, 1px 1px 2px ${CssVar.sdw.d} inset, -1px -1px 2px ${CssVar.sdw.b} inset;
}
.${cn}-body .${iconCn} {
  --bh-icon-bc: ${CssVar.bgc};
}
.${cn}:hover > .${cn}-body,
.${cn}:hover > .${cn}-body[data-trp="true"] {
  background: inherit;
  box-shadow: ${CssPV.nCvxSdHover};
}
.${cn}:hover:active > .${cn}-body {
  box-shadow: ${CssPV.nCcvSdActive};
}
.${cn}:disabled > .${cn}-body {
  box-shadow: ${CssPV.nCcvSdDisabled};
}
.${cn}:disabled > .${cn}-body[data-trp="true"] {
  box-shadow: 0 0 0px 1px ${CssVar.bdc} inset, ${CssPV.nCcvSdDisabled};
}
${colorIterator((_s, v, qs) => `
.${cn}-body${qs}[data-bdl="true"]:not([data-trp="true"]) {
  background: ${v.btn.base.bgc};
  color: ${v.btn.base.fc};
}
.${cn}-body${qs}:not([data-trp="true"]) {
  background: ${v.bgc};
  color: ${v.fc};
}
.${cn}:hover > .${cn}-body${qs},
.${cn}:hover > .${cn}-body${qs}[data-trp="true"] {
  background: ${v.bgc};
  color: ${v.fc};
}
.${cn}-body[data-trp="true"]${qs} {
  box-shadow: 0 0 0px 1px ${v.btn.base.bdc} inset, 0.5px 0.5px 2px ${CssVar.sdw.d}, -0.5px -0.5px 2px ${CssVar.sdw.b}, 1px 1px 2px ${CssVar.sdw.d} inset, -1px -1px 2px ${CssVar.sdw.b} inset;
  color: ${v.fc};
}
.${cn}-body${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}-body${qs}[data-bdl="true"]:not([data-trp="true"]):not(:hover) .${iconCn} {
  --bh-icon-fc: ${v.btn.base.fc};
  --bh-icon-bc: ${v.btn.base.bgc};
}
.${cn}-body${qs}:not([data-trp="true"]) .${iconCn} {
  --bh-icon-bc: ${v.bgc};
}
.${cn}:disabled > .${cn}-body[data-trp="true"]${qs} {
  box-shadow: 0 0 0px 1px ${v.btn.base.bdc} inset, ${CssPV.nCcvSdDisabled};
}`).join("")}
.${cn}-body[data-bdl="true"],
.${cn}-body[data-bdl="true"][data-trp="true"] {
  box-shadow: none;
}`})}
.${cn}-body[data-trp="true"] .${iconCn} {
  --bh-icon-bc: ${CssVar.bgc};
}
.${cn}:disabled > .${cn}-body[data-bdl="true"] {
  box-shadow: none !important;
}
`}</JsxStyle>;

export default Button;