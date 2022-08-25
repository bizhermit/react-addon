import NumberUtils, { add, minus, numFormat } from "@bizhermit/basic-utils/dist/number-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { ChangeEvent, HTMLAttributes, KeyboardEvent, useCallback, useEffect, useRef } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Resizer from "../resizer";

const cn = "bh-num";

export type NumericBoxHook = InputHook<number>;
type Hook = _HookSetter<NumericBoxHook>;

export type NumericBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<number> & {
  $hook?: NumericBoxHook;
  $textAlign?: "left" | "center" | "right";
  $max?: number;
  $min?: number;
  $sign?: "only-positive" | "only-negative";
  $float?: number;
  $notThousandSeparator?: boolean;
  $incrementInterval?: number;
  $preventKeydownIncrement?: boolean;
  $hideButtons?: boolean;
  $required?: boolean;
  $border?: InputBorder;
  $round?: boolean;
  $resize?: boolean;
  $changing?: (value: string) => boolean | void;
};

const NumericBox = React.forwardRef<HTMLDivElement, NumericBoxAttributes>((attrs, ref) => {
  const iref = useRef<HTMLInputElement>();
  const ibuf = useRef("");

  const toString = (v: number) => {
    if (attrs.$notThousandSeparator) return String(v ?? "");
    return numFormat(v, { fpad: attrs.$float ?? 0 }) ?? "";
  };
  const setInputValue = (v: number) => {
    if (iref.current) iref.current.value = val == null ? "" : toString(v);
  };

  const { val, set, buf } = useValue(attrs, {
    mountEffect: setInputValue,
    bindEffect: setInputValue,
    stateEffect: (v) => {
      if (document.activeElement === iref.current) return;
      setInputValue(v);
    },
  });
  const nbuf = useRef(val);

  const changeValue = (value: string) => {
    if (StringUtils.isEmpty(value)) {
      nbuf.current = undefined;
      return "";
    }
    let retStr = value, num = null;
    const float = attrs.$float ?? 0
    switch (attrs.$sign) {
      case "only-positive":
        if (float > 0) {
          if (!new RegExp(`^[+-]?([0-9]*|0)(\.[0-9]{0,${float}})?$`).test(value)) return iref.current.value = ibuf.current;
          num = Number(value);
        } else {
          if (!/^[+-]?[0-9]*$/.test(value)) return iref.current.value = ibuf.current;
          if (/^[+-]?[0-9]*|0$/.test(value)) num = Number(value);
        }
        break;
      case "only-negative":
        if (float > 0) {
          if (!new RegExp(`^[-]?([0-9]*|0)(\.[0-9]{0,${float}})?$`).test(value)) return iref.current.value = ibuf.current;
          num = Number(value);
        } else {
          if (!/^[-]?[0-9]*$/.test(value)) return iref.current.value = ibuf.current;
          if (/^[-]?[0-9]*|0$/.test(value)) num = Number(value);
        }
        break;
      default:
        if (float > 0) {
          if (!new RegExp(`^[+-]?([0-9]*|0)(\.[0-9]{0,${float}})?$`).test(value)) return iref.current.value = ibuf.current;
          num = Number(value);
        } else {
          if (!/^[+-]?[0-9]*$/.test(value)) return iref.current.value = ibuf.current;
          if (/^[+-]?[0-9]*|0$/.test(value)) num = Number(value);
        }
        break;
    }
    if (num != null && !isNaN(num)) {
      let checkedNum = num;
      if (attrs.$max != null) checkedNum = Math.min(checkedNum, attrs.$max);
      if (attrs.$min != null) checkedNum = Math.max(checkedNum, attrs.$min);
      switch (attrs.$sign) {
        case "only-positive":
          checkedNum = Math.max(0, checkedNum);
          break;
        case "only-negative":
          checkedNum = Math.min(0, checkedNum);
          break;
        default:
          break;
      }
      nbuf.current = checkedNum;
      retStr = String(checkedNum);
      if (num !== checkedNum) iref.current.value = retStr;
    }
    return ibuf.current = retStr;
  };

  const incrementValue = (format?: boolean) => {
    const v = changeValue(String(add(nbuf.current ?? 0, attrs.$incrementInterval ?? 1)));
    if (!format || StringUtils.isEmpty(v)) iref.current.value = v;
    else iref.current.value = toString(Number(v));
    set.current(nbuf.current);
  };
  const decrementValue = (format?: boolean) => {
    const v = changeValue(String(minus(nbuf.current ?? 0, attrs.$incrementInterval ?? 1)));
    if (!format || StringUtils.isEmpty(v)) iref.current.value = v;
    else iref.current.value = toString(Number(v));
    set.current(nbuf.current);
  };

  const keydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        if (attrs.$preventKeydownIncrement) return;
        if (!attrs.$disabled && !attrs.$readOnly) incrementValue();
        break;
      case "ArrowDown":
        if (attrs.$preventKeydownIncrement) return;
        if (!attrs.$disabled && !attrs.$readOnly) decrementValue();
        break;
      case "Enter":
        if (!attrs.$disabled && !attrs.$readOnly) set.current(nbuf.current);
        break;
      case "Tab":
        if (!attrs.$disabled && !attrs.$readOnly) set.current(nbuf.current);
        break;
      case "Escape":
        iref.current.value = ibuf.current = String(NumberUtils.removeThousandsSeparator(toString(nbuf.current = buf.current)) ?? "");
        break;
      default:
        break;
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    const ret = attrs.$changing?.(v);
    if (ret === false) {
      iref.current.value = ibuf.current ?? "";
      return;
    }
    changeValue(v);
  };

  const mousedown = useCallback((increment: boolean) => {
    if (increment) incrementValue(true);
    else decrementValue(true);
    let roop = true;
    const end = () => {
      roop = false;
      window.removeEventListener("mouseup", end);
    };
    window.addEventListener("mouseup", end);
    setTimeout(() => {
      const func = async () => {
        setTimeout(() => {
          if (roop) {
            if (increment) incrementValue(true);
            else decrementValue(true);
            func();
          }
        }, 30);
      };
      func();
    }, 500);
  }, []);

  const focus = () => {
    if (attrs.$readOnly || attrs.$readOnly) return;
    iref.current.value = ibuf.current = iref.current.value?.replace(/,/g, "") ?? "";
  };

  const blue = () => {
    set.current(nbuf.current);
    if (iref.current) iref.current.value = toString(nbuf.current);
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => iref.current.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <div
      {...inputFieldAttributes(attrs, cn)}
      ref={ref}
      data-v={val != null}
      data-round={attrs.$round}
    >
      <input
        ref={iref}
        type="text"
        className={`${inputCn}_fld ${cn}_fld`}
        tabIndex={attrs.tabIndex}
        inputMode={(attrs.$float ?? 0) > 0 ? "decimal" : "numeric"}
        disabled={attrs.$disabled}
        readOnly={attrs.$readOnly}
        max={attrs.$max}
        min={attrs.$min}
        required={attrs.$required}
        onKeyDown={keydown}
        onChange={change}
        onFocus={focus}
        onBlur={blue}
        placeholder={attrs.placeholder}
        data-align={attrs.$textAlign ?? "right"}
        maxLength={16}
      />
      {attrs.$hideButtons || attrs.$readOnly || attrs.$disabled ? <></> :
        <div className={`${cn}-btn`}>
          <div className={`${cn}-inc`} onMouseDown={() => mousedown(true)} />
          <div className={`${cn}-dec`} onMouseDown={() => mousedown(false)} />
        </div>
      }
      {attrs.$resize ? <Resizer direction="x" /> : <></>}
      {InputStyle}
      {Style}
    </div>
  )
});

