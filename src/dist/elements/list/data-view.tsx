import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { EffectCallback, FC, ForwardedRef, Fragment, FunctionComponent, HTMLAttributes, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import CssVar, { cssParamsSize, CssPV, FitToOuter, switchDesign } from "../../styles/css-var";
import { LayoutContext, LayoutContextProps, useLayout } from "../../styles/layout-provider";
import JsxStyle from "../../styles/jsx-style";
import Resizer from "../resizer";
import { _HookSetter } from "../../utils/hook";
import { attributesWithoutChildren, convertClassNames, ftoCn } from "../../utils/attributes";
import { cloneDomElement, DomComponentClass } from "../../utils/dom";
import { releaseCursor, setCursor } from "../../utils/cursor";
import { sbCn } from "../../styles/core-style";
import { InputAttributes } from "../../hooks/value";
import { inputCn } from "../../styles/input-style";

const cn = "bh-dv";
export const dataViewCn = cn;
export const dataViewIptCn = "bh-dv_ipt";

const initializedDataName = "_dv_init";
type Data = { [key: string]: any };

export type DataViewSelectMode = "none" | "row" | "cell";
type TextAlign = "left" | "center" | "right";
type SortOrder = "" | "asc" | "desc";
export const dataViewDefaultRowHeight = () => cssParamsSize() + 4;

export type DataViewHook<T = Data> = {
  focus: () => void;
  getItems: () => Array<T>;
  setItems: (items: Array<T>) => void;
  getFilteredItems: () => Array<$DataViewItem<T>>;
  setFilter: (filter: (itemData: T) => boolean) => void;
  getDisplayedItems: () => Array<$DataViewItem<T>>;
  getLength: () => number;
  getFilteredLength: () => number;
  select: (rowIndex: number, columnName?: string) => void;
  clearSelect: () => void;
  getSelectedRows: () => Array<{ id: number; data: T; }>;
  getSelectedCells: () => Array<{ id: number; data: T; columnName: string; }>;
  render: () => void;
};
type Hook<T = Data> = _HookSetter<DataViewHook<T>>;

export type DataViewItemParams<T = Data> = {
  rowNumber: number;
  id: number,
  data: T;
  columnName: string;
  columnLabel: string;
  columnWidth: number;
  originItems: () => Array<T>;
  selectMode: DataViewSelectMode;
  selected: boolean;
  getSelectedRows: () => Array<{ id: number; data: T; }>;
  getSelectedCells: () => Array<{ id: number; data: T; columnName: string; }>;
};
export type DataViewHeaderOrFooterCellClicked<T = Data> = (columnName: string, items: Array<$DataViewItem<T>>, renderCells: () => void) => void;
type DataViewReturnOrder = {
  rebind?: boolean
  renderHeaderCell?: boolean;
  renderHeaderCells?: boolean;
  renderFooterCell?: boolean;
  renderFooterCells?: boolean;
  renderCell?: boolean;
  renderCells?: boolean;
  renderRow?: boolean;
  render?: boolean;
};
export type DataViewCellClickFunc<T = Data> = (params: DataViewItemParams<T>, e?: MouseEvent) => (DataViewReturnOrder | void);
export type DataViewColumnFunction<P, T = Data> = (props: P) => DataViewColumnProps<T>;
export type DataViewMultiStageRowItemProps<T = Data> = {
  columns: Array<DataViewColumnProps<T>>;
  header?: boolean;
  headerHeightFlexRate?: number;
  headerClassName?: string | Array<string>;
  footer?: boolean;
  footerHeightFlexRate?: number;
  footerClassName?: string | Array<string>;
  body?: boolean;
  bodyHeightFlexRate?: number;
  bodyClassName?: string | Array<string>;
};
export type DataViewEditTargetProps<T = Data> = {
  data: T;
  columnName: string;
  index: number;
  id: number;
};
export type DataViewEditParams<T = Data> = {
  target: DataViewEditTargetProps<T>;
  editElement: HTMLDivElement;
  endEdit: (commit?: boolean) => void;
  cell: $DataViewCell<T>;
  styleCtx: LayoutContextProps;
}
export type DataViewBeginEditFunc<T = Data> = (params: DataViewEditParams<T>) => { node: ReactNode, effect?: () => void; };
export type DataViewEditInputAttributes<T extends InputAttributes<any, any>> =
  Omit<T, "$hook" | "$value" | "$dispatch" | "$bind" | "$name" | "$placeholder" | "$resize" | "$source" | "style">;

export type DataViewColumnProps<T = Data> = {
  name: string;
  vName?: string;
  label?: string;
  dataType?: "string" | "number";
  initialize?: (props: DataViewColumnProps<T>, dataView: DataViewClass<T>) => { [key: string]: any };
  dispose?: (dv: DataViewClass<T>) => void;
  headerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void);
  headerCellInitialize?: (column: $DataViewColumn<T>, initializeParameters: { [key: string]: any }) => void;
  headerCellTextAlign?: TextAlign;
  footerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void);
  footerCellInitialize?: (column: $DataViewColumn<T>, initializeParameters: { [key: string]: any }) => void;
  footerCellTextAlign?: TextAlign;
  width?: number;
  cellInitialize?: (cell: $DataViewCell<T>, initializeParameters: { [key: string]: any }, dv: DataViewClass<T>) => void;
  cellDispose?: (cell: $DataViewCell<T>, dv: DataViewClass<T>) => void;
  cellRender?: (cell: $DataViewCell<T>, initializeParameters: { [key: string]: any }) => void;
  cellTextAlign?: TextAlign;
  appearance?: "label" | "anchor";
  sort?: boolean | ((order: SortOrder) => (data1: { data: T }, data2: { data: T }) => number);
  resize?: boolean;
  fill?: boolean;
  fixed?: boolean;
  tabStop?: boolean;
  notScrollFocusWhenTabStop?: boolean;
  disabled?: boolean;
  borderless?: boolean;
  clickHeaderCell?: DataViewHeaderOrFooterCellClicked<T>;
  clickFooterCell?: DataViewHeaderOrFooterCellClicked<T>;
  clickCell?: DataViewCellClickFunc<T>;
  clickRow?: DataViewCellClickFunc<T>;
  _preventClearSelected?: boolean;
  data?: { [key: string]: any };
  bindedItems?: (originItems: Array<T>) => void;
  initializeRowData?: (data: T) => void | boolean;
  _beginEdit?: DataViewBeginEditFunc<T>;
  _endEdit?: (target: DataViewEditTargetProps<T>, commit: boolean, editElement: HTMLDivElement) => DataViewReturnOrder | void;
  editedRowData?: ((data: T) => void) | boolean;
  _rows?: Array<DataViewMultiStageRowItemProps<T>>;
  headerClassNames?: string | Array<string>;
  footerClassNames?: string | Array<string>;
  bodyClassNames?: string | Array<string>;
  jsxStyle?: JSX.Element;
  _dv?: (dv: DataViewClass) => void;
};
export type DataViewEditColumnProps<T> = DataViewColumnProps<Data> & {
  edit?: boolean;
  beganEdit?: (value: T, target: DataViewEditTargetProps<Data>) => void;
  endedEdit?: (values: { before: T, after: T }, target: DataViewEditTargetProps<Data>, commit: boolean) => void;
};
export type DataViewOptions<T = Data> = {
  header?: boolean;
  headerHeight?: number;
  footer?: boolean;
  footerHeight?: number;
  rowHeight?: number;
  rowNumber?: boolean;
  selectMode?: DataViewSelectMode;
  multiSelect?: boolean;
  oddEven?: boolean;
  dragScroll?: boolean | "horizontal" | "vertical";
  rowBorderless?: boolean;
  colBorderless?: boolean;
  sort?: (itemData1: T, itemData2: T) => number;
  sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: DataViewColumnProps<T>) => void;
  externalSort?: boolean;
  filter?: (itemData: T) => boolean;
  clickCell?: DataViewCellClickFunc<T>;
  filtered?: (items: Array<$DataViewItem<T>>) => void;
  enterIsClick?: boolean;
  scrollTimeoutInterval?: number;
};

export type DataViewAttributes<T = Data> = HTMLAttributes<HTMLDivElement> & {
  ref?: ForwardedRef<HTMLDivElement>;
  $fto?: FitToOuter;
  $hook?: DataViewHook<T>;
  $items?: Array<T>;
  $columns?: Array<DataViewColumnProps<T>>;
  $preventColumnsMemo?: boolean;
  $options?: DataViewOptions<T>;
  $preventOptionsMemo?: boolean;
  $padding?: boolean;
  $border?: boolean;
  $radius?: boolean;
  $resize?: boolean | "x" | "y" | "xy";
};

