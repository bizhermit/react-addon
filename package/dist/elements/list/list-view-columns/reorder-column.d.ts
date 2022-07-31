import { ListViewColumnProps } from "../list-view";
declare type Props = {
    name?: string;
    width?: number;
    disabled?: boolean;
    range?: "cell" | "row";
    fixed?: boolean;
    borderless?: boolean;
};
declare const ListViewReorderColumn: (props?: Props) => ListViewColumnProps;
export default ListViewReorderColumn;
