import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { ChangeEvent, FocusEvent, ForwardedRef, FunctionComponent, HTMLAttributes, KeyboardEvent, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import useSource, { SourceArray } from "../../hooks/source";
import useValue, { equalValue, InputAttributes } from "../../hooks/value";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Icon from "../icon";
import DataView, { dataViewCn, dataViewDefaultRowHeight, useDataView } from "../list/data-view";
import Popup, { usePopup } from "../../popups/popup";
import Resizer from "../resizer";
import CssVar from "../../styles/css-var";

const cn = "bh-slb";

export type SelectBoxHook<T extends string | number = string | number> = InputHook<T>;
type Hook<T extends string | number = string | number> = _HookSetter<SelectBoxHook<T>>;

export type SelectBoxAttributes<T extends string | number = string | number, U = { [key: string | number]: any }> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & InputAttributes<T, { beforeData?: U; afterData: U; }> & {
  ref?: ForwardedRef<HTMLDivElement>;
  $hook?: SelectBoxHook<T>;
  $source?: SourceArray<U>;
  $preventSourceMemo?: boolean;
  $labelDataName?: string;
  $valueDataName?: string;
  $notInputText?: boolean;
  $textAlign?: "left" | "center" | "right";
  $border?: InputBorder;
  $round?: boolean;
  $resize?: boolean;
};

interface SelectBoxFC extends FunctionComponent {
  <T extends string | number = string | number, U = { [key: string]: any }>(attrs: SelectBoxAttributes<T, U>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<SelectBoxAttributes<T, U>>;
}

const SelectBox: SelectBoxFC = React.forwardRef<HTMLDivElement, SelectBoxAttributes<any>>(<T extends string | number = string | number, U = { [key: string]: any }>(attrs: SelectBoxAttributes<T, U>, $ref: ForwardedRef<HTMLDivElement>) => {
  const labelDn = attrs.$labelDataName || "label";
  const valueDn = attrs.$valueDataName || "value";
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);
  const iref = useRef<HTMLInputElement>();
  const popup = usePopup();
  const dvRef = useRef<HTMLDivElement>();
  const rowHeight = useRef(dataViewDefaultRowHeight());
  const dvHook = useDataView();
  const { loading, source } = useSource(attrs.$source, {
    changeSource: (source) => {
      if (iref.current) {
        iref.current.value = source.find(item => equalValue(item[valueDn], buf.current))?.[labelDn] ?? "";
      };
    },
    preventSourceMemo: attrs.$preventSourceMemo,
  });

  const setText = (v: string | number) => {
    if (loading) return;
    if (iref.current) {
      iref.current.value = source.find(item => equalValue(item[valueDn], v))?.[labelDn] ?? "";
    };
  };

  const { val, set, buf } = useValue(attrs, {
    setChangeCtx: (ctx) => {
      const beforeData = source.find(item => equalValue(item[valueDn], ctx.before));
      const afterData = source.find(item => equalValue(item[valueDn], ctx.after));
      return { ...ctx, beforeData, afterData };
    },
    effect: (v) => {
      setText(v);
    }
  });
  const [filter, setFilter] = useState<(data: { [key: string]: any }) => boolean>(null);

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    if (StringUtils.isEmpty(v)) setFilter(null);
    setFilter(() => {
      return (data: {[key: string]: any}) => {
        return StringUtils.contains(data[labelDn], v);
      };
    });
  };

  const showPopup = (showedFocus?: boolean) => {
    if (attrs.$disabled || attrs.$readOnly) return;
    const rect = ref.current.getBoundingClientRect();
    const mh = (Math.max(document.body.clientHeight - rect.bottom, rect.top) - 5) + "px";
    popup.show({
      anchor: ref.current,
      showed: () => {
        if (dvRef.current) {
          setTimeout(() => {
            dvHook.select(dvHook.getFilteredItems().findIndex(item => equalValue(item.data[valueDn], buf.current)));
          }, 50);
          if (showedFocus) dvHook.focus();
        }
      },
      style: {
        maxHeight: mh,
        width: ref.current.offsetWidth + "px",
      },
    });
  };

  const focus = (e: FocusEvent) => {
    if (e.relatedTarget) {
      if (e.relatedTarget === iref.current || e.relatedTarget === dvRef.current) return;
      const children = dvRef.current?.childNodes;
      if (children) {
        for (const elem of children) {
          if (elem === e.relatedTarget) return;
        }
      }
    }
    setFilter(null);
    showPopup();
  };

  const commitByLabel = (nullable?: boolean) => {
    const label = iref.current.value;
    const item = source.find(item => item[labelDn] === label);
    if (nullable || item) {
      set.current(item?.[valueDn]);
    }
  }

  const blur = (e: FocusEvent) => {
    if (e.relatedTarget === iref.current || e.relatedTarget === dvRef.current) return;
    const children = dvRef.current?.childNodes;
    if (children) {
      for (const elem of children) {
        if (elem === e.relatedTarget) return;
      }
    }
    if (e.currentTarget === iref.current) {
      commitByLabel();
    }
    popup.hide();
    setText(buf.current);
  };

  const keydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (attrs.$disabled || attrs.$readOnly) return;
      dvHook?.focus();
      return;
    }
    if (e.key === "Escape") {
      popup.hide();
      setText(buf.current);
      return;
    }
    if (e.key === "F2") {
      setFilter(null);
      showPopup(true);
      return;
    }
    if (e.key === "Enter") {
      commitByLabel(true);
    }
  };

  useEffect(() => {
    if (popup.isShowed()) {
      dvHook.setFilter(filter);
    }
  }, [filter]);

  const filtered = useCallback((items: Array<any>) => {
    if (!popup.isShowed()) return;
    const elem = popup.getElement();
    if (elem) elem.style.height = Math.ceil(rowHeight.current * items.length) + "px";
    popup.reposition();
  }, [])

  useEffect(() => {
    (attrs.$hook as Hook<T>)?._set({
      focus: () => iref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook<T>)?._set]);

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
        disabled={attrs.$disabled}
        readOnly={attrs.$readOnly || attrs.$notInputText}
        placeholder={attrs.placeholder}
        data-align={attrs.$textAlign ?? "left"}
        onChange={changeText}
        onFocus={focus}
        onBlur={blur}
        onKeyDown={keydown}
      />
      {attrs.$disabled || attrs.$readOnly ? <></> :
        <div
          className={`${inputCn}_btn`}
          tabIndex={-1}
          data-round={attrs.$round}
          onClick={() => {
            setFilter(null);
            showPopup(true);
          }}
        ><Icon $image="pull-down" $transition /></div>
      }
      {attrs.$resize ? <Resizer direction="x" /> : <></>}
      {attrs.$disabled || attrs.$readOnly ? <></> :
        <Popup
          $hook={popup}
          $position={{
            x: "inner",
            y: "outer",
          }}
          $preventClickClose
          $showed={() => {
            const elem = popup.getElement();
            if (elem) elem.style.height = Math.ceil(rowHeight.current * source.length) + "px";
          }}
        >
          <DataView
            ref={dvRef}
            $hook={dvHook}
            $fto="f"
            $columns={[{
              name: labelDn,
              width: 10,
              fill: true,
              cellTextAlign: attrs.$textAlign,
            }]}
            $items={source}
            $options={{
              clickCell: (params) => {
                set.current(params.data[valueDn]);
                popup.hide();
                iref.current.focus();
              },
              header: false,
              footer: false,
              rowNumber: false,
              enterIsClick: true,
              filtered,
            }}
            $preventOptionsMemo
            onBlur={blur}
            onKeyDown={(e) => {
              if (e.key === "Escape") iref.current.focus();
            }}
            className={`${cn}-list`}
            style={{
              height: source.length * rowHeight.current,
              maxHeight: "100%",
            }}
          />
        </Popup>
      }
      {InputStyle}
      {Style}
    </div>
  );
});

export const useSelectBox = <T extends string | number = any>(): SelectBoxHook<T> => {
  const dispatch = useRef<Partial<SelectBoxHook<T>>>({});
  return {
    focus: useCallback(() => {
      dispatch.current.focus?.();
    }, []),
    getValue: useCallback(() => {
      return dispatch.current.getValue?.();
    }, []),
    setValue: useCallback((v) => {
      return dispatch.current.setValue?.(v);
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook<T>;
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}_fld {
  flex: 1;
}
.${cn}-list .${dataViewCn}-cell {
  cursor: pointer;
}
.${cn}[data-round="true"] > .${cn}_fld {
  padding-left: calc(${CssVar.size} / 2);
}
.${cn}[data-m="r"][data-round="true"] > .${cn}_fld,
.${cn}[data-m="d"][data-round="true"] > .${cn}_fld {
  padding-right: calc(${CssVar.size} / 2);
}`}</JsxStyle>;

export default SelectBox;