interface DataViewFC extends FunctionComponent {
  <T extends {[key: string]: any} = Data>(attrs: DataViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<DataViewAttributes<T>>;
}

const DataView: DataViewFC = React.forwardRef<HTMLDivElement, DataViewAttributes<any>>(<T extends {[key: string]: any} = Data>(attrs: DataViewAttributes<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const elem = useRef<HTMLDivElement>();
  const dv = useRef<DataViewClass<T>>();
  const initRef = useRef(false);
  const layout = useLayout();

  useEffect(() => {
    if (initRef.current) dv.current?.setItems(attrs.$items);
  }, [attrs.$items]);
  useEffect(() => {
    if (initRef.current) dv.current?.setColumns(attrs.$columns);
  }, [attrs.$preventColumnsMemo ? attrs.$columns : undefined]);
  useEffect(() => {
    if (initRef.current) dv.current?.setOptions(attrs.$options);
  }, [attrs.$preventOptionsMemo ? attrs.$options : undefined]);
  useEffect(() => {
    if (initRef.current) dv.current.setStyleContext(layout);
  }, [layout]);

  useEffect(() => {
    (attrs.$hook as Hook<T>)?._set({
      focus: () => elem.current?.focus(),
      getItems: () => dv.current.getValue(),
      setItems: (v) => dv.current.setItems(v),
      getLength: () => dv.current.getLength(),
      getFilteredLength: () => dv.current.getFilteredLength(),
      getFilteredItems: () => dv.current.getFilteredValue(),
      setFilter: (filter) => dv.current.setFilter(filter),
      getDisplayedItems: () => dv.current.getSortedValue(),
      select: (ridx, colName) => dv.current.select(ridx, colName),
      clearSelect: () => dv.current.clearSelect(),
      getSelectedRows: () => dv.current.getSelectedRows(),
      getSelectedCells: () => dv.current.getSelectedCells(),
      render: () => dv.current.render(),
    });
  }, [(attrs.$hook as Hook<T>)?._set]);

  useEffect(() => {
    dv.current = new DataViewClass<T>(elem.current, attrs, layout);
    initRef.current = true;
    return () => {
      dv.current?.dispose();
    };
  }, []);

  return (
    <div
      {...attributesWithoutChildren(attrs, `${cn}-wrap`, ftoCn(attrs.$fto))}
      ref={ref}
      data-padding={attrs.$padding}
      data-border={attrs.$border}
      data-radius={attrs.$radius}
    >
      {useMemo(() => <div ref={elem} />, [])}
      {attrs.$resize ? <Resizer direction={typeof attrs.$resize === "boolean" ? "xy" : attrs.$resize} /> : <></>}
      {DataViewStyle}
      {useMemo(() => {
        const styles = [];
        const func = (cols: Array<DataViewColumnProps<T>>) => {
          if (cols == null) return;
          cols.forEach(col => {
            if (col.jsxStyle) {
              styles.push(
                <Fragment key={col.name ?? StringUtils.generateUuidV4()}>
                  {col.jsxStyle}
                </Fragment>
              );
            }
            col._rows?.forEach(colrow => func(colrow.columns));
          });
        };
        func(attrs.$columns);
        return styles;
      }, [attrs.$columns])}
    </div>
  );
});

export const useDataView = <T extends {[key: string]: any} = any>(): DataViewHook<T> => {
  const dispatch = useRef<Partial<DataViewHook<T>>>({});
  return {
    focus: useCallback(() => {
      dispatch.current.focus?.();
    }, []),
    clearSelect: useCallback(() => {
      dispatch.current.clearSelect?.();
    }, []),
    getDisplayedItems: useCallback(() => {
      return dispatch.current.getDisplayedItems?.();
    }, []),
    getFilteredItems: useCallback(() => {
      return dispatch.current.getFilteredItems?.();
    }, []),
    getFilteredLength: useCallback(() => {
      return dispatch.current.getFilteredLength?.();
    }, []),
    setFilter: useCallback((f) => {
      dispatch.current.setFilter(f);
    }, []),
    getItems: useCallback(() => {
      return dispatch.current.getItems?.();
    }, []),
    getLength: useCallback(() => {
      return dispatch.current.getLength?.();
    }, []),
    getSelectedCells: useCallback(() => {
      return dispatch.current.getSelectedCells?.();
    }, []),
    getSelectedRows: useCallback(() => {
      return dispatch.current.getSelectedRows?.();
    }, []),
    render: useCallback(() => {
      dispatch.current.render?.();
    }, []),
    select: useCallback((r, c) => {
      dispatch.current.select?.(r, c);
    }, []),
    setItems: useCallback((v) => {
      dispatch.current.setItems?.(v);
    }, []),
    _set: useCallback((d) => {
      dispatch.current = {
        ...dispatch.current,
        ...d,
      };
    }, []),
  } as Hook<T>;
};

export type $DataViewMultiStageRowItem<T> = {
  columns: Array<$DataViewColumn<T>>;
  header: boolean;
  headerHeightFlexRate: number;
  headerClassName: Array<string>;
  footer: boolean;
  footerHeightFlexRate: number;
  footerClassName: Array<string>;
  body: boolean;
  bodyHeightFlexRate: number;
  bodyClassName: Array<string>;
};
export type $DataViewColumn<T> = {
  prop?: DataViewColumnProps<T>;
  name: string;
  vName: string;
  label: string;
  dataType: "string" | "number";
  cells: Array<$DataViewCell<T>>;
  width: number;
  minWidth: number;
  initializeParameters: { [key: string]: any };
  dispose: (dv: DataViewClass<T>) => void;
  headerCellElement: HTMLDivElement;
  headerCellLabelElement?: HTMLDivElement;
  renderHeaderCell?: (cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void;
  sortElement?: HTMLDivElement;
  resizeElement?: HTMLDivElement;
  footerCellElement: HTMLDivElement;
  footerCellLabelElement?: HTMLDivElement;
  renderFooterCell?: (cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void;
  cellInitialize: (cell: $DataViewCell<T>, initializeParameters: { [key: string]: any }, dv: DataViewClass<T>) => void;
  disposeCell?: (cell: $DataViewCell<T>, dv: DataViewClass<T>) => void;
  renderCell: (cell: $DataViewCell<T>, initializeParameters: { [key: string]: any }) => void;
  textAlign: TextAlign;
  appearance?: "label" | "anchor";
  sort: (order: SortOrder) => (itemData1: { data: T }, itemData2: { data: T }) => number;
  sortOrder: SortOrder;
  resize: boolean;
  fill: boolean;
  fixed: boolean;
  fixedLeft: number;
  left: number;
  tabStop: boolean;
  notScrollFocusWhenTabStop: boolean;
  render: boolean;
  disabled: boolean;
  borderless?: boolean;
  clickHeaderCell?: DataViewHeaderOrFooterCellClicked<T>;
  clickFooterCell?: DataViewHeaderOrFooterCellClicked<T>;
  clickCell?: DataViewCellClickFunc<T>;
  clickRow?: DataViewCellClickFunc<T>;
  preventClearSelected: boolean;
  bindedItems?: (originItems: Array<T>) => void;
  initializeRowData?: (data: T) => void | boolean;
  rows?: Array<$DataViewMultiStageRowItem<T>>;
  parent?: $DataViewColumn<T>;
  beginEdit?: DataViewBeginEditFunc<T>;
  endEdit?: (target: DataViewEditTargetProps<T>, commit: boolean, editElement: HTMLDivElement) => DataViewReturnOrder | void;
  editedRowData: ((data: T) => void) | boolean;
  headerClassNames?: Array<string>;
  footerClassNames?: Array<string>;
  bodyClassNames?: Array<string>;
  built: boolean;
};
type $DataViewItem<T> = {
  data: T;
  id: number;
  rowSelected: boolean;
  cellSelected: { [key: string]: boolean };
};
type $DataViewRow<T> = {
  element: HTMLDivElement;
  index: number;
  id: number;
  cells: Array<$DataViewCell<T>>;
  item: $DataViewItem<T>;
  cache: {
    _dv_selected: boolean;
    _dv_oddEven: 0 | 1;
  };
};
type $DataViewCell<T> = {
  element: HTMLDivElement;
  contentElements: Array<HTMLElement>;
  column: $DataViewColumn<T>;
  row: $DataViewRow<T>;
  cache: {
    _dv_selected: boolean;
    _dv_initialized: boolean;
  } & { [key: string]: any };
};

const EditEffect: FC<{ effect: EffectCallback; }> = ({ effect }) => {
  useEffect(effect);
  return <></>;
};

export class DataViewClass<T = Data> extends DomComponentClass {

  protected initialized: boolean;
  protected resizeObserver: ResizeObserver

  protected headerElement: HTMLDivElement;
  protected headerRowElement: HTMLDivElement;
  protected bodyElement: HTMLDivElement;
  protected dummyElement: HTMLDivElement;
  protected footerElement: HTMLDivElement;
  protected footerRowElement: HTMLDivElement;
  protected editElement: HTMLDivElement;
  protected editMaskElement: HTMLDivElement;
  protected editRoot: Root;

  protected columns: Array<$DataViewColumn<T>>;
  protected renderColumns: Array<$DataViewColumn<T>>;
  protected originItems: Array<T>;
  protected bindingItems: Array<$DataViewItem<T>>;
  protected filteredItems: Array<$DataViewItem<T>>;
  protected sortedItems: Array<$DataViewItem<T>>;
  protected rows: Array<$DataViewRow<T>>;
  protected selectedRows: { [key: string]: $DataViewItem<T> };
  protected lastSelectedCell: {
    index: number;
    item: $DataViewItem<T>;
    column: $DataViewColumn<T>;
  };
  protected lastSelectedBaseCell: {
    index: number;
    item: $DataViewItem<T>;
    column: $DataViewColumn<T>;
  };
  protected lastScrolledTop: number;
  protected lastScrolledLeft: number;
  protected maxFirstIndex: number;
  protected firstIndex: number;
  protected lastChangedX: boolean;
  protected hasFillColumn: boolean;
  protected editTarget: {
    item: $DataViewItem<T>;
    column: $DataViewColumn<T>;
    index: number;
    useReact?: boolean;
  };
  protected scrollingMode: "stop" | "up" | "down";
  protected scrollingId: number;
  protected scrollingInterval: number;

  protected cloneBase: {
    div: HTMLDivElement;
    rowElem: HTMLDivElement;
    cellElem: HTMLDivElement;
    labelCellElem: HTMLDivElement;
  };
  protected rowNumberColumn: $DataViewColumn<T>;

  protected headerVisible: boolean;
  protected headerHeight: number;
  protected footerVisible: boolean;
  protected footerHeight: number;
  protected rowHeight: number;
  protected selectMode: DataViewSelectMode;
  protected multiSelect: boolean;
  protected oddEven: boolean;
  protected dragScroll: boolean | "horizontal" | "vertical";
  protected rowNumber: boolean;
  protected sort: (itemData1: { [key: string]: any }, itemData2: { [key: string]: any }) => number;
  protected sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: DataViewColumnProps<T>) => void;
  protected externalSort: boolean;
  protected filter: (itemData: { [key: string]: any }) => boolean;
  protected clickCell: DataViewCellClickFunc<T>;
  protected filtered: (items: Array<$DataViewItem<T>>) => void;
  protected enterIsClick: boolean;
  protected colBorderless: boolean;
  protected rowBorderless: boolean;

  protected scrollTimeoutInterval: number;
  protected endEditEventListener: () => void;

  protected itemsCallBindedRev = 0;
  protected colCallBindedRev = 0;

  constructor(protected element: HTMLElement, props: DataViewAttributes<T>, protected layoutCtx: LayoutContextProps) {
    super();
    this.initialized = false;
    this.itemsCallBindedRev = 0;
    this.colCallBindedRev = 0;
    if (element == null) {
      throw new Error("DataView: not found root element.");
    }
    this.columns = [];
    this.renderColumns = [];
    this.sortedItems = [];
    this.rows = [];
    this.selectedRows = {};
    this.lastSelectedCell = null;
    this.lastSelectedBaseCell = null;
    this.editTarget = null;
    this.lastScrolledTop = -1;
    this.lastScrolledLeft = -1;
    this.firstIndex = -1;
    this.scrollingMode = "stop";
    this.scrollingId = 0;
    this.scrollingInterval = 0;
    this.scrollTimeoutInterval = 5;
    this.endEditEventListener = null;

    this.generateElements();
    this.rowNumberColumn = {
      name: "_rnum",
      vName: "_rnum",
      label: "row number",
      dataType: "number",
      width: 40,
      minWidth: 40,
      cells: [],
      headerCellElement: cloneDomElement(this.cloneBase.cellElem),
      footerCellElement: cloneDomElement(this.cloneBase.cellElem),
      initializeParameters: null,
      dispose: null,
      cellInitialize: (cell) => {
        const elem = cloneDomElement(this.cloneBase.labelCellElem);
        cell.contentElements.push(elem);
        cell.element.appendChild(elem);
      },
      renderCell: (cell) => {
        if (cell.cache.index !== cell.row.index) {
          cell.contentElements[0].textContent = String(cell.row.index + 1);
          cell.cache.index = cell.row.index;
        }
      },
      textAlign: "center",
      sort: null,
      sortOrder: "",
      fill: false,
      fixed: true,
      fixedLeft: 0,
      left: 0,
      resize: false,
      tabStop: false,
      notScrollFocusWhenTabStop: false,
      preventClearSelected: false,
      disabled: false,
      render: true,
      editedRowData: null,
      built: false,
    };
    this.setOptions(props.$options);
    this.initialized = true;
    this.optimizeElementsPosition();
    this.bindColumns(props.$columns);
    this.bindItems(props.$items);
    this.optimizeDummySize();
    this.render();
  }

  public dispose(): void {
    this.disposeColumns();
    this.disposeRows();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.editTarget?.useReact) this.editRoot.unmount();
    super.dispose();
  }

  public setOptions(options: DataViewOptions<T> = {}): this {
    this.setHeaderVisible(options.header);
    this.setHeaderHeight(options.headerHeight);
    this.setFooterVisible(options.footer);
    this.setFooterHeight(options.footerHeight);
    this.setRowHeight(options.rowHeight);
    this.setRowNumber(options.rowNumber);
    this.setSelectMode(options.selectMode);
    this.setMultiSelect(options.multiSelect);
    this.setOddEven(options.oddEven);
    this.setDragScroll(options.dragScroll);
    this.setSort(options.sort);
    this.setSorted(options.sorted);
    this.setExternalSort(options.externalSort);
    this.setFilter(options.filter);
    this.setClickCell(options.clickCell);
    this.setFiltered(options.filtered);
    this.setEnterIsClick(options.enterIsClick);
    this.setColBorderless(options.colBorderless);
    this.setRowBorderless(options.rowBorderless);
    this.setScrollTimeoutInterval(options.scrollTimeoutInterval);
    return this;
  }

  protected optimizeElementsPosition(): void {
    if (!this.initialized) return;
    let bMargin = 0;
    if (this.headerVisible) {
      bMargin += this.headerHeight;
      this.bodyElement.style.top = this.headerHeight + "px";
    } else {
      this.bodyElement.style.top = "0px";
    }
    if (this.footerVisible) bMargin += this.footerHeight;
    this.bodyElement.style.height = bMargin === 0 ? "100%" : `calc(100% - ${bMargin}px)`;
    this.renderWhenResized();
  }

  public setHeaderVisible(visible: boolean): this {
    const init = visible !== false;
    if (init === this.headerVisible) return this;
    this.headerVisible = init;
    this.headerElement.style.display = this.headerVisible ? null : "none";
    this.optimizeElementsPosition();
    return this;
  }

  public setHeaderHeight(height: number): this {
    const init = height || dataViewDefaultRowHeight();
    if (init === this.headerHeight) return this;
    this.headerHeight = init;
    this.headerElement.style.height = this.headerHeight + "px";
    this.optimizeElementsPosition();
    return this;
  }

  public setFooterVisible(visible: boolean): this {
    const init = visible === true;
    if (init === this.footerVisible) return this;
    this.footerVisible = init;
    this.footerElement.style.display = this.footerVisible ? null : "none";
    this.optimizeElementsPosition();
    return this;
  }

  public setFooterHeight(height: number): this {
    const init = height || dataViewDefaultRowHeight();
    if (init === this.footerHeight) return this;
    this.footerHeight = init;
    this.footerElement.style.height = this.footerHeight + "px";
    this.footerElement.style.top = `calc(100% - ${this.footerHeight}px)`;
    this.optimizeElementsPosition();
    return this;
  }

  public setRowHeight(height: number): this {
    const init = height || dataViewDefaultRowHeight();
    if (init === this.rowHeight) return this;
    this.rowHeight = init;
    this.cloneBase.rowElem.style.height = `${this.rowHeight}px`;
    for (const row of this.rows) {
      row.element.style.height = `${this.rowHeight}px`;
    }
    return this;
  }

  public setRowNumber(visible: boolean): this {
    const init = visible !== false;
    if (init === this.rowNumber) return this;
    this.rowNumber = init;
    if (!this.initialized) return this;
    this.buildColumns();
    return this;
  }

  public setSelectMode(selectMode: DataViewSelectMode): this {
    const init = selectMode || "cell";
    if (init === this.selectMode) return this;
    this.selectMode = init;
    switch (this.selectMode) {
      case "none":
        this.bodyElement.removeAttribute("data-select");
        break;
      case "row":
        this.bodyElement.setAttribute("data-select", this.selectMode);
        break;
      case "cell":
      default:
        this.bodyElement.setAttribute("data-select", this.selectMode);
        break;
    }
    return this;
  }

  public setMultiSelect(multiSelect: boolean): this {
    const init = multiSelect === true;
    if (init === this.multiSelect) return this;
    this.multiSelect = init;
    this.clearSelectedRows();
    return this;
  }

  public setOddEven(oddEven: boolean): this {
    const init = oddEven !== false;
    if (init === this.oddEven) return this;
    this.oddEven = init;
    if (this.initialized) this.renderWhenScrolled();
    return this;
  }

  public setDragScroll(dragScroll: boolean | "horizontal" | "vertical"): this {
    const init = dragScroll ?? true;
    if (init === this.dragScroll) return this;
    this.dragScroll = init;
    return this;
  }

  public setSort(func: (itemData1: { [key: string]: any }, itemData2: { [key: string]: any }) => number): this {
    const same = this.sort === func;
    this.sort = func;
    if (this.initialized && !same) {
      this.sortItems();
      this.optimizeMaxFirstIndex();
      this.render();
    }
    return this;
  }

  public setSorted(func: (columnName: string, order: "asc" | "desc" | "", columnProps: DataViewColumnProps<T>) => void): this {
    this.sorted = func;
    return this;
  }

  public setExternalSort(external: boolean): this {
    this.externalSort = external === true;
    return this;
  }

  public setFilter(func: (itemData: { [key: string]: any }) => boolean): this {
    const same = this.filter === func;
    this.filter = func;
    if (this.initialized && !same) {
      this.filterItems();
      this.optimizeMaxFirstIndex();
      this.render();
    }
    return this;
  }

  public setClickCell(func: DataViewCellClickFunc<T>): this {
    this.clickCell = func;
    return this;
  }

  public setFiltered(func: (items: Array<$DataViewItem<T>>) => void): this {
    this.filtered = func;
    return this;
  }

  public setEnterIsClick(enterIsClick: boolean): this {
    const init = enterIsClick === true;
    if (init === this.enterIsClick) return this;
    this.enterIsClick = enterIsClick
    return this;
  }

  public setColBorderless(borderless: boolean): this {
    const v = borderless === true;
    if (v === this.colBorderless || !this.initialized) return this;
    if (v) {
      this.columnForEach(col => {
        col.headerCellElement.setAttribute("data-bdl", "");
        col.footerCellElement.setAttribute("data-bdl", "");
        col.cells.forEach(cell => {
          cell.element.setAttribute("data-bdl", "");
        });
      });
    } else {
      this.columnForEach(col => {
        col.headerCellElement.removeAttribute("data-bdl");
        col.footerCellElement.removeAttribute("data-bdl");
        col.cells.forEach(cell => {
          cell.element.removeAttribute("data-bdl");
        });
      });
    }
    return this;
  }

  public setRowBorderless(borderless: boolean): this {
    const v = borderless === true;
    if (v === this.rowBorderless || !this.initialized) return this;
    if (v) {
      this.rows.forEach(r => r.element.setAttribute("data-bdl", ""));
      this.headerRowElement.setAttribute("data-bdl", "");
      this.footerRowElement.setAttribute("data-bdl", "");
    } else {
      this.rows.forEach(r => r.element.removeAttribute("data-bdl"));
      this.headerRowElement.removeAttribute("data-bdl");
      this.footerRowElement.removeAttribute("data-bdl");
    }
    return this;
  }

  public setScrollTimeoutInterval(interval: number): this {
    this.scrollTimeoutInterval = Math.max(0, interval ?? 5);
    return this;
  }

  protected generateElements(): void {
    this.element.classList.add(cn, sbCn);
    this.element.tabIndex = -1;
    this.element.textContent = "";
    // clone base
    const div = document.createElement("div");
    this.cloneBase = {
      div,
      rowElem: cloneDomElement(div),
      cellElem: cloneDomElement(div),
      labelCellElem: cloneDomElement(div),
    };
    this.cloneBase.rowElem.classList.add(`${cn}-row`);
    this.cloneBase.cellElem.classList.add(`${cn}-cell`);
    this.cloneBase.labelCellElem.classList.add(`${cn}-lbl`);
    // header
    this.headerElement = cloneDomElement(div);
    this.headerElement.classList.add(`${cn}-header`);
    this.headerElement.appendChild(this.headerRowElement = cloneDomElement(this.cloneBase.rowElem));
    // footer
    this.footerElement = cloneDomElement(div);
    this.footerElement.classList.add(`${cn}-footer`);
    this.footerElement.appendChild(this.footerRowElement = cloneDomElement(this.cloneBase.rowElem));

    this.dummyElement = cloneDomElement(div)
    this.dummyElement.classList.add(`${cn}-body-dummy`);
    this.element.appendChild(this.dummyElement);
    this.element.appendChild(this.headerElement);
    this.bodyElement = cloneDomElement(div);
    this.bodyElement.classList.add(`${cn}-body`);
    this.element.appendChild(this.bodyElement);
    this.element.appendChild(this.footerElement);

    this.editMaskElement = cloneDomElement(div);
    this.editMaskElement.classList.add(`${cn}-mask`);
    this.editMaskElement.style.display = "none";
    this.element.appendChild(this.editMaskElement);
    this.editElement = cloneDomElement(div);
    this.editElement.classList.add(`${cn}-edit`);
    this.editElement.style.visibility = "hidden";
    this.editElement.style.display = "none";
    this.element.appendChild(this.editElement);

    let et = null;
    this.addEvent(this.element, "scroll", () => {
      if (et) return;
      et = setTimeout(() => {
        this.endEdit(false);
        this.renderWhenScrolled();
        et = null;
      }, this.scrollTimeoutInterval);
    }, { passive: true });
    this.addEvent(this.element, "keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          this.arrowUp(e.ctrlKey ? 10 : 1, this.multiSelect && e.shiftKey);
          e.preventDefault();
          break;
        case "ArrowDown":
          this.arrowDown(e.ctrlKey ? 10 : 1, this.multiSelect && e.shiftKey);
          e.preventDefault();
          break;
        case "ArrowLeft":
          this.arrowLeft(e.ctrlKey, this.multiSelect && e.shiftKey);
          e.preventDefault();
          break
        case "ArrowRight":
          this.arrowRight(e.ctrlKey, this.multiSelect && e.shiftKey);
          e.preventDefault();
          break;
        case "Enter":
          this.endEdit(true, {
            unmountTimeout: true,
            callback: (edit) => {
              if (edit) {
                let lst = this.element.scrollTop;
                if (e.shiftKey) this.arrowUp();
                else this.arrowDown();
                this.beginEditLastSelectedCell(lst);
                return
              }
              if (this.enterIsClick) {
                if (this.lastSelectedCell && this.selectMode !== "none") {
                  this.cellClickedImpl(
                    this.lastSelectedCell.item,
                    this.lastSelectedCell.column,
                    this.lastSelectedCell.index,
                    e.ctrlKey,
                    e.shiftKey
                  );
                }
                return
              }
              if (e.shiftKey) this.arrowUp();
              else this.arrowDown();
            }
          });
          e.preventDefault();
          break;
        case "Tab":
          this.endEdit(true, {
            unmountTimeout: true,
            callback: () => {
              let lst = this.element.scrollTop;
              if (e.shiftKey) this.arrowLeft();
              else this.arrowRight();
              this.beginEditLastSelectedCell(lst);
            }
          });
          e.preventDefault();
          break;
        case " ":
          if (this.lastSelectedCell && this.selectMode !== "none") this.cellClickedImpl(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index, e.ctrlKey, e.shiftKey);
          e.preventDefault();
          break;
        case "F2":
          e.preventDefault();
          this.beginEditLastSelectedCell();
          break;
        case "Escape":
          this.endEdit(false, { unmountTimeout: true });
          break;
        default:
          break;
      }
    }, false);

