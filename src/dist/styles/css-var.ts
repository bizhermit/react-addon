export type _LayoutColor = "light" | "dark";
export type LayoutColor = "system" | _LayoutColor;
export type LayoutDesign = "flat" | "material" | "neumorphism";

const colors = [
  "default",
  "dull",
  "pure",
  "vivid",
  "disabled",
  "reverse",
  "primary",
  "secondary",
  "tertiary",
  "warning",
  "danger",
  "cool",
  "pretty"
] as const;
export type Color = typeof colors[number];
export type ColorType = "base" | "head" | "nav";
export type Size = "xs" | "s" | "m" | "l" | "xl";
export type FitToOuter = "f" | "x" | "y" | "fx" | "fy" | "none";

type CssColorVar = {
  fc: string;
  bgc: string;
  bdc: string;
  nav: {
    fc: string;
    bgc: string;
    bdc: string;
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
    on_fc: string;
    off: string;
    knob: string;
  };
  btn: {
    base: {
      fc: string;
      bgc: string;
      bdc: string;
    },
    hvr: {
      fc: string;
      bgc: string;
      bdc: string;
    },
    act: {
      fc: string;
      bgc: string;
      bdc: string;
    }
  };
};

export const varFontSize = "--bh-fs";

const lFc = "#161616";
const lBc = "#f4f4fb";
const lBdc = "#909099";
const dFc = "#f2f2f2";
const dBc = "#39393b";
const dBdc = "#808084";

