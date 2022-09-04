import NumberUtils from "@bizhermit/basic-utils/dist/number-utils";
import React, { FC, useEffect } from "react";
import CssVar, { CssPV, Color, colorIterator, switchDesign } from "../../../styles/css-var";
import JsxStyle from "../../../styles/jsx-style";
import { cloneDomElement } from "../../../utils/dom";
import Slider, { SliderAttributes, useSlider } from "../../inputs/slider";
import { dataViewCn, DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";

const cn = "bh-dv_c-sld";

const DataViewSliderColumn: DataViewColumnFunction<DataViewEditColumnProps<number> & {
  sliderAttributes?: DataViewEditInputAttributes<SliderAttributes>;
  labelDataName?: string;
  hideLabel?: boolean;
  hideBar?: boolean;
  barAlign?: "left" | "right";
  defaultColor?: Color;
  color?: (value?: number) => Color;
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
      elem.classList.add(`${dataViewCn}-lbl`, `${cn}-lbl`);
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
        if (props.color) contentElements[0].setAttribute("data-color", props.color(val));
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
.${dataViewCn}-row[data-oddeven="odd"] .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.bg.b)}
}
.${dataViewCn}-row[data-oddeven="even"] .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.bg.d)}
}
.${dataViewCn}-row:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.hvr.row.bgc)}
}
.${dataViewCn}-cell:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.hvr.cell.bgc)}
}
.${dataViewCn}-body.bh-select-row .${dataViewCn}-row.bh-_selected .${cn} + .${cn}-lbl,
.${dataViewCn}-body.bh-select-cell .${dataViewCn}-cell.bh-_selected .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.act.bgc)}
}
.${dataViewCn}-body.bh-select-row .${dataViewCn}-row.bh-_selected .${dataViewCn}-cell:hover .${cn} + .${cn}-lbl,
.${dataViewCn}-body.bh-select-cell .${dataViewCn}-cell.bh-_selected:hover .${cn} + .${cn}-lbl {
  ${CssPV.textSd(CssVar.dataview.cell.act.hvr.bgc)}
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} {
  background: ${v.ipt.on};
}
`).join("")}`
})}
`}</JsxStyle>;

export default DataViewSliderColumn;