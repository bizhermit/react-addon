import { ReactElement, ReactNode } from "react";
import { FitToOuter } from "../styles/css-var";
export declare const attributes: (attrs: {
    [key: string]: any;
}, ...cns: Array<string>) => {
    className: string;
};
export declare const attributesWithoutChildren: (attrs: {
    [key: string]: any;
}, ...cns: Array<string>) => {
    className: string;
};
export declare const dBool: (flag?: boolean) => boolean;
export declare const dPosX: (l?: boolean, c?: boolean, r?: boolean) => "l" | "c" | "r";
export declare const dPosY: (t?: boolean, m?: boolean, b?: boolean) => "m" | "t" | "b";
export declare const ftoCn: (fto?: FitToOuter) => string;
export declare const paddingCn: (padding?: boolean | number) => string;
export declare const shadowCn: (shadow?: boolean | number) => string;
export declare const dropShadowCn: (shadow?: boolean | number) => string;
export declare const convertClassNames: (classNames: string | Array<string>) => string[];
export declare const isReactElement: (node: ReactNode) => node is ReactElement<any, string | import("react").JSXElementConstructor<any>>;
