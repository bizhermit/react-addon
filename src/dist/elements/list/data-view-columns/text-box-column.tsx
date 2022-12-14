import React, { FC, useEffect } from "react";
import { convertClassNames } from "../../../utils/attributes";
import TextBox, { TextBoxAttributes, useTextBox } from "../../inputs/text-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes, dataViewIptCn } from "../data-view";

const DataViewTextBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<string> & {
  textBoxAttributes?: DataViewEditInputAttributes<TextBoxAttributes>;
}> = (props) => {
  let bind = { value: "" };
  return {
    ...props,
    bodyClassNames: [...(convertClassNames(props.bodyClassNames) ?? []), dataViewIptCn],
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] ?? "" }}
            attrs={props.textBoxAttributes}
          />
        ),
        effect: () => {
          props.beganEdit?.(target.data[props.name], target);
        },
      };
    },
    _endEdit: (target, commit) => {
      const b = target.data[props.name], a = bind.value;
      if (commit) target.data[props.name] = a;
      props.endedEdit?.({ before: b, after: commit ? a : b }, target, commit);
    },
  };
};

const EditColumn: FC<{
  bind: {[key: string]: any};
  attrs: TextBoxAttributes;
}> = ({ bind, attrs }) => {
  const hook = useTextBox();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <TextBox
      {...attrs}
      $hook={hook}
      $name="value"
      $bind={bind}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default DataViewTextBoxColumn;