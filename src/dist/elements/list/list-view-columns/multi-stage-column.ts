import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { ListViewColumnFunction, ListViewMultiStageRowItemProps } from "../list-view";

export type ListViewMultiStageColumnProps = {
  name?: string;
  fixed?: boolean;
  fill?: boolean;
  rows: Array<ListViewMultiStageRowItemProps>;
};

const ListViewMultiStageColumn: ListViewColumnFunction<ListViewMultiStageColumnProps> = (props) => {
  return {
    name: props.name ?? StringUtils.generateUuidV4(),
    fixed: props.fixed,
    fill: props.fill,
    _rows: props.rows,
  };
};

export default ListViewMultiStageColumn;