declare const usePortalElement: (options?: {
    id?: string;
    mount?: (element: HTMLDivElement) => void;
    unmount?: (element: HTMLDivElement) => void;
}) => HTMLDivElement;
export default usePortalElement;
