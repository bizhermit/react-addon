export declare type _LayoutColor = "light" | "dark";
export declare type LayoutColor = "system" | _LayoutColor;
export declare type LayoutDesign = "flat" | "material" | "neumorphism";
declare const signals: readonly ["default", "primary", "secondary", "warning", "danger", "deprecated"];
export declare type Signal = typeof signals[number];
export declare type FitToOuter = "f" | "x" | "y" | "fx" | "fy" | "none";
declare type CssVarCBDBase = {
    c: string;
    b: string;
    d: string;
};
declare type CssSignalVar = {
    fc: string;
    bgc: string;
    bdc: string;
    nav: {
        fc: string;
        bgc: string;
        anchor: string;
    };
    head: {
        fc: string;
        bgc: string;
        bdc: string;
    };
    ipt: {
        fc: string;
        bgc: string;
        bdc: string;
        on: string;
        off: string;
        knob: string;
    };
    btn: {
        base: {
            fc: string;
            bgc: string;
            bdc: string;
        };
        hvr: {
            fc: string;
            bgc: string;
            bdc: string;
        };
        act: {
            fc: string;
            bgc: string;
            bdc: string;
        };
    };
};
declare const CssVar: {
    size: string;
    fs: string;
    bdr: string;
    pdx: string;
    pdy: string;
    phsize: string;
    bgc: string;
    fc: string;
    bdc: string;
    anchor: string;
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
    default: CssSignalVar;
    primary: CssSignalVar;
    secondary: CssSignalVar;
    warning: CssSignalVar;
    danger: CssSignalVar;
    deprecated: CssSignalVar;
    week: {
        sun: {
            fc: string;
            bgc: string;
            bdc: string;
        };
        sat: {
            fc: string;
            bgc: string;
            bdc: string;
        };
    };
    lv: {
        header: {
            fc: string;
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
                    fc: string;
                    bgc: string;
                    bdc: string;
                };
                cell: {
                    fc: string;
                    bgc: string;
                    bdc: string;
                };
            };
            act: {
                fc: string;
                bgc: string;
                hvr: {
                    fc: string;
                    bgc: string;
                };
            };
        };
    };
};
export declare const CssDarkVar = "\n--bh-bgc: #39393b;\n--bh-fc: #f2f2f2;\n--bh-bdc: #69696a;\n--bh-anchor: #9bf;\n--bh-sdw_c: rgba(0,0,0,0.9);\n--bh-sdw_b: rgba(80,80,80,0.5);\n--bh-sdw_d: rgba(0,0,0,0.65);\n--bh-mask-bgc: rgba(60,60,63,0.6);\n--bh-mask-ifc: rgba(95,95,167,1);\n--bh-hvr-bgc: rgba(89,89,89,0.5);\n--bh-act-bgc: rgba(89,89,89,0.3);\n--bh-def-fc: #f2f2f2;\n--bh-def-bgc: #3d3d40;\n--bh-def-bdc: #707073;\n--bh-def-head-bgc: #303033;\n--bh-def-head-fc: #f2f2f2;\n--bh-def-head-bdc: #4c4c4f;\n--bh-def-nav-bgc: linear-gradient(to bottom right, #202022, #272729);\n--bh-def-nav-fc: #f2f2f2;\n--bh-def-ipt-bgc: #3d3d3f;\n--bh-def-ipt-fc: #f2f2f2;\n--bh-def-ipt-bdc: #707073;\n--bh-def-ipt-on: #606063;\n--bh-def-ipt-off: #3d3d3f;\n--bh-def-ipt-knob: #303033;\n--bh-def-btn-base-bgc: #58585a;\n--bh-def-btn-base-fc: #f2f2f2;\n--bh-def-btn-base-bdc: #58585a;\n--bh-def-btn-hvr-bgc: #636366;\n--bh-def-btn-hvr-fc: #f2f2f2;\n--bh-def-btn-hvr-bdc: #636366;\n--bh-def-btn-act-bgc: #4c4c4f;\n--bh-def-btn-act-fc: #f2f2f2;\n--bh-def-btn-act-bdc: #4c4c4f;\n--bh-pri-fc: #30b030;\n--bh-pri-bgc: #393c39;\n--bh-pri-bdc: #307330;\n--bh-pri-head-bgc: #303f30;\n--bh-pri-head-fc: #f2f2f2;\n--bh-pri-head-bdc: #475c47;\n--bh-pri-nav-bgc: linear-gradient(to bottom right, #043904, #0b410b);\n--bh-pri-nav-fc: #f2f2f2;\n--bh-pri-ipt-bgc: #3d3d3f;\n--bh-pri-ipt-fc: #f2f2f2;\n--bh-pri-ipt-bdc: #307330;\n--bh-pri-ipt-on: #255125;\n--bh-pri-ipt-off: #3d3d3f;\n--bh-pri-ipt-knob: #303033;\n--bh-pri-btn-base-bgc: #285028;\n--bh-pri-btn-base-fc: #f2f2f2;\n--bh-pri-btn-base-bdc: #285028;\n--bh-pri-btn-hvr-bgc: #315b31;\n--bh-pri-btn-hvr-fc: #f2f2f2;\n--bh-pri-btn-hvr-bdc: #315b31;\n--bh-pri-btn-act-bgc: #214921;\n--bh-pri-btn-act-fc: #f2f2f2;\n--bh-pri-btn-act-bdc: #234a23;\n--bh-sec-fc: #508aff;\n--bh-sec-bgc: #393942;\n--bh-sec-bdc: #4052aa;\n--bh-sec-head-bgc: #303256;\n--bh-sec-head-fc: #f2f2f2;\n--bh-sec-head-bdc: #474767;\n--bh-sec-nav-bgc: linear-gradient(to bottom right, #14243e, #1b2b45);\n--bh-sec-nav-fc: #f2f2f2;\n--bh-sec-ipt-bgc: #3d3d3f;\n--bh-sec-ipt-fc: #f2f2f2;\n--bh-sec-ipt-bdc: #4052aa;\n--bh-sec-ipt-on: #24296f;\n--bh-sec-ipt-off: #3d3d3f;\n--bh-sec-ipt-knob: #303033;\n--bh-sec-btn-base-bgc: #333c6a;\n--bh-sec-btn-base-fc: #f2f2f2;\n--bh-sec-btn-base-bdc: #333c6a;\n--bh-sec-btn-hvr-bgc: #39437c;\n--bh-sec-btn-hvr-fc: #f2f2f2;\n--bh-sec-btn-hvr-bdc: #39437c;\n--bh-sec-btn-act-bgc: #2e3765;\n--bh-sec-btn-act-fc: #f2f2f2;\n--bh-sec-btn-act-bdc: #2e3765;\n--bh-wrn-fc: #c0c01e;\n--bh-wrn-bgc: #3a3a30;\n--bh-wrn-bdc: #7f7f10;\n--bh-wrn-head-bgc: #38360a;\n--bh-wrn-head-fc: #f2f2f2;\n--bh-wrn-head-bdc: #555503;\n--bh-wrn-nav-bgc: linear-gradient(to bottom right, #353000, #3c3700);\n--bh-wrn-nav-fc: #f2f2f2;\n--bh-wrn-nav-anchor: #9bf;\n--bh-wrn-ipt-bgc: #3d3d3f;\n--bh-wrn-ipt-fc: #f2f2f2;\n--bh-wrn-ipt-bdc: #7f7f10;\n--bh-wrn-ipt-on: #565000;\n--bh-wrn-ipt-off: #3d3d3f;\n--bh-wrn-ipt-knob: #303033;\n--bh-wrn-btn-base-bgc: #4f4c00;\n--bh-wrn-btn-base-fc: #f2f2f2;\n--bh-wrn-btn-base-bdc: #4f4c00;\n--bh-wrn-btn-hvr-bgc: #5c5900;\n--bh-wrn-btn-hvr-fc: #f2f2f2;\n--bh-wrn-btn-hvr-bdc: #5c5900;\n--bh-wrn-btn-act-bgc: #494400;\n--bh-wrn-btn-act-fc: #f2f2f2;\n--bh-wrn-btn-act-bdc: #494400;\n--bh-dng-fc: #ef4a57;\n--bh-dng-bgc: #423535;\n--bh-dng-bdc: #b02525;\n--bh-dng-head-bgc: #503030;\n--bh-dng-head-fc: #f2f2f2;\n--bh-dng-head-bdc: #724040;\n--bh-dng-nav-bgc: linear-gradient(to bottom right, #402424, #472b2b);\n--bh-dng-nav-fc: #f2f2f2;\n--bh-dng-ipt-bgc: #3d3d3f;\n--bh-dng-ipt-fc: #f2f2f2;\n--bh-dng-ipt-bdc: #b02525;\n--bh-dng-ipt-on: #5f2020;\n--bh-dng-ipt-off: #3d3d3f;\n--bh-dng-ipt-knob: #303033;\n--bh-dng-btn-base-bgc: #6f3437;\n--bh-dng-btn-base-fc: #f2f2f2;\n--bh-dng-btn-base-bdc: #6f3437;\n--bh-dng-btn-hvr-bgc: #7f3a3e;\n--bh-dng-btn-hvr-fc: #f2f2f2;\n--bh-dng-btn-hvr-bdc: #7f3a3e;\n--bh-dng-btn-act-bgc: #692e31;\n--bh-dng-btn-act-fc: #f2f2f2;\n--bh-dng-btn-act-bdc: #692e31;\n--bh-dpr-fc: #707070;\n--bh-dpr-bgc: #393939;\n--bh-dpr-bdc: #606060;\n--bh-dpr-head-bgc: #323232;\n--bh-dpr-head-fc: #737373;\n--bh-dpr-head-bdc: #4e4e4e;\n--bh-dpr-nav-bgc: linear-gradient(to bottom right, #2d2d2d, #343434);\n--bh-dpr-nav-fc: #737373;\n--bh-dpr-nav-anchor: #404580;\n--bh-dpr-ipt-bgc: #3d3d3f;\n--bh-dpr-ipt-fc: #737373;\n--bh-dpr-ipt-bdc: #606060;\n--bh-dpr-ipt-on: #4b4b4b;\n--bh-dpr-ipt-off: #3d3d3f;\n--bh-dpr-ipt-knob: #303033;\n--bh-dpr-btn-base-bgc: #444444;\n--bh-dpr-btn-base-fc: #707070;\n--bh-dpr-btn-base-bdc: #444444;\n--bh-dpr-btn-hvr-bgc: #4c4c4c;\n--bh-dpr-btn-hvr-fc: #707070;\n--bh-dpr-btn-hvr-bdc: #4c4c4c;\n--bh-dpr-btn-act-bgc: #404040;\n--bh-dpr-btn-act-fc: #707070;\n--bh-dpr-btn-act-bdc: #404040;\n--bh-week_sun-fc: #ffd0d0;\n--bh-week_sun-bgc: #3b3232;\n--bh-week_sun-bdc: #724040;\n--bh-week_sat-fc: #d0d0ff;\n--bh-week_sat-bgc: #32323b;\n--bh-week_sat-bdc: #474767;\n--bh-lv_header-fc: #f2f2f2;\n--bh-lv_header-bgc: #303030;\n--bh-lv_header-bdc: #787878;\n--bh-lv_header-sort: #888888;\n--bh-lv_cell-ft_b: #f2f2f2;\n--bh-lv_cell-ft_d: #f2f2f2;\n--bh-lv_cell-bg_b: #404040;\n--bh-lv_cell-bg_d: #3c3c3c;\n--bh-lv_cell-bd_b: #616161;\n--bh-lv_cell-bd_d: #5c5c5c;\n--bh-lv_cell-hvr-row-fc: #f2f2f2;\n--bh-lv_cell-hvr-row-bgc: #333336;\n--bh-lv_cell-hvr-row-bdc: #575757;\n--bh-lv_cell-hvr-cell-fc: #f2f2f2;\n--bh-lv_cell-hvr-cell-bgc: #28282a;\n--bh-lv_cell-hvr-cell-bdc: #505050;\n--bh-lv_cell-act-fc: #f2f2f2;\n--bh-lv_cell-act-bgc: #202022;\n--bh-lv_cell-act_hvr-fc: #f2f2f2;\n--bh-lv_cell-act_hvr-bgc: #101011;\n";
export declare const cssParamsSize: () => number;
export declare const CssPV: {
    flex: string;
    ba: string;
    inactOpacity: string;
    cvxBg: (cv?: CssVarCBDBase) => string;
    ccvBg: (cv?: CssVarCBDBase) => string;
    cvxSd: string;
    cvxSdD: string;
    cvxSdS: string;
    ccvSd: string;
    ccvSdD: string;
    ccvSdS: string;
    signalCn: (signal: Signal) => string;
    textSd: (color: string) => string;
};
export declare const switchDesign: (design: LayoutDesign, css: Partial<{
    flat: string;
    material: string;
    neumorphism: string;
    c: string;
    fm: string;
    _: string;
}>) => string;
export declare const signalIterator: <T = string>(func: (signal: Signal, v: CssSignalVar, selector: string) => T, skipDefault?: boolean) => T[];
export default CssVar;
