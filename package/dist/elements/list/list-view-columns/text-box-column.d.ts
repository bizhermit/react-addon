import { TextBoxAttributes } from "../../inputs/text-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../list-view";
declare const ListViewTextBoxColumn: ListViewColumnFunction<ListViewEditColumnProps<string> & {
    textBoxAttributes?: ListViewEditInputAttributes<TextBoxAttributes>;
}>;
export default ListViewTextBoxColumn;
