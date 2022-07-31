import Time, { TimeUtils } from "@bizhermit/time";
import React, { FC, useEffect } from "react";
import { convertClassNames } from "../../../utils/attributes";
import TimeBox, { TimeBoxAttributes, useTimeBox } from "../../inputs/time-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes, listViewIptCn } from "../list-view";

const ListViewTimeBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<string | number> & {
  timeBoxAttributes?: Omit<ListViewEditInputAttributes<TimeBoxAttributes>, "$mode" | "$unit">;
  mode?: "hms" | "hm" | "ms" | "h";
  unit?: "hour" | "minute" | "second" | "millisecond";
  dataType?: "string" | "number";
  format?: string | ((time: string | number) => string);
  labelDataName?: string;
}> = (props) => {
  let bind = { value: undefined };
  const ldn = props.labelDataName ?? `__${props.name}`;
  const mode = props.mode ?? "hm";
  let width: number, unit = props.unit, format: (val: string | number) => string, formatPattern: string;
  if (typeof props.format === "function") {
    format = props.format;
  } else {
    formatPattern = props.format as string;
    format = (v) => {
      if (typeof v === "string") return new Time(v).format(formatPattern);
      if (typeof v === "number") return new Time(TimeUtils.convertUnitToMilliseconds(v, unit)).format(formatPattern);
      return "";
    }
  }
  switch (mode) {
    case "hms":
      width = 127;
      if (!unit) unit = "second";
      if (!formatPattern) formatPattern = "hh:mm:ss";
      break;
    case "ms":
      width = 93;
      if (!unit) unit = "second";
      if (!formatPattern) formatPattern = "mm:ss";
      break;
    case "h":
      width = 58;
      if (!unit) unit = "hour";
      if (!formatPattern) formatPattern = "hh";
      break;
    default:
      width = 93;
      if (!unit) unit = "minute";
      if (!formatPattern) formatPattern = "hh:mm";
      break;
  }

  return {
    resize: false,
    width,
    cellTextAlign: "center",
    ...props,
    name: ldn,
    vName: props.name,
    bodyClassNames: [...(convertClassNames(props.bodyClassNames) ?? []), listViewIptCn],
    initializeRowData: (data) => {
      data[ldn] = format(data[props.name]);
    },
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] }}
            attrs={{
              ...props.timeBoxAttributes,
              $mode: mode,
              $unit: unit,
              $dataType: props.dataType,
            }}
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
  };
};

const EditColumn: FC<{
  bind: {[key: string]: any};
  attrs: TimeBoxAttributes;
}> = ({ bind, attrs }) => {
  const hook = useTimeBox();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <TimeBox
      {...attrs}
      $hook={hook}
      $name="value"
      $bind={bind}
      $hidePickerButton
      style={{ height: "100%", width: "100%" }}
      onClick={() => {
        hook.showPicker();
      }}
    />
  );
};

export default ListViewTimeBoxColumn;