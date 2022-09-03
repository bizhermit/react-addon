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

type ColorSet = {
  fgc: string;
  bgc: string;
  bdc: string;
  anc: string;
};
type ColorSetWithoutAnc = Omit<ColorSet, "anc">;

type CssColorVar = ColorSet & {
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

const def = "--bh-def";
const dul = "--bh-dul";
const pur = "--bh-pur";
const vvd = "--bh-vvd";
const dis = "--bh-dis";
const rvs = "--bh-rvs";
const pri = "--bh-pri";
const sec = "--bh-sec";
const ter = "--bh-ter";
const wrn = "--bh-wrn";
const dng = "--bh-dng";
const coo = "--bh-coo";
const prt = "--bh-prt";

const btnB = "btn-base";
const btnH = "btn-hvr";
const btnA = "btn-act";

const fgc = "fgc";
const bgc = "bgc";
const bdc = "bdc";
const anc = "anc";

const lFc = "#161616";
const lBc = "#f4f4fb";
const lBdc = "#909099";
const lAnc = "#00f";
const dFc = "#f4f4f4";
const dBc = "#39393b";
const dBdc = "#808084";
const dAnc = "#9bf";

export const varFontSize = "--bh-fs";
export const varAnchor = `--bh-${anc}`;

const CssVar = {
  size: `var(--bh-size, 30px)`, // base size
  fs: `var(${varFontSize}, 1.6rem)`, // font size
  bdr: `var(--bh-bdr, 0px)`, // border radius
  pdx: `var(--bh-pdx, 0px)`, // padding x
  pdy: `var(--bh-pdy, 0px)`, // padding y
  phsize: `var(--bh-phsize, 13px)`, // placeholder size
  bgc: `var(--bh-${bgc}, ${lBc})`, // background color
  fgc: `var(--bh-${fgc}, ${lFc})`, // font color
  bdc: `var(--bh-${bdc}, ${lBdc})`, // border color
  anchor: `var(${varAnchor}, ${lAnc})`, // anchor color
  bsize: `var(--bh-bsize, 1Q)`, // border width
  sdw: { // shadow
    c: `var(--bh-sdw_c, rgba(105,105,105,0.75))`,
    b: `var(--bh-sdw_b, rgba(224,224,229,0.2))`,
    d: `var(--bh-sdw_d, rgba(0,0,0,0.3))`,
  },
  sb: { // scrollbar
    size: `var(--bh-sb-size, 8px)`,
    bgc: `var(--bh-sb-${bgc}, transparent)`,
    thumb: {
      bgc: `var(--bh-sb_thumb-${bgc}, rgba(127,127,130,0.2))`,
      hvr_cont_bgc: `var(--bh-sb_thumb-hvr_cont-${bgc}, rgba(127,127,130,0.3))`,
      hvr_bgc: `var(--bh-sb_thumb-hvr-${bgc}, rgba(127,127,130,0.4))`,
      act_bgc: `var(--bh-sb_thumb-act-${bgc}, rgba(127,127,130,0.5))`,
    }
  },
  mask: {
    bgc: `var(--bh-mask-${bgc}, rgba(157,157,167,0.6))`,
    ifc: `var(--bh-mask-ifc, rgba(80,100,255,1))`,
  },
  hvrBgc: `var(--bh-hvr-${bgc}, rgba(204,204,204,0.5))`,
  actBgc: `var(--bh-act-${bgc}, rgba(204,204,204,0.3))`,
  default: {
    fgc: `var(${def}-${fgc}, ${lFc})`,
    bgc: `var(${def}-${bgc}, ${lBc})`,
    bdc: `var(${def}-${bdc}, ${lBdc})`,
    anc: `var(${def}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${def}-head-${fgc}, ${lFc})`,
      bgc: `var(${def}-head-${bgc}, #e4e4f1)`,
      bdc: `var(${def}-head-${bdc}, #888890)`,
      anc: `var(${def}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${def}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${def}-nav-${bgc}, #343a40)`,
      bdc: `var(${def}-nav-${bdc}, #d8d8e0)`,
      anc: `var(${def}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${def}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${def}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${def}-ipt-${bdc}, ${lBdc})`,
      on:  `var(${def}-ipt-on, #bcc7d7)`,
      onf: `var(${def}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${def}-ipt-off, #fff)`,
      knb: `var(${def}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${def}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${def}-${btnB}-${bgc}, #787880)`,
        bdc: `var(${def}-${btnB}-${bdc}, #787880)`,
      },
      hvr: {
        fgc: `var(${def}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${def}-${btnH}-${bgc}, #66666d)`,
        bdc: `var(${def}-${btnH}-${bdc}, #66666d)`,
      },
      act: {
        fgc: `var(${def}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${def}-${btnA}-${bgc}, #82828a)`,
        bdc: `var(${def}-${btnA}-${bdc}, #82828a)`,
      },
    },
  } as CssColorVar,
  dull: {
    fgc: `var(${dul}-${fgc}, #606060)`,
    bgc: `var(${dul}-${bgc}, ${lBc})`,
    bdc: `var(${dul}-${bdc}, #a0a0a7)`,
    anc: `var(${dul}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${dul}-head-${fgc}, #505050)`,
      bgc: `var(${dul}-head-${bgc}, #e4e4f1)`,
      bdc: `var(${dul}-head-${bdc}, #909097)`,
      anc: `var(${dul}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${dul}-nav-${fgc}, #dadada)`,
      bgc: `var(${dul}-nav-${bgc}, #343a40)`,
      bdc: `var(${dul}-nav-${bdc}, #d8d8e0)`,
      anc: `var(${dul}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${dul}-ipt-${fgc}, #606060)`,
      bgc: `var(${dul}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${dul}-ipt-${bdc}, #a0a0a7)`,
      on:  `var(${dul}-ipt-on, #e8e8ec)`,
      onf: `var(${dul}-ipt-on-${fgc}, #606060)`,
      off: `var(${dul}-ipt-off, #fff)`,
      knb: `var(${dul}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        bgc: `var(${dul}-${btnB}-${bgc}, #d0d0d5)`,
        fgc: `var(${dul}-${btnB}-${fgc}, #373737)`,
        bdc: `var(${dul}-${btnB}-${bdc}, #d0d0d5)`,
      },
      hvr: {
        fgc: `var(${dul}-${btnH}-${fgc}, #373737)`,
        bgc: `var(${dul}-${btnH}-${bgc}, #c1c1c6)`,
        bdc: `var(${dul}-${btnH}-${bdc}, #c1c1c6)`,
      },
      act: {
        fgc: `var(${dul}-${btnA}-${fgc}, #373737)`,
        bgc: `var(${dul}-${btnA}-${bgc}, #d6d6da)`,
        bdc: `var(${dul}-${btnA}-${bdc}, #d6d6da)`,
      },
    },
  } as CssColorVar,
  pure: {
    fgc: `var(${pur}-${fgc}, ${lFc})`,
    bgc: `var(${pur}-${bgc}, #fff)`,
    bdc: `var(${pur}-${bdc}, #555)`,
    anc: `var(${pur}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${pur}-head-${fgc}, ${lFc})`,
      bgc: `var(${pur}-head-${bgc}, #fff)`,
      bdc: `var(${pur}-head-${bdc}, #282828)`,
      anc: `var(${pur}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${pur}-nav-${fgc}, ${lFc})`,
      bgc: `var(${pur}-nav-${bgc}, #fff)`,
      bdc: `var(${pur}-nav-${bdc}, #000)`,
      anc: `var(${pur}-nav-${anc}, ${lAnc})`,
    },
    ipt: {
      fgc: `var(${pur}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${pur}-ipt-${bgc}, #fff)`,
      bdc: `var(${pur}-ipt-${bdc}, #555)`,
      on:  `var(${pur}-ipt-on, #7d7b83)`,
      onf: `var(${pur}-ipt-on-${fgc}, #fff)`,
      off: `var(${pur}-ipt-off, #fff)`,
      knb: `var(${pur}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${pur}-${btnB}-${fgc}, ${lFc})`,
        bgc: `var(${pur}-${btnB}-${bgc}, #fff)`,
        bdc: `var(${pur}-${btnB}-${bdc}, #fff)`,
      },
      hvr: {
        fgc: `var(${pur}-${btnH}-${fgc}, ${lFc})`,
        bgc: `var(${pur}-${btnH}-${bgc}, #e8e8e8)`,
        bdc: `var(${pur}-${btnH}-${bdc}, #e8e8e8)`,
      },
      act: {
        fgc: `var(${pur}-${btnA}-${fgc}, ${lFc})`,
        bgc: `var(${pur}-${btnA}-${bgc}, #f3f3f3)`,
        bdc: `var(${pur}-${btnA}-${bdc}, #f3f3f3)`,
      },
    },
  } as CssColorVar,
  vivid: {
    fgc: `var(${vvd}-${fgc}, #000)`,
    bgc: `var(${vvd}-${bgc}, #fff)`,
    bdc: `var(${vvd}-${bdc}, #000)`,
    anc: `var(${vvd}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${vvd}-head-${fgc}, #fff)`,
      bgc: `var(${vvd}-head-${bgc}, #444)`,
      bdc: `var(${vvd}-head-${bdc}, #fff)`,
      anc: `var(${vvd}-head-${anc}, ${dAnc})`,
    },
    nav: {
      fgc: `var(${vvd}-nav-${fgc}, #fff)`,
      bgc: `var(${vvd}-nav-${bgc}, #000)`,
      bdc: `var(${vvd}-nav-${bdc}, #fff)`,
      anc: `var(${vvd}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${vvd}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${vvd}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${vvd}-ipt-${bdc}, #000)`,
      on:  `var(${vvd}-ipt-on, #0d0015)`,
      onf: `var(${vvd}-ipt-on-${fgc}, #fff)`,
      off: `var(${vvd}-ipt-off, #fff)`,
      knb: `var(${vvd}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${vvd}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${vvd}-${btnB}-${bgc}, #000008)`,
        bdc: `var(${vvd}-${btnB}-${bdc}, #000008)`,
      },
      hvr: {
        fgc: `var(${vvd}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${vvd}-${btnH}-${bgc}, #404048)`,
        bdc: `var(${vvd}-${btnH}-${bdc}, #404048)`,
      },
      act: {
        fgc: `var(${vvd}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${vvd}-${btnA}-${bgc}, #202028)`,
        bdc: `var(${vvd}-${btnA}-${bdc}, #202028)`,
      },
    },
  } as CssColorVar,
  disabled: {
    fgc: `var(${dis}-${fgc}, #c0c0c0)`,
    bgc: `var(${dis}-${bgc}, #f8f8fb)`,
    bdc: `var(${dis}-${bdc}, #e0e0e2)`,
    anc: `var(${dis}-${anc}, ${dAnc})`,
    head: {
      fgc: `var(${dis}-head-${fgc}, #a0a0a0)`,
      bgc: `var(${dis}-head-${bgc}, #e0e0e0)`,
      bdc: `var(${dis}-head-${bdc}, #c0c0c0)`,
      anc: `var(${dis}-head-${anc}, ${dAnc})`,
    },
    nav: {
      fgc: `var(${dis}-nav-${fgc}, #d8d8d8)`,
      bgc: `var(${dis}-nav-${bgc}, #a1a1a6)`,
      bdc: `var(${dis}-nav-${bdc}, #bebebe)`,
      anc: `var(${dis}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${dis}-ipt-${fgc}, #b0b0b0)`,
      bgc: `var(${dis}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${dis}-ipt-${bdc}, #d8d8da)`,
      on:  `var(${dis}-ipt-on, #f0f0f3)`,
      onf: `var(${dis}-ipt-on-${fgc}, #b0b0b0)`,
      off: `var(${dis}-ipt-off, #fff)`,
      knb: `var(${dis}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${dis}-${btnB}-${fgc}, #ededed)`,
        bgc: `var(${dis}-${btnB}-${bgc}, #e0e0e2)`,
        bdc: `var(${dis}-${btnB}-${bdc}, #e0e0e2)`,
      },
      hvr: {
        fgc: `var(${dis}-${btnH}-${fgc}, #ededed)`,
        bgc: `var(${dis}-${btnH}-${bgc}, #d6d6d8)`,
        bdc: `var(${dis}-${btnH}-${bdc}, #d6d6d8)`,
      },
      act: {
        fgc: `var(${dis}-${btnA}-${fgc}, #ededed)`,
        bgc: `var(${dis}-${btnA}-${bgc}, #e2e2e4)`,
        bdc: `var(${dis}-${btnA}-${bdc}, #e2e2e4)`,
      },
    },
  } as CssColorVar,
  reverse: {
    fgc: `var(${rvs}-${fgc}, ${dFc})`,
    bgc: `var(${rvs}-${bgc}, ${dBc})`,
    bdc: `var(${rvs}-${bdc}, #a0a0a3)`,
    anc: `var(${rvs}-${anc}, ${dAnc})`,
    head: {
      fgc: `var(${rvs}-head-${fgc}, ${dFc})`,
      bgc: `var(${rvs}-head-${bgc}, #303033)`,
      bdc: `var(${rvs}-head-${bdc}, #a8a8aa)`,
      anc: `var(${rvs}-head-${anc}, ${dAnc})`,
    },
    nav: {
      fgc: `var(${rvs}-nav-${fgc}, ${dFc})`,
      bgc: `var(${rvs}-nav-${bgc}, #202022)`,
      bdc: `var(${rvs}-nav-${bdc}, #e0e0e3)`,
      anc: `var(${rvs}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${rvs}-ipt-${fgc}, ${dFc})`,
      bgc: `var(${rvs}-ipt-${bgc}, #3d3d3f)`,
      bdc: `var(${rvs}-ipt-${bdc}, #707073)`,
      on:  `var(${rvs}-ipt-on, #606063)`,
      onf: `var(${rvs}-ipt-on-${fgc}, ${dFc})`,
      off: `var(${rvs}-ipt-off, #3d3d3f)`,
      knb: `var(${rvs}-ipt-knob, #303033)`,
    },
    btn: {
      base: {
        fgc: `var(${rvs}-${btnB}-${fgc}, ${dFc})`,
        bgc: `var(${rvs}-${btnB}-${bgc}, #58585a)`,
        bdc: `var(${rvs}-${btnB}-${bdc}, #58585a)`,
      },
      hvr: {
        fgc: `var(${rvs}-${btnH}-${fgc}, ${dFc})`,
        bgc: `var(${rvs}-${btnH}-${bgc}, #636366)`,
        bdc: `var(${rvs}-${btnH}-${bdc}, #636366)`,
      },
      act: {
        fgc: `var(${rvs}-${btnA}-${fgc}, ${dFc})`,
        bgc: `var(${rvs}-${btnA}-${bgc}, #4c4c4f)`,
        bdc: `var(${rvs}-${btnA}-${bdc}, #4c4c4f)`,
      },
    },
  } as CssColorVar,
  primary: {
    fgc: `var(${pri}-${fgc}, #008000)`,
    bgc: `var(${pri}-${bgc}, #f8fff8)`,
    bdc: `var(${pri}-${bdc}, #228b22)`,
    anc: `var(${pri}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${pri}-head-${fgc}, #111)`,
      bgc: `var(${pri}-head-${bgc}, #aae4aa)`,
      bdc: `var(${pri}-head-${bdc}, #7ab07a)`,
      anc: `var(${pri}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${pri}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${pri}-nav-${bgc}, #206620)`,
      bdc: `var(${pri}-nav-${bdc}, #d0e8d0)`,
      anc: `var(${pri}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${pri}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${pri}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${pri}-ipt-${bdc}, #228b22)`,
      on:  `var(${pri}-ipt-on, #70d490)`,
      onf: `var(${pri}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${pri}-ipt-off, #fff)`,
      knb: `var(${pri}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${pri}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${pri}-${btnB}-${bgc}, #40a040)`,
        bdc: `var(${pri}-${btnB}-${bdc}, #40a040)`,
      },
      hvr: {
        fgc: `var(${pri}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${pri}-${btnH}-${bgc}, #309030)`,
        bdc: `var(${pri}-${btnH}-${bdc}, #309030)`,
      },
      act: {
        fgc: `var(${pri}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${pri}-${btnA}-${bgc}, #48a848)`,
        bdc: `var(${pri}-${btnA}-${bdc}, #48a848)`,
      },
    },
  } as CssColorVar,
  secondary: {
    fgc: `var(${sec}-${fgc}, #0000cd)`,
    bgc: `var(${sec}-${bgc}, #f0f0ff)`,
    bdc: `var(${sec}-${bdc}, #4169d1)`,
    anc: `var(${sec}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${sec}-head-${fgc}, ${lFc})`,
      bgc: `var(${sec}-head-${bgc}, #baceff)`,
      bdc: `var(${sec}-head-${bdc}, #9494bd)`,
      anc: `var(${sec}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${sec}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${sec}-nav-${bgc}, #303078)`,
      bdc: `var(${sec}-nav-${bdc}, #d9d9e8)`,
      anc: `var(${sec}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${sec}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${sec}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${sec}-ipt-${bdc}, #4169d1)`,
      on:  `var(${sec}-ipt-on, #9ac5f0)`,
      onf: `var(${sec}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${sec}-ipt-off, #fff)`,
      knb: `var(${sec}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${sec}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${sec}-${btnB}-${bgc}, #4169d1)`,
        bdc: `var(${sec}-${btnB}-${bdc}, #4169d1)`,
      },
      hvr: {
        fgc: `var(${sec}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${sec}-${btnH}-${bgc}, #3159c1)`,
        bdc: `var(${sec}-${btnH}-${bgc}, #3159c1)`,
      },
      act: {
        fgc: `var(${sec}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${sec}-${btnA}-${bgc}, #4971d9)`,
        bdc: `var(${sec}-${btnA}-${bdc}, #4971d9)`,
      },
    },
  } as CssColorVar,
  tertiary: {
    fgc: `var(${ter}-${fgc}, #44617b)`,
    bgc: `var(${ter}-${bgc}, #ebf6f7)`,
    bdc: `var(${ter}-${bdc}, #4c6473)`,
    anc: `var(${ter}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${ter}-head-${fgc}, ${lFc})`,
      bgc: `var(${ter}-head-${bgc}, #a2d0df)`,
      bdc: `var(${ter}-head-${bdc}, #7c949d)`,
      anc: `var(${ter}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${ter}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${ter}-nav-${bgc}, #455765)`,
      bdc: `var(${ter}-nav-${bdc}, #a0cfca)`,
      anc: `var(${ter}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${ter}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${ter}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${ter}-ipt-${bdc}, #4c6473)`,
      on:  `var(${ter}-ipt-on, #b0cbd9)`,
      onf: `var(${ter}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${ter}-ipt-off, #fff)`,
      knb: `var(${ter}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${ter}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${ter}-${btnB}-${bgc}, #5b7e91)`,
        bdc: `var(${ter}-${btnB}-${bdc}, #5b7e91)`,
      },
      hvr: {
        fgc: `var(${ter}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${ter}-${btnH}-${bgc}, #426579)`,
        bdc: `var(${ter}-${btnH}-${bgc}, #426579)`,
      },
      act: {
        fgc: `var(${ter}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${ter}-${btnA}-${bgc}, #6c848d)`,
        bdc: `var(${ter}-${btnA}-${bdc}, #6c848d)`,
      },
    },
  } as CssColorVar,
  warning: {
    fgc: `var(${wrn}-${fgc}, #e0a600)`,
    bgc: `var(${wrn}-${bgc}, #fffff4)`,
    bdc: `var(${wrn}-${bdc}, #dfb700)`,
    anc: `var(${wrn}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${wrn}-head-${fgc}, ${lFc})`,
      bgc: `var(${wrn}-head-${bgc}, #f7f790)`,
      bdc: `var(${wrn}-head-${bdc}, #c8c880)`,
      anc: `var(${wrn}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${wrn}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${wrn}-nav-${bgc}, #878700)`,
      bdc: `var(${wrn}-nav-${bdc}, #e8e899)`,
      anc: `var(${wrn}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${wrn}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${wrn}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${wrn}-ipt-${bdc}, #dfb700)`,
      on:  `var(${wrn}-ipt-on, #e8e830)`,
      onf: `var(${wrn}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${wrn}-ipt-off, #fff)`,
      knb: `var(${wrn}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${wrn}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${wrn}-${btnB}-${bgc}, #d0b000)`,
        bdc: `var(${wrn}-${btnB}-${bdc}, #d0b000)`,
      },
      hvr: {
        fgc: `var(${wrn}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${wrn}-${btnH}-${bgc}, #c4a400)`,
        bdc: `var(${wrn}-${btnH}-${bdc}, #c4a400)`,
      },
      act: {
        fgc: `var(${wrn}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${wrn}-${btnA}-${bgc}, #d6b600)`,
        bdc: `var(${wrn}-${btnA}-${bdc}, #d6b600)`,
      },
    },
  } as CssColorVar,
  danger: {
    fgc: `var(${dng}-${fgc}, #c22222)`,
    bgc: `var(${dng}-${bgc}, #fff4f4)`,
    bdc: `var(${dng}-${bdc}, #d23f3f)`,
    anc: `var(${dng}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${dng}-head-${fgc}, ${lFc})`,
      bgc: `var(${dng}-head-${bgc}, #ffc0c0)`,
      bdc: `var(${dng}-head-${bdc}, #e87a7a)`,
      anc: `var(${dng}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${dng}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${dng}-nav-${bgc}, #912727)`,
      bdc: `var(${dng}-nav-${bdc}, #edc0c0)`,
      anc: `var(${dng}-nav-${anc}, ${dAnc})`,
    },
    ipt: {
      fgc: `var(${dng}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${dng}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${dng}-ipt-${bdc}, #d23f3f)`,
      on:  `var(${dng}-ipt-on, #ffacae)`,
      onf: `var(${dng}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${dng}-ipt-off, #fff)`,
      knb: `var(${dng}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${dng}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${dng}-${btnB}-${bgc}, #b23737)`,
        bdc: `var(${dng}-${btnB}-${bdc}, #b23737)`,
      },
      hvr: {
        fgc: `var(${dng}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${dng}-${btnH}-${bgc}, #a22727)`,
        bdc: `var(${dng}-${btnH}-${bdc}, #a22727)`,
      },
      act: {
        fgc: `var(${dng}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${dng}-${btnA}-${bgc}, #ba3f3f)`,
        bdc: `var(${dng}-${btnA}-${bdc}, #ba3f3f)`,
      },
    },
  } as CssColorVar,
  cool: {
    fgc: `var(${coo}-${fgc}, #00a1e9)`,
    bgc: `var(${coo}-${bgc}, #f4ffff)`,
    bdc: `var(${coo}-${bdc}, #8ec6ff)`,
    anc: `var(${coo}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${coo}-head-${fgc}, ${lFc})`,
      bgc: `var(${coo}-head-${bgc}, #b7ffff)`,
      bdc: `var(${coo}-head-${bdc}, #84c1ff)`,
      anc: `var(${coo}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${coo}-nav-${fgc}, ${lFc})`,
      bgc: `var(${coo}-nav-${bgc}, #77ffff)`,
      bdc: `var(${coo}-nav-${bdc}, #7fafff)`,
      anc: `var(${coo}-nav-${anc}, ${lAnc})`,
    },
    ipt: {
      fgc: `var(${coo}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${coo}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${coo}-ipt-${bdc}, #8ec6ff)`,
      on:  `var(${coo}-ipt-on, #7fffff)`,
      onf: `var(${coo}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${coo}-ipt-off, #fff)`,
      knb: `var(${coo}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${coo}-${btnB}-${fgc}, ${lFc})`,
        bgc: `var(${coo}-${btnB}-${bgc}, #c1e0ff)`,
        bdc: `var(${coo}-${btnB}-${bdc}, #c1e0ff)`,
      },
      hvr: {
        fgc: `var(${coo}-${btnH}-${fgc}, ${lFc})`,
        bgc: `var(${coo}-${btnH}-${bgc}, #a3d1ff)`,
        bdc: `var(${coo}-${btnH}-${bdc}, #a3d1ff)`,
      },
      act: {
        fgc: `var(${coo}-${btnA}-${fgc}, ${lFc})`,
        bgc: `var(${coo}-${btnA}-${bgc}, #b2d8ff)`,
        bdc: `var(${coo}-${btnA}-${bdc}, #b2d8ff)`,
      },
    },
  } as CssColorVar,
  pretty: {
    fgc: `var(${prt}-${fgc}, #ff89ff)`,
    bgc: `var(${prt}-${bgc}, #fff4f9)`,
    bdc: `var(${prt}-${bdc}, #ff99cc)`,
    anc: `var(${prt}-${anc}, ${lAnc})`,
    head: {
      fgc: `var(${prt}-head-${fgc}, ${lFc})`,
      bgc: `var(${prt}-head-${bgc}, #ffdbed)`,
      bdc: `var(${prt}-head-${bdc}, #ff93c9)`,
      anc: `var(${prt}-head-${anc}, ${lAnc})`,
    },
    nav: {
      fgc: `var(${prt}-nav-${fgc}, #f2f2f2)`,
      bgc: `var(${prt}-nav-${bgc}, #ff8ec6)`,
      bdc: `var(${prt}-nav-${bdc}, #ffe5f2)`,
      anc: `var(${prt}-nav-${anc}, ${lAnc})`,
    },
    ipt: {
      fgc: `var(${prt}-ipt-${fgc}, ${lFc})`,
      bgc: `var(${prt}-ipt-${bgc}, #fafafa)`,
      bdc: `var(${prt}-ipt-${bdc}, #ff99cc)`,
      on:  `var(${prt}-ipt-on, #ffd6ff)`,
      onf: `var(${prt}-ipt-on-${fgc}, ${lFc})`,
      off: `var(${prt}-ipt-off, #fff)`,
      knb: `var(${prt}-ipt-knob, #fff)`,
    },
    btn: {
      base: {
        fgc: `var(${prt}-${btnB}-${fgc}, #f2f2f2)`,
        bgc: `var(${prt}-${btnB}-${bgc}, #ff99ff)`,
        bdc: `var(${prt}-${btnB}-${bdc}, #ff99ff)`,
      },
      hvr: {
        fgc: `var(${prt}-${btnH}-${fgc}, #f2f2f2)`,
        bgc: `var(${prt}-${btnH}-${bgc}, #ff7fff)`,
        bdc: `var(${prt}-${btnH}-${bdc}, #ff7fff)`,
      },
      act: {
        fgc: `var(${prt}-${btnA}-${fgc}, #f2f2f2)`,
        bgc: `var(${prt}-${btnA}-${bgc}, #ff8eff)`,
        bdc: `var(${prt}-${btnA}-${bdc}, #ff8eff)`,
      },
    },
  } as CssColorVar,
  week: {
    sun: {
      fgc: `var(--bh-week_sun-${fgc}, #c22222)`,
      bgc: `var(--bh-week_sun-${bgc}, #f6e6ea)`,
      bdc: `var(--bh-week_sun-${bdc}, #9b2020)`,
    },
    sat: {
      fgc: `var(--bh-week_sat-${fgc}, #0000cd)`,
      bgc: `var(--bh-week_sat-${bgc}, #e6eaff)`,
      bdc: `var(--bh-week_sat-${bdc}, #4682b4)`,
    },
  },
  lv: { // listview
    header: {
      fgc: `var(--bh-lv_header-${fgc}, ${lFc})`,
      bgc: `var(--bh-lv_header-${bgc}, #e3e5ee)`,
      bdc: `var(--bh-lv_header-${bdc}, #cccccf)`,
      sort: `var(--bh-lv_header-sort, #aaaaaf)`,
    },
    cell: {
      ft: {
        b: `var(--bh-lv_cell-ft_b, ${lFc})`,
        d: `var(--bh-lv_cell-ft_d, ${lFc})`,
      },
      bg: {
        b: `var(--bh-lv_cell-bg_b, #fafaff)`,
        d: `var(--bh-lv_cell-bg_d, #f2f2f6)`,
      },
      bd: {
        b: `var(--bh-lv_cell-bd_b, #dfdfdf)`,
        d: `var(--bh-lv_cell-bd_d, #dfdfdf)`,
      },
      hvr: {
        row: {
          fgc: `var(--bh-lv_cell-hvr-row-${fgc}, ${lFc})`,
          bgc: `var(--bh-lv_cell-hvr-row-${bgc}, #efefff)`,
          bdc: `var(--bh-lv_cell-hvr-row-${bdc}, #d7d7d7)`,
        },
        cell: {
          fgc: `var(--bh-lv_cell-hvr-cell-${fgc}, ${lFc})`,
          bgc: `var(--bh-lv_cell-hvr-cell-${bgc}, #e3e3ff)`,
          bdc: `var(--bh-lv_cell-hvr-cell-${bdc}, #d3d3d7)`,
        }
      },
      act: {
        fgc: `var(--bh-lv_cell-act-${fgc}, ${lFc})`,
        bgc: `var(--bh-lv_cell-act-${bgc}, #ffff9c)`,
        hvr: {
          fgc: `var(--bh-lv_cell-act_hvr-${fgc}, ${lFc})`,
          bgc: `var(--bh-lv_cell-act_hvr-${bgc}, #efef80)`,
        },
      },
    },
  },
};