export const useNumericBox = (): NumericBoxHook => {
  const dispatcher = useRef<Partial<NumericBoxHook>>({});
  return {
    focus: useCallback(() => {
      dispatcher.current.focus?.();
    }, []),
    getValue: useCallback(() => {
      return dispatcher.current.getValue?.();
    }, []),
    setValue: useCallback((v) => {
      dispatcher.current.setValue?.(v);
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn}_fld {
  flex: 1;
}
.${cn}-btn {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: calc(${CssVar.size} * 0.8);
  height: 100%;
}
.${cn}-inc, .${cn}-dec {
  box-sizing: border-box;
  position: relative;
  flex: 1;
  min-height: 0px;
  cursor: pointer;
${switchDesign(design, {
fm: `border: 1px solid transparent;`,
flat: `transition: background 0.1s, border-color 0.1s;`,
material: `
  transition: background 0.1s, box-shadow 0.1s, top 0.1s, border-color 0.1s;
`,
neumorphism: `
  box-shadow: ${CssPV.cvxSd};
  background: ${CssVar.bgc};
  transition: background 0.1s, box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;
`})}
}
.${cn}-inc {
  border-radius: 0 ${CssVar.bdr} 0 0;
  z-index: 1;
}
.${cn}-dec {
  border-radius: 0 0 ${CssVar.bdr} 0;
  z-index: 2;
${switchDesign(design, {
flat: `border-top: none;`
})}
}
${switchDesign(design, {
fm: `
.${cn}-dec:not(:hover):not(:active) {
  border-top: none;
}`})}
.${cn}-inc::before,
.${cn}-dec::before {
  ${CssPV.ba};
  height: 40%;
  width: 50%;
  top: calc(25% + 1px);
  left: 25%;
  transition: background 0.1s;
}
.${cn}-inc::before {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
.${cn}-dec::before {
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
${switchDesign(design, {
fm: `
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-btn > .${cn}-inc::before,
.${cn}${qs} > .${cn}-btn > .${cn}-dec::before {
  background: ${v.fc};
}
.${cn}${qs} > .${cn}-btn > .${cn}-inc:hover,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:hover {
  background: ${v.btn.hvr.bgc};
  border-color: ${v.btn.hvr.bdc};
}
.${cn}${qs} > .${cn}-btn > .${cn}-inc:hover::before,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:hover::before {
  background: ${v.btn.hvr.fc};
}
${switchDesign(design, {
flat: `
.${cn}${qs} > .${cn}-btn > .${cn}-inc:active,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:active {
  background: ${v.btn.act.bgc};
  border-color: ${v.btn.act.bdc};
}
.${cn}${qs} > .${cn}-btn > .${cn}-inc:active::before,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:active::before {
  background: ${v.btn.act.fc};
}`,
material: `
.${cn}${qs} > .${cn}-btn > .${cn}-inc:active,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:active {
  background: ${v.btn.hvr.bgc};
  border-color: ${v.btn.hvr.bdc};
}
.${cn}${qs} > .${cn}-btn > .${cn}-inc:active::before,
.${cn}${qs} > .${cn}-btn > .${cn}-dec:active::before {
  background: ${v.btn.hvr.fc};
}`})}
`).join("")}`,
material: `
.${cn} > .${cn}-btn > .${cn}-inc:hover,
.${cn} > .${cn}-btn > .${cn}-dec:hover {
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
  z-index: 3;
}
.${cn} > .${cn}-btn > .${cn}-inc:active,
.${cn} > .${cn}-btn > .${cn}-dec:active {
  box-shadow: none;
  z-index: 0;
}`,
neumorphism: `
.${cn}-inc:hover,
.${cn}-dec:hover {
  box-shadow: ${CssPV.cvxSdD};
}
.${cn}-inc:active,
.${cn}-dec:active {
  box-shadow: ${CssPV.ccvSd};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-btn > .${cn}-inc::before,
.${cn}${qs} > .${cn}-btn > .${cn}-dec::before {
  background: ${v.fc};
}`).join("")}
`})}
.${cn}[data-round="true"] > .${cn}_fld {
  padding-left: calc(${CssVar.size} / 2);
}
.${cn}[data-m="r"][data-round="true"] > .${cn}_fld,
.${cn}[data-m="d"][data-round="true"] > .${cn}_fld {
  padding-right: calc(${CssVar.size} / 2);
}
.${cn}[data-round="true"] > .${cn}-btn {
  width: ${CssVar.size};
}
.${cn}[data-round="true"] > .${cn}-btn > .${cn}-inc {
  border-top-right-radius: ${CssVar.size};
  border-top-left-radius: ${CssVar.size};
}
.${cn}[data-round="true"] > .${cn}-btn > .${cn}-dec {
  border-bottom-right-radius: ${CssVar.size};
  border-bottom-left-radius: ${CssVar.size};
}
.${cn}[data-round="true"] > .${cn}-btn > .${cn}-inc::before,
.${cn}[data-round="true"] > .${cn}-btn > .${cn}-dec::before {
  width: 40%;
  left: 30%;
}
`}</JsxStyle>;

export default NumericBox;