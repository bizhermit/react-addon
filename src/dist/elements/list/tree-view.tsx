import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { cloneElement, Dispatch, FC, HTMLAttributes, MouseEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSource, { SourceArray } from "../../hooks/source";
import { sbCn } from "../../styles/core-style";
import CssVar, { CssPV, FitToOuter, switchDesign } from "../../styles/css-var";
import JsxStyle from "../../styles/jsx-style";
import { attributes, attributesWithoutChildren, ftoCn } from "../../utils/attributes";
import { _HookSetter } from "../../utils/hook";
import Icon, { IconImage } from "../icon";
import { checkBoxCn, CheckButtonStyle } from "../inputs/check-box";

const cn = "bh-trv";
const defaultAnimationInterval = 10;
const defaultAnimationDuration = 200;

export type TreeViewHook = {
  getSelectedItems: () => Array<Data>;
};
type Hook = _HookSetter<TreeViewHook>;

type Data = {[key: string]: any};
type TreeViewItemProps = {
  id: string | number;
  data: Data;
  parent?: TreeViewItemProps;
  selected: boolean;
  setSelect?: Dispatch<boolean>;
  selectPropagate: (selected?: boolean, mode?: "s" | "p" | "c") => boolean;
  opened: boolean;
  setOpen?: Dispatch<boolean>;
  openPropagate: (opened?: boolean, deep?: boolean) => boolean;
  visible?: boolean;
  setVisible?: Dispatch<boolean>;
  children?: Array<TreeViewItemProps>;
};

export type TreeViewItemAttributes = HTMLAttributes<HTMLDivElement> & {
  $clickToggleOpen?: boolean;
  $clickToggleSelect?: boolean;
  children?: ReactNode;
};

export type TreeViewItemTemplateFC<P = {}> = FC<P & TreeViewItemAttributes & {
  $$props?: TreeViewItemProps;
  $$nestLevel?: number;
  $$setChildren?: (items: Array<Data>) => void;
  $$toggleSelect?: (select?: boolean, deep?: boolean) => void;
  $$toggleOpenChildren?: (open?: boolean, deep?: boolean) => void;
}>;

export type TreeViewAttributes = HTMLAttributes<HTMLDivElement> & {
  $hook?: TreeViewHook;
  $fto?: FitToOuter;
  $items?: SourceArray<Data>;
  $filter?: (item: Data) => boolean;
  $checkBox?: boolean;
  $checkPropagation?: boolean;
  $idDataName?: string;
  $parentIdDataName?: string;
  $selectedDataName?: string;
  $defaultOpenedDataName?: string;
  $openedIconImage?: IconImage;
  $closedIconImage?: IconImage;
  $animationDuration?: number;
  $border?: boolean;
  $grouping?: Array<{ id: string; dataName: string; labelDataName?: string | ((data: { [key: string]: any }) => string); }>;
  children: ReactElement<TreeViewItemAttributes>;
};

type TreeViewItemNestMap = {
  [key: string]: {
    prop: TreeViewItemProps;
    map: TreeViewItemNestMap;
  }
};

const toProp = (attrs: TreeViewAttributes, id: any, data?: Data, prop?: Partial<TreeViewItemProps>) => {
  const p = Object.assign(prop ?? {}, {
    id,
    data,
    selected: data?.[attrs.$selectedDataName ?? "selected"] === true,
    opened: data?.[attrs.$defaultOpenedDataName ?? "defaultOpened"] === true,
    visible: true,
    selectPropagate: (selected, mode) => {
      p.data[attrs.$selectedDataName ?? "selected"] = p.selected = selected;
      if (attrs.$checkPropagation !== true) return selected;
      if (p.setSelect) {
        if (mode != null) {
          setTimeout(() => {
            p.setSelect(selected);
          }, 0);
        }
      }
      const pFunc = () => {
        if (p.parent == null) return;
        if (selected) {
          let all = true;
          if (p.parent.children.find(pp => !pp.selected) != null) all = false;
          if (p.parent.selected !== all) p.parent.selectPropagate(all, "p");
        } else {
          if (!p.parent.selected) return;
          p.parent.selectPropagate(false, "p");
        }
      };
      const cFunc = () => {
        p.children?.forEach(cp => {
          if (cp.selected === selected) return;
          cp.selectPropagate(selected, "c");
        });
      };
      switch (mode) {
        case "p":
          pFunc();
          break;
        case "c":
          cFunc();
          break;
        default:
          pFunc();
          cFunc();
          break;
      }
      return selected;
    },
    openPropagate: (opened, deep) => {
      p.opened = opened;
      if (!deep) return opened;
      if (p.setOpen) {
        setTimeout(() => {
          p.setOpen(opened);
        }, 0);
      }
      const func = () => {
        p.children?.forEach(cp => {
          if (cp.opened === opened) return;
          cp.openPropagate(opened, true);
        })
      };
      func();
      return opened;
    },
  } as TreeViewItemProps);
  return p;
};

const TreeView = React.forwardRef<HTMLDivElement, TreeViewAttributes>((attrs, ref) => {
  const { source } = useSource(attrs.$items, { preventSourceMemo: true });
  const originItemsRef = useRef<Array<TreeViewItemProps>>([]);
  const [originItems, setOriginItems] = useState<Array<TreeViewItemProps>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<TreeViewItemProps>>([]);

  useEffect(() => {
    const oItems: Array<TreeViewItemProps> = [];

    if (attrs.$grouping && attrs.$grouping.length > 0) {
      const nestMap: TreeViewItemNestMap = {};
      for (const item of source) {
        let nestLevel = 0, curMap = nestMap, curProp: TreeViewItemProps = null;
        for (const group of attrs.$grouping) {
          const keyVal = item[group.dataName] ?? "";
          let map = curMap[keyVal];
          if (!map) {
            let label = keyVal;
            if (group.labelDataName) label = typeof group.labelDataName === "function" ? group.labelDataName(item) : item[group.labelDataName];
            map = {
              prop: toProp(attrs, keyVal, { label, ...group }),
              map: {},
            };
            curMap[keyVal] = map;
            if (nestLevel === 0) {
              oItems.push(map.prop);
            } else {
              if (curProp.children == null) curProp.children = [];
              curProp.children.push(map.prop);
              map.prop.parent = curProp;
            }
          }
          curProp = map.prop;
          curMap = map.map;
          nestLevel++;
        }
        const id = item[attrs.$idDataName ?? "id"] ?? StringUtils.generateUuidV4();
        const prop = toProp(attrs, id, item);
        if (curProp == null) {
          oItems.push(prop);
        } else {
          if (curProp.children == null) curProp.children = [];
          curProp.children.push(prop);
          prop.parent = curProp;
        }
      }
    } else {
      const idMap: {[key: string | number]: TreeViewItemProps} = {};
      for (const item of source) {
        const id = item[attrs.$idDataName ?? "id"] ?? StringUtils.generateUuidV4();
        let prop = idMap[id];
        if (prop == null) prop = toProp(attrs, id, item);
        else prop = toProp(attrs, id, item, prop);
        idMap[id] = prop;
        const pid = item[attrs.$parentIdDataName ?? "pid"];
        if (pid) {
          let pprop = idMap[pid];
          if (pprop == null) {
            idMap[pid] = pprop = toProp(attrs, pid);
          }
          if (pprop.children == null) pprop.children = [];
          pprop.children.push(prop);
          prop.parent = pprop;
        }
      }
      Object.keys(idMap).forEach((id) => {
        if (idMap[id].parent == null) oItems.push(idMap[id]);
      });
    }
    setOriginItems(originItemsRef.current = oItems);
  }, [source]);

  useEffect(() => {
    const fItems = [...originItems];
    if (typeof attrs.$filter === "function") {
      const func = (items: Array<TreeViewItemProps>) => {
        if (items == null || items.length === 0) return false;
        let ret = false;
        for (let i = items.length - 1; i >= 0; i--) {
          const item = items[i];
          item.visible = func(item.children) || attrs.$filter(item.data);
          setTimeout(() => {
            item.setVisible?.(item.visible);
          }, 0);
          ret = ret || item.visible;
        }
        return ret;
      };
      func(fItems);
    }
    setFilteredItems(fItems);
  }, [originItems, attrs.$filter]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      getSelectedItems: () => {
        const collected: Array<Data> = [];
        const dn = attrs.$selectedDataName ?? "selected";
        const collect = (items?: Array<TreeViewItemProps>) => {
          if (items == null || items.length === 0) return;
          items.forEach(item => {
            if (item.data[dn] === true) collected.push(item.data);
            collect(item.children);
          });
        };
        collect(originItemsRef.current);
        return collected;
      }
    });
  }, [(attrs.$hook as Hook)?._set])

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, sbCn, ftoCn(attrs.$fto))}
      ref={ref}
      data-border={attrs.$border}
    >
      {filteredItems.map(prop => {
        const key = prop.id;
        return <TreeViewItem key={key} attrs={attrs} prop={prop} nestLevel={0} />;
      })}
      {CheckButtonStyle}
      {Style}
    </div>
  );
});

