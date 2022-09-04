import { ListViewColumnFunction, ListViewColumnProps, ListViewHeaderOrFooterCellClicked } from "../data-view";
export declare type ListViewGroupColumnProps = {
    groupName?: string;
    name?: string;
    headerCellLabel?: string;
    headerCellTextAlign?: "left" | "center" | "right";
    clickedHeaderCell?: ListViewHeaderOrFooterCellClicked;
    fixed?: boolean;
    fill?: boolean;
    columns: Array<ListViewColumnProps>;
};
declare const ListViewGroupColumn: ListViewColumnFunction<ListViewGroupColumnProps>;
export default ListViewGroupColumn;