const CssVar = {
  size: "var(--bh-size, 30px)", // base size
  fs: `var(${varFontSize}, 1.6rem)`, // font size
  bdr: "var(--bh-bdr, 0px)", // border radius
  pdx: "var(--bh-pdx, 0px)", // padding x
  pdy: "var(--bh-pdy, 0px)", // padding y
  phsize: "var(--bh-phsize, 13px)", // placeholder size
  bgc: `var(--bh-bgc, ${lBc})`, // background color
  fc: `var(--bh-fc, ${lFc})`, // font color
  bdc: `var(--bh-bdc, ${lBdc})`, // border color
  anchor: "var(--bh-anchor, #00f)", // anchor color
  bsize: "var(--bh-bsize, 1Q)", // border width
  sdw: { // shadow
    c: "var(--bh-sdw_c, rgba(105,105,105,0.75))",
    b: "var(--bh-sdw_b, rgba(224,224,229,0.2))",
    d: "var(--bh-sdw_d, rgba(0,0,0,0.3))",
  },
  sb: { // scrollbar
    size: "var(--bh-sb-size, 8px)",
    bgc: "var(--bh-sb-bgc, transparent)",
    thumb: {
      bgc: "var(--bh-sb_thumb-bgc, rgba(127,127,130,0.2))",
      hvr_cont_bgc: "var(--bh-sb_thumb-hvr_cont-bgc, rgba(127,127,130,0.3))",
      hvr_bgc: "var(--bh-sb_thumb-hvr-bgc, rgba(127,127,130,0.4))",
      act_bgc: "var(--bh-sb_thumb-act-bgc, rgba(127,127,130,0.5))",
    }
  },
  mask: {
    bgc: "var(--bh-mask-bgc, rgba(157,157,167,0.6))",
    ifc: "var(--bh-mask-ifc, rgba(80,100,255,1))",
  },
  hvrBgc: "var(--bh-hvr-bgc, rgba(204,204,204,0.5))",
  actBgc: "var(--bh-act-bgc, rgba(204,204,204,0.3))",
  default: {
    fc: `var(--bh-def-fc, ${lFc})`,
    bgc: `var(--bh-bgc, ${lBc})`,
    bdc: `var(--bh-def-bdc, ${lBdc})`,
    head: {
      fc: `var(--bh-def-head-fc, ${lFc})`,
      bgc: "var(--bh-def-head-bgc, #e4e4f1)",
      bdc: "var(--bh-def-head-bdc, #888890)",
    },
    nav: {
      fc: "var(--bh-def-nav-fc, #f2f2f2)",
      bgc: "var(--bh-def-nav-bgc, #343a40)",
      bdc: "var(--bh-def-nav-bdc, #d8d8e0)",
      anchor: "var(--bh-def-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-def-ipt-bgc, #fafafa)",
      fc: `var(--bh-def-ipt-fc, ${lFc})`,
      bdc: `var(--bh-def-ipt-bdc, ${lBdc})`,
      on: "var(--bh-def-ipt-on, #bcc7d7)",
      on_fc: `var(--bh-def-ipt-on-fc, ${lFc})`,
      off: "var(--bh-def-ipt-off, #fff)",
      knob: "var(--bh-def-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-def-btn-base-bgc, #787880)",
        fc: "var(--bh-def-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-def-btn-base-bdc, #787880)",
      },
      hvr: {
        bgc: "var(--bh-def-btn-hvr-bgc, #66666d)",
        fc: "var(--bh-def-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-def-btn-hvr-bdc, #66666d)",
      },
      act: {
        bgc: "var(--bh-def-btn-act-bgc, #82828a)",
        fc: "var(--bh-def-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-def-btn-act-bdc, #82828a)",
      },
    },
  } as CssColorVar,
  dull: {
    fc: "var(--bh-dul-fc, #606060)",
    bgc: `var(--bh-dul-bgc, ${lBc})`,
    bdc: "var(--bh-dul-bdc, #a0a0a7)",
    head: {
      fc: `var(--bh-dul-head-fc, #505050)`,
      bgc: "var(--bh-dul-head-bgc, #e4e4f1)",
      bdc: "var(--bh-dul-head-bdc, #909097)",
    },
    nav: {
      fc: `var(--bh-dul-nav-fc, #dadada)`,
      bgc: "var(--bh-dul-nav-bgc, #343a40)",
      bdc: "var(--bh-dul-nav-bdc, #d8d8e0)",
      anchor: "var(--bh-dul-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-dul-ipt-bgc, #fafafa)",
      fc: `var(--bh-dul-ipt-fc, #606060)`,
      bdc: "var(--bh-dul-ipt-bdc, #a0a0a7)",
      on: "var(--bh-dul-ipt-on, #e8e8ec)",
      on_fc: "var(--bh-dul-ipt-on-fc, #606060)",
      off: "var(--bh-dul-ipt-off, #fff)",
      knob: "var(--bh-dul-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-dul-btn-base-bgc, #d0d0d5)",
        fc: `var(--bh-dul-btn-base-fc, #373737)`,
        bdc: "var(--bh-dul-btn-base-bdc, #d0d0d5)",
      },
      hvr: {
        bgc: "var(--bh-dul-btn-hvr-bgc, #c1c1c6)",
        fc: `var(--bh-dul-btn-hvr-fc, #373737)`,
        bdc: "var(--bh-dul-btn-hvr-bdc, #c1c1c6)",
      },
      act: {
        bgc: "var(--bh-dul-btn-act-bgc, #d6d6da)",
        fc: `var(--bh-dul-btn-act-fc, #373737)`,
        bdc: "var(--bh-dul-btn-act-bdc, #d6d6da)",
      },
    },
  } as CssColorVar,
  pure: {
    fc: `var(--bh-pur-fc, ${lFc})`,
    bgc: "var(--bh-pur-bgc, #fff)",
    bdc: "var(--bh-pur-bdc, #555)",
    head: {
      fc: `var(--bh-pur-head-fc, ${lFc})`,
      bgc: "var(--bh-pur-head-bgc, #fff)",
      bdc: "var(--bh-pur-head-bdc, #282828)",
    },
    nav: {
      fc: `var(--bh-pur-nav-fc, ${lFc})`,
      bgc: "var(--bh-pur-nav-bgc, #fff)",
      bdc: "var(--bh-pur-nav-bdc, #000)",
      anchor: "var(--bh-pur-nav-anchor, #00f)",
    },
    ipt: {
      bgc: "var(--bh-pur-ipt-bgc, #fff)",
      fc: `var(--bh-pur-ipt-fc, ${lFc})`,
      bdc: "var(--bh-pur-ipt-bdc, #555)",
      on: "var(--bh-pur-ipt-on, #7d7b83)",
      on_fc: "var(--bh-pur-ipt-on-fc, #fff)",
      off: "var(--bh-pur-ipt-off, #fff)",
      knob: "var(--bh-pur-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-pur-btn-base-bgc, #fff)",
        fc: `var(--bh-pur-btn-base-fc, ${lFc})`,
        bdc: "var(--bh-pur-btn-base-bdc, #fff)",
      },
      hvr: {
        bgc: "var(--bh-pur-btn-hvr-bgc, #e8e8e8)",
        fc: `var(--bh-pur-btn-hvr-fc, ${lFc})`,
        bdc: "var(--bh-pur-btn-hvr-bdc, #e8e8e8)",
      },
      act: {
        bgc: "var(--bh-pur-btn-act-bgc, #f3f3f3)",
        fc: `var(--bh-pur-btn-act-fc, ${lFc})`,
        bdc: "var(--bh-pur-btn-act-bdc, #f3f3f3)",
      },
    },
  } as CssColorVar,
  vivid: {
    fc: "var(--bh-vvd-fc, #000)",
    bgc: "var(--bh-vvd-bgc, #fff)",
    bdc: "var(--bh-vvd-bdc, #000)",
    head: {
      fc: "var(--bh-vvd-head-fc, #fff)",
      bgc: "var(--bh-vvd-head-bgc, #444)",
      bdc: "var(--bh-vvd-head-bdc, #fff)",
    },
    nav: {
      fc: "var(--bh-vvd-nav-fc, #fff)",
      bgc: "var(--bh-vvd-nav-bgc, #000)",
      bdc: "var(--bh-vvd-nav-bdc, #fff)",
      anchor: "var(--bh-vvd-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-vvd-ipt-bgc, #fafafa)",
      fc: `var(--bh-vvd-ipt-fc, ${lFc})`,
      bdc: "var(--bh-vvd-ipt-bdc, #000)",
      on: "var(--bh-vvd-ipt-on, #0d0015)",
      on_fc: `var(--bh-vvd-ipt-on-fc, #fff)`,
      off: "var(--bh-vvd-ipt-off, #fff)",
      knob: "var(--bh-vvd-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-vvd-btn-base-bgc, #000008)",
        fc: "var(--bh-vvd-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-vvd-btn-base-bdc, #000008)",
      },
      hvr: {
        bgc: "var(--bh-vvd-btn-hvr-bgc, #404048)",
        fc: "var(--bh-vvd-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-vvd-btn-hvr-bdc, #404048)",
      },
      act: {
        bgc: "var(--bh-vvd-btn-act-bgc, #202028)",
        fc: "var(--bh-vvd-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-vvd-btn-act-bdc, #202028)",
      },
    },
  } as CssColorVar,
  disabled: {
    fc: "var(--bh-dpr-fc, #c0c0c0)",
    bgc: "var(--bh-dpr-bgc, #f8f8fb)",
    bdc: "var(--bh-dpr-bdc, #e0e0e2)",
    head: {
      fc: "var(--bh-dpr-head-fc, #a0a0a0)",
      bgc: "var(--bh-dpr-head-bgc, #e0e0e0)",
      bdc: "var(--bh-dpr-head-bdc, #c0c0c0)",
    },
    nav: {
      fc: "var(--bh-dpr-nav-fc, #d8d8d8)",
      bgc: "var(--bh-dpr-nav-bgc, #a1a1a6)",
      bdc: "var(--bh-dpr-nav-bdc, #888)",
      anchor: "var(--bh-dpr-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-dpr-ipt-bgc, #fafafa)",
      fc: "var(--bh-dpr-ipt-fc, #b0b0b0)",
      bdc: "var(--bh-dpr-ipt-bdc, #d8d8da)",
      on: "var(--bh-dpr-ipt-on, #f0f0f3)",
      on_fc: "var(--bh-dpr-ipt-on-fc, #b0b0b0)",
      off: "var(--bh-dpr-ipt-off, #fff)",
      knob: "var(--bh-dpr-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-dpr-btn-base-bgc, #e0e0e2)",
        fc: "var(--bh-dpr-btn-base-fc, #ededed)",
        bdc: "var(--bh-dpr-btn-base-bdc, #e0e0e2)",
      },
      hvr: {
        bgc: "var(--bh-dpr-btn-hvr-bgc, #d6d6d8)",
        fc: "var(--bh-dpr-btn-hvr-fc, #ededed)",
        bdc: "var(--bh-dpr-btn-hvr-bdc, #d6d6d8)",
      },
      act: {
        bgc: "var(--bh-dpr-btn-act-bgc, #e2e2e4)",
        fc: "var(--bh-dpr-btn-act-fc, #ededed)",
        bdc: "var(--bh-dpr-btn-act-bdc, #e2e2e4)",
      },
    },
  } as CssColorVar,
  reverse: {
    fc: `var(--bh-rvs-fc, ${dFc})`,
    bgc: `var(--bh-rvs-bgc, ${dBc})`,
    bdc: "var(--bh-rvs-bdc, #a0a0a3)",
    head: {
      fc: `var(--bh-rvs-head-fc, ${dFc})`,
      bgc: "var(--bh-rvs-head-bgc, #303033)",
      bdc: "var(--bh-rvs-head-bdc, #a8a8aa)",
    },
    nav: {
      fc: `var(--bh-rvs-nav-fc, ${dFc})`,
      bgc: "var(--bh-rvs-nav-bgc, #202022)",
      bdc: "var(--bh-rvs-nav-bdc, #e0e0e3)",
      anchor: "var(--bh-rvs-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-rvs-ipt-bgc, #3d3d3f)",
      fc: `var(--bh-rvs-ipt-fc, ${dFc})`,
      bdc: "var(--bh-rvs-ipt-bdc, #707073)",
      on: "var(--bh-rvs-ipt-on, #606063)",
      on_fc: `var(--bh-rvs-ipt-on-fc, ${dFc})`,
      off: "var(--bh-rvs-ipt-off, #3d3d3f)",
      knob: "var(--bh-rvs-ipt-knob, #303033)",
    },
    btn: {
      base: {
        bgc: "var(--bh-rvs-btn-base-bgc, #58585a)",
        fc: `var(--bh-rvs-btn-base-fc, ${dFc})`,
        bdc: "var(--bh-rvs-btn-base-bdc, #58585a)",
      },
      hvr: {
        bgc: "var(--bh-rvs-btn-hvr-bgc, #636366)",
        fc: `var(--bh-rvs-btn-hvr-fc, ${dFc})`,
        bdc: "var(--bh-rvs-btn-hvr-bdc, #636366)",
      },
      act: {
        bgc: "var(--bh-rvs-btn-act-bgc, #4c4c4f)",
        fc: `var(--bh-rvs-btn-act-fc, ${dFc})`,
        bdc: "var(--bh-rvs-btn-act-bdc, #4c4c4f)",
      },
    },
  } as CssColorVar,
  primary: {
    fc: "var(--bh-pri-fc, #008000)",
    bgc: "var(--bh-pri-bgc, #f8fff8)",
    bdc: "var(--bh-pri-bdc, #228b22)",
    head: {
      fc: "var(--bh-pri-head-fc, #111)",
      bgc: "var(--bh-pri-head-bgc, #aae4aa)",
      bdc: "var(--bh-pri-head-bdc, #7ab07a)",
    },
    nav: {
      fc: "var(--bh-pri-nav-fc, #f2f2f2)",
      bgc: "var(--bh-pri-nav-bgc, #206620)",
      bdc: "var(--bh-pri-nav-bdc, #d0e8d0)",
      anchor: "var(--bh-pri-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-pri-ipt-bgc, #fafafa)",
      fc: `var(--bh-pri-ipt-fc, ${lFc})`,
      bdc: "var(--bh-pri-ipt-bdc, #228b22)",
      on: "var(--bh-pri-ipt-on, #70d490)",
      on_fc: `var(--bh-pri-ipt-on-fc, ${lFc})`,
      off: "var(--bh-pri-ipt-off, #fff)",
      knob: "var(--bh-pri-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-pri-btn-base-bgc, #40a040)",
        fc: "var(--bh-pri-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-pri-btn-base-bdc, #40a040)",
      },
      hvr: {
        bgc: "var(--bh-pri-btn-hvr-bgc, #309030)",
        fc: "var(--bh-pri-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-pri-btn-hvr-bdc, #309030)",
      },
      act: {
        bgc: "var(--bh-pri-btn-act-bgc, #48a848)",
        fc: "var(--bh-pri-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-pri-btn-act-bdc, #48a848)",
      },
    },
  } as CssColorVar,
  secondary: {
    fc: "var(--bh-sec-fc, #0000cd)",
    bgc: "var(--bh-sec-bgc, #f0f0ff)",
    bdc: "var(--bh-sec-bdc, #4169d1)",
    head: {
      fc: `var(--bh-sec-head-fc, ${lFc})`,
      bgc: "var(--bh-sec-head-bgc, #baceff)",
      bdc: "var(--bh-sec-head-bdc, #9494bd)",
    },
    nav: {
      fc: "var(--bh-sec-nav-fc, #f2f2f2)",
      bgc: "var(--bh-sec-nav-bgc, #303078)",
      bdc: "var(--bh-sec-nav-bdc, #d9d9e8)",
      anchor: "var(--bh-sec-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-sec-ipt-bgc, #fafafa)",
      fc: `var(--bh-sec-ipt-fc, ${lFc})`,
      bdc: "var(--bh-sec-ipt-bdc, #4169d1)",
      on: "var(--bh-sec-ipt-on, #9ac5f0)",
      on_fc: `var(--bh-sec-ipt-on-fc, ${lFc})`,
      off: "var(--bh-sec-ipt-off, #fff)",
      knob: "var(--bh-sec-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-sec-btn-base-bgc, #4169d1)",
        fc: "var(--bh-sec-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-sec-btn-base-bdc, #4169d1)",
      },
      hvr: {
        bgc: "var(--bh-sec-btn-hvr-bgc, #3159c1)",
        fc: "var(--bh-sec-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-sec-btn-hvr-bgc, #3159c1)",
      },
      act: {
        bgc: "var(--bh-sec-btn-act-bgc, #4971d9)",
        fc: "var(--bh-sec-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-sec-btn-act-bdc, #4971d9)",
      },
    },
  } as CssColorVar,
  tertiary: {
    fc: "var(--bh-ter-fc, #44617b)",
    bgc: "var(--bh-ter-bgc, #ebf6f7)",
    bdc: "var(--bh-ter-bdc, #4c6473)",
    head: {
      fc: `var(--bh-ter-head-fc, ${lFc})`,
      bgc: "var(--bh-ter-head-bgc, #a0cbc9)",
      bdc: "var(--bh-ter-head-bdc, #6c848d)",
    },
    nav: {
      fc: "var(--bh-ter-nav-fc, #f2f2f2)",
      bgc: "var(--bh-ter-nav-bgc, #455765)",
      bdc: "var(--bh-ter-nav-bdc, #90bbb9)",
      anchor: "var(--bh-ter-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-ter-ipt-bgc, #fafafa)",
      fc: `var(--bh-ter-ipt-fc, ${lFc})`,
      bdc: "var(--bh-ter-ipt-bdc, #4c6473)",
      on: "var(--bh-ter-ipt-on, #b0cbd9)",
      on_fc: `var(--bh-ter-ipt-on-fc, ${lFc})`,
      off: "var(--bh-ter-ipt-off, #fff)",
      knob: "var(--bh-ter-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-ter-btn-base-bgc, #5b7e91)",
        fc: "var(--bh-ter-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-ter-btn-base-bdc, #5b7e91)",
      },
      hvr: {
        bgc: "var(--bh-ter-btn-hvr-bgc, #426579)",
        fc: "var(--bh-ter-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-ter-btn-hvr-bgc, #426579)",
      },
      act: {
        bgc: "var(--bh-ter-btn-act-bgc, #6c848d)",
        fc: "var(--bh-ter-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-ter-btn-act-bdc, #6c848d)",
      },
    },
  } as CssColorVar,
  warning: {
    fc: "var(--bh-wrn-fc, #e0a600)",
    bgc: "var(--bh-wrn-bgc, #fffff4)",
    bdc: "var(--bh-wrn-bdc, #dfb700)",
    head: {
      fc: `var(--bh-wrn-head-fc, ${lFc})`,
      bgc: "var(--bh-wrn-head-bgc, #f7f790)",
      bdc: "var(--bh-wrn-head-bdc, #c8c880)",
    },
    nav: {
      fc: "var(--bh-wrn-nav-fc, #f2f2f2)",
      bgc: "var(--bh-wrn-nav-bgc, #878700)",
      bdc: "var(--bh-wrn-nav-bdc, #e8e899)",
      anchor: "var(--bh-wrn-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-wrn-ipt-bgc, #fafafa)",
      fc: `var(--bh-wrn-ipt-fc, ${lFc})`,
      bdc: "var(--bh-wrn-ipt-bdc, #dfb700)",
      on: "var(--bh-wrn-ipt-on, #e8e830)",
      on_fc: `var(--bh-wrn-ipt-on-fc, ${lFc})`,
      off: "var(--bh-wrn-ipt-off, #fff)",
      knob: "var(--bh-wrn-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-wrn-btn-base-bgc, #d0b000)",
        fc: "var(--bh-wrn-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-wrn-btn-base-bdc, #d0b000)",
      },
      hvr: {
        bgc: "var(--bh-wrn-btn-hvr-bgc, #c4a400)",
        fc: "var(--bh-wrn-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-wrn-btn-hvr-bdc, #c4a400)",
      },
      act: {
        bgc: "var(--bh-wrn-btn-act-bgc, #d6b600)",
        fc: "var(--bh-wrn-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-wrn-btn-act-bdc, #d6b600)",
      },
    },
  } as CssColorVar,
  danger: {
    fc: "var(--bh-dng-fc, #c22222)",
    bgc: "var(--bh-dng-bgc, #fff4f4)",
    bdc: "var(--bh-dng-bdc, #d23f3f)",
    head: {
      fc: `var(--bh-dng-head-fc, ${lFc})`,
      bgc: "var(--bh-dng-head-bgc, #ffc0c0)",
      bdc: "var(--bh-dng-head-bdc, #e87a7a)",
    },
    nav: {
      fc: "var(--bh-dng-nav-fc, #f2f2f2)",
      bgc: "var(--bh-dng-nav-bgc, #912727)",
      bdc: "var(--bh-dng-nav-bdc, #edc0c0)",
      anchor: "var(--bh-dng-nav-anchor, #9bf)",
    },
    ipt: {
      bgc: "var(--bh-dng-ipt-bgc, #fafafa)",
      fc: `var(--bh-dng-ipt-fc, ${lFc})`,
      bdc: "var(--bh-dng-ipt-bdc, #d23f3f)",
      on: "var(--bh-dng-ipt-on, #ffacae)",
      on_fc: `var(--bh-dng-ipt-on-fc, ${lFc})`,
      off: "var(--bh-dng-ipt-off, #fff)",
      knob: "var(--bh-dng-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-dng-btn-base-bgc, #b23737)",
        fc: "var(--bh-dng-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-dng-btn-base-bdc, #b23737)",
      },
      hvr: {
        bgc: "var(--bh-dng-btn-hvr-bgc, #a22727)",
        fc: "var(--bh-dng-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-dng-btn-hvr-bdc, #a22727)",
      },
      act: {
        bgc: "var(--bh-dng-btn-act-bgc, #ba3f3f)",
        fc: "var(--bh-dng-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-dng-btn-act-bdc, #ba3f3f)",
      },
    },
  } as CssColorVar,
  cool: {
    fc: "var(--bh-col-fc, #00a1e9)",
    bgc: "var(--bh-col-bgc, #f4ffff)",
    bdc: "var(--bh-col-bdc, #8ec6ff)",
    head: {
      fc: `var(--bh-col-head-fc, ${lFc})`,
      bgc: "var(--bh-col-head-bgc, #b7ffff)",
      bdc: "var(--bh-col-head-bdc, #84c1ff)",
    },
    nav: {
      fc: `var(--bh-col-nav-fc, ${lFc})`,
      bgc: "var(--bh-col-nav-bgc, #77ffff)",
      bdc: "var(--bh-col-nav-bdc, #7fafff)",
      anchor: "var(--bh-col-nav-anchor, #00f)",
    },
    ipt: {
      bgc: "var(--bh-col-ipt-bgc, #fafafa)",
      fc: `var(--bh-col-ipt-fc, ${lFc})`,
      bdc: "var(--bh-col-ipt-bdc, #8ec6ff)",
      on: "var(--bh-col-ipt-on, #7fffff)",
      on_fc: `var(--bh-col-ipt-on-fc, ${lFc})`,
      off: "var(--bh-col-ipt-off, #fff)",
      knob: "var(--bh-col-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-col-btn-base-bgc, #c1e0ff)",
        fc: `var(--bh-col-btn-base-fc, ${lFc})`,
        bdc: "var(--bh-col-btn-base-bdc, #c1e0ff)",
      },
      hvr: {
        bgc: "var(--bh-col-btn-hvr-bgc, #a3d1ff)",
        fc: `var(--bh-col-btn-hvr-fc, ${lFc})`,
        bdc: "var(--bh-col-btn-hvr-bdc, #a3d1ff)",
      },
      act: {
        bgc: "var(--bh-col-btn-act-bgc, #b2d8ff)",
        fc: `var(--bh-col-btn-act-fc, ${lFc})`,
        bdc: "var(--bh-col-btn-act-bdc, #b2d8ff)",
      },
    },
  },
  pretty: {
    fc: "var(--bh-prt-fc, #ff89ff)",
    bgc: "var(--bh-prt-bgc, #fff4f9)",
    bdc: "var(--bh-prt-bdc, #ff99cc)",
    head: {
      fc: `var(--bh-prt-head-fc, ${lFc})`,
      bgc: "var(--bh-prt-head-bgc, #ffdbed)",
      bdc: "var(--bh-prt-head-bdc, #ff93c9)",
    },
    nav: {
      fc: "var(--bh-prt-nav-fc, #f2f2f2)",
      bgc: "var(--bh-prt-nav-bgc, #ff8ec6)",
      bdc: "var(--bh-prt-nav-bdc, #ffe5f2)",
      anchor: "var(--bh-prt-nav-anchor, #22c)",
    },
    ipt: {
      bgc: "var(--bh-prt-ipt-bgc, #fafafa)",
      fc: `var(--bh-prt-ipt-fc, ${lFc})`,
      bdc: "var(--bh-prt-ipt-bdc, #ff99cc)",
      on: "var(--bh-prt-ipt-on, #ffd6ff)",
      on_fc: `var(--bh-prt-ipt-on-fc, ${lFc})`,
      off: "var(--bh-prt-ipt-off, #fff)",
      knob: "var(--bh-prt-ipt-knob, #fff)",
    },
    btn: {
      base: {
        bgc: "var(--bh-prt-btn-base-bgc, #ff99ff)",
        fc: "var(--bh-prt-btn-base-fc, #f2f2f2)",
        bdc: "var(--bh-prt-btn-base-bdc, #ff99ff)",
      },
      hvr: {
        bgc: "var(--bh-prt-btn-hvr-bgc, #ff7fff)",
        fc: "var(--bh-prt-btn-hvr-fc, #f2f2f2)",
        bdc: "var(--bh-prt-btn-hvr-bdc, #ff7fff)",
      },
      act: {
        bgc: "var(--bh-prt-btn-act-bgc, #ff8eff)",
        fc: "var(--bh-prt-btn-act-fc, #f2f2f2)",
        bdc: "var(--bh-prt-btn-act-bdc, #ff8eff)",
      },
    },
  },
  week: {
    sun: {
      fc: "var(--bh-week_sun-fc, #c22222)",
      bgc: "var(--bh-week_sun-bgc, #f6e6ea)",
      bdc: "var(--bh-week_sun-bdc, #9b2020)",
    },
    sat: {
      fc: "var(--bh-week_sat-fc, #0000cd)",
      bgc: "var(--bh-week_sat-bgc, #e6eaff)",
      bdc: "var(--bh-week_sat-bdc, #4682b4)",
    },
  },
  lv: { // listview
    header: {
      fc: `var(--bh-lv_header-fc, ${lFc})`,
      bgc: "var(--bh-lv_header-bgc, #e3e5ee)",
      bdc: "var(--bh-lv_header-bdc, #cccccf)",
      sort: "var(--bh-lv_header-sort, #aaaaaf)",
    },
    cell: {
      ft: {
        b: `var(--bh-lv_cell-ft_b, ${lFc})`,
        d: `var(--bh-lv_cell-ft_d, ${lFc})`,
      },
      bg: {
        b: "var(--bh-lv_cell-bg_b, #fafaff)",
        d: "var(--bh-lv_cell-bg_d, #f2f2f6)",
      },
      bd: {
        b: "var(--bh-lv_cell-bd_b, #dfdfdf)",
        d: "var(--bh-lv_cell-bd_d, #dfdfdf)",
      },
      hvr: {
        row: {
          fc: `var(--bh-lv_cell-hvr-row-fc, ${lFc})`,
          bgc: "var(--bh-lv_cell-hvr-row-bgc, #efefff)",
          bdc: "var(--bh-lv_cell-hvr-row-bdc, #d7d7d7)",
        },
        cell: {
          fc: `var(--bh-lv_cell-hvr-cell-fc, ${lFc})`,
          bgc: "var(--bh-lv_cell-hvr-cell-bgc, #e3e3ff)",
          bdc: "var(--bh-lv_cell-hvr-cell-bdc, #d3d3d7)",
        }
      },
      act: {
        fc: `var(--bh-lv_cell-act-fc, ${lFc})`,
        bgc: "var(--bh-lv_cell-act-bgc, #ffff9c)",
        hvr: {
          fc: `var(--bh-lv_cell-act_hvr-fc, ${lFc})`,
          bgc: "var(--bh-lv_cell-act_hvr-bgc, #efef80)",
        },
      },
    },
  },
};

