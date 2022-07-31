import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { ButtonHTMLAttributes, createContext, DependencyList, HTMLAttributes, ReactNode, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { CssPV, FitToOuter } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import Button, { buttonCn } from "./button";
import FlexBox from "./flex-box";
import Label from "./label";

const cn = "bh-fnk";
const functionKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"] as const;

export type FunctionKey = typeof functionKeys[number];

export type FunctionKeyContainerHook = {
  focus: () => void;
};
type Hook = _HookSetter<FunctionKeyContainerHook>;

export type FunctionKeyProps = {
  label?: ReactNode;
  disabled?: boolean;
  click?: (unlock: () => void) => (void | Promise<void>);
  buttonAttributes?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
  removeKeyLabel?: boolean;
};

type FunctionKeyContextProps = {
  setFunctionKeyActions: (actions: Array<FunctionKeyProps>) => string;
  removeFunctionKeyActions: (id: string) => void;
  focus: () => void;
};

const FunctionKeyContext = createContext<FunctionKeyContextProps>({
  setFunctionKeyActions: () => "",
  removeFunctionKeyActions: () => {},
  focus: () => {},
});

export type FunctionKeyContainerAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $hook?: FunctionKeyContainerHook;
  $defaultActions?: Array<FunctionKeyProps>;
  $disabled?: boolean;
  $hideButton?: boolean;
};

const FunctionKeyContainer = React.forwardRef<HTMLDivElement, FunctionKeyContainerAttributes>((attrs, $ref) => {
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);

  const keyActions = useRef<Array<{ 
    id: string;
    actions: Array<FunctionKeyProps>;
  }>>(attrs.$defaultActions == null ? [] : [{
    id: StringUtils.generateUuidV4(),
    actions: attrs.$defaultActions
  }]);
  const [rev, setRev] = useState(0);

  const setActs = (actions: Array<FunctionKeyProps>) => {
    const id = StringUtils.generateUuidV4();
    keyActions.current.push({ id, actions });
    setRev(c => c + 1);
    return id;
  };
  const removeActs = (id: string) => {
    for (let i = 0, il = keyActions.current.length; i < il; i++) {
      if (keyActions.current[i].id !== id) continue;
      keyActions.current.splice(i, 1);
      break;
    }
    setRev(c => c + 1);
  };

  const getAct = (key: number) => {
    const idx = keyActions.current.length - 1;
    for (let i = idx; i >= 0; i--) {
      const act = keyActions.current[i]?.actions?.[key];
      if (act) return act;
    }
    return undefined;
  };

  const buttonNodes = useMemo(() => {
    const nodes = [];
    if (attrs.$hideButton) return nodes;
    for (let i = 0; i < 12; i++) {
      const fnAct = getAct(i);
      const disabled = attrs.$disabled === true || fnAct?.disabled === true || fnAct?.click == null;
      nodes.push(
        <Button
          key={i}
          {...fnAct?.buttonAttributes}
          className={`${cn}-btn ${fnAct?.buttonAttributes?.className ?? ""}`}
          disabled={disabled || fnAct?.buttonAttributes?.disabled}
          $click={fnAct?.click}
        >
          <FlexBox $center $fto="f">
            {fnAct?.removeKeyLabel ? <></> : <Label>F{i+1}</Label>}
            {fnAct?.label}
          </FlexBox>
        </Button>
      );
    }
    return nodes;
  }, [rev, attrs.$disabled, attrs.$hideButton]);

  const keydownClick = (e: React.KeyboardEvent, index: number) => {
    if (attrs.$disabled) return;
    const act = getAct(index);
    if (act == null) return;
    if (act.disabled) return;
    if (act.click == null) return;
    act.click(() => {});
    e.stopPropagation();
    e.preventDefault();
  };

  const keydown = (e: React.KeyboardEvent) => {
    switch (e.key as FunctionKey) {
      case "F1":
        keydownClick(e, 0);
        break;
      case "F2":
        keydownClick(e, 1);
        break;
      case "F3":
        keydownClick(e, 2);
        break;
      case "F4":
        keydownClick(e, 3);
        break;
      case "F5":
        keydownClick(e, 4);
        break;
      case "F6":
        keydownClick(e, 5);
        break;
      case "F7":
        keydownClick(e, 6);
        break;
      case "F8":
        keydownClick(e, 7);
        break;
      case "F9":
        keydownClick(e, 8);
        break;
      case "F10":
        keydownClick(e, 8);
        break;
      case "F11":
        keydownClick(e, 10);
        break;
      case "F12":
        keydownClick(e, 11);
        break;
    }
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => ref.current?.focus(),
    });
  }, [(attrs.$hook as Hook)?._set]);

  useEffect(() => {
    if (ref.current?.querySelector("*:focus") == null) ref.current.focus();
  }, []);

  return (
    <FunctionKeyContext.Provider
      value={{
        setFunctionKeyActions: setActs,
        removeFunctionKeyActions: removeActs,
        focus: () => ref.current?.focus(),
      }}
    >
      <div
        {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
        ref={ref}
        tabIndex={attrs.tabIndex ?? -1}
        onKeyDown={keydown}
      >
        <div className={`${cn}-cont ${cn}`}>
          {attrs.children}
        </div>
        {attrs.$hideButton ? <></> :
          <div className={`${cn}-keys`}>
            {buttonNodes}
          </div>
        }
        {Style}
      </div>
    </FunctionKeyContext.Provider>
  );
});

export const useFunctionKeyContainer = (): FunctionKeyContainerHook => {
  const dispatcher = useRef<Partial<FunctionKeyContainerHook>>({});

  return {
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

export const useFunctionKey = (actions: Array<FunctionKeyProps | null>, deps?: DependencyList) => {
  const ctx = useContext(FunctionKeyContext);

  useEffect(() => {
    const id = ctx.setFunctionKeyActions(actions);
    return () => {
      ctx.removeFunctionKeyActions(id);
    };
  }, deps ?? []);

  return {
    focus: () => ctx.focus(),
  };
};

const Style = <JsxStyle id={cn}>{() => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  outline: none;
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: 0px;
  width: 100%;
}
.${cn}-keys {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  flex: none;
}
.${buttonCn}.${cn}-btn {
  flex: 1;
}
.${buttonCn}.${cn}-btn > .${buttonCn}-body {
  padding: 0px;
}
`}</JsxStyle>;

type generateFunctionKeyActionsController = { set: (key: FunctionKey, props: FunctionKeyProps) => generateFunctionKeyActionsController; };
export const generateFunctionKeyProps = (func?: (con: generateFunctionKeyActionsController) => void) => {
  const acts: Array<FunctionKeyProps> = [];
  for (let i = 0; i < 12; i++) acts.push(null);
  if (func == null) return acts;
  const con: generateFunctionKeyActionsController = {
    set: (key: FunctionKey, props: FunctionKeyProps) => {
      acts[Number(key.replace("F", "")) - 1] = props;
      return con;
    },
  };
  func(con);
  return acts;
};

export default FunctionKeyContainer;