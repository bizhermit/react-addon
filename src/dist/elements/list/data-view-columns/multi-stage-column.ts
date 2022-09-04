import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { DataViewColumnFunction, DataViewMultiStageRowItemProps } from "../data-view";

export type DataViewMultiStageColumnProps = {
  name?: string;
  fixed?: boolean;
  fill?: boolean;
  rows: Array<DataViewMultiStageRowItemProps>;
};

const DataViewMultiStageColumn: DataViewColumnFunction<DataViewMultiStageColumnProps> = (props) => {
  return {
    name: props.name ?? StringUtils.generateUuidV4(),
    fixed: props.fixed,
    fill: props.fill,
    _rows: props.rows,
  };
};

export default DataViewMultiStageColumn;