import { TimeBoxAttributes } from "../../inputs/time-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewTimeBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<string | number> & {
    timeBoxAttributes?: Omit<DataViewEditInputAttributes<TimeBoxAttributes>, "$mode" | "$unit">;
    mode?: "hms" | "hm" | "ms" | "h";
    unit?: "hour" | "minute" | "second" | "millisecond";
    dataType?: "string" | "number";
    format?: string | ((time: string | number) => string);
    labelDataName?: string;
}>;
export default DataViewTimeBoxColumn;
