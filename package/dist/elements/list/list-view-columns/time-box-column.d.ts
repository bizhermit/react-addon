import { TimeBoxAttributes } from "../../inputs/time-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../data-view";
declare const ListViewTimeBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<string | number> & {
    timeBoxAttributes?: Omit<ListViewEditInputAttributes<TimeBoxAttributes>, "$mode" | "$unit">;
    mode?: "hms" | "hm" | "ms" | "h";
    unit?: "hour" | "minute" | "second" | "millisecond";
    dataType?: "string" | "number";
    format?: string | ((time: string | number) => string);
    labelDataName?: string;
}>;
export default ListViewTimeBoxColumn;
