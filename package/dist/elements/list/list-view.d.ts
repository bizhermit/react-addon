import { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from "react";
import { Root } from "react-dom/client";
import { FitToOuter } from "../../styles/css-var";
import { LayoutContextProps } from "../../styles/layout-provider";
import { DomComponentClass } from "../../utils/dom";
import { InputAttributes } from "../../hooks/value";
export declare const listViewCn = "bh-lv";
export declare const listViewIptCn = "bh-lv_ipt";
declare type Data = {
    [key: string]: any;
};
export declare type ListViewSelectMode = "none" | "row" | "cell";
declare type TextAlign = "left" | "center" | "right";
declare type SortOrder = "" | "asc" | "desc";
export declare const listViewDefaultRowHeight: () => number;
export declare type ListViewHook<T = Data> = {
    focus: () => void;
    getItems: () => Array<T>;
    setItems: (items: Array<T>) => void;
    getFilteredItems: () => Array<$ListViewItem<T>>;
    setFilter: (filter: (itemData: T) => boolean) => void;
    getDisplayedItems: () => Array<$ListViewItem<T>>;
    getLength: () => number;
    getFilteredLength: () => number;
    select: (rowIndex: number, columnName?: string) => void;
    clearSelect: () => void;
    getSelectedRows: () => Array<{
        id: number;
        data: T;
    }>;
    getSelectedCells: () => Array<{
        id: number;
        data: T;
        columnName: string;
    }>;
    render: () => void;
};
export declare type ListViewItemParams<T = Data> = {
    rowNumber: number;
    id: number;
    data: T;
    columnName: string;
    columnLabel: string;
    columnWidth: number;
    originItems: () => Array<T>;
    selectMode: ListViewSelectMode;
    selected: boolean;
    getSelectedRows: () => Array<{
        id: number;
        data: T;
    }>;
    getSelectedCells: () => Array<{
        id: number;
        data: T;
        columnName: string;
    }>;
};
export declare type ListViewHeaderOrFooterCellClicked<T = Data> = (columnName: string, items: Array<$ListViewItem<T>>, renderCells: () => void) => void;
declare type ListViewReturnOrder = {
    rebind?: boolean;
    renderHeaderCell?: boolean;
    renderHeaderCells?: boolean;
    renderFooterCell?: boolean;
    renderFooterCells?: boolean;
    renderCell?: boolean;
    renderCells?: boolean;
    renderRow?: boolean;
    render?: boolean;
};
export declare type ListViewCellClickFunc<T = Data> = (params: ListViewItemParams<T>, e?: MouseEvent) => (ListViewReturnOrder | void);
export declare type ListViewColumnFunction<P, T = Data> = (props: P) => ListViewColumnProps<T>;
export declare type ListViewMultiStageRowItemProps<T = Data> = {
    columns: Array<ListViewColumnProps<T>>;
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
export declare type ListViewEditTargetProps<T = Data> = {
    data: T;
    columnName: string;
    index: number;
    id: number;
};
export declare type ListViewEditParams<T = Data> = {
    target: ListViewEditTargetProps<T>;
    editElement: HTMLDivElement;
    endEdit: (commit?: boolean) => void;
    cell: $ListViewCell<T>;
    styleCtx: LayoutContextProps;
};
export declare type ListViewBeginEditFunc<T = Data> = (params: ListViewEditParams<T>) => {
    node: ReactNode;
    effect?: () => void;
};
export declare type ListViewEditInputAttributes<T extends InputAttributes<any, any>> = Omit<T, "$hook" | "$value" | "$dispatch" | "$bind" | "$name" | "$placeholder" | "$resize" | "$source" | "style">;
export declare type ListViewColumnProps<T = Data> = {
    name: string;
    vName?: string;
    label?: string;
    dataType?: "string" | "number";
    initialize?: (props: ListViewColumnProps<T>, listView: ListViewClass<T>) => {
        [key: string]: any;
    };
    dispose?: (lv: ListViewClass<T>) => void;
    headerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem<T>>, originItems: Array<T>) => void);
    headerCellInitialize?: (column: $ListViewColumn<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    headerCellTextAlign?: TextAlign;
    footerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem<T>>, originItems: Array<T>) => void);
    footerCellInitialize?: (column: $ListViewColumn<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    footerCellTextAlign?: TextAlign;
    width?: number;
    cellInitialize?: (cell: $ListViewCell<T>, initializeParameters: {
        [key: string]: any;
    }, lv: ListViewClass<T>) => void;
    cellDispose?: (cell: $ListViewCell<T>, lv: ListViewClass<T>) => void;
    cellRender?: (cell: $ListViewCell<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    cellTextAlign?: TextAlign;
    appearance?: "label" | "anchor";
    sort?: boolean | ((order: SortOrder) => (data1: {
        data: T;
    }, data2: {
        data: T;
    }) => number);
    resize?: boolean;
    fill?: boolean;
    fixed?: boolean;
    tabStop?: boolean;
    notScrollFocusWhenTabStop?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    clickHeaderCell?: ListViewHeaderOrFooterCellClicked<T>;
    clickFooterCell?: ListViewHeaderOrFooterCellClicked<T>;
    clickCell?: ListViewCellClickFunc<T>;
    clickRow?: ListViewCellClickFunc<T>;
    _preventClearSelected?: boolean;
    data?: {
        [key: string]: any;
    };
    bindedItems?: (originItems: Array<T>) => void;
    initializeRowData?: (data: T) => void | boolean;
    _beginEdit?: ListViewBeginEditFunc<T>;
    _endEdit?: (target: ListViewEditTargetProps<T>, commit: boolean, editElement: HTMLDivElement) => ListViewReturnOrder | void;
    editedRowData?: ((data: T) => void) | boolean;
    _rows?: Array<ListViewMultiStageRowItemProps<T>>;
    headerClassNames?: string | Array<string>;
    footerClassNames?: string | Array<string>;
    bodyClassNames?: string | Array<string>;
    jsxStyle?: JSX.Element;
    _lv?: (lv: ListViewClass) => void;
};
export declare type ListViewEditColumnProps<T> = ListViewColumnProps<Data> & {
    edit?: boolean;
    beganEdit?: (value: T, target: ListViewEditTargetProps<Data>) => void;
    endedEdit?: (values: {
        before: T;
        after: T;
    }, target: ListViewEditTargetProps<Data>, commit: boolean) => void;
};
export declare type ListViewOptions<T = Data> = {
    header?: boolean;
    headerHeight?: number;
    footer?: boolean;
    footerHeight?: number;
    rowHeight?: number;
    rowNumber?: boolean;
    selectMode?: ListViewSelectMode;
    multiSelect?: boolean;
    oddEven?: boolean;
    dragScroll?: boolean | "horizontal" | "vertical";
    rowBorderless?: boolean;
    colBorderless?: boolean;
    sort?: (itemData1: T, itemData2: T) => number;
    sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps<T>) => void;
    externalSort?: boolean;
    filter?: (itemData: T) => boolean;
    clickCell?: ListViewCellClickFunc<T>;
    filtered?: (items: Array<$ListViewItem<T>>) => void;
    enterIsClick?: boolean;
    scrollTimeoutInterval?: number;
};
export declare type ListViewAttributes<T = Data> = HTMLAttributes<HTMLDivElement> & {
    ref?: ForwardedRef<HTMLDivElement>;
    $fto?: FitToOuter;
    $hook?: ListViewHook<T>;
    $items?: Array<T>;
    $columns?: Array<ListViewColumnProps<T>>;
    $preventColumnsMemo?: boolean;
    $options?: ListViewOptions<T>;
    $preventOptionsMemo?: boolean;
    $padding?: boolean;
    $border?: boolean;
    $radius?: boolean;
    $resize?: boolean | "x" | "y" | "xy";
};
interface ListViewFC extends FunctionComponent {
    <T extends {
        [key: string]: any;
    } = Data>(attrs: ListViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<ListViewAttributes<T>>;
}
declare const ListView: ListViewFC;
export declare const useListView: <T extends {
    [key: string]: any;
} = any>() => ListViewHook<T>;
export declare type $ListViewMultiStageRowItem<T> = {
    columns: Array<$ListViewColumn<T>>;
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
export declare type $ListViewColumn<T> = {
    prop?: ListViewColumnProps<T>;
    name: string;
    vName: string;
    label: string;
    dataType: "string" | "number";
    cells: Array<$ListViewCell<T>>;
    width: number;
    minWidth: number;
    initializeParameters: {
        [key: string]: any;
    };
    dispose: (lv: ListViewClass<T>) => void;
    headerCellElement: HTMLDivElement;
    headerCellLabelElement?: HTMLDivElement;
    renderHeaderCell?: (cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem<T>>, originItems: Array<T>) => void;
    sortElement?: HTMLDivElement;
    resizeElement?: HTMLDivElement;
    footerCellElement: HTMLDivElement;
    footerCellLabelElement?: HTMLDivElement;
    renderFooterCell?: (cellElement: HTMLDivElement, displayedItems: Array<$ListViewItem<T>>, originItems: Array<T>) => void;
    cellInitialize: (cell: $ListViewCell<T>, initializeParameters: {
        [key: string]: any;
    }, lv: ListViewClass<T>) => void;
    disposeCell?: (cell: $ListViewCell<T>, lv: ListViewClass<T>) => void;
    renderCell: (cell: $ListViewCell<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    textAlign: TextAlign;
    appearance?: "label" | "anchor";
    sort: (order: SortOrder) => (itemData1: {
        data: T;
    }, itemData2: {
        data: T;
    }) => number;
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
    clickHeaderCell?: ListViewHeaderOrFooterCellClicked<T>;
    clickFooterCell?: ListViewHeaderOrFooterCellClicked<T>;
    clickCell?: ListViewCellClickFunc<T>;
    clickRow?: ListViewCellClickFunc<T>;
    preventClearSelected: boolean;
    bindedItems?: (originItems: Array<T>) => void;
    initializeRowData?: (data: T) => void | boolean;
    rows?: Array<$ListViewMultiStageRowItem<T>>;
    parent?: $ListViewColumn<T>;
    beginEdit?: ListViewBeginEditFunc<T>;
    endEdit?: (target: ListViewEditTargetProps<T>, commit: boolean, editElement: HTMLDivElement) => ListViewReturnOrder | void;
    editedRowData: ((data: T) => void) | boolean;
    headerClassNames?: Array<string>;
    footerClassNames?: Array<string>;
    bodyClassNames?: Array<string>;
    built: boolean;
};
declare type $ListViewItem<T> = {
    data: T;
    id: number;
    rowSelected: boolean;
    cellSelected: {
        [key: string]: boolean;
    };
};
declare type $ListViewRow<T> = {
    element: HTMLDivElement;
    index: number;
    id: number;
    cells: Array<$ListViewCell<T>>;
    item: $ListViewItem<T>;
    cache: {
        _lv_selected: boolean;
        _lv_oddEven: 0 | 1;
    };
};
declare type $ListViewCell<T> = {
    element: HTMLDivElement;
    contentElements: Array<HTMLElement>;
    column: $ListViewColumn<T>;
    row: $ListViewRow<T>;
    cache: {
        _lv_selected: boolean;
    } & {
        [key: string]: any;
    };
};
export declare class ListViewClass<T = Data> extends DomComponentClass {
    protected element: HTMLElement;
    protected layoutCtx: LayoutContextProps;
    protected initialized: boolean;
    protected resizeObserver: ResizeObserver;
    protected headerElement: HTMLDivElement;
    protected headerRowElement: HTMLDivElement;
    protected bodyElement: HTMLDivElement;
    protected dummyElement: HTMLDivElement;
    protected footerElement: HTMLDivElement;
    protected footerRowElement: HTMLDivElement;
    protected editElement: HTMLDivElement;
    protected editMaskElement: HTMLDivElement;
    protected editRoot: Root;
    protected columns: Array<$ListViewColumn<T>>;
    protected renderColumns: Array<$ListViewColumn<T>>;
    protected originItems: Array<T>;
    protected bindingItems: Array<$ListViewItem<T>>;
    protected filteredItems: Array<$ListViewItem<T>>;
    protected sortedItems: Array<$ListViewItem<T>>;
    protected rows: Array<$ListViewRow<T>>;
    protected selectedRows: {
        [key: string]: $ListViewItem<T>;
    };
    protected lastSelectedCell: {
        index: number;
        item: $ListViewItem<T>;
        column: $ListViewColumn<T>;
    };
    protected lastSelectedBaseCell: {
        index: number;
        item: $ListViewItem<T>;
        column: $ListViewColumn<T>;
    };
    protected lastScrolledTop: number;
    protected lastScrolledLeft: number;
    protected maxFirstIndex: number;
    protected firstIndex: number;
    protected lastChangedX: boolean;
    protected hasFillColumn: boolean;
    protected editTarget: {
        item: $ListViewItem<T>;
        column: $ListViewColumn<T>;
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
    protected rowNumberColumn: $ListViewColumn<T>;
    protected headerVisible: boolean;
    protected headerHeight: number;
    protected footerVisible: boolean;
    protected footerHeight: number;
    protected rowHeight: number;
    protected selectMode: ListViewSelectMode;
    protected multiSelect: boolean;
    protected oddEven: boolean;
    protected dragScroll: boolean | "horizontal" | "vertical";
    protected rowNumber: boolean;
    protected sort: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number;
    protected sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps<T>) => void;
    protected externalSort: boolean;
    protected filter: (itemData: {
        [key: string]: any;
    }) => boolean;
    protected clickCell: ListViewCellClickFunc<T>;
    protected filtered: (items: Array<$ListViewItem<T>>) => void;
    protected enterIsClick: boolean;
    protected colBorderless: boolean;
    protected rowBorderless: boolean;
    protected scrollTimeoutInterval: number;
    protected endEditEventListener: () => void;
    protected itemsCallBindedRev: number;
    protected colCallBindedRev: number;
    constructor(element: HTMLElement, props: ListViewAttributes<T>, layoutCtx: LayoutContextProps);
    dispose(): void;
    setOptions(options?: ListViewOptions<T>): this;
    protected optimizeElementsPosition(): void;
    setHeaderVisible(visible: boolean): this;
    setHeaderHeight(height: number): this;
    setFooterVisible(visible: boolean): this;
    setFooterHeight(height: number): this;
    setRowHeight(height: number): this;
    setRowNumber(visible: boolean): this;
    setSelectMode(selectMode: ListViewSelectMode): this;
    setMultiSelect(multiSelect: boolean): this;
    setOddEven(oddEven: boolean): this;
    setDragScroll(dragScroll: boolean | "horizontal" | "vertical"): this;
    setSort(func: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number): this;
    setSorted(func: (columnName: string, order: "asc" | "desc" | "", columnProps: ListViewColumnProps<T>) => void): this;
    setExternalSort(external: boolean): this;
    setFilter(func: (itemData: {
        [key: string]: any;
    }) => boolean): this;
    setClickCell(func: ListViewCellClickFunc<T>): this;
    setFiltered(func: (items: Array<$ListViewItem<T>>) => void): this;
    setEnterIsClick(enterIsClick: boolean): this;
    setColBorderless(borderless: boolean): this;
    setRowBorderless(borderless: boolean): this;
    setScrollTimeoutInterval(interval: number): this;
    protected generateElements(): void;
    protected clearSelectedRows(render?: boolean): void;
    protected rangeSelectRow(item: $ListViewItem<T>, column: $ListViewColumn<T>, index: number): void;
    protected scrollToIndex(index: number, render?: boolean): void;
    protected scrollToColumn(column: $ListViewColumn<T>, render?: boolean, renderAbsolute?: boolean): boolean;
    protected arrowUpDown(updown: number, focusIndex: number, rangeSelect?: boolean): boolean;
    protected arrowUp(up?: number, rangeSelect?: boolean): boolean;
    protected arrowDown(down?: number, rangeSelect?: boolean): boolean;
    protected arrowLeftRightOptimize(index: number, column: $ListViewColumn<T>, rangeSelect?: boolean): boolean;
    protected arrowLeft(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    protected arrowRight(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    render(): this;
    protected renderHeaderCells(): this;
    protected renderFooterCells(): this;
    protected renderRow(row: $ListViewRow<T>, allColumn?: boolean): void;
    protected renderRowColumns(columns: Array<$ListViewColumn<T>>, row: $ListViewRow<T>): void;
    protected renderCell(cell: $ListViewCell<T>): void;
    protected renderWhenScrolled(absolute?: boolean): void;
    protected renderWhenResized(absolute?: boolean): boolean;
    protected generateCell(row: $ListViewRow<T>, col: $ListViewColumn<T>, rowElem: HTMLDivElement): $ListViewCell<T>;
    protected optimizeMaxFirstIndex(): void;
    protected optimizeRenderColumns(): boolean;
    protected optimizeRowNumberColumnWidth(): void;
    protected optimizeDummySize(): void;
    protected disposeRows(maxRowLen?: number): void;
    protected findColumn(func: (column: $ListViewColumn<T>) => boolean): $ListViewColumn<T>;
    protected findFirstColumn(): $ListViewColumn<T>;
    protected findLastColumn(): $ListViewColumn<T>;
    protected findPrevColumn(columnName: string): {
        column: $ListViewColumn<T>;
        nextRow: boolean;
    };
    protected findNextColumn(columnName: string): {
        column: $ListViewColumn<T>;
        nextRow: boolean;
    };
    protected disposeColumn(column: $ListViewColumn<T>): void;
    protected disposeColumns(): void;
    protected bindColumns(columns: Array<ListViewColumnProps<T>>): void;
    protected bindColumn(col: ListViewColumnProps<T>, fill: boolean): $ListViewColumn<T>;
    protected buildColumns(): void;
    protected buildColumn(column: $ListViewColumn<T>, element: {
        header: HTMLDivElement;
        footer: HTMLDivElement;
    }): void;
    setColumns(columns: Array<ListViewColumnProps<T>>): this;
    protected columnForEach(func: (column: $ListViewColumn<T>) => void | boolean): void;
    protected bindItems(items: Array<T>): void;
    executeColumnBindedItems(): void;
    protected filterItems(): void;
    protected sortItems(): void;
    setItems(items: Array<T>): this;
    protected cellClickedImpl(item: $ListViewItem<T>, column: $ListViewColumn<T>, index: number, ctrlKey: boolean, shiftKey: boolean, e?: MouseEvent): void;
    protected beginEditLastSelectedCell(lastScrollTop?: number): void;
    protected beginEdit(item: $ListViewItem<T>, column: $ListViewColumn<T>, index: number): void;
    protected endEdit(commit: boolean, options?: {
        unmountTimeout?: boolean;
        callback?: (edit: boolean) => void;
    }): void;
    getValue(): Array<T>;
    getFilteredValue(): Array<$ListViewItem<T>>;
    getSortedValue(): Array<$ListViewItem<T>>;
    getLength(): number;
    getFilteredLength(): number;
    select(rowIndex: number, columnName?: string): boolean;
    clearSelect(): void;
    getSelectedRows(): Array<{
        id: number;
        data: T;
    }>;
    getSelectedCells(): Array<{
        id: number;
        data: T;
        columnName: string;
    }>;
    focus(): this;
    getElement(): HTMLElement;
    getBodyElement(): HTMLDivElement;
    getRowHeight(): number;
    getDisplayedFirstRowIndex(): number;
    getBodyScrollTop(): number;
    clearSpaceRow(): this;
    startScrollContinue(order: "up" | "down", interval?: number, startCallback?: (interval: number) => void, endCallback?: (code: "stop" | "over" | "already") => void): void;
    stopScrollContinue(): void;
    protected scrollContinue(endCallback?: (code: "stop" | "over") => void): void;
    dragMovingRow(dragingRowIndex: number, top: number): this;
    dropMoveRow(dragingRowIndex: number, top: number): this;
    renderByOriginData(originData: T, callEditedRowData?: boolean): this;
    setStyleContext(ctx: LayoutContextProps): this;
}
export declare const ListViewStyle: JSX.Element;
export default ListView;
