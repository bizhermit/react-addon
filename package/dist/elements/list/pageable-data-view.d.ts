import { ForwardedRef, FunctionComponent, ReactElement } from "react";
import { DataViewAttributes, DataViewHook } from "./data-view";
declare type Data = {
    [key: string]: any;
};
declare type AddinHook = {
    getPageIndex: () => number;
    getPageNumber: () => number;
};
export declare type PageableDataViewHook<T = Data> = DataViewHook<T> & AddinHook;
export declare type PageableDataViewAttributes<T = Data> = Omit<DataViewAttributes<T>, "$hook"> & {
    $hook?: PageableDataViewHook<T>;
    $pagePosition?: "top" | "bottom" | "both";
    $recordsPerPage?: number;
    $changePage?: (pageIndex: number) => void;
    $overridePageStatus?: {
        maxPage: number;
        pageIndex: number;
    };
};
interface PageableDataViewFC extends FunctionComponent {
    <T extends {
        [key: string]: any;
    } = Data>(attrs: PageableDataViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<PageableDataViewAttributes<T>>;
}
declare const PageableDataView: PageableDataViewFC;
export declare const usePageableDataView: <T extends {
    [key: string]: any;
} = any>() => PageableDataViewHook<T>;
export default PageableDataView;
