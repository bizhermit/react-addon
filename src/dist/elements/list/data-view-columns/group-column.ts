import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { DataViewColumnFunction, DataViewColumnProps, DataViewHeaderOrFooterCellClicked } from "../data-view";

export type DataViewGroupColumnProps = {
  groupName?: string;
  name?: string;
  headerCellLabel?: string;
  headerCellTextAlign?: "left" | "center" | "right";
  clickedHeaderCell?: DataViewHeaderOrFooterCellClicked;
  fixed?: boolean;
  fill?: boolean;
  columns: Array<DataViewColumnProps>;
};

const DataViewGroupColumn: DataViewColumnFunction<DataViewGroupColumnProps> = (props) => {
  return {
    name: props.groupName ?? StringUtils.generateUuidV4(),
    fixed: props.fixed,
    fill: props.fill,
    _rows: [{
      columns: [{
        name: props.name ?? StringUtils.generateUuidV4(),
        headerCellLabel: props.headerCellLabel,
        headerCellTextAlign: props.headerCellTextAlign,
        clickHeaderCell: props.clickedHeaderCell,
        sort: false,
        resize: false,
        fill: true,
      }],
      body: false,
      footer: false,
    }, {
      columns: props.columns,
    }],
  };
};

export default DataViewGroupColumn;