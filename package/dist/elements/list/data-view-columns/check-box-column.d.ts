import { DataViewColumnFunction, DataViewEditColumnProps } from "../data-view";
declare const DataViewCheckBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<{
    value: boolean | number | string;
    checked: boolean;
}> & {
    checkedValue?: boolean | number | string;
    uncheckedValue?: boolean | number | string;
    batchCheck?: boolean;
    toggleRowClick?: boolean;
    checkBoxFill?: boolean;
}>;
export default DataViewCheckBoxColumn;
