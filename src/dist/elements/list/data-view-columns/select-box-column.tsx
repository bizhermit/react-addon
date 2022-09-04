import React, { FC, useEffect } from "react";
import { SourceArray } from "../../../hooks/source";
import { convertClassNames } from "../../../utils/attributes";
import SelectBox, { SelectBoxAttributes, useSelectBox } from "../../inputs/select-box";
import { DataViewClass, DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes, dataViewIptCn } from "../data-view";

const DataViewSelectBox: DataViewColumnFunction<DataViewEditColumnProps<number | string> & {
  labelDataName?: string;
  selectBoxAttributes?: Omit<DataViewEditInputAttributes<SelectBoxAttributes<any>>, "$source">;
  source?: SourceArray<{[key: string]: any}>;
}> = (props) => {
  let bind = { value: undefined };
  const ldn = props.labelDataName ?? `__${props.name}`;
  const svdn = props.selectBoxAttributes?.$valueDataName ?? "value";
  const sldn = props.selectBoxAttributes?.$labelDataName ?? "label";
  let source = [], loading = true, dataView: DataViewClass;
  
  if (props.source == null) {
    loading = false;
  } else if (Array.isArray(props.source)) {
    source = props.source;
    loading = false;
  } else {
    const ret = props.source();
    if (Array.isArray(ret)) {
      source = ret ?? [];
      loading = false;
    } else {
      ret.then(s => {
        source = s ?? [];
      }).catch(e => {
        console.trace(e);
      }).finally(() => {
        loading = false;
        dataView?.render();
      });
    }
  }

  const map = {};
  const find = (val: any) => {
    if (loading) return "";
    if (val in map) return map[val];
    const sitem = source.find((sitem) => sitem[svdn] === val);
    if (sitem == null) return "";
    return map[val] = (sitem ? sitem[sldn] : "") ?? "";
  };

  return {
    ...props,
    name: ldn,
    vName: props.name,
    bodyClassNames: [...(convertClassNames(props.bodyClassNames) ?? []), dataViewIptCn],
    _dv: (dv) => {
      dataView = dv;
    },
    initializeRowData: (data) => {
      if (loading) return false;
      data[ldn] = find(data[props.name]);
    },
    _beginEdit: props.disabled ? undefined : ({ target }) => {
      return {
        node: (
          <EditColumn
            bind={bind = { value: target.data[props.name] }}
            attrs={{
              ...props.selectBoxAttributes,
              $source: source,
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
        target.data[ldn] = find(a);
      }
      props.endedEdit?.({ before: b, after: commit ? a : b }, target, commit);
    },
  };
};

const EditColumn: FC<{
  bind: {[key: string]: any};
  attrs: SelectBoxAttributes<any>;
}> = ({ bind, attrs }) => {
  const hook = useSelectBox();
  useEffect(() => {
    hook.focus();
  }, []);
  return (
    <SelectBox
      {...attrs}
      $hook={hook}
      $name="value"
      $bind={bind}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default DataViewSelectBox;