const TreeViewItem: FC<{ prop: TreeViewItemProps; attrs: TreeViewAttributes; nestLevel: number; }> = ({ prop, attrs, nestLevel }) => {
  const [opened, setOpen] = useState(prop.opened);
  const [created, setCreated] = useState(false);
  const [visible, setVisible] = useState(prop.visible === true);
  const [selected, setSelect] = useState(prop.selected);
  const [childProps, setChildProps] = useState<Array<TreeViewItemProps>>(prop.children);
  const animationOff = useRef(opened);
  const cref = useRef<HTMLDivElement>();

  const toggleSelecte = (s?: boolean) => {
    setSelect(c => prop.selectPropagate(s ?? !c));
  };

  const toggleOpen = (o?: boolean, deep?: boolean) => {
    if (prop.children == null) return;
    setOpen(c => prop.openPropagate(o ?? !c, deep));
  };

  const setChildren = useCallback((items?: Array<Data>) => {
    if (items == null) {
      prop.children = undefined;
      setChildProps(undefined);
      return;
    }
    const childProps = items.map(item => {
      const p = toProp(attrs, item[attrs.$idDataName ?? "id"] ?? StringUtils.generateUuidV4(), item, {
        parent: prop,
      });
      return p;
    });
    setChildProps(prop.children = childProps);
  }, []);

  const click = (e: MouseEvent<HTMLDivElement>) => {
    const c = attrs.children as ReactElement<TreeViewItemAttributes>;
    if (c == null) return;
    if (c.props?.$clickToggleOpen) toggleOpen(undefined, e.ctrlKey);
    if (c.props?.$clickToggleSelect) toggleSelecte();
    c.props?.onClick?.(e);
  };

  const children = useMemo(() => {
    if (!created || childProps == null) return [];
    return childProps.map(item => {
      return <TreeViewItem key={item.id} prop={item} attrs={attrs} nestLevel={nestLevel + 1} />;
    });
  }, [created, childProps, attrs.$checkBox]);

  useEffect(() => {
    if (opened) setCreated(true);
    let actKey = true;
    setTimeout(() => {
      if (cref.current != null) {
        const celem = cref.current;
        const calcAnimationCount = (max: number) => {
          return Math.max(Math.floor(Math.max(Math.min(Math.floor(max * 2), (attrs.$animationDuration ?? defaultAnimationDuration)), 1) / defaultAnimationInterval), 1);
        };
        if (opened) {
          celem.style.removeProperty("height");
          celem.style.visibility = "hidden";
          celem.style.overflow = "hidden";
          celem.style.removeProperty("display");
          const max = celem.offsetHeight;
          const animationCount = calcAnimationCount(max);
          const interval = Math.max(1, Math.floor(max / animationCount));
          celem.style.height = celem.style.maxHeight = celem.style.minHeight = "0px";
          celem.style.removeProperty("visibility");
          const ended = () => {
            celem.style.removeProperty("height");
            celem.style.removeProperty("max-height");
            celem.style.removeProperty("min-height");
            celem.style.removeProperty("overflow");
          };
          if (animationOff.current) {
            ended();
            animationOff.current = false;
          } else {
            let h = 0;
            const impl = async () => {
              if (!actKey) return;
              h += interval;
              if (h > max) {
                ended();
                return;
              }
              celem.style.height = celem.style.maxHeight = celem.style.minHeight = `${h}px`;
              setTimeout(impl, defaultAnimationInterval);
            };
            impl();
          }
        } else {
          const ended = () => {
            celem.style.removeProperty("height");
            celem.style.removeProperty("max-height");
            celem.style.removeProperty("min-height");
            celem.style.removeProperty("overflow");
            celem.style.display = "none";
            celem.style.visibility = "hidden";
          };
          if (animationOff.current) {
            ended();
            animationOff.current = false;
          } else {
            celem.style.removeProperty("display");
            const max = celem.offsetHeight;
            const animationCount = calcAnimationCount(max);
            const interval = Math.max(1, Math.floor(max / animationCount));
            celem.style.overflow = "hidden";
            celem.style.removeProperty("visibility");
            celem.style.height = celem.style.maxHeight = celem.style.minHeight = `${max}px`;
            let h = max;
            const impl = async () => {
              if (!actKey) return;
              h -= interval;
              if (h < 0) {
                ended();
                return;
              }
              celem.style.height = celem.style.maxHeight = celem.style.minHeight = `${h}px`;
              setTimeout(impl, defaultAnimationInterval);
            };
            impl();
          }
        }
      }
    }, 0);
    return () => {
      actKey = true;
    }
  }, [opened]);

  useEffect(() => {
    prop.setSelect = setSelect;
    prop.setOpen = setOpen;
    prop.setVisible = setVisible;
  }, []);

  return (
    <div className={`${cn}-wrap`} style={{ display: visible ? undefined : "none" }}>
      <div className={`${cn}-item`}>
        <div
          className={`${cn}-tgl`}
          data-opened={opened}
          onClick={(e) => toggleOpen(undefined, e.ctrlKey)}
          data-disabled={prop.children == null}
        >
          {prop.children ? <Icon $image={opened ? (attrs.$openedIconImage ?? "pull-down") : ( attrs.$closedIconImage ?? "pull-right")} /> : <></>}
        </div>
        {attrs.$checkBox ?
          <div
            className={`${cn}-ckb ${checkBoxCn}`}
            data-m="e"
            data-checked={selected}
            onClick={() => toggleSelecte()}
          /> : <></>}
        <div
          {...attributes(attrs.children?.props, `${cn}-cont`)}
          onClick={click}
        >
          {cloneElement(attrs.children, {
            $$props: prop,
            $$nestLevel: nestLevel,
            $$setChildren: setChildren,
            $$toggleSelect: toggleSelecte,
            $$toggleOpenChildren: toggleOpen,
          })}
        </div>
      </div>
      {prop.children ?
        <div
          ref={cref}
          className={`${cn}-child`}
          style={{ visibility: "hidden" }}
        >{children}</div> : <></>
      }
    </div>
  );
};