export const CssDarkVar = `
--bh-bgc: ${dBc};
--bh-fc: ${dFc};
--bh-bdc: ${dBdc};
--bh-anchor: #9bf;
--bh-sdw_c: rgba(13,0,15,0.75);
--bh-sdw_b: rgba(80,80,80,0.5);
--bh-sdw_d: rgba(0,0,0,0.65);
--bh-mask-bgc: rgba(60,60,63,0.6);
--bh-mask-ifc: rgba(95,95,167,1);
--bh-hvr-bgc: rgba(89,89,89,0.5);
--bh-act-bgc: rgba(89,89,89,0.3);
--bh-def-fc: ${dFc};
--bh-def-bgc: ${dBc};
--bh-def-bdc: ${dBdc};
--bh-def-head-bgc: #2a2c2f;
--bh-def-head-fc: ${dFc};
--bh-def-head-bdc: #909094;
--bh-def-nav-bgc: #1b2328;
--bh-def-nav-fc: ${dFc};
--bh-def-nav-bdc: #c0c0c2;
--bh-def-ipt-bgc: #3e3e41;
--bh-def-ipt-fc: ${dFc};
--bh-def-ipt-bdc: ${dBdc};
--bh-def-ipt-on: #585a6a;
--bh-def-ipt-on-fc: ${dFc};
--bh-def-ipt-off: #3d3d3f;
--bh-def-ipt-knob: #303033;
--bh-def-btn-base-bgc: #58585a;
--bh-def-btn-base-fc: ${dFc};
--bh-def-btn-base-bdc: #58585a;
--bh-def-btn-hvr-bgc: #636366;
--bh-def-btn-hvr-fc: ${dFc};
--bh-def-btn-hvr-bdc: #636366;
--bh-def-btn-act-bgc: #4c4c4f;
--bh-def-btn-act-fc: ${dFc};
--bh-def-btn-act-bdc: #4c4c4f;
--bh-pri-fc: #30b030;
--bh-pri-bgc: #393c39;
--bh-pri-bdc: #307330;
--bh-pri-head-bgc: #303f30;
--bh-pri-head-fc: ${dFc};
--bh-pri-head-bdc: #475c47;
--bh-pri-nav-bgc: linear-gradient(to bottom right, #043904, #0b410b);
--bh-pri-nav-fc: ${dFc};
--bh-pri-ipt-bgc: #3d3d3f;
--bh-pri-ipt-fc: ${dFc};
--bh-pri-ipt-bdc: #307330;
--bh-pri-ipt-on: #255125;
--bh-pri-ipt-off: #3d3d3f;
--bh-pri-ipt-knob: #303033;
--bh-pri-btn-base-bgc: #285028;
--bh-pri-btn-base-fc: ${dFc};
--bh-pri-btn-base-bdc: #285028;
--bh-pri-btn-hvr-bgc: #315b31;
--bh-pri-btn-hvr-fc: ${dFc};
--bh-pri-btn-hvr-bdc: #315b31;
--bh-pri-btn-act-bgc: #214921;
--bh-pri-btn-act-fc: ${dFc};
--bh-pri-btn-act-bdc: #234a23;
--bh-sec-fc: #508aff;
--bh-sec-bgc: #393942;
--bh-sec-bdc: #4052aa;
--bh-sec-head-bgc: #303256;
--bh-sec-head-fc: ${dFc};
--bh-sec-head-bdc: #474767;
--bh-sec-nav-bgc: linear-gradient(to bottom right, #14243e, #1b2b45);
--bh-sec-nav-fc: ${dFc};
--bh-sec-ipt-bgc: #3d3d3f;
--bh-sec-ipt-fc: ${dFc};
--bh-sec-ipt-bdc: #4052aa;
--bh-sec-ipt-on: #24296f;
--bh-sec-ipt-off: #3d3d3f;
--bh-sec-ipt-knob: #303033;
--bh-sec-btn-base-bgc: #333c6a;
--bh-sec-btn-base-fc: ${dFc};
--bh-sec-btn-base-bdc: #333c6a;
--bh-sec-btn-hvr-bgc: #39437c;
--bh-sec-btn-hvr-fc: ${dFc};
--bh-sec-btn-hvr-bdc: #39437c;
--bh-sec-btn-act-bgc: #2e3765;
--bh-sec-btn-act-fc: ${dFc};
--bh-sec-btn-act-bdc: #2e3765;
--bh-wrn-fc: #c0c01e;
--bh-wrn-bgc: #3a3a30;
--bh-wrn-bdc: #7f7f10;
--bh-wrn-head-bgc: #38360a;
--bh-wrn-head-fc: ${dFc};
--bh-wrn-head-bdc: #555503;
--bh-wrn-nav-bgc: linear-gradient(to bottom right, #353000, #3c3700);
--bh-wrn-nav-fc: ${dFc};
--bh-wrn-nav-anchor: #9bf;
--bh-wrn-ipt-bgc: #3d3d3f;
--bh-wrn-ipt-fc: ${dFc};
--bh-wrn-ipt-bdc: #7f7f10;
--bh-wrn-ipt-on: #565000;
--bh-wrn-ipt-off: #3d3d3f;
--bh-wrn-ipt-knob: #303033;
--bh-wrn-btn-base-bgc: #4f4c00;
--bh-wrn-btn-base-fc: ${dFc};
--bh-wrn-btn-base-bdc: #4f4c00;
--bh-wrn-btn-hvr-bgc: #5c5900;
--bh-wrn-btn-hvr-fc: ${dFc};
--bh-wrn-btn-hvr-bdc: #5c5900;
--bh-wrn-btn-act-bgc: #494400;
--bh-wrn-btn-act-fc: ${dFc};
--bh-wrn-btn-act-bdc: #494400;
--bh-dng-fc: #ef4a57;
--bh-dng-bgc: #423535;
--bh-dng-bdc: #b02525;
--bh-dng-head-bgc: #503030;
--bh-dng-head-fc: ${dFc};
--bh-dng-head-bdc: #724040;
--bh-dng-nav-bgc: linear-gradient(to bottom right, #402424, #472b2b);
--bh-dng-nav-fc: ${dFc};
--bh-dng-ipt-bgc: #3d3d3f;
--bh-dng-ipt-fc: ${dFc};
--bh-dng-ipt-bdc: #b02525;
--bh-dng-ipt-on: #5f2020;
--bh-dng-ipt-off: #3d3d3f;
--bh-dng-ipt-knob: #303033;
--bh-dng-btn-base-bgc: #6f3437;
--bh-dng-btn-base-fc: ${dFc};
--bh-dng-btn-base-bdc: #6f3437;
--bh-dng-btn-hvr-bgc: #7f3a3e;
--bh-dng-btn-hvr-fc: ${dFc};
--bh-dng-btn-hvr-bdc: #7f3a3e;
--bh-dng-btn-act-bgc: #692e31;
--bh-dng-btn-act-fc: ${dFc};
--bh-dng-btn-act-bdc: #692e31;
--bh-dpr-fc: #707070;
--bh-dpr-bgc: #393939;
--bh-dpr-bdc: #606060;
--bh-dpr-head-bgc: #323232;
--bh-dpr-head-fc: #737373;
--bh-dpr-head-bdc: #4e4e4e;
--bh-dpr-nav-bgc: linear-gradient(to bottom right, #2d2d2d, #343434);
--bh-dpr-nav-fc: #737373;
--bh-dpr-nav-anchor: #404580;
--bh-dpr-ipt-bgc: #3d3d3f;
--bh-dpr-ipt-fc: #737373;
--bh-dpr-ipt-bdc: #606060;
--bh-dpr-ipt-on: #4b4b4b;
--bh-dpr-ipt-off: #3d3d3f;
--bh-dpr-ipt-knob: #303033;
--bh-dpr-btn-base-bgc: #444444;
--bh-dpr-btn-base-fc: #707070;
--bh-dpr-btn-base-bdc: #444444;
--bh-dpr-btn-hvr-bgc: #4c4c4c;
--bh-dpr-btn-hvr-fc: #707070;
--bh-dpr-btn-hvr-bdc: #4c4c4c;
--bh-dpr-btn-act-bgc: #404040;
--bh-dpr-btn-act-fc: #707070;
--bh-dpr-btn-act-bdc: #404040;
--bh-week_sun-fc: #ffd0d0;
--bh-week_sun-bgc: #3b3232;
--bh-week_sun-bdc: #724040;
--bh-week_sat-fc: #d0d0ff;
--bh-week_sat-bgc: #32323b;
--bh-week_sat-bdc: #474767;
--bh-lv_header-fc: ${dFc};
--bh-lv_header-bgc: #303030;
--bh-lv_header-bdc: #787878;
--bh-lv_header-sort: #888888;
--bh-lv_cell-ft_b: ${dFc};
--bh-lv_cell-ft_d: ${dFc};
--bh-lv_cell-bg_b: #404040;
--bh-lv_cell-bg_d: #3c3c3c;
--bh-lv_cell-bd_b: #616161;
--bh-lv_cell-bd_d: #5c5c5c;
--bh-lv_cell-hvr-row-fc: ${dFc};
--bh-lv_cell-hvr-row-bgc: #333336;
--bh-lv_cell-hvr-row-bdc: #575757;
--bh-lv_cell-hvr-cell-fc: ${dFc};
--bh-lv_cell-hvr-cell-bgc: #28282a;
--bh-lv_cell-hvr-cell-bdc: #505050;
--bh-lv_cell-act-fc: ${dFc};
--bh-lv_cell-act-bgc: #202022;
--bh-lv_cell-act_hvr-fc: ${dFc};
--bh-lv_cell-act_hvr-bgc: #101011;
`;

