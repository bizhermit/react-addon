import { NumericBoxAttributes } from "../../inputs/numeric-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../data-view";
declare const ListViewNumericBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<number> & {
    numericBoxAttributes?: ListViewEditInputAttributes<NumericBoxAttributes>;
    labelDataName?: string;
    format?: (value?: number) => string;
}>;
export default ListViewNumericBoxColumn;
