import { DateBoxAttributes } from "../../inputs/date-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewDateBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<string | number | Date> & {
    dateBoxAttributes?: Omit<DataViewEditInputAttributes<DateBoxAttributes>, "$mode" | "$dataType">;
    mode?: "ymd" | "ym" | "y";
    dataType?: "string" | "number" | "date";
    format?: string | ((date: Date) => string);
    labelDataName?: string;
}>;
export default DataViewDateBoxColumn;