export const cssParamsSize = () => typeof document === "undefined" ? 30 : Number((getComputedStyle(document.documentElement).getPropertyValue("--bh-size") || "30px").replace("px", ""));

const cvxSd = (level: number) => {
  if (level === 0) return "unset";
  return `0px ${level*0.75}px ${level*2}px -1px ${CssVar.sdw.c}`;
};
const ccvSd = (level: number) => {
  if (level === 0) return "unset";
  return `0px ${level/2}px ${level*2}px -1px ${CssVar.sdw.c} inset`;
};
const nCvxSd = (level: number) => {
  if (level === 0) return "unset";
  const lvl = level - 1;
  return `${lvl}px ${lvl}px ${lvl*2}px ${CssVar.sdw.d},-${lvl}px -${lvl}px ${lvl*2}px ${CssVar.sdw.b},1px 1px 1px -0.5px ${CssVar.sdw.b} inset,-1px -1px 1px -0.5px ${CssVar.sdw.d} inset`;
};
const nCcvSd = (level: number) => {
  if (level === 0) return "unset";
  const lvl = level - 1;
  return `0.5px 0.5px 1.5px -0.5px ${CssVar.sdw.b},-0.5px -0.5px 1.5px -0.5px ${CssVar.sdw.d},${lvl}px ${lvl}px ${lvl*2}px ${CssVar.sdw.d} inset,-${lvl}px -${lvl}px ${lvl*2}px ${CssVar.sdw.b} inset`;
};
const dropSd = (level: number) => {
  if (level === 0) return "unset";
  const lvl = level - 1;
  return `drop-shadow(0px ${lvl*1.5}px ${lvl}px ${CssVar.sdw.c});`;
};

