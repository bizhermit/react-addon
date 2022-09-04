import { ListViewColumnFunction, ListViewEditColumnProps } from "../data-view";
declare const ListViewRadioButtonColumn: ListViewColumnFunction<ListViewEditColumnProps<{
    [key: string]: any;
}> & {
    selectedValue?: number | string | boolean;
    unselectedValue?: number | string | boolean;
    selectRowClick?: boolean;
}>;
export default ListViewRadioButtonColumn;
