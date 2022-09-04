import { SourceArray } from "../../../hooks/source";
import { SelectBoxAttributes } from "../../inputs/select-box";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../data-view";
declare const ListViewSelectBox: ListViewColumnFunction<ListViewEditColumnProps<number | string> & {
    labelDataName?: string;
    selectBoxAttributes?: Omit<ListViewEditInputAttributes<SelectBoxAttributes<any>>, "$source">;
    source?: SourceArray<{
        [key: string]: any;
    }>;
}>;
export default ListViewSelectBox;