export const CssDarkVar = `
--bh-${fgc}: ${dFc};
--bh-${bgc}: ${dBc};
--bh-${bdc}: ${dBdc};
--bh-${anc}: #9bf;
--bh-sdw_c: rgba(13,0,15,0.75);
--bh-sdw_b: rgba(80,80,80,0.5);
--bh-sdw_d: rgba(0,0,0,0.65);
--bh-mask-${bgc}: rgba(60,60,63,0.6);
--bh-mask-ifc: rgba(95,95,167,1);
--bh-hvr-${bgc}: rgba(89,89,89,0.5);
--bh-act-${bgc}: rgba(89,89,89,0.3);
${def}-${fgc}: ${dFc};
${def}-${bgc}: ${dBc};
${def}-${bdc}: ${dBdc};
${def}-${anc}: ${dAnc};
${def}-head-${fgc}: ${dFc};
${def}-head-${bgc}: #2a2c2f;
${def}-head-${bdc}: #a0a0a4;
${def}-head-${anc}: ${dAnc};
${def}-nav-${fgc}: ${dFc};
${def}-nav-${bgc}: #1b2328;
${def}-nav-${bdc}: #c0c0c2;
${def}-nav-${anc}: ${dAnc};
${def}-ipt-${fgc}: ${dFc};
${def}-ipt-${bgc}: #3e3e41;
${def}-ipt-${bdc}: ${dBdc};
${def}-ipt-on: #64636f;
${def}-ipt-on-${fgc}: ${dFc};
${def}-ipt-off: #3d3d3f;
${def}-ipt-knob: #303033;
${def}-${btnB}-${fgc}: ${dFc};
${def}-${btnB}-${bgc}: #58585a;
${def}-${btnB}-${bdc}: #58585a;
${def}-${btnH}-${fgc}: ${dFc};
${def}-${btnH}-${bgc}: #636366;
${def}-${btnH}-${bdc}: #636366;
${def}-${btnA}-${fgc}: ${dFc};
${def}-${btnA}-${bgc}: #4c4c4f;
${def}-${btnA}-${bdc}: #4c4c4f;
${dul}-${fgc}: #c8c8ca;
${dul}-${bgc}: ${dBc};
${dul}-${bdc}: #737377;
${dul}-${anc}: ${dAnc};
${dul}-head-${fgc}: #cacacd;
${dul}-head-${bgc}: #2a2c2f;
${dul}-head-${bdc}: #808084;
${dul}-head-${anc}: ${dAnc};
${dul}-nav-${fgc}: #cfcfd2;
${dul}-nav-${bgc}: #1b2328;
${dul}-nav-${bdc}: #c0c0c2;
${dul}-nav-${anc}: ${dAnc};
${dul}-ipt-${fgc}: #d0d0d2;
${dul}-ipt-${bgc}: #3e3e41;
${dul}-ipt-${bdc}: #737377;
${dul}-ipt-on: #585a6a;
${dul}-ipt-on-${fgc}: #d0d0d2;
${dul}-ipt-off: #3d3d3f;
${dul}-ipt-knob: #303033;
${dul}-${btnB}-${fgc}: #cfcfd2;
${dul}-${btnB}-${bgc}: #48484a;
${dul}-${btnB}-${bdc}: #48484a;
${dul}-${btnH}-${fgc}: #cfcfd2;
${dul}-${btnH}-${bgc}: #535356;
${dul}-${btnH}-${bdc}: #535356;
${dul}-${btnA}-${fgc}: #cfcfd2;
${dul}-${btnA}-${bgc}: #404042;
${dul}-${btnA}-${bdc}: #404042;
${pur}-${fgc}: ${dFc};
${pur}-${bgc}: #000;
${pur}-${bdc}: #808080;
${pur}-${anc}: ${dAnc};
${pur}-head-${fgc}: ${dFc};
${pur}-head-${bgc}: #000;
${pur}-head-${bdc}: #808080;
${pur}-head-${anc}: ${dAnc};
${pur}-nav-${fgc}: ${dFc};
${pur}-nav-${bgc}: #000;
${pur}-nav-${bdc}: #808080;
${pur}-nav-${anc}: ${dAnc};
${pur}-ipt-${fgc}: ${dFc};
${pur}-ipt-${bgc}: #1f1f1f;
${pur}-ipt-${bdc}: #808080;
${pur}-ipt-on: #94939f;
${pur}-ipt-on-${fgc}: #d0d0d2;
${pur}-ipt-off: #3d3d3f;
${pur}-ipt-knob: #303033;
${pur}-${btnB}-${fgc}: ${dFc};
${pur}-${btnB}-${bgc}: #141414;
${pur}-${btnB}-${bdc}: #141414;
${pur}-${btnH}-${fgc}: ${dFc};
${pur}-${btnH}-${bgc}: #252525;
${pur}-${btnH}-${bdc}: #252525;
${pur}-${btnA}-${fgc}: ${dFc};
${pur}-${btnA}-${bgc}: #090909;
${pur}-${btnA}-${bdc}: #090909;
${vvd}-${fgc}: #fff;
${vvd}-${bgc}: #000;
${vvd}-${bdc}: #fff;
${vvd}-${anc}: ${dAnc};
${vvd}-head-${fgc}: #000;
${vvd}-head-${bgc}: #e4e4f1;
${vvd}-head-${bdc}: #000;
${vvd}-head-${anc}: ${lAnc};
${vvd}-nav-${fgc}: #000;
${vvd}-nav-${bgc}: #fff;
${vvd}-nav-${bdc}: #000;
${vvd}-nav-${anc}: ${lAnc};
${vvd}-ipt-${fgc}: ${dFc};
${vvd}-ipt-${bgc}: #1f1f1f;
${vvd}-ipt-${bdc}: #fff;
${vvd}-ipt-on: #fff;
${vvd}-ipt-on-${fgc}: #000;
${vvd}-ipt-off: #3d3d3f;
${vvd}-ipt-knob: #303033;
${vvd}-${btnB}-${fgc}: ${lFc};
${vvd}-${btnB}-${bgc}: #fff;
${vvd}-${btnB}-${bdc}: #fff;
${vvd}-${btnH}-${fgc}: ${lFc};
${vvd}-${btnH}-${bgc}: #e8e8e8;
${vvd}-${btnH}-${bdc}: #e8e8e8;
${vvd}-${btnA}-${fgc}: ${lFc};
${vvd}-${btnA}-${bgc}: #f3f3f3;
${vvd}-${btnA}-${bdc}: #f3f3f3;
${dis}-${fgc}: #707070;
${dis}-${bgc}: #393939;
${dis}-${bdc}: #606060;
${dis}-${anc}: #579;
${dis}-head-${fgc}: #737373;
${dis}-head-${bgc}: #323232;
${dis}-head-${bdc}: #4e4e4e;
${dis}-head-${anc}: #579;
${dis}-nav-${fgc}: #737373;
${dis}-nav-${bgc}: #2f2f2f;
${dis}-nav-${anc}: #579;
${dis}-ipt-${fgc}: #737373;
${dis}-ipt-${bgc}: #3d3d3f;
${dis}-ipt-${bdc}: #606060;
${dis}-ipt-on: #4b4b4b;
${dis}-ipt-off: #3d3d3f;
${dis}-ipt-knob: #303033;
${dis}-${btnB}-${fgc}: #707070;
${dis}-${btnB}-${bgc}: #444444;
${dis}-${btnB}-${bdc}: #444444;
${dis}-${btnH}-${fgc}: #707070;
${dis}-${btnH}-${bgc}: #4c4c4c;
${dis}-${btnH}-${bdc}: #4c4c4c;
${dis}-${btnA}-${fgc}: #707070;
${dis}-${btnA}-${bgc}: #404040;
${dis}-${btnA}-${bdc}: #404040;
${rvs}-${fgc}: ${lFc};
${rvs}-${bgc}: ${lBc};
${rvs}-${bdc}: ${lBdc};
${rvs}-${anc}: ${lAnc};
${rvs}-head-${bgc}: #e4e4f1;
${rvs}-head-${fgc}: ${lFc};
${rvs}-head-${bdc}: #888890;
${rvs}-head-${anc}: ${lAnc};
${rvs}-nav-${fgc}: #f2f2f2;
${rvs}-nav-${bgc}: #343a40;
${rvs}-nav-${bdc}: #d8d8e0;
${rvs}-nav-${anc}: ${dAnc};
${rvs}-ipt-${fgc}: ${lFc};
${rvs}-ipt-${bgc}: #fafafa;
${rvs}-ipt-${bdc}: ${lBdc};
${rvs}-ipt-on: #bcc7d7;
${rvs}-ipt-on-${fgc}: ${lFc};
${rvs}-ipt-off: #fff;
${rvs}-ipt-knob: #fff;
${rvs}-${btnB}-${fgc}: #f2f2f2;
${rvs}-${btnB}-${bgc}: #787880;
${rvs}-${btnB}-${bdc}: #787880;
${rvs}-${btnH}-${fgc}: #f2f2f2;
${rvs}-${btnH}-${bgc}: #66666d;
${rvs}-${btnH}-${bdc}: #66666d;
${rvs}-${btnA}-${fgc}: #f2f2f2;
${rvs}-${btnA}-${bgc}: #82828a;
${rvs}-${btnA}-${bdc}: #82828a;
${pri}-${fgc}: #30c030;
${pri}-${bgc}: #393c39;
${pri}-${bdc}: #308330;
${pri}-${anc}: ${dAnc};
${pri}-head-${fgc}: ${dFc};
${pri}-head-${bgc}: #303f30;
${pri}-head-${bdc}: #208320;
${pri}-head-${anc}: ${dAnc};
${pri}-nav-${fgc}: ${dFc};
${pri}-nav-${bgc}: #04320b;
${pri}-nav-${bdc}: #90c390;
${pri}-nav-${anc}: ${dAnc};
${pri}-ipt-${fgc}: ${dFc};
${pri}-ipt-${bgc}: #3d3d3f;
${pri}-ipt-${bdc}: #308330;
${pri}-ipt-on: #255825;
${pri}-ipt-on-${fgc}: ${dFc};
${pri}-ipt-off: #3d3d3f;
${pri}-ipt-knob: #303033;
${pri}-${btnB}-${fgc}: ${dFc};
${pri}-${btnB}-${bgc}: #287028;
${pri}-${btnB}-${bdc}: #287028;
${pri}-${btnH}-${fgc}: ${dFc};
${pri}-${btnH}-${bgc}: #317b31;
${pri}-${btnH}-${bdc}: #317b31;
${pri}-${btnA}-${fgc}: ${dFc};
${pri}-${btnA}-${bgc}: #216921;
${pri}-${btnA}-${bdc}: #216921;
${sec}-${fgc}: #4088ff;
${sec}-${bgc}: #393946;
${sec}-${bdc}: #4048ca;
${sec}-${anc}: ${dAnc};
${sec}-head-${fgc}: ${dFc};
${sec}-head-${bgc}: #303256;
${sec}-head-${bdc}: #5757ca;
${sec}-head-${anc}: ${dAnc};
${sec}-nav-${fgc}: ${dFc};
${sec}-nav-${bgc}: #142440;
${sec}-nav-${bdc}: #a0a0c3;
${sec}-nav-${anc}: ${dAnc};
${sec}-ipt-${fgc}: ${dFc};
${sec}-ipt-${bgc}: #3d3d3f;
${sec}-ipt-${bdc}: #4052ca;
${sec}-ipt-on: #343473;
${sec}-ipt-on-${fgc}: ${dFc};
${sec}-ipt-off: #3d3d3f;
${sec}-ipt-knob: #303033;
${sec}-${btnB}-${fgc}: ${dFc};
${sec}-${btnB}-${bgc}: #333c9a;
${sec}-${btnB}-${bdc}: #333c9a;
${sec}-${btnH}-${fgc}: ${dFc};
${sec}-${btnH}-${bgc}: #3943ac;
${sec}-${btnH}-${bdc}: #3943ac;
${sec}-${btnA}-${fgc}: ${dFc};
${sec}-${btnA}-${bgc}: #2e3795;
${sec}-${btnA}-${bdc}: #2e3795;
${ter}-${fgc}: #25b7c0;
${ter}-${bgc}: #323737;
${ter}-${bdc}: #478888;
${ter}-${anc}: ${dAnc};
${ter}-head-${fgc}: ${dFc};
${ter}-head-${bgc}: #2a3f4c;
${ter}-head-${bdc}: #407070;
${ter}-head-${anc}: ${dAnc};
${ter}-nav-${fgc}: ${dFc};
${ter}-nav-${bgc}: #203442;
${ter}-nav-${bdc}: #90b0a9;
${ter}-nav-${anc}: ${dAnc};
${ter}-ipt-${fgc}: ${dFc};
${ter}-ipt-${bgc}: #3d3d3f;
${ter}-ipt-${bdc}: #478888;
${ter}-ipt-on: #215a68;
${ter}-ipt-on-${fgc}: ${dFc};
${ter}-ipt-off: #3d3d3f;
${ter}-ipt-knob: #303033;
${ter}-${btnB}-${fgc}: ${dFc};
${ter}-${btnB}-${bgc}: #3a5b6f;
${ter}-${btnB}-${bdc}: #3a5b6f;
${ter}-${btnH}-${fgc}: ${dFc};
${ter}-${btnH}-${bgc}: #47687a;
${ter}-${btnH}-${bdc}: #47687a;
${ter}-${btnA}-${fgc}: ${dFc};
${ter}-${btnA}-${bgc}: #325569;
${ter}-${btnA}-${bdc}: #325569;
${wrn}-${fgc}: #e3e000;
${wrn}-${bgc}: #3a3a30;
${wrn}-${bdc}: #999900;
${wrn}-${anc}: ${dAnc};
${wrn}-head-${fgc}: ${dFc};
${wrn}-head-${bgc}: #414100;
${wrn}-head-${bdc}: #888800;
${wrn}-head-${anc}: ${dAnc};
${wrn}-nav-${fgc}: ${dFc};
${wrn}-nav-${bgc}: #393600;
${wrn}-nav-${bdc}: #d0d0a0;
${wrn}-nav-${anc}: #9bf;
${wrn}-ipt-${fgc}: ${dFc};
${wrn}-ipt-${bgc}: #3d3d3f;
${wrn}-ipt-${bdc}: #999900;
${wrn}-ipt-on: #6a6a00;
${wrn}-ipt-on-${fgc}: ${dFc};
${wrn}-ipt-off: #3d3d3f;
${wrn}-ipt-knob: #303033;
${wrn}-${btnB}-${fgc}: ${dFc};
${wrn}-${btnB}-${bgc}: #828200;
${wrn}-${btnB}-${bdc}: #828200;
${wrn}-${btnH}-${fgc}: ${dFc};
${wrn}-${btnH}-${bgc}: #909000;
${wrn}-${btnH}-${bdc}: #909000;
${wrn}-${btnA}-${fgc}: ${dFc};
${wrn}-${btnA}-${bgc}: #797900;
${wrn}-${btnA}-${bdc}: #797900;
${dng}-${fgc}: #ff2f3a;
${dng}-${bgc}: #423535;
${dng}-${bdc}: #b84040;
${dng}-${anc}: ${dAnc};
${dng}-head-${fgc}: ${dFc};
${dng}-head-${bgc}: #5a2727;
${dng}-head-${bdc}: #da5050;
${dng}-head-${anc}: ${dAnc};
${dng}-nav-${fgc}: ${dFc};
${dng}-nav-${bgc}: #521010;
${dng}-nav-${bdc}: #f0a0a0;
${dng}-nav-${anc}: ${dAnc};
${dng}-ipt-${fgc}: ${dFc};
${dng}-ipt-${bgc}: #3d3d3f;
${dng}-ipt-${bdc}: #b84040;
${dng}-ipt-on: #5f2c2c;
${dng}-ipt-on-${fgc}: ${dFc};
${dng}-ipt-off: #3d3d3f;
${dng}-ipt-knob: #303033;
${dng}-${btnB}-${fgc}: ${dFc};
${dng}-${btnB}-${bgc}: #8f3033;
${dng}-${btnB}-${bdc}: #8f3033;
${dng}-${btnH}-${fgc}: ${dFc};
${dng}-${btnH}-${bgc}: #9f3539;
${dng}-${btnH}-${bdc}: #9f3539;
${dng}-${btnA}-${fgc}: ${dFc};
${dng}-${btnA}-${bgc}: #892c30;
${dng}-${btnA}-${bdc}: #892c30;
${coo}-${fgc}: #00d1e9;
${coo}-${bgc}: #494956;
${coo}-${bdc}: #1ea6cf;
${coo}-${anc}: ${dAnc};
${coo}-head-${fgc}: ${dFc};
${coo}-head-${bgc}: #5f5f7f;
${coo}-head-${bdc}: #1e96bf;
${coo}-head-${anc}: ${dAnc};
${coo}-nav-${fgc}: ${dFc};
${coo}-nav-${bgc}: #374063;
${coo}-nav-${bdc}: #8ec6df;
${coo}-nav-${anc}: ${dAnc};
${coo}-ipt-${fgc}: ${dFc};
${coo}-ipt-${bgc}: #3d3d3f;
${coo}-ipt-${bdc}: #1ea6cf;
${coo}-ipt-on: #5f5f7f;
${coo}-ipt-on-${fgc}: ${dFc};
${coo}-ipt-off: #3d3d3f;
${coo}-ipt-knob: #303033;
${coo}-${btnB}-${fgc}: ${dFc};
${coo}-${btnB}-${bgc}: #7979c0;
${coo}-${btnB}-${bdc}: #7979c0;
${coo}-${btnH}-${fgc}: ${dFc};
${coo}-${btnH}-${bgc}: #8686c0;
${coo}-${btnH}-${bdc}: #8686c0;
${coo}-${btnA}-${fgc}: ${dFc};
${coo}-${btnA}-${bgc}: #7171b9;
${coo}-${btnA}-${bdc}: #7171b9;
${prt}-${fgc}: #ffa8ff;
${prt}-${bgc}: #513845;
${prt}-${bdc}: #c889ac;
${prt}-${anc}: ${dAnc};
${prt}-head-${fgc}: ${dFc};
${prt}-head-${bgc}: #874c72;
${prt}-head-${bdc}: #d885ba;
${prt}-head-${anc}: ${dAnc};
${prt}-nav-${fgc}: ${dFc};
${prt}-nav-${bgc}: #703050;
${prt}-nav-${bdc}: #f0c0e0;
${prt}-nav-${anc}: ${dAnc};
${prt}-ipt-${fgc}: ${dFc};
${prt}-ipt-${bgc}: #3d3d3f;
${prt}-ipt-${bdc}: #c889ac;
${prt}-ipt-on: #874c72;
${prt}-ipt-on-${fgc}: ${dFc};
${prt}-ipt-off: #3d3d3f;
${prt}-ipt-knob: #303033;
${prt}-${btnB}-${fgc}: ${dFc};
${prt}-${btnB}-${bgc}: #cf58cf;
${prt}-${btnB}-${bdc}: #cf58cf;
${prt}-${btnH}-${fgc}: ${dFc};
${prt}-${btnH}-${bgc}: #d56ed5;
${prt}-${btnH}-${bdc}: #d56ed5;
${prt}-${btnA}-${fgc}: ${dFc};
${prt}-${btnA}-${bgc}: #cf4fcf;
${prt}-${btnA}-${bdc}: #cf4fcf;

--bh-week_sun-${fgc}: #ffd0d0;
--bh-week_sun-${bgc}: #3b3232;
--bh-week_sun-${bdc}: #724040;
--bh-week_sat-${fgc}: #d0d0ff;
--bh-week_sat-${bgc}: #32323b;
--bh-week_sat-${bdc}: #474767;
--bh-lv_header-${fgc}: ${dFc};
--bh-lv_header-${bgc}: #303030;
--bh-lv_header-${bdc}: #787878;
--bh-lv_header-sort: #888888;
--bh-lv_cell-ft_b: ${dFc};
--bh-lv_cell-ft_d: ${dFc};
--bh-lv_cell-bg_b: #404040;
--bh-lv_cell-bg_d: #3c3c3c;
--bh-lv_cell-bd_b: #616161;
--bh-lv_cell-bd_d: #5c5c5c;
--bh-lv_cell-hvr-row-${fgc}: ${dFc};
--bh-lv_cell-hvr-row-${bgc}: #333336;
--bh-lv_cell-hvr-row-${bdc}: #575757;
--bh-lv_cell-hvr-cell-${fgc}: ${dFc};
--bh-lv_cell-hvr-cell-${bgc}: #28282a;
--bh-lv_cell-hvr-cell-${bdc}: #505050;
--bh-lv_cell-act-${fgc}: ${dFc};
--bh-lv_cell-act-${bgc}: #202022;
--bh-lv_cell-act_hvr-${fgc}: ${dFc};
--bh-lv_cell-act_hvr-${bgc}: #101011;
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