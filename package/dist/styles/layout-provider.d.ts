import React, { FC, ReactNode } from "react";
import { LayoutColor, LayoutDesign, _LayoutColor } from "./css-var";
export declare const ScreenSize: {
    readonly exSmall: 0;
    readonly small: 1;
    readonly medium: 2;
    readonly large: 3;
    readonly exLarge: 4;
};
declare type ScreenSizeValue = typeof ScreenSize[keyof typeof ScreenSize];
export declare type LayoutContextProps = {
    color: LayoutColor;
    _color: _LayoutColor;
    design: LayoutDesign;
    setColor: (color: LayoutColor) => void;
    setDesign: (design: LayoutDesign) => void;
    screenSize: ScreenSizeValue;
    cache: {
        [key: string]: any;
    };
};
export declare const LayoutContext: React.Context<LayoutContextProps>;
export declare const useLayout: () => LayoutContextProps;
declare const LayoutProvider: FC<{
    color?: LayoutColor;
    design?: LayoutDesign;
    judgeSize?: (width: number) => ScreenSizeValue;
    children?: ReactNode;
}>;
export default LayoutProvider;