export const useTreeView = (): TreeViewHook => {
  const dispatcher = useRef<Partial<TreeViewHook>>({});

  return {
    getSelectedItems: useCallback(() => {
      return dispatcher.current.getSelectedItems?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
}
.${cn}[data-border="true"] {
  border: 1px solid ${CssVar.bdc};
  border-radius: ${CssVar.bdr};
}
.${cn}-item {
  ${CssPV.flex};
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
.${cn}-item:hover {
  background: ${CssVar.hvrBgc};
}
.${cn}-tgl {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: ${CssVar.size};
  width: ${CssVar.size};
}
.${cn}-tgl[data-disabled="false"] {
  cursor: pointer;
}
.${cn}-tgl[data-disabled="false"] {
  border-radius: ${CssVar.bdr};
${switchDesign(design, {
flat: `transition: background 0.1s;`,
material: `
  transition: background 0.1s, top 0.1s;
`,
neumorphism: `
  transition: box-shadow 0.1s, margin-top 0.1s, margin-bottom 0.1s;
`})}
}
.${cn}-tgl[data-disabled="false"]:hover {
${switchDesign(design, {
fm: `background: ${CssVar.hvrBgc};`,
material: `box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};`,
neumorphism: `box-shadow: ${CssPV.cvxSdD};`
})}
}
.${cn}-tgl[data-disabled="false"]:hover:active {
${switchDesign(design, {
flat: `background: ${CssVar.actBgc};`,
material: `
  top: 1px;
  box-shadow: unset;
`,
neumorphism: `
  margin-top: 1px;
  margin-bottom: -1px;
  box-shadow: ${CssPV.ccvSd};
`,
})}
}
.${cn}-ckb {
  height: ${CssVar.size};
  width: ${CssVar.size};
}
.${cn}-cont {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.${cn}-child {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  flex: none;
  margin-left: ${CssVar.size};
  overflow: visible;
}
.${cn}-child::before {
  ${CssPV.ba}
  height: 100%;
  width: 1px;
  top: 0px;
  border-right: 1px dotted ${CssVar.bdc};
  left: calc((${CssVar.size} - ${CssVar.pdx} - 1px) / 2 * -1);
}
.${cn}-child:hover::before {
  border-right-style: solid;
}
`}</JsxStyle>;

export default TreeView;