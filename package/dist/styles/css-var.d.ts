export declare type _LayoutColor = "light" | "dark";
export declare type LayoutColor = "system" | _LayoutColor;
export declare type LayoutDesign = "flat" | "material" | "neumorphism";
declare const colors: readonly ["default", "dull", "pure", "vivid", "disabled", "reverse", "primary", "secondary", "tertiary", "warning", "danger", "cool", "pretty"];
export declare type Color = typeof colors[number];
export declare type ColorType = "base" | "head" | "nav";
export declare type Size = "xs" | "s" | "m" | "l" | "xl";
export declare type FitToOuter = "f" | "x" | "y" | "fx" | "fy" | "none";
declare type ColorSet = {
    fgc: string;
    bgc: string;
    bdc: string;
    anc: string;
};
declare type ColorSetWithoutAnc = Omit<ColorSet, "anc">;
declare type CssColorVar = ColorSet & {
    nav: ColorSet;
    head: ColorSet;
    ipt: ColorSetWithoutAnc & {
        on: string;
        onf: string;
        off: string;
        knb: string;
    };
    btn: {
        base: ColorSetWithoutAnc;
        hvr: ColorSetWithoutAnc;
        act: ColorSetWithoutAnc;
    };
};
export declare const varFontSize = "--bh-fs";
export declare const varAnchor: string;
declare const CssVar: {
    size: string;
    fs: string;
    bdr: string;
    pdx: string;
    pdy: string;
    phsize: string;
    bgc: string;
    fgc: string;
    bdc: string;
    anchor: string;
    bsize: string;
    sdw: {
        c: string;
        b: string;
        d: string;
    };
    sb: {
        size: string;
        bgc: string;
        thumb: {
            bgc: string;
            hvr_cont_bgc: string;
            hvr_bgc: string;
            act_bgc: string;
        };
    };
    mask: {
        bgc: string;
        ifc: string;
    };
    hvrBgc: string;
    actBgc: string;
    default: CssColorVar;
    dull: CssColorVar;
    pure: CssColorVar;
    vivid: CssColorVar;
    disabled: CssColorVar;
    reverse: CssColorVar;
    primary: CssColorVar;
    secondary: CssColorVar;
    tertiary: CssColorVar;
    warning: CssColorVar;
    danger: CssColorVar;
    cool: CssColorVar;
    pretty: CssColorVar;
    week: {
        sun: {
            fgc: string;
            bgc: string;
            bdc: string;
        };
        sat: {
            fgc: string;
            bgc: string;
            bdc: string;
        };
    };
    dataview: {
        header: {
            fgc: string;
            bgc: string;
            bdc: string;
            sort: string;
        };
        cell: {
            ft: {
                b: string;
                d: string;
            };
            bg: {
                b: string;
                d: string;
            };
            bd: {
                b: string;
                d: string;
            };
            hvr: {
                row: {
                    fgc: string;
                    bgc: string;
                    bdc: string;
                };
                cell: {
                    fgc: string;
                    bgc: string;
                    bdc: string;
                };
            };
            act: {
                fgc: string;
                bgc: string;
                hvr: {
                    fgc: string;
                    bgc: string;
                };
            };
        };
    };
};
export declare const CssDarkVar: string;
export declare const cssParamsSize: () => number;
export declare const CssPV: {
    flex: string;
    ba: string;
    inactOpacity: string;
    dropSd: (level: number) => string;
    cvxSd: (level: number) => string;
    ccvSd: (level: number) => string;
    cvxSdBase: string;
    cvxSdHover: string;
    nCvxSd: (level: number) => string;
    nCcvSd: (level: number) => string;
    nCvxSdBase: string;
    nCvxSdHover: string;
    nCcvSdActive: string;
    nCcvSdDisabled: string;
    nCvxSdShallow: string;
    nCcvSdDeep: string;
    colorCn: (color: Color) => string;
    textSd: (color: string) => string;
};
export declare const sizeIterator: (base: string, css: Partial<{
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
}>, selector?: string) => string;
export declare const switchDesign: (design: LayoutDesign, css: Partial<{
    flat: string;
    material: string;
    neumorphism: string;
    c: string;
    fm: string;
    _: string;
}>) => string;
export declare const colorIterator: <T = string>(func: (color: Color, v: CssColorVar, selector: string) => T, skipDefault?: boolean) => T[];
export default CssVar;
