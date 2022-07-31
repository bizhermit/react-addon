import NumberUtils from "@bizhermit/basic-utils/dist/number-utils";
import React, { FC, useEffect } from "react";
import CssVar, { CssPV, Signal, signalIterator, switchDesign } from "../../../styles/css-var";
import JsxStyle from "../../../styles/jsx-style";
import { cloneDomElement } from "../../../utils/dom";
import Slider, { SliderAttributes, useSlider } from "../../inputs/slider";
import { listViewCn, ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../list-view";

const cn = "bh-lv_c-sld";

const ListViewSliderColumn: ListViewColumnFunction<ListViewEditColumnProps<number> & {
  sliderAttributes?: ListViewEditInputAttributes<SliderAttributes>;
  labelDataName?: string;
  hideLabel?: boolean;
  hideBar?: boolean;
  barAlign?: "left" | "right";
  defaultSignal?: Signal;
  signal?: (value?: number) => Signal;
  progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
  format?: (value?: number) => string;
}> = (props) => {
  let bind = { value: undefined };
  const ldn = props.labelDataName ?? `__${props.name}`;
  const format = props.format ?? ((v) => NumberUtils.format(v));
  return {
    dataType: "number",
    ...props,
    name: ldn,
    vName: props.name,
    initializeRowData: (data) => {
      data[ldn] = format(data[props.name]);
    },
    initialize: () => {
      const belem = document.createElement("div");
      belem.classList.add(cn);
      belem.setAttribute("data-align", props.barAlign ?? "left");
      if (props.hideBar) belem.style.display = "none";
      const elem = document.createElement("div");
      elem.classList.add(`${listViewCn}-lbl`, `${cn}-lbl`);
      return { elem, belem };
    },
    cellInitialize: (cell, params) => {
      const belem = cloneDomElement(params.belem);
      cell.contentElements.push(belem);
      cell.element.appendChild(belem);
      if (props.hideLabel !== true) {
        const elem = cloneDomElement(params.elem);
        cell.contentElements.push(elem);
        cell.element.appendChild(elem);
      }
    },
    cellRender: ({ cache, row, contentElements }) => {
      if (cache.val !== row.item.data[props.name]) {
        const val = row.item.data[props.name];
        if (props.hideLabel !== true) {
          contentElements[1].textContent = row.item.data[ldn];
        }
        props.progressbarRender?.(val, contentElements[0] as HTMLDivElement);
        cache.val = val;
        contentElements[0].style.width = `${Math.min(100, Math.max(0, val ?? 0))}%`;
        if (props.signal) contentElements[0].setAttribute("data-signal", props.signal(val));
      }
    },
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] }}
            attrs={props.sliderAttributes}
          />
        ),
        effect: () => {
          props.beganEdit?.(target.data[props.name], target);
        },
      };
    },
    _endEdit: (target, commit) => {
      const b = target.data[props.name], a = bind.value;
      if (commit) {
        target.data[props.name] = a;
        target.data[ldn] = format(a) ?? "";
      }
      props.endedEdit?.({ before: b, after: commit ? a : b }, target, commit);
    },
    jsxStyle: Style,
  };
};

const EditColumn: FC<{
  bind: {[key: string]: any};
  attrs: SliderAttributes;
}> = ({ bind, attrs }) => {
  const hook = useSlider();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <Slider
      {...attrs}
      $hook={hook}
      $name="value"
      $bind={bind}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  position: absolute;
  height: 60%;
  top: 20%;
  max-width: 100%;
  z-index: -1;
  background: ${CssVar.hvrBgc};
}
.${cn}[data-align="left"] {
  left: 0px;
}
.${cn}[data-align="right"] {
  right: 0px;
}
${switchDesign(design, {
c: `
.${listViewCn}-row[data-oddeven="odd"] .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.bg.b)}
}
.${listViewCn}-row[data-oddeven="even"] .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.bg.d)}
}
.${listViewCn}-row:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.hvr.row.bgc)}
}
.${listViewCn}-cell:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.hvr.cell.bgc)}
}
.${listViewCn}-body.bh-select-row .${listViewCn}-row.bh-_selected .${cn} + .${cn}-lbl,
.${listViewCn}-body.bh-select-cell .${listViewCn}-cell.bh-_selected .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.act.bgc)}
}
.${listViewCn}-body.bh-select-row .${listViewCn}-row.bh-_selected .${listViewCn}-cell:hover .${cn} + .${cn}-lbl,
.${listViewCn}-body.bh-select-cell .${listViewCn}-cell.bh-_selected:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.lv.cell.act.hvr.bgc)}
}
${signalIterator((_s, v, qs) => `
.${cn}${qs} {
  background: ${v.ipt.on};
}
`).join("")}`
})}
`}</JsxStyle>;

export default ListViewSliderColumn;