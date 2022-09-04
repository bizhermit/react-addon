import { DataViewColumnFunction, DataViewMultiStageRowItemProps } from "../data-view";
export declare type DataViewMultiStageColumnProps = {
    name?: string;
    fixed?: boolean;
    fill?: boolean;
    rows: Array<DataViewMultiStageRowItemProps>;
};
declare const DataViewMultiStageColumn: DataViewColumnFunction<DataViewMultiStageColumnProps>;
export default DataViewMultiStageColumn;
