import { ListViewColumnFunction, ListViewEditColumnProps } from "../list-view";
declare const ListViewCheckBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<{
    value: boolean | number | string;
    checked: boolean;
}> & {
    checkedValue?: boolean | number | string;
    uncheckedValue?: boolean | number | string;
    batchCheck?: boolean;
    toggleRowClick?: boolean;
    checkBoxFill?: boolean;
}>;
export default ListViewCheckBoxColumn;
