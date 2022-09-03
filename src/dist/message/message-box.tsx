import React, { FC, KeyboardEvent, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import CssVar, { CssPV, Color, switchDesign, ColorType } from "../styles/css-var";
import { LayoutContext, useLayout } from "../styles/layout-provider";
import JsxStyle from "../styles/jsx-style";
import Button, { ButtonAttributes, buttonCn, useButton } from "../elements/button";
import TextBox, { TextBoxAttributes } from "../elements/inputs/text-box";
import Label from "../elements/label";
import { colorCn } from "../styles/core-style";

const cn = "bh-mgs_box";

type MessageBoxButton = Omit<ButtonAttributes, "$click" | "$hook"> & {
  $code?: string | number;
  $escapeButton?: boolean;
  $default?: boolean;
  $click?: (resolve: (value: any) => void, attrs?: MessageBoxButton) => void;
};

type MessageBoxProps = {
  title?: string;
  message: ReactNode;
  buttons: Array<MessageBoxButton>;
  color?: Color;
  colorType?: ColorType;
};

const MessageBox: FC<{ props: MessageBoxProps; resolve: (value: any) => void; }> = ({
  props,
  resolve,
}) => {
  const ref = useRef<HTMLDivElement>();
  const defBtn = useRef(useButton());

  const btnNodes = useMemo(() => {
    const nodes = [];
    let setDef = false;
    props.buttons.forEach((btn, idx) => {
      const attrs = {...btn};
      delete attrs.$code;
      delete attrs.$escapeButton;
      delete attrs.$default;
      delete attrs.$click;
      nodes.push(
        <Button
          key={idx}
          {...btn}
          $hook={(() => {
            if (btn.$default || (!setDef && idx + 1 === props.buttons.length)) {
              setDef = true;
              return defBtn.current;
            }
            return undefined;
          })() ? defBtn.current : undefined}
          $transparent={btn.$transparent ?? true}
          $click={() => {
            if (btn.$click) btn.$click(resolve, btn);
            else resolve(btn.$code);
          }}
        />
      );
    });
    if (nodes.length === 0) {
      nodes.push(<Button $transparent={true} $click={() => { resolve(undefined) }} />);
    }
    return nodes;
  }, []);

  const moveButtonFocus = (direction: "l" | "r") => {
    const aelem = document.activeElement;
    if (aelem?.tagName !== "BUTTON") return;
    const elems = ref.current.querySelectorAll(`.${cn}-f > .${buttonCn}`);
    let flag = false;
    const impl = (elem: Element) => {
      if (flag) {
        (elem as HTMLElement).focus();
        return true;
      }
      flag = elem === aelem;
      return false;
    };
    if (direction === "l") {
      for (let i = elems.length - 1; i >= 0; i--) {
        if (impl(elems[i])) break;
      }
    } else {
      for (let i = 0, il = elems.length; i < il; i++) {
        if (impl(elems[i])) break;
      }
    }
  };

  const keydownMask = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  const keydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      const idx = props.buttons.findIndex(btn => btn.$escapeButton);
      if (idx >= 0) {
        const elems = ref.current.querySelectorAll(`.${cn}-f > .${buttonCn}`);
        (elems[idx] as HTMLButtonElement)?.click();
      } else {
        defBtn.current.focus();
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowLeft") {
      moveButtonFocus("l");
      return;
    }
    if (e.key === "ArrowRight") {
      moveButtonFocus("r");
      return;
    }
  }

  useEffect(() => {
    const cRect = ref.current.getBoundingClientRect();
    const cw = document.body.clientWidth, ch = document.body.clientHeight;
    const aRect = document.body.getBoundingClientRect();
    const maxX = Math.max(0, cw - cRect.width), maxY = Math.max(0, ch - cRect.height);
    ref.current.style.left = Math.max(0, Math.min(maxX, aRect.left + (aRect.width - cRect.width) / 2)) + "px";
    ref.current.style.top = Math.max(0, Math.min(maxY, aRect.top + (aRect.height - cRect.height) / 2)) + "px";
    const ipt = ref.current.querySelector(`.${cn}-b input`) as HTMLInputElement;
    if (ipt) ipt.focus();
    else defBtn.current.focus();
  });

  return (
    <>
      <div
        className={`${cn}-mask ${cn}-mask_d`}
        tabIndex={0}
        onKeyDown={keydownMask}
      />
      <div
        className={cn}
        ref={ref}
        onKeyDown={keydown}
      >
        {props.title ? 
          <div
            className={`${cn}-h ${colorCn}`}
            data-color={props.color}
            data-colortype={props.colorType || "nav"}
          >
            <Label $bold>{props.title}</Label>
          </div> : <></>
        }
        <div className={`${cn}-b`}>
          {props.message}
        </div>
        <div className={`${cn}-f`}>
          {btnNodes}
        </div>
      </div>
      <div
        className={`${cn}-mask`}
        tabIndex={0}
        onKeyDown={keydownMask}
      />
      {Style}
    </>
  );
};

