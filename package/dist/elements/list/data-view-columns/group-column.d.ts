import { DataViewColumnFunction, DataViewColumnProps, DataViewHeaderOrFooterCellClicked } from "../data-view";
export declare type DataViewGroupColumnProps = {
    groupName?: string;
    name?: string;
    headerCellLabel?: string;
    headerCellTextAlign?: "left" | "center" | "right";
    clickedHeaderCell?: DataViewHeaderOrFooterCellClicked;
    fixed?: boolean;
    fill?: boolean;
    columns: Array<DataViewColumnProps>;
};
declare const DataViewGroupColumn: DataViewColumnFunction<DataViewGroupColumnProps>;
export default DataViewGroupColumn;
