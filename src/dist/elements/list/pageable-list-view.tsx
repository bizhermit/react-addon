import React, { ForwardedRef, FunctionComponent, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSource from "../../hooks/source";
import CssVar, { cssParamsSize, CssPV } from "../../styles/css-var";
import JsxStyle from "../../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../../utils/attributes";
import { _HookSetter } from "../../utils/hook";
import SelectBox from "../inputs/select-box";
import Resizer from "../resizer";
import ListView, { ListViewAttributes, listViewCn, ListViewColumnProps, ListViewHook, useListView } from "./list-view";

const cn = "bh-plv";
type Data = { [key: string]: any };

type AddinHook = {
  getPageIndex: () => number;
  getPageNumber: () => number;
};

export type PageableListViewHook<T = Data> = ListViewHook<T> & AddinHook;
type Hook = _HookSetter<AddinHook>;

export type PageableListViewAttributes<T = Data> = Omit<ListViewAttributes<T>, "$hook"> & {
  $hook?: PageableListViewHook<T>;
  $pagePosition?: "top" | "bottom" | "both";
  $recordsPerPage?: number;
  $changePage?: (pageIndex: number) => void;
  $overridePageStatus?: {
    maxPage: number;
    pageIndex: number;
  }
};

interface PageableListViewFC extends FunctionComponent {
  <T extends {[key: string]: any} = Data>(attrs: PageableListViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<PageableListViewAttributes<T>>;
}

const PageableListView: PageableListViewFC = React.forwardRef<HTMLDivElement, PageableListViewAttributes<any>>(<T extends {[key: string]: any} = Data>(attrs: PageableListViewAttributes<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const [items, setItems] = useState([]);
  const pi = useRef(0);
  const [pageIndex, setPageIndex] = useState(pi.current);
  const rpp = useRef(attrs.$recordsPerPage ?? 10);
  const { source } = useSource<T>(attrs.$items, {
    preventSourceMemo: true,
    changeSource: (s) => {
      const max = (attrs.$overridePageStatus == null ? Math.ceil(s.length / rpp.current) : attrs.$overridePageStatus.maxPage) - 1;
      if (pageIndex > max) setPageIndex(max);
    }
  });

  const changePageIndex = (index: number) => {
    if (attrs.$overridePageStatus == null) setPageIndex(pi.current = index);
    attrs.$changePage?.(index);
  };

  const { prevPageNodes, nextPageNodes } = useMemo(() => {
    const prevPageNodes = [], nextPageNodes = [];
    const max = attrs.$overridePageStatus == null ? Math.ceil(source.length / rpp.current) : attrs.$overridePageStatus.maxPage;
    for (let i = 0, il = Math.min(max, pageIndex); i < il; i++) {
      prevPageNodes.push(
        <div
          key={i}
          className={`${cn}-page_num bh-anchor`}
          onClick={() => changePageIndex(i)}
        >{i + 1}</div>
      );
    }
    for (let i = pageIndex + 1; i < max; i < i++) {
      nextPageNodes.push(
        <div
          key={i}
          className={`${cn}-page_num bh-anchor`}
          onClick={() => changePageIndex(i)}
        >{i + 1}</div>
      );
    }
    return { prevPageNodes, nextPageNodes };
  }, [pageIndex, source, attrs.$overridePageStatus]);

  const pageNumberSourceItems = useMemo(() => {
    const sourceItems = [];
    const max = attrs.$overridePageStatus == null ? Math.ceil(source.length / rpp.current) : attrs.$overridePageStatus.maxPage;
    for (let i = 0; i < max; i++) {
      sourceItems.push({ value: i, label: String(i + 1) });
    }
    return sourceItems;
  }, [source.length, attrs.$overridePageStatus]);
  
  const bind = useMemo(() => {
    return { page: pageIndex };
  }, [pageIndex]);

  const sorted = (columnName: string, order: "asc" | "desc" | "", col: ListViewColumnProps) => {
    if (attrs.$overridePageStatus == null) {
      const items = source.concat();
      if (order !== "") {
        if (typeof col.sort === "function") {
          const sortFunc = col.sort(order);
          items.sort((a, b) => {
            return sortFunc({ data: a }, { data: b });
          });
        } else if (col.sort !== false) {
          const num = order === "asc" ? 1 : -1;
          if (col.dataType === "number") {
            items.sort((data1, data2) => {
              return Number(data1[columnName]) > Number(data2[columnName]) ? num : -num;
            });
          } else {
            items.sort((data1, data2) => {
              return data1[columnName] > data2[columnName] ? num : -num;
            });
          }
        }
      }
      const first = rpp.current * pageIndex;
      setItems(items.slice(first, first + rpp.current));
    }
    if (attrs.$options?.sorted) attrs.$options.sorted(columnName, order, col);
  };

  useEffect(() => {
    const originItems = attrs.$items ?? [];
    if (attrs.$overridePageStatus == null) {
      const first = rpp.current * pageIndex;
      setItems(originItems.slice(first, first + rpp.current));
    } else {
      setItems(originItems);
    }
  }, [source, pageIndex]);

  useEffect(() => {
    if (attrs.$overridePageStatus != null) {
      setPageIndex(pi.current = attrs.$overridePageStatus.pageIndex);
    }
  }, [attrs.$overridePageStatus]);

  useEffect(() => {
    (attrs.$hook as unknown as Hook)?._set({
      getPageIndex: () => pi.current,
      getPageNumber: () => pi.current + 1,
    });
  }, [(attrs.$hook as unknown as Hook)?._set])

  const selectBoxWidth = useMemo(() => {
    return Math.max(cssParamsSize() * 2, String(pageNumberSourceItems.length).length * 20 + cssParamsSize());
  }, [pageNumberSourceItems.length]);

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      ref={ref}
    >
      {attrs.$pagePosition === "bottom" ? <></> :
        <div className={`${cn}-ctrl`}>
          <div className={`${cn}-prev`}>{prevPageNodes}</div>
          <SelectBox
            style={{ width: selectBoxWidth }}
            $name="page"
            $bind={bind}
            $defaultValue={0}
            $source={pageNumberSourceItems}
            $preventSourceMemo
            $textAlign="center"
            $changed={(ctx) => {
              changePageIndex(Number(ctx?.after ?? 0));
            }}
          />
          <div className={`${cn}-next`}>{nextPageNodes}</div>
        </div>
      }
      <ListView
        $fto="fy"
        $hook={attrs.$hook}
        $items={items}
        $columns={attrs.$columns}
        $preventColumnsMemo={attrs.$preventColumnsMemo}
        $options={{
          ...attrs.$options,
          externalSort: true,
          sorted,
        }}
        $preventOptionsMemo={attrs.$preventOptionsMemo}
        $padding={attrs.$padding}
        $border={attrs.$border}
        $radius={attrs.$radius}
        $resize={false}
      />
      {attrs.$pagePosition === "top" ? <></> :
        <div className={`${cn}-ctrl`}>
          <div className={`${cn}-prev`}>{prevPageNodes}</div>
          <SelectBox
            style={{ width: selectBoxWidth }}
            $name="page"
            $bind={bind}
            $defaultValue={0}
            $source={pageNumberSourceItems}
            $preventSourceMemo
            $textAlign="center"
            $changed={(ctx) => {
              changePageIndex(Number(ctx?.after ?? 0));
            }}
          />
          <div className={`${cn}-next`}>{nextPageNodes}</div>
        </div>
      }
      {attrs.$resize ? <Resizer direction={typeof attrs.$resize === "boolean" ? "xy" : attrs.$resize} /> : <></>}
      {Style}
    </div>
  );
});

export const usePageableListView = <T extends {[key: string]: any} = any>(): PageableListViewHook<T> => {
  const dispatch = useRef<Partial<AddinHook>>({});
  const lvHook = useListView<T>();
  return {
    ...lvHook,
    getPageIndex: useCallback(() => {
      return dispatch.current.getPageIndex?.();
    }, []),
    getPageNumber: useCallback(() => {
      return dispatch.current.getPageNumber?.();
    }, []),
    _set: useCallback((d) => {
      (lvHook as any)._set(d);
      dispatch.current = d;
    }, []),
  } as Hook as any;
};

const Style = <JsxStyle id={cn}>{() => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.${cn}-ctrl {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: none;
  padding: 0 ${CssVar.pdx};
}
.${cn}-prev,
.${cn}-next {
  ${CssPV.flex}
  flex-flow: row nowrap;
  align-items: center;
  flex: 1;
  overflow: hidden;
}
.${cn}-prev {
  justify-content: flex-end;
}
.${cn}-next {
  justify-content: flex-start;
}
.${cn}-page_num {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  min-width: 30px;
  user-select: none;
  padding: 2px 3px 0px 3px;
  white-space: nowrap;
}
.${cn} > .${listViewCn}-wrap[data-padding="true"] {
  padding-top: 0px;
  padding-bottom: 0px;
}
`}</JsxStyle>;

export default PageableListView;