    this.addEvent(this.bodyElement, "mousedown", (e: MouseEvent) => {
      if (this.dragScroll == false) return;
      const lastPosX = this.bodyElement.scrollLeft, lastPosY = this.element.scrollTop, posX = e.clientX, posY = e.clientY;
      let et = null;
      const move = (e: MouseEvent) => {
        if (et) return;
        et = setTimeout(() => {
          if (this.dragScroll !== "vertical") {
            const sl = posX - e.clientX + lastPosX;
            this.headerElement.scrollLeft = sl;
            this.footerElement.scrollLeft = sl;
            this.element.scrollLeft = sl;
          }
          if (this.dragScroll !== "horizontal") {
            this.element.scrollTop = posY - e.clientY + lastPosY;
          }
          et = null;
        }, this.scrollTimeoutInterval);
      };
      document.onselectstart = () => false;
      const end = () => {
        this.removeEvent(window, "mousemove", move);
        this.removeEvent(window, "mouseup", end);
        this.lastScrolledLeft = this.element.scrollLeft;
        this.lastScrolledTop = this.element.scrollTop;
      };
      this.addEvent(window, "mouseup", end, { passive: true });
      this.addEvent(window, "mousemove", move, { passive: true });
    });
    this.resizeObserver = new ResizeObserver(() => {
      this.renderWhenResized();
      this.optimizeDummySize();
    });
    this.resizeObserver.observe(this.element);
    this.addEvent(this.editMaskElement, "click", () => {
      this.endEdit(true);
    });
    this.addEvent(this.editElement, "mousedown", (e: MouseEvent) => {
      e.stopPropagation();
    });
    this.addEvent(this.editElement, "keydown", (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      if (e.key === "Enter") return;
      if (e.key === "Escape") return;
      e.stopPropagation();
    });
  }

  protected clearSelectedRows(render?: boolean): void {
    Object.keys(this.selectedRows).forEach((key) => {
      const item = this.selectedRows[key];
      item.rowSelected = false;
      item.cellSelected = {};
      delete this.selectedRows[key];
    });
    for (const row of this.rows) {
      row.cache._dv_selected = null;
      for (const cell of row.cells) {
        cell.cache._dv_selected = null;
      }
    }
    if (render) this.renderWhenScrolled();
  }

  protected rangeSelectRow(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number): void {
    if (item == null || this.lastSelectedBaseCell == null) return;
    item.cellSelected[column.name] = true;
    if (this.lastSelectedBaseCell.index === index) {
      this.selectedRows[item.id] = item;
    } else if (this.lastSelectedBaseCell.index > index) {
      for (let i = index; i <= this.lastSelectedBaseCell.index; i++) {
        const rItem = this.sortedItems[i];
        rItem.rowSelected = true;
        this.selectedRows[rItem.id] = rItem;
      }
    } else {
      for (let i = this.lastSelectedBaseCell.index; i <= index; i++) {
        const rItem = this.sortedItems[i];
        rItem.rowSelected = true;
        this.selectedRows[rItem.id] = rItem;
      }
    }
    let endColName = null;
    const rCols: Array<string> = [];
    this.columnForEach((c) => {
      if (endColName == null) {
        if (c.name === this.lastSelectedBaseCell.column.name) endColName = column.name;
        else if (c.name === column.name) endColName = this.lastSelectedBaseCell.column.name;
      }
      if (endColName != null) {
        rCols.push(c.name);
        if (endColName === c.name) return false;
      }
    });
    Object.keys(this.selectedRows).forEach((id) => {
      rCols.forEach((name) => this.selectedRows[id].cellSelected[name] = true);
    });
  };

  protected scrollToIndex(index: number, render?: boolean): void {
    const bst = this.bodyElement.scrollTop;
    if (index < this.firstIndex || (index - this.firstIndex) * this.rowHeight < bst) {
      const ls = this.element.scrollTop;
      this.element.scrollTop = index * this.rowHeight;
      if (ls !== this.element.scrollTop) return;
    }
    if (this.bodyElement.clientHeight + bst < (index - this.firstIndex + 1) * this.rowHeight) {
      const ls = this.element.scrollTop;
      this.element.scrollTop = (index + 1) * this.rowHeight - this.bodyElement.clientHeight;
      if (ls !== this.element.scrollTop) return;
    }
    if (render !== false) this.renderWhenScrolled();
  };

  protected scrollToColumn(column: $DataViewColumn<T>, render?: boolean, renderAbsolute?: boolean): boolean {
    if (column == null) return false;
    if (column.notScrollFocusWhenTabStop) {
      if (render !== false) this.renderWhenScrolled(renderAbsolute);
      return false;
    }
    let colLeft = 0, colRight = 0, fixedLeft = 0;
    const func = (col: $DataViewColumn<T>) => {
      if (col.parent == null) {
        colLeft = col.left;
        fixedLeft = col.fixedLeft;
      } else {
        func(col.parent);
        const cell = col.cells[0];
        if (cell == null) return;
        colLeft += cell.element.offsetLeft;
      }
    };
    func(column);
    colRight = colLeft + column.width;
    const cw = this.element.clientWidth;
    let sl = this.lastScrolledLeft;
    if (colLeft - fixedLeft < this.lastScrolledLeft) sl = colLeft - fixedLeft;
    if (colRight > this.lastScrolledLeft + cw) sl = colRight - cw;
    if (sl !== this.lastScrolledLeft) {
      this.headerElement.scrollLeft = sl;
      this.footerElement.scrollLeft = sl;
      this.element.scrollLeft = sl;
      if (this.element.scrollLeft == sl && render !== true) return true;
    }
    if (render !== false) this.renderWhenScrolled(renderAbsolute);
    return false;
  }

  protected arrowUpDown(updown: number, focusIndex: number, rangeSelect?: boolean): boolean {
    if (this.selectMode === "none") return false;
    const index = Math.max(0, Math.min((this.lastSelectedCell == null ? focusIndex : this.lastSelectedCell.index) + updown, this.sortedItems.length - 1));
    const item = this.sortedItems[index];
    if (item == null || this.lastSelectedCell?.index === index) return false;
    this.clearSelectedRows();
    const column = this.lastSelectedCell?.column ?? this.findColumn((col) => col.tabStop);
    if (this.selectMode === "row") {
      item.rowSelected = true;
    } else {
      if (this.columns.length === 0) return false;
      if (column == null) return false;
      item.cellSelected[column.name] = true;
    }
    this.selectedRows[item.id] = item;
    this.lastSelectedCell = { index, item, column };
    if (rangeSelect === true) this.rangeSelectRow(item, column, index);
    else this.lastSelectedBaseCell = { index, item, column };
    this.scrollToIndex(index);
    return true;
  }

  protected arrowUp(up?: number, rangeSelect?: boolean): boolean {
    return this.arrowUpDown(-1 * (up ? up : 1), Math.max(0, this.firstIndex), rangeSelect);
  }

  protected arrowDown(down?: number, rangeSelect?: boolean): boolean {
    return this.arrowUpDown(down ? down : 1, Math.min(this.sortedItems.length, this.firstIndex) - 1, rangeSelect);
  }

  protected arrowLeftRightOptimize(index: number, column: $DataViewColumn<T>, rangeSelect?: boolean): boolean {
    if (column == null) return false;
    const item = this.sortedItems[Math.max(0, Math.min(this.sortedItems.length - 1, index))];
    if (item == null) return false;
    this.clearSelectedRows();
    item.cellSelected[column.name] = true;
    this.selectedRows[item.id] = item;
    this.lastSelectedCell = { index, item, column };
    if (rangeSelect === true) this.rangeSelectRow(item, column, index);
    else this.lastSelectedBaseCell = { index, item, column };
    this.scrollToIndex(index, false);
    return this.scrollToColumn(column, true, true);
  }

  protected arrowLeft(ctrlKey?: boolean, rangeSelect?: boolean): boolean {
    if (this.selectMode !== "cell" || this.columns.length === 0) return false;
    let index = this.lastSelectedCell == null ? this.firstIndex : this.lastSelectedCell.index;
    let column = this.lastSelectedCell?.column;
    if (ctrlKey || column == null) {
      column = this.findFirstColumn();
    } else {
      const ret = this.findPrevColumn(column.name);
      column = ret.column;
      if (ret.nextRow) {
        const movedIndex = Math.max(0, index - 1);
        if (movedIndex === index) return false;
        index = movedIndex;
      }
    }
    return this.arrowLeftRightOptimize(index, column, rangeSelect);
  }

  protected arrowRight(ctrlKey?: boolean, rangeSelect?: boolean): boolean {
    if (this.selectMode !== "cell" || this.columns.length === 0) {
      return false;
    }
    let index = this.lastSelectedCell == null ? this.firstIndex : this.lastSelectedCell.index;
    let column = this.lastSelectedCell?.column;
    if (ctrlKey) {
      column = this.findLastColumn();
    } else {
      if (column == null) {
        column = this.findFirstColumn();
      } else {
        const ret = this.findNextColumn(column.name);
        column = ret.column;
        if (ret.nextRow) {
          const movedIndex = Math.min(index + 1, this.sortedItems.length - 1);
          if (movedIndex === index) return false;
          index = movedIndex;
        }
      }
    }
    return this.arrowLeftRightOptimize(index, column, rangeSelect);
  }

  public render(): this {
    this.renderWhenResized(true);
    this.renderHeaderCells();
    this.renderFooterCells();
    return this;
  }

  protected renderHeaderCells(): this {
    if (!this.headerVisible) return this;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (const column of columns) {
        if (column.renderHeaderCell) column.renderHeaderCell(column.headerCellLabelElement, this.sortedItems, this.originItems);
        if (column.rows) {
          for (const colrow of column.rows) {
            func(colrow.columns);
          }
        }
      }
    };
    func(this.columns);
    return this;
  }
  protected renderFooterCells(): this {
    if (!this.footerVisible) return this;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (const column of columns) {
        if (column.renderFooterCell) column.renderFooterCell(column.footerCellLabelElement, this.sortedItems, this.originItems);
        if (column.rows) {
          for (const colrow of column.rows) {
            func(colrow.columns);
          }
        }
      }
    };
    func(this.columns);
    return this;
  }

  protected renderRow(row: $DataViewRow<T>, allColumn = false): void {
    const item = row.item;
    if (item == null) {
      row.element.style.visibility = "hidden";
      return;
    }
    if (row.element.style.getPropertyValue("visibility")) row.element.style.removeProperty("visibility");
    if (!row.item.data[initializedDataName]) {
      let inited = true;
      const func = (columns: Array<$DataViewColumn<T>>) => {
        if (columns == null) return;
        columns.forEach(column => {
          const ret = column.initializeRowData?.(row.item.data);
          if (ret === false) inited = false;
          column.rows?.forEach(r => {
            func(r.columns);
          });
        });
      }
      func(this.columns);
      if (inited) row.item.data[initializedDataName] = true;
    }
    if (row.cache._dv_selected !== item.rowSelected) {
      if (row.cache._dv_selected = item.rowSelected) row.element.setAttribute("data-selected", "");
      else row.element.removeAttribute("data-selected");
    }
    if (this.oddEven) {
      const oddEven = row.index % 2 as 0 | 1;
      if (row.cache._dv_oddEven !== oddEven) {
        row.element.setAttribute("data-oddeven", (row.cache._dv_oddEven = oddEven) === 0 ? "odd" : "even");
      }
    }
    this.renderRowColumns(allColumn ? this.columns : this.renderColumns, row)
  }

  protected renderRowColumns(columns: Array<$DataViewColumn<T>>, row: $DataViewRow<T>): void {
    columns.forEach(column => {
      this.renderCell(column.cells[row.id]);
      column.rows?.forEach(colrow => {
        this.renderRowColumns(colrow.columns, row);
      });
    });
  }

  protected renderCell(cell: $DataViewCell<T>): void {
    if (cell.cache._dv_selected !== (cell.row.item.cellSelected[cell.column.name] || false)) {
      if (cell.cache._dv_selected = cell.row.item.cellSelected[cell.column.name] === true) cell.element.setAttribute("data-selected", "");
      else cell.element.removeAttribute("data-selected");
    }
    cell.column.renderCell(cell, cell.column.initializeParameters);
  }

  protected renderWhenScrolled(absolute?: boolean): void {
    const changedX = this.optimizeRenderColumns();
    const st = this.element.scrollTop;
    const index = Math.min(this.maxFirstIndex, Math.floor(st / this.rowHeight));
    if (this.lastScrolledTop !== st) {
      this.bodyElement.scrollTop = st - this.rowHeight * index;
      this.lastScrolledTop = st;
    }
    if (absolute !== true) {
      if (this.firstIndex === index && changedX && changedX === this.lastChangedX) return;
    }
    for (let i = 0, il = this.rows.length; i < il; i++) {
      const row = this.rows[i];
      row.item = this.sortedItems[row.index = index + i];
      this.renderRow(row, changedX);
    }
    this.firstIndex = index;
    this.lastChangedX = changedX;
  };

  protected renderWhenResized(absolute?: boolean): boolean {
    let abs = absolute;
    const maxRowLen = Math.min(Math.max(0, Math.ceil(this.bodyElement.clientHeight / this.rowHeight || 0)) + 1, Math.max(1, this.sortedItems.length));
    if (this.rows.length !== maxRowLen) {
      for (let i = 0; i < maxRowLen; i++) {
        let row = this.rows[i];
        if (row == null) {
          abs = true;
          row = {
            item: null,
            index: -1,
            id: i,
            cache: {
              _dv_selected: false,
              _dv_oddEven: null,
            },
            cells: [],
            element: cloneDomElement(this.cloneBase.rowElem),
          };
          row.element.style.visibility = "hidden";
          if (this.rowBorderless) row.element.setAttribute("data-bdl", "");
          if (this.hasFillColumn) row.element.style.minWidth = "100%";
          for (const col of this.columns) {
            this.generateCell(row, col, row.element);
          }
          this.bodyElement.appendChild(row.element);
          this.rows.push(row);
        }
      };
      this.disposeRows(maxRowLen);
    }
    this.lastScrolledLeft = -1;
    this.optimizeMaxFirstIndex();
    this.renderWhenScrolled(abs);
    return true;
  }

  protected generateCell(row: $DataViewRow<T>, col: $DataViewColumn<T>, rowElem: HTMLDivElement): $DataViewCell<T> {
    const cell: $DataViewCell<T> = {
      column: col,
      row: row,
      element: cloneDomElement(this.cloneBase.cellElem),
      contentElements: [],
      cache: {
        _dv_selected: false,
        _dv_initialized: false,
      },
    };
    if (col.rows) {
      cell.element.classList.add(`${cn}-cell-m_s`);
      for (const colrow of col.rows) {
        const colrowElem = cloneDomElement(this.cloneBase.rowElem);
        colrowElem.style.flex = String(colrow.bodyHeightFlexRate);
        colrowElem.style.width = "100%";
        colrowElem.style.minHeight = "0px";
        colrow.bodyClassName.forEach((cn) => colrowElem.classList.add(cn));
        for (const rowcol of colrow.columns) {
          const ccell = this.generateCell(row, rowcol, colrowElem);
          if (rowcol.fill) ccell.element.setAttribute("data-fill", "");
        }
        if (colrow.body) cell.element.appendChild(colrowElem);
      }
    }
    cell.element.setAttribute("data-name", col.name);
    if (col.bodyClassNames) cell.element.classList.add(...col.bodyClassNames);
    if (col.fill) cell.element.setAttribute("data-fill", "");
    cell.element.style.width = `${col.width}px`;
    if (col.fixed) {
      cell.element.setAttribute("data-fixed", "");
      cell.element.style.left = col.fixedLeft + "px";
    }
    cell.element.setAttribute("data-align", col.textAlign ?? "left");
    if (col.appearance === "anchor") cell.element.classList.add("bh-anchor");
    rowElem.appendChild(cell.element);
    col.cells.push(cell);
    row.cells.push(cell);
    cell.element.setAttribute("data-disabled", String(col.disabled === true));
    if (this.colBorderless || col.borderless) cell.element.setAttribute("data-bdl", "");
    col.cellInitialize(cell, col.initializeParameters, this);
    this.addEvent(cell.element, "click", (e: MouseEvent) => { this.cellClickedImpl(cell.row.item, cell.column, row.index, e.ctrlKey, e.shiftKey, e); });
    return cell;
  }

  protected optimizeMaxFirstIndex(): void {
    this.maxFirstIndex = Math.max(0, this.sortedItems.length - this.rows.length);
  }

  protected optimizeRenderColumns() {
    let sl = this.element.scrollLeft;
    if (this.lastScrolledLeft !== sl) {
      this.headerElement.scrollLeft = sl;
      this.footerElement.scrollLeft = sl;
      this.bodyElement.scrollLeft = sl;
      const cw = this.bodyElement.clientWidth;
      const sr = cw + sl + 10;
      this.lastScrolledLeft = sl;
      sl -= 10;
      this.renderColumns = [];
      this.columns.forEach((col) => {
        if (col.fixed) {
          if (col.render = col.left < sr) this.renderColumns.push(col);
        } else {
          if (col.render = sl < col.left + col.width && col.left < sr) this.renderColumns.push(col);
        }
      });
      return true;
    }
    return false;
  }

  protected optimizeRowNumberColumnWidth(): void {
    const width = Math.max(40, String(this.sortedItems.length).length * 10 + 12);
    if (width === this.rowNumberColumn.width) return;
    this.rowNumberColumn.width = this.rowNumberColumn.minWidth = width;
    this.rowNumberColumn.cells.forEach(cell => {
      cell.column.headerCellElement.style.width = cell.column.footerCellElement.style.width = cell.element.style.width = width + "px";
    });
    this.optimizeDummySize();
  }

  protected optimizeDummySize(): void {
    const elem = this.rows[0]?.element;
    if (elem == null) return;
    const rect = elem.getBoundingClientRect();
    this.dummyElement.style.width = (rect.width + this.dummyElement.offsetLeft) + "px";
    const cols: Array<{ left: number, column: $DataViewColumn<T> }> = [];
    this.columns.forEach(column => {
      if (column.fixed) {
        const e = column.cells[0].element;
        e.style.position = "relative";
        e.style.removeProperty("left");
      }
    });
    this.columns.forEach(column => {
      const cellElem = column.cells[0].element;
      cols.push({ left: Math.round(cellElem.getBoundingClientRect().left - rect.left + this.lastScrolledLeft), column });
    });
    let fixedLeft = 0;
    let minLeft = cols[0].left || 0;
    cols.sort((item1, item2) => item1.left - item2.left).forEach((item) => {
      item.column.left = item.left - minLeft;
      item.column.fixedLeft = fixedLeft;
      if (item.column.fixed) {
        item.column.cells[0].element.style.position = "sticky";
        item.column.headerCellElement.style.left = item.column.footerCellElement.style.left = fixedLeft + "px";
        for (const cell of item.column.cells) {
          cell.element.style.left = fixedLeft + "px";
        }
        fixedLeft += item.column.width;
      }
    });
  }

  protected disposeRows(maxRowLen?: number): void {
    const len = maxRowLen || 0;
    for (let i = this.rows.length - 1; i >= len; i--) {
      const row = this.rows[i];
      for (const cell of row.cells) {
        this.removeEvent(cell.element);
        if (cell.column.disposeCell) {
          cell.column.disposeCell(cell, this);
        }
        cell.column.cells.pop();
      }
      this.removeEvent(row.element);
      this.bodyElement.removeChild(row.element);
      this.rows.pop();
    }
  }

  protected findColumn(func: (column: $DataViewColumn<T>) => boolean): $DataViewColumn<T> {
    let ret: $DataViewColumn<T> = null;
    const search = (columns: Array<$DataViewColumn<T>>) => {
      for (const column of columns) {
        if (func(column)) ret = column;
        if (ret != null) return;
        if (column.rows) {
          for (const colrow of column.rows) {
            search(colrow.columns);
            if (ret != null) return;
          }
        }
      }
    }
    search(this.columns);
    return ret;
  }

  protected findFirstColumn(): $DataViewColumn<T> {
    let retColumn: $DataViewColumn<T> = null;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (let i = 0, il = columns.length; i < il; i++) {
        const col = columns[i];
        if (col.tabStop) {
          retColumn = col;
          return;
        }
        if (col.rows) {
          for (const colrow of col.rows) {
            func(colrow.columns);
          }
        }
        if (retColumn) return;
      }
    };
    func(this.columns);
    return retColumn;
  }

  protected findLastColumn(): $DataViewColumn<T> {
    let retColumn: $DataViewColumn<T> = null;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (let i = columns.length - 1; i >= 0; i--) {
        const col = columns[i];
        if (col.rows) {
          for (const colrow of col.rows) {
            func(colrow.columns);
          }
        }
        if (retColumn) return;
        if (col.tabStop) {
          retColumn = col;
          return;
        }
      }
    };
    func(this.columns);
    return retColumn;
  }

  protected findPrevColumn(columnName: string): { column: $DataViewColumn<T>; nextRow: boolean; } {
    let retColumn: $DataViewColumn<T> = null, nextRow = false;
    if (this.columns.length === 0) return { column: retColumn, nextRow };
    const colName = columnName ?? this.findLastColumn()?.name;
    let found = false;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (let i = columns.length - 1; i >= 0; i--) {
        const col = columns[i];
        if (col.rows) {
          for (let j = col.rows.length - 1; j >= 0; j--) {
            const colrow = col.rows[j];
            func(colrow.columns);
            if (retColumn) return;
          }
        }
        if (col.name === colName) {
          found = true;
          continue;
        }
        if (!found || !col.tabStop) continue;
        retColumn = col;
        return;
      }
    }
    func(this.columns);
    if (nextRow = !retColumn) func(this.columns);
    return { column: retColumn, nextRow };
  }

  protected findNextColumn(columnName: string): { column: $DataViewColumn<T>; nextRow: boolean; } {
    let retColumn: $DataViewColumn<T> = null, nextRow = false;
    if (this.columns.length === 0) return { column: retColumn, nextRow };
    const colName = columnName ?? this.findFirstColumn()?.name;
    let found = false;
    const func = (columns: Array<$DataViewColumn<T>>) => {
      if (columns == null) return;
      for (let i = 0, il = columns.length; i < il; i++) {
        const col = columns[i];
        if (col.name === colName) {
          found = true;
          if (col.rows) {
            for (const colrow of col.rows) {
              func(colrow.columns);
              if (retColumn) return;
            }
          }
          continue;
        }
        if (!found || !col.tabStop) {
          if (col.rows) {
            for (const colrow of col.rows) {
              func(colrow.columns);
              if (retColumn) return;
            }
          }
          continue;
        }
        retColumn = col;
        return;
      }
    }
    func(this.columns);
    if (nextRow = !retColumn) func(this.columns);
    return { column: retColumn, nextRow };
  }

  protected disposeColumn(column: $DataViewColumn<T>): void {
    this.removeEvent(column.headerCellElement);
    this.removeEvent(column.footerCellElement);
    this.removeEvent(column.resizeElement);
    if (column.disposeCell) {
      for (const cell of column.cells) {
        column.disposeCell(cell, this);
      }
    }
    column.dispose?.(this);
  }

  protected disposeColumns(): void {
    const impl = (columns: Array<$DataViewColumn<T>>) => {
      for (let i = columns.length - 1; i >= 0; i--) {
        const column = columns[i];
        if (column.rows) {
          for (const colrow of column.rows) {
            impl(colrow.columns);
          }
        }
        this.disposeColumn(column);
        columns.pop();
      }
    }
    impl(this.columns);
    this.headerRowElement.textContent = "";
    this.footerRowElement.textContent = "";
  }

  protected bindColumns(columns: Array<DataViewColumnProps<T>>): void {
    this.disposeColumns();
    this.disposeRows();
    if (columns == null) {
      this.buildColumns();
      return;
    }
    this.rowNumberColumn.built = false;
    let hasFill = false;
    for (const col of columns) {
      const fill = hasFill === false && col.fill === true;
      if (fill) hasFill = true;
      this.columns.push(this.bindColumn(col, fill));
    }
    this.buildColumns();
  }

  protected bindColumn(col: DataViewColumnProps<T>, fill: boolean): $DataViewColumn<T> {
    col?._dv?.(this);
    let width = col.width ?? 100;
    if (width < 0) width = this.rowHeight;
    const dataType = col.dataType || "string";
    let rows: Array<$DataViewMultiStageRowItem<T>> = null;
    if (col._rows) {
      rows = [];
      for (const row of col._rows) {
        const cols = [];
        let hasFill = false;
        for (let i = 0, il = row.columns.length; i < il; i++) {
          const rowcol = row.columns[i];
          let fill = hasFill === false && rowcol.fill === true;
          if (fill) hasFill = true;
          // else if (i === il - 1 && !hasFill) fill = true;
          const rowcolumn = this.bindColumn(rowcol, fill);
          if (fill) {
            rowcolumn.headerCellElement.style.flex = "1";
            rowcolumn.footerCellElement.style.flex = "1";
          }
          if (row.body === false) {
            if (rowcol.sort == null) rowcolumn.sort = null;
            rowcolumn.tabStop = false;
          }
          cols.push(rowcolumn);
        }
        rows.push({
          columns: cols,
          header: row.header !== false,
          headerHeightFlexRate: row.headerHeightFlexRate ?? 1,
          headerClassName: row.headerClassName == null ? [] : (typeof row.headerClassName === "string" ? [row.headerClassName] : row.headerClassName),
          footer: row.footer !== false,
          footerHeightFlexRate: row.footerHeightFlexRate ?? 1,
          footerClassName: row.footerClassName == null ? [] : (typeof row.footerClassName === "string" ? [row.footerClassName] : row.footerClassName),
          body: row.body !== false,
          bodyHeightFlexRate: row.bodyHeightFlexRate ?? 1,
          bodyClassName: row.bodyClassName == null ? [] : (typeof row.bodyClassName === "string" ? [row.bodyClassName] : row.bodyClassName),
        });
      }
    }
    const column: $DataViewColumn<T> = {
      prop: col,
      name: col.name,
      vName: col.vName ?? col.name,
      label: col.label || col.name,
      dataType,
      width,
      minWidth: width,
      cells: [],
      headerCellElement: cloneDomElement(this.cloneBase.cellElem),
      footerCellElement: cloneDomElement(this.cloneBase.cellElem),
      initializeParameters: col.initialize == null ? null : col.initialize(col, this),
      dispose: col.dispose,
      cellInitialize: col._rows == null ? (col.cellInitialize == null ? (cell) => {
        const labelElem = cloneDomElement(this.cloneBase.labelCellElem);
        cell.contentElements.push(labelElem);
        cell.element.appendChild(labelElem);
      } : col.cellInitialize) : (col.cellInitialize == null ? () => { } : col.cellInitialize),
      disposeCell: col.cellDispose,
      renderCell: col.cellRender == null ? ({ contentElements, row, cache }) => {
        if (cache.val !== row.item.data[column.name]) {
          contentElements[0].textContent = cache.val = row.item.data[column.name];
        }
      } : col.cellRender,
      textAlign: col.cellTextAlign || (dataType === "number" ? "right" : "left"),
      appearance: col.appearance || "label",
      sort: typeof col.sort === "function" ? col.sort : (col.sort === false || col._rows != null ? null : (order) => {
        if (order === "") { return () => 0; }
        const num = order === "asc" ? 1 : -1;
        return (itemData1, itemData2) => {
          if (column.dataType === "number") {
            const val1 = itemData1.data[column.vName];
            const val2 = itemData2.data[column.vName];
            if (val1 == null) return -num;
            if (val2 == null) return num;
            return Number(val1) > Number(val2) ? num : -num;
          }
          return itemData1.data[column.name] > itemData2.data[column.name] ? num : -num;
        };
      }),
      sortOrder: "",
      resize: col.resize !== false && !fill && col._rows == null,
      fill,
      fixed: col.fixed === true,
      fixedLeft: 0,
      left: 0,
      tabStop: col.tabStop !== false && col._rows == null,
      notScrollFocusWhenTabStop: col.notScrollFocusWhenTabStop === true,
      disabled: col.disabled === true,
      borderless: col.borderless === true,
      render: true,
      clickHeaderCell: col.clickHeaderCell,
      clickFooterCell: col.clickFooterCell,
      clickCell: col.clickCell,
      clickRow: col.clickRow,
      preventClearSelected: col._preventClearSelected === true,
      bindedItems: col.bindedItems,
      initializeRowData: col.initializeRowData,
      rows,
      beginEdit: col._beginEdit,
      endEdit: col._endEdit,
      editedRowData: col.editedRowData,
      built: false,
      bodyClassNames: convertClassNames(col.bodyClassNames),
      headerClassNames: convertClassNames(col.headerClassNames),
      footerClassNames: convertClassNames(col.footerClassNames),
    };
    column.rows?.forEach(colrow => {
      colrow.columns?.forEach(rowcol => {
        rowcol.parent = column;
      });
    });
    return column;
  }

  protected buildColumns(): void {
    if (this.rowNumber) {
      if (this.findColumn((col) => col.name === this.rowNumberColumn.name) == null) {
        this.columns.unshift(this.rowNumberColumn);
        this.rowNumberColumn.headerCellElement?.style.removeProperty("display");
        this.rowNumberColumn.footerCellElement?.style.removeProperty("display")
        this.rowNumberColumn.cells.forEach(cell => cell.element?.style.removeProperty("display"));
        this.optimizeRowNumberColumnWidth();
      }
    } else {
      for (let i = 0, il = this.columns.length; i < il; i++) {
        if (this.columns[i].name !== this.rowNumberColumn.name) continue;
        const col = this.columns[i];
        col.headerCellElement.style.display = "none";
        col.footerCellElement.style.display = "none";
        col.cells.forEach(cell => cell.element.style.display = "none");
        this.columns.splice(i, 1);
        break;
      }
    }
    let hasFill = false;
    for (const column of this.columns) {
      hasFill = hasFill || column.fill;
      this.buildColumn(column, { header: this.headerRowElement, footer: this.footerRowElement });
    }
    this.hasFillColumn = hasFill;
    if (this.hasFillColumn) {
      this.headerRowElement.style.minWidth = this.footerRowElement.style.minWidth = "100%";
      this.rows.forEach(row => {
        row.element.style.minWidth = "100%";
      });
    } else {
      this.headerRowElement.style.removeProperty("min-width");
      this.footerRowElement.style.removeProperty("min-width");
      this.rows.forEach(row => {
        row.element.style.removeProperty("min-width");
      });
    }
    if (this.rowBorderless) {
      if (!this.headerRowElement.hasAttribute("data-bdl")) {
        this.headerRowElement.setAttribute("data-bdl", "");
        this.footerRowElement.setAttribute("data-bdl", "");
      }
    } else {
      if (this.headerRowElement.hasAttribute("data-bdl")) {
        this.headerRowElement.removeAttribute("data-bdl");
        this.footerRowElement.removeAttribute("data-bdl");
      }
    }
    this.renderColumns = [];
    this.renderWhenResized();
    this.lastScrolledLeft = -1;
    this.optimizeRenderColumns();
    this.optimizeDummySize();
  }

  protected buildColumn(column: $DataViewColumn<T>, element: { header: HTMLDivElement; footer: HTMLDivElement }): void {
    if (column.built) return;
    if (column.rows) {
      column.headerCellElement.classList.add(`${cn}-cell-m_s`);
      column.footerCellElement.classList.add(`${cn}-cell-m_s`);
      for (const row of column.rows) {
        let width = 0;
        const hrowElem = cloneDomElement(this.cloneBase.rowElem);
        hrowElem.style.flex = String(row.headerHeightFlexRate);
        row.headerClassName.forEach((cn) => hrowElem.classList.add(cn));
        const frowElem = cloneDomElement(this.cloneBase.rowElem);
        frowElem.style.flex = String(row.footerHeightFlexRate)
        row.footerClassName.forEach((cn) => frowElem.classList.add(cn));
        for (const col of row.columns) {
          this.buildColumn(col, { header: hrowElem, footer: frowElem });
          width += col.width;
        }
        if (row.header) column.headerCellElement.appendChild(hrowElem);
        if (row.footer) column.footerCellElement.appendChild(frowElem);
        column.width = Math.max(0, width, column.width);
      }
    } else {
      column.headerCellLabelElement = cloneDomElement(this.cloneBase.div);
      column.headerCellLabelElement.classList.add(`${cn}-lbl`);
      column.headerCellElement.appendChild(column.headerCellLabelElement);
      if (column.prop?.headerCellLabel) {
        if (typeof column.prop.headerCellLabel === "string") column.headerCellLabelElement.textContent = column.prop.headerCellLabel;
        else column.renderHeaderCell = column.prop.headerCellLabel;
      }
      column.headerCellElement.setAttribute("data-align", column.prop?.headerCellTextAlign ?? "center");
      column.footerCellLabelElement = cloneDomElement(this.cloneBase.div);
      column.footerCellLabelElement.classList.add(`${cn}-lbl`);
      column.footerCellElement.appendChild(column.footerCellLabelElement);
      if (column.prop?.footerCellLabel) {
        if (typeof column.prop.footerCellLabel === "string") column.footerCellLabelElement.textContent = column.prop.footerCellLabel;
        else column.renderFooterCell = column.prop.footerCellLabel;
      }
      column.footerCellElement.setAttribute("data-align", column.prop?.footerCellTextAlign ?? "center");
    }
    column.headerCellElement.setAttribute("data-name", column.name);
    column.headerCellElement.style.width = column.width + "px";
    if (column.headerClassNames) column.headerCellElement.classList.add(...column.headerClassNames);
    column.footerCellElement.setAttribute("data-name", column.name);
    column.footerCellElement.style.width = column.width + "px";
    if (column.footerClassNames) column.footerCellElement.classList.add(...column.footerClassNames);
    if (column.fill) {
      column.headerCellElement.setAttribute("data-fill", "");
      column.footerCellElement.setAttribute("data-fill", "");
    }
    if (column.fixed) {
      column.headerCellElement.setAttribute("data-fixed", "");
      column.footerCellElement.setAttribute("data-fixed", "");
    }
    if (this.colBorderless || column.borderless) {
      column.headerCellElement.setAttribute("data-bdl", "");
      column.footerCellElement.setAttribute("data-bdl", "");
    }
    element.header.appendChild(column.headerCellElement);
    element.footer.appendChild(column.footerCellElement);
    column.prop?.headerCellInitialize?.(column, column.initializeParameters);
    column.prop?.footerCellInitialize?.(column, column.initializeParameters);
    if (column.sort != null) {
      column.sortElement = cloneDomElement(this.cloneBase.div);
      column.sortElement.classList.add(`${cn}-sort-icon`);
      column.headerCellElement.appendChild(column.sortElement);
      this.addEvent(column.sortElement, "click", (e) => {
        e.stopPropagation();
        const curSortOrder = column.sortOrder;
        const removeOrder = (columns: Array<$DataViewColumn<T>>) => {
          for (const col of columns) {
            col.sortOrder = "";
            col.sortElement?.removeAttribute("data-order");
            if (col.rows) {
              for (const colrow of col.rows) {
                removeOrder(colrow.columns);
              }
            }
          }
        };
        removeOrder(this.columns);
        switch (curSortOrder) {
          case "asc":
            column.sortOrder = "desc";
            column.sortElement.setAttribute("data-order", column.sortOrder);
            break;
          case "desc":
            column.sortOrder = "";
            break;
          default:
            column.sortOrder = "asc";
            column.sortElement.setAttribute("data-order", column.sortOrder);
            break;
        }
        this.sortItems();
        this.renderWhenScrolled();
        if (this.sorted) this.sorted(column.name, column.sortOrder, column.prop);
      });
    }
    if (column.resize !== false) {
      column.resizeElement = cloneDomElement(this.cloneBase.div);
      column.resizeElement.classList.add(`${cn}-resizer`);
      column.headerCellElement.appendChild(column.resizeElement);
      this.addEvent(column.resizeElement, "click", (e) => {
        e.stopPropagation();
      });
      const endImpl = () => {
        for (const cell of column.cells) {
          cell.element.style.width = column.width + "px";
        }
        column.footerCellElement.style.width = column.width + "px";
        const forParent = (col: $DataViewColumn<T>) => {
          if (col == null) return;
          let width = 0;
          for (const row of col.rows) {
            let w = -1;
            let hasFill = false;
            row.columns.forEach(c => {
              w += c.width;
              if (c.fill) hasFill = true;
            });
            if (!hasFill) {
              width = Math.max(width, w);
            }
          }
          if (width > 0) {
            col.width = width;
            col.headerCellElement.style.width = col.footerCellElement.style.width = col.width + "px";
            col.cells.forEach(c => c.element.style.width = col.width + "px");
            forParent(col.parent);
          }
        }
        forParent(column.parent);
        this.optimizeDummySize();
      };
      this.addEvent(column.resizeElement, "mousedown", (e: MouseEvent) => {
        this.endEdit(true);
        e.stopPropagation();
        const lastPos = (e.currentTarget as HTMLDivElement).offsetLeft, pos = e.clientX;
        const move = (e: MouseEvent) => {
          column.width = e.clientX - pos + lastPos;
          column.headerCellElement.style.width = column.width + "px";
        };
        setCursor("col-resize");
        const end = () => {
          this.removeEvent(window, "mousemove", move);
          this.removeEvent(window, "mouseup", end);
          endImpl();
          releaseCursor();
        };
        this.addEvent(window, "mouseup", end);
        this.addEvent(window, "mousemove", move);
      });
      this.addEvent(column.resizeElement, "touchstart", (e: TouchEvent) => {
        this.endEdit(true);
        e.stopPropagation();
        const lastPos = (e.currentTarget as HTMLDivElement).offsetLeft, pos = e.touches[0].clientX;
        const move = (e: TouchEvent) => {
          column.width = e.touches[0].clientX - pos + lastPos;
          column.headerCellElement.style.width = column.width + "px";
        };
        const end = () => {
          this.removeEvent(window, "touchmove", move);
          this.removeEvent(window, "touchend", end);
          endImpl();
        };
        this.addEvent(window, "touchend", end);
        this.addEvent(window, "touchmove", move);
      });
    }
    const renderCells = () => {
      for (const cell of column.cells) {
        if (cell.row.item == null) continue;
        this.renderCell(cell);
      }
      this.renderHeaderCells();
      this.renderFooterCells();
    }
    if (column.clickHeaderCell) {
      this.addEvent(column.headerCellElement, "click", () => {
        column.clickHeaderCell(column.name, this.sortedItems, renderCells);
      });
    }
    if (column.clickFooterCell) {
      this.addEvent(column.footerCellElement, "click", () => {
        column.clickFooterCell(column.name, this.sortedItems, renderCells);
      });
    }
    column.built = true;
  }

  public setColumns(columns: Array<DataViewColumnProps<T>>): this {
    this.bindColumns(columns);
    return this;
  }

  protected columnForEach(func: (column: $DataViewColumn<T>) => void | boolean): void {
    const impl = (columns: Array<$DataViewColumn<T>>) => {
      let ret = true;
      for (const column of columns) {
        ret = func(column) !== false && ret;
        if (!ret) break;
        if (column.rows) {
          for (const colrow of column.rows) {
            ret = impl(colrow.columns) !== false && ret;
            if (!ret) break;
          }
        }
        if (!ret) break;
      }
      return ret;
    }
    impl(this.columns);
  }

  protected bindItems(items: Array<T>): void {
    this.originItems = [];
    this.bindingItems = [];
    this.filteredItems = [];
    this.selectedRows = {};
    this.lastSelectedCell = null;
    this.lastSelectedBaseCell = null;
    if (items == null) return;
    this.originItems = items;
    for (let i = 0, il = this.originItems.length; i < il; i++) {
      this.bindingItems.push({
        data: this.originItems[i],
        id: i,
        rowSelected: false,
        cellSelected: {},
      });
    }
    this.executeColumnBindedItems();
    this.colCallBindedRev = ++this.itemsCallBindedRev;
    this.filterItems();
  }

  public executeColumnBindedItems(): void {
    const callColumns = (columns: Array<$DataViewColumn<T>>) => {
      columns.forEach(col => {
        col.rows?.forEach(colrow => {
          callColumns(colrow.columns);
        });
        col.bindedItems?.(this.originItems);
      });
    }
    callColumns(this.columns);
  }

  protected filterItems(): void {
    this.clearSelectedRows();
    if (this.filter == null) this.filteredItems = this.bindingItems.concat();
    else this.filteredItems = this.bindingItems.filter((item) => this.filter(item.data));
    if (this.filtered) this.filtered(this.filteredItems);
    this.sortItems();
  }

  protected sortItems(): void {
    this.sortedItems = this.filteredItems.concat();
    if (!this.externalSort) {
      if (this.sort != null) this.sortedItems.sort(this.sort);
      const sortCol = this.findColumn((col) => col.sortOrder !== "");
      if (sortCol != null) this.sortedItems.sort(sortCol.sort(sortCol.sortOrder));
    }
    this.dummyElement.style.height = (this.sortedItems.length * this.rowHeight + (this.headerVisible ? this.headerHeight : 0) + (this.footerVisible ? this.footerHeight : 0) + this.dummyElement.offsetTop) + "px";
    this.optimizeRowNumberColumnWidth();
    this.lastScrolledLeft = -1;
    this.optimizeRenderColumns();
    this.scrollingMode = "stop";
  }

  public setItems(items: Array<T>): this {
    if (items.length > 100000) {
      items.splice(100000);
      console.log("warning: too much item to set at DataView. splice over 100000");
    }
    this.bindItems(items);
    this.firstIndex = -1;
    this.bodyElement.scrollTop = 0;
    this.maxFirstIndex = Math.max(0, this.sortedItems.length - this.rows.length);
    this.optimizeDummySize();
    this.lastScrolledLeft = -1;
    this.render();
    return this;
  }

  protected cellClickedImpl(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number, ctrlKey: boolean, shiftKey: boolean, e?: MouseEvent): void {
    if (column?.rows != null) return;
    if (this.selectMode === "cell" && !column.tabStop) return;
    const lst = this.element.scrollTop;
    if (this.selectMode === "cell") this.scrollToColumn(column);
    this.scrollToIndex(index);
    const impl = () => {
      let selected = true, edit = false;
      if (ctrlKey && this.multiSelect) {
        if (this.selectMode === "row") {
          item.cellSelected = {};
          if (item.rowSelected === true) {
            selected = item.rowSelected = false;
            delete this.selectedRows[item.id];
          } else {
            selected = item.rowSelected = item.cellSelected[column.name] = true;
            this.selectedRows[item.id] = item;
          }
        } else {
          if (item.cellSelected[column.name] === true) {
            delete item.cellSelected[column.name];
            if (Object.keys(item.cellSelected).length === 0) {
              delete this.selectedRows[item.id];
              item.rowSelected = false;
            }
            selected = false;
          } else {
            selected = item.rowSelected = item.cellSelected[column.name] = true;
            this.selectedRows[item.id] = item;
          }
        }
      } else if (shiftKey && this.multiSelect && this.lastSelectedBaseCell != null) {
        this.clearSelectedRows();
        selected = item.cellSelected[column.name] = true;
        this.rangeSelectRow(item, column, index);
      } else {
        if (item.cellSelected[column.name] === true) edit = true;
        if (this.multiSelect) {
          if (column.preventClearSelected) {
            if (this.selectedRows[item.id] == null) {
              this.clearSelectedRows();
            }
          } else {
            this.clearSelectedRows();
          }
        } else {
          this.clearSelectedRows();
        }
        selected = item.rowSelected = item.cellSelected[column.name] = true;
        this.selectedRows[item.id] = item;
      }
      this.lastSelectedCell = { index, item, column };
      if (!shiftKey || this.lastSelectedBaseCell == null) this.lastSelectedBaseCell = { index, item, column };
      const params: DataViewItemParams<T> = {
        data: item.data,
        id: item.id,
        rowNumber: index + 1,
        columnName: column?.name,
        columnLabel: column?.label,
        columnWidth: column?.width,
        originItems: () => this.originItems,
        selectMode: this.selectMode,
        selected,
        getSelectedRows: () => this.getSelectedRows(),
        getSelectedCells: () => this.getSelectedCells(),
      };
      let rebind = false, rhc = false, rhcs = false, rfc = false, rfcs = false, rc = false, rcs = false, rr = false, r = false;
      const setRet = (ret?: any) => {
        if (ret == null) return;
        const retF = ret as DataViewReturnOrder;
        rebind = rebind || retF.rebind === true;
        rhc = rhc || retF.renderHeaderCell === true;
        rhcs = rhcs || retF.renderHeaderCells === true;
        rfc = rfc || retF.renderFooterCell === true;
        rfcs = rfcs || retF.renderFooterCells === true;
        rc = rc || retF.renderCell === true;
        rcs = rcs || retF.renderCells === true;
        rr = rr || retF.renderRow === true;
        r = r || retF.render === true;
      }
      if (this.clickCell) setRet(this.clickCell(params, e));
      if (column?.clickCell) setRet(column.clickCell(params, e));
      for (const col of this.columns) {
        if (col.clickRow) setRet(col.clickRow(params, e));
      }
      if (rebind) {
        this.bindItems(this.originItems);
      } else if (r) {
        this.render();
      } else {
        if (rhcs) this.renderHeaderCells();
        else if (rhc && column.renderHeaderCell) column.renderHeaderCell(column.headerCellLabelElement, this.sortedItems, this.originItems);
        if (rfcs) this.renderFooterCells();
        else if (rfc && column.renderFooterCell) column.renderFooterCell(column.footerCellLabelElement, this.sortedItems, this.originItems);
        if (rr) this.renderRow(this.rows[index - this.firstIndex]);
        if (rcs) {
          for (const c of column.cells) {
            this.renderCell(c);
          }
        }
        if (!rr && !rcs && rc) this.renderCell(column.cells[index - this.firstIndex]);
      }
      this.renderWhenScrolled();
      if (edit && !column.disabled) {
        if (this.selectMode !== "cell") this.scrollToColumn(column);
        this.beginEdit(item, column, index);
      }
    };
    if (lst === this.element.scrollTop) {
      impl();
    } else {
      const listener = () => {
        if (this.element.scrollTop === this.lastScrolledTop) {
          impl();
          return;
        }
        setTimeout(() => listener(), 10);
      };
      listener();
    }
  }

  protected beginEditLastSelectedCell(lastScrollTop?: number): void {
    if (this.lastSelectedCell.column == null) return;
    let lst = lastScrollTop;
    if (lst == null) {
      lst = this.element.scrollTop;
      this.scrollToColumn(this.lastSelectedCell.column);
      this.scrollToIndex(this.lastSelectedCell.index);
    }
    if (lst === this.element.scrollTop) {
      this.beginEdit(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index);
    } else {
      const listener = () => {
        if (this.element.scrollTop === this.lastScrolledTop) {
          this.beginEdit(this.lastSelectedCell.item, this.lastSelectedCell.column, this.lastSelectedCell.index);
          return;
        }
        setTimeout(() => listener(), 10);
      };
      listener();
    }
  }

  protected beginEdit(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number): void {
    if (!column.beginEdit || column.disabled === true) {
      this.endEdit(false);
      return;
    }
    const row = this.rows[index - this.firstIndex];
    if (row == null) return;
    const cell = row.cells.find((cell) => cell.column.name === column.name);
    if (cell == null) return;
    const rect = cell.element.getBoundingClientRect();
    this.editElement.style.removeProperty("display");
    this.editElement.style.top = `${rect.top}px`;
    this.editElement.style.left = `${rect.left}px`;
    this.editElement.style.height = `${rect.height - (cell.element.offsetHeight - cell.element.clientHeight)}px`;
    this.editElement.style.width = `${rect.width - (cell.element.offsetWidth - cell.element.clientWidth)}px`;
    this.editElement.style.visibility = "visible";
    this.editTarget = { item, column, index };
    let end = false;
    const argEndEdit = (commit?: boolean) => {
      end = true;
      setTimeout(() => {
        this.endEdit(commit);
      }, 0);
    };
    const ret = column.beginEdit({
      target: { data: item.data, columnName: column.name, index, id: item.id },
      editElement: this.editElement,
      endEdit: argEndEdit,
      cell,
      styleCtx: this.layoutCtx,
    });
    if (ret != null && !end) {
      this.editTarget.useReact = true;
      if (this.editRoot == null) this.editRoot = createRoot(this.editElement);
      this.editRoot.render(
        <LayoutContext.Provider value={this.layoutCtx}><>
          {ret.node}
          {ret.effect == null ? <></> : <EditEffect effect={ret.effect} />}
        </></LayoutContext.Provider>
      );
    }
    this.endEditEventListener = () => { 
      setTimeout(() => {
        this.endEdit(true);
      }, 0);
    };
    this.addEvent(this.element, "mousedown", this.endEditEventListener);
    if (end) this.endEdit(false);
    else this.editElement.focus();
  }

  protected endEdit(commit: boolean, options?: { unmountTimeout?: boolean; callback?: (edit: boolean) => void; }): void {
    if (this.endEditEventListener) {
      this.removeEvent(this.element, "mousedown", this.endEditEventListener);
      this.endEditEventListener = null;
    }
    if (this.editTarget == null) {
      options?.callback?.(false);
      return;
    }
    if (this.editTarget.column?.endEdit) {
      const ret = this.editTarget.column.endEdit({ data: this.editTarget.item.data, columnName: this.editTarget.column.name, index: this.editTarget.index, id: this.editTarget.item.id }, commit, this.editElement) as DataViewReturnOrder;
      if (commit !== false) {
        if (ret == null) {
          this.renderCell(this.editTarget.column.cells[this.editTarget.index - this.firstIndex]);
        }
        for (const col of this.columns) {
          if (col === this.editTarget.column) continue;
          if (col.editedRowData) {
            if (typeof col.editedRowData === "function") col.editedRowData(this.editTarget.item.data);
            else col.initializeRowData(this.editTarget.item.data);
            this.renderCell(col.cells[this.editTarget.index - this.firstIndex]);
          }
        }
        this.renderHeaderCells();
        this.renderFooterCells();
      }
    }
    let callCallback = true;
    if (this.editTarget.useReact) {
      const unmountImpl = () => {
        this.editRoot?.unmount();
        this.editRoot = null;
      }
      if (options?.unmountTimeout) {
        callCallback = false;
        setTimeout(() => {
          unmountImpl();
          options?.callback?.(true);
        }, 0);
      } else {
        unmountImpl();
      }
    }
    this.editMaskElement.style.display = "none";
    this.editElement.style.display = "none";
    this.editTarget = null;
    this.element.focus();
    if (callCallback) options?.callback?.(true);
  }

  public getValue(): Array<T> {
    return this.originItems;
  }

  public getFilteredValue(): Array<$DataViewItem<T>> {
    return [...this.filteredItems];
  }

  public getSortedValue(): Array<$DataViewItem<T>> {
    return [...this.sortedItems];
  }

  public getLength(): number {
    return this.originItems.length;
  }

  public getFilteredLength(): number {
    return this.filteredItems.length;
  }

  public select(rowIndex: number, columnName?: string): boolean {
    if (this.selectMode === "none" || rowIndex == null) return;
    const item = this.sortedItems[rowIndex];
    if (item == null) return false;
    this.clearSelectedRows();
    let column: $DataViewColumn<T> = null;
    if (this.selectMode === "row") {
      item.rowSelected = true;
      this.selectedRows[item.id] = item;
      column = this.findColumn(col => col.name === columnName) ?? this.findColumn(col => col.tabStop);
    } else {
      column = this.findColumn(col => col.name === columnName) ?? this.findColumn(col => col.tabStop);
      item.cellSelected[column.name] = true;
      this.selectedRows[item.id] = item;
    }
    this.lastSelectedCell = { index: rowIndex, item, column };
    this.lastSelectedBaseCell = { index: rowIndex, item, column };
    this.scrollToIndex(rowIndex, false);
    if (column) this.scrollToColumn(column, false);
    this.renderWhenScrolled();
    return true;
  }

  public clearSelect(): void {
    this.clearSelectedRows(true);
  }

  public getSelectedRows(): Array<{ id: number; data: T; }> {
    const rets = [];
    Object.keys(this.selectedRows).forEach((id) => {
      const item = this.selectedRows[id];
      rets.push({
        id: item.id,
        data: item.data,
      });
    });
    return rets;
  }

  public getSelectedCells(): Array<{ id: number; data: T; columnName: string; }> {
    const rets = [];
    Object.keys(this.selectedRows).forEach((id) => {
      const item = this.selectedRows[id];
      Object.keys(item.cellSelected).forEach((columnName) => {
        rets.push({
          id: item.id,
          data: item.data,
          columnName,
        });
      });
    });
    return rets;
  }

  public focus(): this {
    this.element.focus();
    return this;
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getBodyElement(): HTMLDivElement {
    return this.bodyElement;
  }

  public getRowHeight(): number {
    return this.rowHeight;
  }

  public getDisplayedFirstRowIndex(): number {
    return this.firstIndex;
  }

  public getBodyScrollTop(): number {
    return this.bodyElement.scrollTop;
  }

  public clearSpaceRow(): this {
    for (const row of this.rows) {
      row.element.style.removeProperty("margin-top");
      row.element.style.removeProperty("margin-bottom");
      row.element.style.removeProperty("display");
      row.element.style.removeProperty("opacity");
    }
    return this;
  }

  public startScrollContinue(order: "up" | "down", interval?: number, startCallback?: (interval: number) => void, endCallback?: (code: "stop" | "over" | "already") => void): void {
    if (this.scrollingMode === order) {
      if (endCallback) endCallback("already");
      return;
    }
    this.stopScrollContinue();
    setTimeout(() => {
      this.scrollingMode = order;
      this.scrollingInterval = interval ?? 100;
      this.scrollingId++;
      this.scrollContinue(endCallback);
      if (startCallback) startCallback(this.scrollingInterval);
    }, this.scrollingInterval + 1);
  }

  public stopScrollContinue(): void {
    this.scrollingMode = "stop";
  }

  protected scrollContinue(endCallback?: (code: "stop" | "over") => void): void {
    const triger = this.scrollingId;
    setTimeout(() => {
      if (triger !== this.scrollingId || this.scrollingMode === "stop") {
        if (endCallback) endCallback("stop");
        return;
      }
      const st = this.element.scrollTop;
      if (this.scrollingMode === "up") this.element.scrollTop = this.element.scrollTop - this.rowHeight;
      else this.element.scrollTop = this.element.scrollTop + this.rowHeight;
      if (st === this.element.scrollTop) {
        if (endCallback) endCallback("over");
        return;
      }
      this.scrollContinue(endCallback);
    }, this.scrollingInterval);
  }

  public dragMovingRow(dragingRowIndex: number, top: number): this {
    if (top < this.bodyElement.scrollTop) this.startScrollContinue("up");
    else if (top > this.bodyElement.clientHeight - this.rowHeight + this.bodyElement.scrollTop) this.startScrollContinue("down");
    else this.stopScrollContinue();
    let rindex = Math.round(top / this.rowHeight);
    const isUpper = rindex < 0 ? true : top - rindex * this.rowHeight < 0;
    rindex += this.firstIndex;
    const dragingRow = this.rows[dragingRowIndex - this.firstIndex];
    this.clearSpaceRow();
    if (dragingRow) {
      if (rindex === dragingRowIndex) {
        dragingRow.element.style.opacity = "0.5";
        return;
      }
      dragingRow.element.style.display = "none"
    }
    let rid = rindex - this.firstIndex;
    if (rid <= 0) {
      const row = this.rows[0];
      row.element.style.marginTop = this.rowHeight + "px";
      return;
    }
    if (rid >= this.rows.length - 1) {
      const row = this.rows[this.rows.length - 1];
      row.element.style.marginBottom = this.rowHeight + "px";
      return;
    }
    if (dragingRow && rindex > dragingRowIndex) rid += 1;
    if (!isUpper) rid -= 1;
    const row = this.rows[rid];
    if (row == null) return this;
    if (isUpper) {
      row.element.style.removeProperty("margin-bottom");
      row.element.style.marginTop = this.rowHeight + "px";
    } else {
      row.element.style.removeProperty("margin-top");
      row.element.style.marginBottom = this.rowHeight + "px";
    }
    return this;
  }

  public dropMoveRow(dragingRowIndex: number, top: number): this {
    this.clearSpaceRow();
    this.stopScrollContinue();
    let ridx = Math.round(top / this.rowHeight) + this.firstIndex;
    let sup = false;
    if (sup = dragingRowIndex < this.firstIndex) ridx -= 1;
    let srcIdx = Math.min(Math.max(0, dragingRowIndex), this.sortedItems.length - 1), dstIdx = Math.min(Math.max(0, ridx), this.sortedItems.length - 1);
    if (srcIdx === dstIdx) return this;
    const isLower = (top % this.rowHeight) < (this.rowHeight / 2), moveToBottom = srcIdx < dstIdx;
    if (moveToBottom) {
      if (isLower) dstIdx += 1;
    } else {
      if (!isLower) dstIdx -= 1;
    }
    const srcItem = this.sortedItems[srcIdx].data;
    const dstItem = this.sortedItems[dstIdx]?.data;
    const oSrcIdx = Math.min(Math.max(0, this.originItems.findIndex(item => item === srcItem)), this.originItems.length - 1);
    let oDstIdx = dstItem ? this.originItems.findIndex(item => item === dstItem) : this.sortedItems.length;
    if (moveToBottom) {
      if (isLower) oDstIdx -= 1;
    } else {
      if (!isLower) oDstIdx += 1;
    }
    oDstIdx = Math.min(Math.max(0, oDstIdx), this.originItems.length - 1);
    this.originItems.splice(oSrcIdx, 1);
    this.originItems.splice(oDstIdx, 0, srcItem);
    if (dstIdx === this.sortedItems.length - 1) this.element.scrollTop = this.element.scrollTop + this.rowHeight;
    else if (sup) this.element.scrollTop = this.element.scrollTop - this.rowHeight;
    this.bindItems(this.originItems);
    this.renderWhenScrolled();
    return this;
  }

  public renderByOriginData(originData: T, callEditedRowData?: boolean): this {
    if (callEditedRowData === true) {
      if (originData == null) return this;
      const search = (columns: Array<$DataViewColumn<T>>) => {
        for (const column of columns) {
          if (column.editedRowData) {
            if (typeof column.editedRowData === "function") column.editedRowData(originData);
            else column.initializeRowData(originData);
          }
          if (column.rows) {
            for (const colrow of column.rows) {
              search(colrow.columns)
            }
          }
        }
      }
      search(this.columns);
    }
    const row = this.rows.find((r) => r.item.data === originData);
    if (row != null) this.renderRow(row);
    return this;
  }

  public setStyleContext(ctx: LayoutContextProps): this {
    this.layoutCtx = ctx;
    return this;
  }

};

