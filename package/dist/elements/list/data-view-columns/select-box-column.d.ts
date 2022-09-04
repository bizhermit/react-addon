import { SourceArray } from "../../../hooks/source";
import { SelectBoxAttributes } from "../../inputs/select-box";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewSelectBox: DataViewColumnFunction<DataViewEditColumnProps<number | string> & {
    labelDataName?: string;
    selectBoxAttributes?: Omit<DataViewEditInputAttributes<SelectBoxAttributes<any>>, "$source">;
    source?: SourceArray<{
        [key: string]: any;
    }>;
}>;
export default DataViewSelectBox;
