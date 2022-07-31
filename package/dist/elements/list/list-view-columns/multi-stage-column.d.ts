import { ListViewColumnFunction, ListViewMultiStageRowItemProps } from "../list-view";
export declare type ListViewMultiStageColumnProps = {
    name?: string;
    fixed?: boolean;
    fill?: boolean;
    rows: Array<ListViewMultiStageRowItemProps>;
};
declare const ListViewMultiStageColumn: ListViewColumnFunction<ListViewMultiStageColumnProps>;
export default ListViewMultiStageColumn;
