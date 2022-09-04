import { NumericBoxAttributes } from "../../inputs/numeric-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewNumericBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<number> & {
    numericBoxAttributes?: DataViewEditInputAttributes<NumericBoxAttributes>;
    labelDataName?: string;
    format?: (value?: number) => string;
}>;
export default DataViewNumericBoxColumn;
