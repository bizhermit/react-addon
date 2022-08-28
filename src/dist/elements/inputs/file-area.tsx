import NumberUtils from "@bizhermit/basic-utils/dist/number-utils";
import React, { ChangeEvent, DragEvent, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import CssVar, { CssPV, FitToOuter, Color, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../../utils/attributes";
import { pressPositiveKey } from "../../utils/dom";
import { _HookSetter } from "../../utils/hook";
import { InputHook, inputMode } from "../../utils/input";
import { iconCn } from "../icon";
import Label from "../label";
import Resizer from "../resizer";
import { FileAccept } from "./file-box";

const cn = "bh-fla";

export type FileAreaHook = InputHook<Array<File>> & {
  clear: () => void;
};
type Hook = _HookSetter<FileAreaHook>;

export type FileAreaAttributes = HTMLAttributes<HTMLDivElement> & {
  $hook?: FileAreaHook;
  $fto?: FitToOuter;
  $color?: Color;
  $disabled?: boolean;
  $accept?: Array<FileAccept>;
  $resize?: boolean | "x" | "y" | "xy";
  $noPadding?: boolean;
  $changed?: (ctx: { files: Array<File>; size: number; count: number; }) => boolean | void;
  children?: ReactNode;
};

const FileArea = React.forwardRef<HTMLDivElement, FileAreaAttributes>((attrs, ref) => {
  const bref = useRef<HTMLDivElement>();
  const iref = useRef<HTMLInputElement>();
  const filesRef = useRef<Array<File>>([]);
  const [state, setState] = useState({ size: 0, count: 0 });

  const optimizeState = useCallback(() => {
    let size = 0, count = 0;;
    for (const file of filesRef.current) {
      size = NumberUtils.add(file.size, size);
      count++;
    }
    setState({ size, count });
    iref.current.value = "";
  }, []);

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (attrs.$disabled) return;
    for (const file of e.target.files) {
      filesRef.current.push(file);
    }
    optimizeState();
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (attrs.$disabled) return;
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.removeAttribute("data-active");
  };

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    if (attrs.$disabled) return;
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    e.currentTarget.setAttribute("data-active", "");
  };

  const drop = (e: DragEvent<HTMLDivElement>) => {
    if (attrs.$disabled) return;
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.removeAttribute("data-active");
    for (const file of e.dataTransfer.files) {
      if (attrs.$accept) {
        const ext = file.name.split(".").pop().toLowerCase();
        let exists = false;
        for (const a of attrs.$accept) {
          if (a.toLowerCase() !== ext) continue;
          exists = true;
          break;
        }
        if (!exists) continue;
      }
      filesRef.current.push(file);
    }
    optimizeState();
  };

  useEffect(() => {
    const ret = attrs.$changed?.({
      files: [...filesRef.current],
      ...state,
    });
    if (ret) {
      filesRef.current = [];
      state.count = 0;
      state.size = 0;
    }
  }, [state]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => bref.current.focus(),
      getValue: () => filesRef.current,
      setValue: (v) => {
        filesRef.current = [];
        v.forEach(file => {
          filesRef.current.push(file);
        });
        optimizeState();
      },
      clear: () => {
        filesRef.current = [];
        optimizeState();
      }
    })
  }, [(attrs.$hook as Hook)?._set])

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      data-color={attrs.$color ?? "default"}
      data-m={inputMode(attrs)}
      data-fill={attrs.$noPadding}
      ref={ref}
      tabIndex={undefined}
    >
      <div
        ref={bref}
        className={`${cn}-drop_area`}
        onClick={() => {
          if (attrs.$disabled) return;
          iref.current.click();
        }}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={drop}
        tabIndex={attrs.tabIndex ?? 0}
        onKeyDown={(e) => {
          if (attrs.$disabled) return;
          pressPositiveKey(e, () => {
            iref.current.click();
          })
        }}
      >
        {attrs.children ?? <Label>click or drop</Label>}
      </div>
      {attrs.$resize ? <Resizer direction={typeof attrs.$resize === "boolean" ? "xy" : attrs.$resize} /> : <></>}
      <input
        ref={iref}
        className={`${inputCn}-hidden`}
        type="file"
        accept={attrs.$accept?.join(",") ?? "."}
        tabIndex={-1}
        onChange={changeFile}
        multiple
      />
      {InputStyle}
      {Style}
    </div>
  );
});

export const useFileArea = (): FileAreaHook => {
  const dispatch = useRef<Partial<FileAreaHook>>({});
  return {
    focus: useCallback(() => {
      dispatch.current.focus?.();
    }, []),
    getValue: useCallback(() => {
      return dispatch.current.getValue?.();
    }, []),
    setValue: useCallback((v) => {
      dispatch.current.setValue?.(v);
    }, []),
    clear: useCallback(() => {
      dispatch.current.clear?.();
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  box-sizing: border-box;
  position: relative;
  min-height: ${CssVar.size};
  min-width: ${CssVar.size};
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
.${cn}[data-fill="true"] {
  padding: 0px;
}
.${cn}[data-m="d"] {
  ${CssPV.inactOpacity}
}
.${cn}-drop_area {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  height: 100%;
  width: 100%;
  user-select: none;
  border-radius: ${CssVar.bdr};
  overflow: hidden;
  outline: none;
  transition: background 0.1s;
${switchDesign(design, {
fm: `border: 1.5px dotted ${CssVar.bdc};`,
})}
}
.${cn}[data-m="e"] > .${cn}-drop_area {
  cursor: pointer;
${switchDesign(design, {
neumorphism: `box-shadow: ${CssPV.nCcvSdActive};`
})}
}
${switchDesign(design, {
c: `
.${cn}[data-m="e"] > .${cn}-drop_area:hover {
  background: ${CssVar.hvrBgc};
}
.${cn}[data-m="e"] > .${cn}-drop_area:hover:active,
.${cn}[data-m="e"] > .${cn}-drop_area[data-active] {
  background: ${CssVar.actBgc};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-drop_area {
  border-color: ${v.ipt.bdc};
  color: ${v.fc};
  background: ${v.ipt.bgc};
}
.${cn}${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
`).join("")}
.${cn}[data-m="d"] > .${cn}-drop_area {
  background: transparent;
${switchDesign(design, {
neumorphism: `box-shadow: ${CssPV.nCcvSdDisabled};`
})}
}`
})}
`}</JsxStyle>;

export default FileArea;