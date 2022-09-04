import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { FC, useEffect } from "react";
import { convertClassNames } from "../../../utils/attributes";
import DateBox, { DateBoxAttributes, useDateBox } from "../../inputs/date-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes, dataViewIptCn } from "../data-view";

const DataViewDateBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<string | number | Date> & {
  dateBoxAttributes?: Omit<DataViewEditInputAttributes<DateBoxAttributes>, "$mode" | "$dataType">;
  mode?: "ymd" | "ym" | "y";
  dataType?: "string" | "number" | "date";
  format?: string | ((date: Date) => string);
  labelDataName?: string;
}> = (props) => {
  let bind = { value: undefined };
  const ldn = props.labelDataName ?? `__${props.name}`;
  const mode = props.mode ?? "ymd";
  let width: number, format: (val: string | number | Date) => string;
  if (StringUtils.isString(props.format)) {
    format = (v) => DatetimeUtils.format(v, props.format as string);
  } else {
    format = props.format;
  }
  switch (mode) {
    case "y":
      width = 80;
      if (!format) format = (v) => DatetimeUtils.format(v, "yyyy");
      break;
    case "ym":
      width = 112;
      if (!format) format = (v) => DatetimeUtils.format(v, "yyyy/MM");
      break;
    default:
      width = 148;
      if (!format) format = (v) => DatetimeUtils.format(v, "yyyy/MM/dd");
      break;
  }

  return {
    resize: false,
    width,
    cellTextAlign: "center",
    ...props,
    name: ldn,
    vName: props.name,
    bodyClassNames: [...(convertClassNames(props.bodyClassNames) ?? []), dataViewIptCn],
    initializeRowData: (data) => {
      data[ldn] = format(data[props.name]);
    },
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] }}
            attrs={{
              ...props.dateBoxAttributes,
              $mode: mode,
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
  attrs: DateBoxAttributes;
}> = ({ bind, attrs }) => {
  const hook = useDateBox();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <DateBox
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

export default DataViewDateBoxColumn;