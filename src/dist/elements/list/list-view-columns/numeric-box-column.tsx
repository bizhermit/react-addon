import NumberUtils from "@bizhermit/basic-utils/dist/number-utils";
import React, { FC, useEffect } from "react";
import { convertClassNames } from "../../../utils/attributes";
import NumericBox, { NumericBoxAttributes, useNumericBox } from "../../inputs/numeric-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes, listViewIptCn } from "../list-view";

const ListViewNumericBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<number> & {
  numericBoxAttributes?: ListViewEditInputAttributes<NumericBoxAttributes>;
  labelDataName?: string;
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
    bodyClassNames: [...(convertClassNames(props.bodyClassNames) ?? []), listViewIptCn],
    initializeRowData: (data) => {
      data[ldn] = format(data[props.name]);
    },
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] }}
            attrs={props.numericBoxAttributes}
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
  attrs: NumericBoxAttributes;
}> = ({ bind, attrs }) => {
  const hook = useNumericBox();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <NumericBox
      {...attrs}
      $hook={hook}
      $name="value"
      $bind={bind}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default ListViewNumericBoxColumn;