export const CssPV = {
  flex: `box-sizing:border-box;position:relative;display:flex;`,
  ba: "box-sizing:border-box;position:absolute;content:\"\";",
  inactOpacity: "opacity:0.6;",
  dropSd,
  cvxSd,
  ccvSd,
  cvxSdBase: cvxSd(2),
  cvxSdHover: cvxSd(4),
  nCvxSd,
  nCcvSd,
  nCvxSdBase: nCvxSd(2),
  nCvxSdHover: nCvxSd(3.5),
  nCcvSdActive: nCcvSd(2),
  nCcvSdDisabled: nCcvSd(1),
  nCvxSdShallow: nCvxSd(1),
  nCcvSdDeep: nCcvSd(3),
  colorCn: (color: Color) => `[data-color="${color || "default"}"]`,
  textSd: (color: string) => `text-shadow:1px 1px 0 ${color},-1px -1px 0 ${color},-1px 1px 0 ${color},1px -1px 0 ${color},0px 1px 0 ${color},0 -1px 0 ${color},-1px 0 0 ${color},1px 0 0 ${color};`,
};

export const sizeIterator = (base: string, css: Partial<{[key in Size]: string}>, selector?: string) => {
  return Object.keys(css).map((key) => {
    return `.${base}[data-size="${key}"]${selector ?? ""}{${css[key]}}`;
  }).join("");
};

export const switchDesign = (design: LayoutDesign, css: Partial<{[key in LayoutDesign | "c" | "fm" | "_"]: string}>) => {
  if (design === "flat" || design === "material") return (css.c ?? "") + (css.fm ?? "") + (css[design] ?? "");
  if (design) return (css.c ?? "") + (css[design] ?? "");
  return css._ ?? "";
};

export const colorIterator = <T=string,>(func: (color: Color, v: CssColorVar, selector: string) => T, skipDefault?: boolean) => {
  const rets = [];
  for (const color of colors) {
    if (color === "default" && skipDefault) continue;
    rets.push(func(color, CssVar[color] as CssColorVar, `${CssPV.colorCn(color)}`));
  }
  return rets as Array<T>;
};

export default CssVar;