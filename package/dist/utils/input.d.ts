export declare const inputMode: (attrs: {
    $disabled?: boolean;
    $readOnly?: boolean;
}, ext?: {
    d?: boolean;
    r?: boolean;
}) => "r" | "d" | "e";
export declare const inputAttributes: (attrs: {
    [key: string]: any;
}, ...cns: Array<string>) => {
    className: string;
};
export declare const inputFieldAttributes: (attrs: {
    [key: string]: any;
}, ...cns: Array<string>) => {
    className: string;
};
export declare type InputHook<T, Q extends {
    [key: string]: any;
} = {}> = {
    focus: () => void;
    getValue: () => T;
    setValue: (value: T) => void;
} & Q;
