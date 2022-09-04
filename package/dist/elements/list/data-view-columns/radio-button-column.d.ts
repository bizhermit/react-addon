import { DataViewColumnFunction, DataViewEditColumnProps } from "../data-view";
declare const DataViewRadioButtonColumn: DataViewColumnFunction<DataViewEditColumnProps<{
    [key: string]: any;
}> & {
    selectedValue?: number | string | boolean;
    unselectedValue?: number | string | boolean;
    selectRowClick?: boolean;
}>;
export default DataViewRadioButtonColumn;
