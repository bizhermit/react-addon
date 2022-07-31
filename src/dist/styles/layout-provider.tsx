import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { createContext, FC, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import CoreStyle from "./core-style";
import { LayoutColor, LayoutDesign, _LayoutColor } from "./css-var";

export const ScreenSize = {
  exSmall: 0,
  small: 1,
  medium: 2,
  large: 3,
  exLarge: 4,
} as const;

type ScreenSizeValue = typeof ScreenSize[keyof typeof ScreenSize];

export type LayoutContextProps = {
  color: LayoutColor;
  _color: _LayoutColor;
  design: LayoutDesign;
  setColor: (color: LayoutColor) => void;
  setDesign: (design: LayoutDesign) => void;
  screenSize: ScreenSizeValue;
  cache: { [key: string]: any };
};
export const LayoutContext = createContext<LayoutContextProps>({
  color: "system",
  _color: undefined,
  design: undefined,
  screenSize: undefined,
  setColor: () => { },
  setDesign: () => { },
  cache: {},
});

export const useLayout = () => {
  return useContext(LayoutContext);
};

type ColorReducerState = { $: LayoutColor; _: _LayoutColor; };
const colorReducer = (_state: ColorReducerState, action: LayoutColor): ColorReducerState => {
  if (action === "system") {
    if (typeof window === "undefined") return { $: undefined, _: undefined };
    return {
      $: action,
      _: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
    };
  }
  return { $: action, _: action as _LayoutColor };
};
const colorReducerInitializer = (color: LayoutColor) => {
  if (color === "system") return { $: undefined, _: undefined };
  return colorReducer(undefined, color);
};

const judgeSize = (width: number = 0): ScreenSizeValue => {
  if (width > 1904) return ScreenSize.exLarge;
  if (width > 1264) return ScreenSize.large;
  if (width > 960) return ScreenSize.medium;
  if (width > 600) return ScreenSize.small;
  return ScreenSize.exSmall;
};

const LayoutProvider: FC<{
  color?: LayoutColor;
  design?: LayoutDesign;
  judgeSize?: (width: number) => ScreenSizeValue;
  children?: ReactNode;
}> = (props) => {
  const [color, setColor] = useReducer(colorReducer, colorReducerInitializer(props.color));
  const [design, setDesign] = useState(props.design);
  const [screenSize, setScreenSize] = useState<ScreenSizeValue>();

  useEffect(() => {
    if (StringUtils.isEmpty(color._)) document?.documentElement?.removeAttribute("data-color");
    else document?.documentElement?.setAttribute("data-color", color._);
  }, [color._]);

  useEffect(() => {
    if (StringUtils.isEmpty(design)) document?.documentElement?.removeAttribute("data-design");
    else document?.documentElement?.setAttribute("data-design", design);
  }, [design]);

  useEffect(() => {
    if (document.querySelectorAll(`style[id*="bh-core__"]`).length > 1) {
      document.querySelectorAll("head > style").forEach(elem => {
        document.head.removeChild(elem);
      });
    }
    let et = null;
    const listener = () => {
      if (et) return;
      et = setTimeout(() => {
        setScreenSize((props.judgeSize ?? judgeSize)(window.innerWidth));
        et = null;
      }, 50);
    };
    window.addEventListener("resize", listener);
    setScreenSize((props.judgeSize ?? judgeSize)(window.innerWidth));
    if (props.color === "system") {
      setColor(props.color);
    }
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ color: color.$, _color: color._, design, setColor, setDesign, screenSize, cache: {} }}>
      {props.children}
      {CoreStyle}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;