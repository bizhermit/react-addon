export declare type SourceArray<T> = Array<T> | (() => Array<T> | Promise<Array<T>>);
declare const useSource: <T>(src: SourceArray<T>, opts?: {
    preventSourceMemo?: boolean;
    changeSource?: (source: T[]) => void;
}) => {
    loading: boolean;
    source: T[];
};
export default useSource;
