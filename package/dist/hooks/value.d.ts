import { Dispatch } from "react";
import { Color } from "../styles/css-var";
export declare const equalValue: (v1: any, v2: any) => boolean;
declare type ChangeEventContext<T, U extends {
    [key: string]: any;
} = {}> = {
    after: T;
    before: T;
} & U;
export declare type InputAttributes<T, U extends {
    [key: string]: any;
} = {}> = {
    $name?: string;
    $bind?: {
        [key: string]: any;
    };
    $disabled?: boolean;
    $readOnly?: boolean;
    $defaultValue?: T;
    $value?: T;
    $placeholder?: string;
    $dispatch?: Dispatch<T>;
    $change?: (ctx: ChangeEventContext<T, U>) => (boolean | void);
    $changed?: (ctx: ChangeEventContext<T, U>) => void;
    $color?: Color;
};
export declare type InputAttributesWithoutDispatch<T, U extends {
    [key: string]: any;
} = {}> = Omit<InputAttributes<T, U>, "$dispatch">;
declare type Options<T, U extends {
    [key: string]: any;
} = {}> = {
    effect?: (val: T) => void;
    mountEffect?: (val: T) => void;
    bindEffect?: (val: T) => void;
    stateEffect?: (val: T) => void;
    validation?: (val: T) => boolean;
    setChangeCtx?: (ctx: ChangeEventContext<T>) => ChangeEventContext<T, U>;
};
declare const useValue: <T, U extends {
    [key: string]: any;
} = {}>(attrs: InputAttributes<T, U>, opts?: Options<T, U>) => {
    val: T;
    set: import("react").MutableRefObject<(v: T) => T>;
    buf: import("react").MutableRefObject<T>;
};
export default useValue;
