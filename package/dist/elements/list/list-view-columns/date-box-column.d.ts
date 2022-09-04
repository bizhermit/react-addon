import { DateBoxAttributes } from "../../inputs/date-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../data-view";
declare const ListViewDateBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<string | number | Date> & {
    dateBoxAttributes?: Omit<ListViewEditInputAttributes<DateBoxAttributes>, "$mode" | "$dataType">;
    mode?: "ymd" | "ym" | "y";
    dataType?: "string" | "number" | "date";
    format?: string | ((date: Date) => string);
    labelDataName?: string;
}>;
export default ListViewDateBoxColumn;
