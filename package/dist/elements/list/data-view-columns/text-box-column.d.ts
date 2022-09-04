import { TextBoxAttributes } from "../../inputs/text-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewTextBoxColumn: DataViewColumnFunction<DataViewEditColumnProps<string> & {
    textBoxAttributes?: DataViewEditInputAttributes<TextBoxAttributes>;
}>;
export default DataViewTextBoxColumn;