const useMessageBox = () => {
  const layout = useLayout();
  const layoutRef = useRef(layout);
  const rootElem = useRef<HTMLDivElement>();
  const root = useRef<Root>();

  const show = useCallback(<T,>(props: MessageBoxProps) => {
    if (rootElem.current == null) {
      rootElem.current = document.createElement("div");
      rootElem.current.classList.add(`${cn}-root`);
      document.body.appendChild(rootElem.current);
    }
    if (root.current == null) root.current = createRoot(rootElem.current);
    rootElem.current.style.removeProperty("display");
    return new Promise<T>((resolve) => {
      const resolveInterceptor = (v: T) => {
        root.current.unmount();
        root.current = null;
        setTimeout(() => {
          resolve(v);
        }, 0);
      }
      root.current.render(
        <LayoutContext.Provider value={layoutRef.current}>
          <MessageBox props={props} resolve={resolveInterceptor} />
        </LayoutContext.Provider>
      );
    });
  }, []);

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useEffect(() => {
    return () => {
      if (rootElem.current) {
        setTimeout(() => {
          if (root.current) {
            root.current.unmount();
            root.current = null;
          }
          document.body.removeChild(rootElem.current);
        }, 0);
      }
    };
  }, []);

  return {
    show,
    alert: useCallback((message: ReactNode, title?: string) => {
      return show<void>({
        title,
        message,
        buttons: [{
          children: "OK",
          $transparent: true,
          $escapeButton: true,
        }],
      });
    }, []),
    confirm: useCallback((message: ReactNode, title?: string) => {
      return show<boolean>({
        title,
        message,
        buttons: [{
          children: "キャンセル",
          $transparent: true,
          $escapeButton: true,
          $click: (resolve) => {
            resolve(false);
          }
        }, {
          children: "OK",
          $color: "primary",
          $transparent: true,
          $click: (resolve) => {
            resolve(true);
          }
        }],
      });
    }, []),
    text: useCallback((props: { message?: ReactNode, textBoxAttributes?: TextBoxAttributes; title?: string; }) => {
      const bind = { value: "" };
      return show<{ result: boolean; text: string; }>({
        title: props.title,
        message: (
          <>
            {props.message}
            <TextBox
              {...props.textBoxAttributes}
              $bind={bind}
              $name="value"
            />
          </>
        ),
        buttons: [{
          children: "キャンセル",
          $transparent: true,
          $escapeButton: true,
          $click: (resolve) => {
            resolve({ result: false, text: undefined });
          },
        }, {
          children: "OK",
          $color: "primary",
          $transparent: true,
          $click: (resolve) => {
            resolve({ result: true, text: bind.value });
          },
        }],
      });
    }, [])
  };
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  z-index: 2147483647;
  position: fixed;
  border-radius: ${CssVar.bdr};
  overflow: hidden;
  background: ${CssVar.bgc};
  color: ${CssVar.fgc};
  min-width: 180px;
${design ? `filter: drop-shadow(0 2px 3px ${CssVar.sdw.c});` : ""}
}
.${cn}-h {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  height: ${CssVar.size};
  padding-right: ${CssVar.size};
  width: 100%;
${switchDesign(design, {
flat: `
  box-shadow: 0 0 1px ${CssVar.sdw.c};
  margin-bottom: 1px;
`,
material: `
  box-shadow: 0 0 5px -1px ${CssVar.sdw.c};
  margin-bottom: 3px;
`,
neumorphism: `
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.d}, 0px -2.5px 1px -2px ${CssVar.sdw.d} inset;
  margin-bottom: 3px;
`
})}
}
.${cn}-b {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: ${CssVar.size};
  width: 100%;
  padding: 10px 10px 0px 10px;
}
.${cn}-f {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex: none;
  padding: 5px 5px 5px ${CssVar.size};
}
.${cn}-mask {
  position: fixed;
  z-index: 2147483646;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  height: 100% !important;
  width: 100% !important;
  cursor: default;
  background: ${CssVar.mask.bgc};
}
.${cn}-mask_d {
  background: transparent;
}
`}</JsxStyle>;

export default useMessageBox;