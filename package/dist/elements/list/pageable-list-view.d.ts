import { ForwardedRef, FunctionComponent, ReactElement } from "react";
import { ListViewAttributes, ListViewHook } from "./list-view";
declare type Data = {
    [key: string]: any;
};
declare type AddinHook = {
    getPageIndex: () => number;
    getPageNumber: () => number;
};
export declare type PageableListViewHook<T = Data> = ListViewHook<T> & AddinHook;
export declare type PageableListViewAttributes<T = Data> = Omit<ListViewAttributes<T>, "$hook"> & {
    $hook?: PageableListViewHook<T>;
    $pagePosition?: "top" | "bottom" | "both";
    $recordsPerPage?: number;
    $changePage?: (pageIndex: number) => void;
    $overridePageStatus?: {
        maxPage: number;
        pageIndex: number;
    };
};
interface PageableListViewFC extends FunctionComponent {
    <T extends {
        [key: string]: any;
    } = Data>(attrs: PageableListViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<PageableListViewAttributes<T>>;
}
declare const PageableListView: PageableListViewFC;
export declare const usePageableListView: <T extends {
    [key: string]: any;
} = any>() => PageableListViewHook<T>;
export default PageableListView;