export const DataViewStyle = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn}-wrap {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}
.${cn}-wrap[data-padding="true"] {
  padding: ${CssVar.pdy} ${CssVar.pdx};
}
${switchDesign(design, {
fm: `
.${cn}-wrap[data-border="true"] > .${cn} {
  border: 1px solid ${CssVar.bdc};
}`,
neumorphism: `
.${cn}-wrap[data-border="true"] > .${cn} {
  box-shadow: ${CssPV.nCcvSdActive};
  padding: 2px;
}
.${cn}-wrap[data-border][data-radius="true"] > .${cn} > .${cn}-header {
  border-radius: ${CssVar.bdr} ${CssVar.bdr} 0 0;
}
.${cn}-wrap[data-border][data-radius="true"] > .${cn} > .${cn}-footer {
  border-radius: 0 0 ${CssVar.bdr} ${CssVar.bdr};
}
.${cn}-wrap[data-border][data-radius="true"] > .${cn} > .${cn}-body {
  border-radius: ${CssVar.bdr};
}`
})}
.${cn}-wrap[data-radius="true"] > .${cn} {
  border-radius: ${CssVar.bdr};
}
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  outline: none;
}
.${cn}-row {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
}
.${cn}-cell {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  padding-top: 1px;
  padding-left: 1px;
}
.${cn}-cell[data-fixed] {
  position: sticky;
  z-index: 1;
}
.${cn}-cell[data-fill] {
  flex: 1;
}
.${cn}-lbl {
  box-sizing: border-box;
  position: relative;
  display: block;
  max-height: 100%;
  max-width: 100%;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 3px 5px 0px 5px;
}
.${cn}-cell[data-align="left"] > .${cn}-lbl {
  text-align: left;
}
.${cn}-cell[data-align="center"] > .${cn}-lbl {
  text-align: center;
}
.${cn}-cell[data-align="right"] > .${cn}-lbl {
  text-align: right;
}
.${cn}-body-dummy {
  box-sizing: border-box;
  position: absolute;
  z-index: 0;
  top: 0px;
  left: 0px;
  background-color: transparent;
  visibility: hidden;
  flex: none;
}
.${cn}-header,
.${cn}-footer,
.${cn}-body {
  box-sizing: border-box;
  position: sticky;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  left: 0px;
}
.${cn}-header,
.${cn}-footer {
  flex: none;
  z-index: 2;
}
.${cn}-header {
  top: 0px;
}
${switchDesign(design, {
c: `
.${cn}-header .${cn}-cell,
.${cn}-footer .${cn}-cell {
  background: ${CssVar.dataview.header.bgc};
  color: ${CssVar.dataview.header.fgc};
  border-right: 1px solid ${CssVar.dataview.header.bdc};
}
.${cn}-header .${cn}-cell-m_s .${cn}-row:not(:last-child),
.${cn}-footer .${cn}-cell-m_s .${cn}-row:not(:last-child) {
  border-bottom: 1px solid ${CssVar.dataview.header.bdc};
}
.${cn}-body .${cn}-row[data-oddeven="odd"],
.${cn}-body .${cn}-row[data-oddeven="odd"] .${cn}-row {
  border-bottom: 1px solid ${CssVar.dataview.cell.bd.b};
}
.${cn}-body .${cn}-row[data-oddeven="odd"] .${cn}-cell {
  background: ${CssVar.dataview.cell.bg.b};
  color: ${CssVar.dataview.cell.ft.b};
  border-right: 1px solid ${CssVar.dataview.cell.bd.b};
}
.${cn}-body .${cn}-row[data-oddeven="even"],
.${cn}-body .${cn}-row[data-oddeven="even"] .${cn}-row {
  border-bottom: 1px solid ${CssVar.dataview.cell.bd.d};
}
.${cn}-body .${cn}-row[data-oddeven="even"] .${cn}-cell {
  background: ${CssVar.dataview.cell.bg.d};
  color: ${CssVar.dataview.cell.ft.d};
  border-right: 1px solid ${CssVar.dataview.cell.bd.d};
}
.${cn}-body .${cn}-row:hover .${cn}-cell {
  background: ${CssVar.dataview.cell.hvr.row.bgc};
  color: ${CssVar.dataview.cell.hvr.row.fgc};
  border-right-color: ${CssVar.dataview.cell.hvr.row.bdc};
}
.${cn}-body .${cn}-row:hover .${cn}-cell:hover {
  background: ${CssVar.dataview.cell.hvr.cell.bgc};
  color: ${CssVar.dataview.cell.hvr.cell.fgc};
  border-right-color: ${CssVar.dataview.cell.hvr.cell.bdc};
}
.${cn}-body[data-select="row"] .${cn}-row[data-selected] .${cn}-cell,
.${cn}-body[data-select="cell"] .${cn}-cell[data-selected] {
  background: ${CssVar.dataview.cell.act.bgc};
  color: ${CssVar.dataview.cell.act.fgc};
}
.${cn}-body[data-select="row"] .${cn}-row[data-selected] .${cn}-cell:hover,
.${cn}-body[data-select="cell"] .${cn}-cell[data-selected]:hover {
  background: ${CssVar.dataview.cell.act.hvr.bgc};
  color: ${CssVar.dataview.cell.act.hvr.fgc};
}
.${cn}-resizer,
.${cn}-cell:active + .${cn}-cell .${cn}-resizer {
  visibility: hidden;
}
.${cn}-cell:hover .${cn}-resizer,
.${cn}-resizer:active {
  border-left: 1px dotted ${CssVar.dataview.header.bdc};
  visibility: visible;
}`,
material: `
.${cn}-header {
  box-shadow: 0px 2px 3px -2px ${CssVar.sdw.c};
}
.${cn}-footer {
  box-shadow: 0px -1px 3px -2px ${CssVar.sdw.c};
}`,
neumorphism: `
.${cn}-header,
.${cn}-footer {
  box-shadow: ${CssPV.nCvxSdBase};
}
.${cn}-edit > .${inputCn} {
  padding: 0px;
}`})}
.${cn}-header > .${cn}-row,
.${cn}-footer > .${cn}-row {
  height: 100%;
}
.${cn}-header .${cn}-cell,
.${cn}-footer .${cn}-cell {
  user-select: none;
}
.${cn}-body {
  z-index: 1;
  cursor: cell;
}
.${cn}-edit {
  box-sizing: border-box;
  flex: none;
  position: fixed;
  z-index: 999;
}
.${cn}-mask {
  box-sizing: border-box;
  flex: none;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 998;
  background-color: transparent;
}
.${cn}-resizer {
  box-sizing: border-box;
  flex: none;
  height: 100%;
  width: 3px;
  position:relative;
  right: 0px;
  top: 0px;
  cursor: col-resize;
  touch-action: none;
}
.${cn}-cell-m_s {
  flex-flow: column nowrap;
}
.${cn}-cell-m_s > .${cn}-row {
  width: 100%;
  min-height: 0px;
}
.${cn}-sort-icon {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 15px;
  cursor: pointer;
}
.${cn}-sort-icon::before {
  ${CssPV.ba}
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% + 2px);
  left: calc(50% - 5px);
  border-top: 4px solid ${CssVar.dataview.header.sort};
}
.${cn}-sort-icon::after {
  ${CssPV.ba}
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 10px);
  left: calc(50% - 5px);
  border-bottom: 4px solid ${CssVar.dataview.header.sort};
}
.${cn}-sort-icon[data-order="asc"]::before {
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 9px);
  left: calc(50% - 5px);
  border-bottom: 8px solid ${CssVar.dataview.header.sort};
}
.${cn}-sort-icon[data-order="desc"]::before {
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  top: calc(50% - 4px);
  left: calc(50% - 5px);
  border-top: 8px solid ${CssVar.dataview.header.sort};
}
.${cn}-sort-icon[data-order]::after {
  display: none;
}
.${cn}-row[data-bdl],
.${cn}-row[data-bdl] .${cn}-row,
.${cn}-body .${cn}-cell-m_s .${cn}-row:last-child,
.${cn}-body > .${cn}-row:last-child {
  border-bottom: none !important;
}
.${cn}-cell[data-bdl],
.${cn}-cell-m_s .${cn}-cell:last-child,
.${cn}-header > .${cn}-row > .${cn}-cell:last-child,
.${cn}-footer > .${cn}-row > .${cn}-cell:last-child,
.${cn}-body > .${cn}-row > .${cn}-cell:last-child {
  border-right: none !important;
}
.${cn}-edit {
  background: ${CssVar.dataview.cell.bg.b};
}
.${cn}-edit > .${inputCn} {
  --bh-pdy: 0px;
  --bh-pdx: 0px;
}
.${dataViewIptCn}[data-disabled="false"]::before {
  ${CssPV.ba}
  bottom: 2px;
  left: 2px;
  width: calc(100% - 4px);
${switchDesign(design, {
c: `border-bottom: 1px solid ${CssVar.default.ipt.bdc};`
})}
  height: 1px;
  z-index: -1;
}
`}</JsxStyle>;

export default DataView;