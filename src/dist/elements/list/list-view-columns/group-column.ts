import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { ListViewColumnFunction, ListViewColumnProps, ListViewHeaderOrFooterCellClicked } from "../list-view";

export type ListViewGroupColumnProps = {
  groupName?: string;
  name?: string;
  headerCellLabel?: string;
  headerCellTextAlign?: "left" | "center" | "right";
  clickedHeaderCell?: ListViewHeaderOrFooterCellClicked;
  fixed?: boolean;
  fill?: boolean;
  columns: Array<ListViewColumnProps>;
};

const ListViewGroupColumn: ListViewColumnFunction<ListViewGroupColumnProps> = (props) => {
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

export default ListViewGroupColumn;