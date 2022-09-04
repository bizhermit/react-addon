import { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from "react";
import { Root } from "react-dom/client";
import { FitToOuter } from "../../styles/css-var";
import { LayoutContextProps } from "../../styles/layout-provider";
import { DomComponentClass } from "../../utils/dom";
import { InputAttributes } from "../../hooks/value";
export declare const dataViewCn = "bh-dv";
export declare const dataViewIptCn = "bh-dv_ipt";
declare type Data = {
    [key: string]: any;
};
export declare type DataViewSelectMode = "none" | "row" | "cell";
declare type TextAlign = "left" | "center" | "right";
declare type SortOrder = "" | "asc" | "desc";
export declare const dataViewDefaultRowHeight: () => number;
export declare type DataViewHook<T = Data> = {
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
export declare type DataViewItemParams<T = Data> = {
    rowNumber: number;
    id: number;
    data: T;
    columnName: string;
    columnLabel: string;
    columnWidth: number;
    originItems: () => Array<T>;
    selectMode: DataViewSelectMode;
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
export declare type DataViewHeaderOrFooterCellClicked<T = Data> = (columnName: string, items: Array<$DataViewItem<T>>, renderCells: () => void) => void;
declare type DataViewReturnOrder = {
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
export declare type DataViewCellClickFunc<T = Data> = (params: DataViewItemParams<T>, e?: MouseEvent) => (DataViewReturnOrder | void);
export declare type DataViewColumnFunction<P, T = Data> = (props: P) => DataViewColumnProps<T>;
export declare type DataViewMultiStageRowItemProps<T = Data> = {
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
export declare type DataViewEditTargetProps<T = Data> = {
    data: T;
    columnName: string;
    index: number;
    id: number;
};
export declare type DataViewEditParams<T = Data> = {
    target: DataViewEditTargetProps<T>;
    editElement: HTMLDivElement;
    endEdit: (commit?: boolean) => void;
    cell: $DataViewCell<T>;
    styleCtx: LayoutContextProps;
};
export declare type DataViewBeginEditFunc<T = Data> = (params: DataViewEditParams<T>) => {
    node: ReactNode;
    effect?: () => void;
};
export declare type DataViewEditInputAttributes<T extends InputAttributes<any, any>> = Omit<T, "$hook" | "$value" | "$dispatch" | "$bind" | "$name" | "$placeholder" | "$resize" | "$source" | "style">;
export declare type DataViewColumnProps<T = Data> = {
    name: string;
    vName?: string;
    label?: string;
    dataType?: "string" | "number";
    initialize?: (props: DataViewColumnProps<T>, dataView: DataViewClass<T>) => {
        [key: string]: any;
    };
    dispose?: (dv: DataViewClass<T>) => void;
    headerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void);
    headerCellInitialize?: (column: $DataViewColumn<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    headerCellTextAlign?: TextAlign;
    footerCellLabel?: string | ((cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void);
    footerCellInitialize?: (column: $DataViewColumn<T>, initializeParameters: {
        [key: string]: any;
    }) => void;
    footerCellTextAlign?: TextAlign;
    width?: number;
    cellInitialize?: (cell: $DataViewCell<T>, initializeParameters: {
        [key: string]: any;
    }, dv: DataViewClass<T>) => void;
    cellDispose?: (cell: $DataViewCell<T>, dv: DataViewClass<T>) => void;
    cellRender?: (cell: $DataViewCell<T>, initializeParameters: {
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
    clickHeaderCell?: DataViewHeaderOrFooterCellClicked<T>;
    clickFooterCell?: DataViewHeaderOrFooterCellClicked<T>;
    clickCell?: DataViewCellClickFunc<T>;
    clickRow?: DataViewCellClickFunc<T>;
    _preventClearSelected?: boolean;
    data?: {
        [key: string]: any;
    };
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
export declare type DataViewEditColumnProps<T> = DataViewColumnProps<Data> & {
    edit?: boolean;
    beganEdit?: (value: T, target: DataViewEditTargetProps<Data>) => void;
    endedEdit?: (values: {
        before: T;
        after: T;
    }, target: DataViewEditTargetProps<Data>, commit: boolean) => void;
};
export declare type DataViewOptions<T = Data> = {
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
export declare type DataViewAttributes<T = Data> = HTMLAttributes<HTMLDivElement> & {
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
    <T extends {
        [key: string]: any;
    } = Data>(attrs: DataViewAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<DataViewAttributes<T>>;
}
declare const DataView: DataViewFC;
export declare const useDataView: <T extends {
    [key: string]: any;
} = any>() => DataViewHook<T>;
export declare type $DataViewMultiStageRowItem<T> = {
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
export declare type $DataViewColumn<T> = {
    prop?: DataViewColumnProps<T>;
    name: string;
    vName: string;
    label: string;
    dataType: "string" | "number";
    cells: Array<$DataViewCell<T>>;
    width: number;
    minWidth: number;
    initializeParameters: {
        [key: string]: any;
    };
    dispose: (dv: DataViewClass<T>) => void;
    headerCellElement: HTMLDivElement;
    headerCellLabelElement?: HTMLDivElement;
    renderHeaderCell?: (cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void;
    sortElement?: HTMLDivElement;
    resizeElement?: HTMLDivElement;
    footerCellElement: HTMLDivElement;
    footerCellLabelElement?: HTMLDivElement;
    renderFooterCell?: (cellElement: HTMLDivElement, displayedItems: Array<$DataViewItem<T>>, originItems: Array<T>) => void;
    cellInitialize: (cell: $DataViewCell<T>, initializeParameters: {
        [key: string]: any;
    }, dv: DataViewClass<T>) => void;
    disposeCell?: (cell: $DataViewCell<T>, dv: DataViewClass<T>) => void;
    renderCell: (cell: $DataViewCell<T>, initializeParameters: {
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
declare type $DataViewItem<T> = {
    data: T;
    id: number;
    rowSelected: boolean;
    cellSelected: {
        [key: string]: boolean;
    };
};
declare type $DataViewRow<T> = {
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
declare type $DataViewCell<T> = {
    element: HTMLDivElement;
    contentElements: Array<HTMLElement>;
    column: $DataViewColumn<T>;
    row: $DataViewRow<T>;
    cache: {
        _dv_selected: boolean;
        _dv_initialized: boolean;
    } & {
        [key: string]: any;
    };
};
export declare class DataViewClass<T = Data> extends DomComponentClass {
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
    protected columns: Array<$DataViewColumn<T>>;
    protected renderColumns: Array<$DataViewColumn<T>>;
    protected originItems: Array<T>;
    protected bindingItems: Array<$DataViewItem<T>>;
    protected filteredItems: Array<$DataViewItem<T>>;
    protected sortedItems: Array<$DataViewItem<T>>;
    protected rows: Array<$DataViewRow<T>>;
    protected selectedRows: {
        [key: string]: $DataViewItem<T>;
    };
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
    protected sort: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number;
    protected sorted?: (columnName: string, order: "asc" | "desc" | "", columnProps: DataViewColumnProps<T>) => void;
    protected externalSort: boolean;
    protected filter: (itemData: {
        [key: string]: any;
    }) => boolean;
    protected clickCell: DataViewCellClickFunc<T>;
    protected filtered: (items: Array<$DataViewItem<T>>) => void;
    protected enterIsClick: boolean;
    protected colBorderless: boolean;
    protected rowBorderless: boolean;
    protected scrollTimeoutInterval: number;
    protected endEditEventListener: () => void;
    protected itemsCallBindedRev: number;
    protected colCallBindedRev: number;
    constructor(element: HTMLElement, props: DataViewAttributes<T>, layoutCtx: LayoutContextProps);
    dispose(): void;
    setOptions(options?: DataViewOptions<T>): this;
    protected optimizeElementsPosition(): void;
    setHeaderVisible(visible: boolean): this;
    setHeaderHeight(height: number): this;
    setFooterVisible(visible: boolean): this;
    setFooterHeight(height: number): this;
    setRowHeight(height: number): this;
    setRowNumber(visible: boolean): this;
    setSelectMode(selectMode: DataViewSelectMode): this;
    setMultiSelect(multiSelect: boolean): this;
    setOddEven(oddEven: boolean): this;
    setDragScroll(dragScroll: boolean | "horizontal" | "vertical"): this;
    setSort(func: (itemData1: {
        [key: string]: any;
    }, itemData2: {
        [key: string]: any;
    }) => number): this;
    setSorted(func: (columnName: string, order: "asc" | "desc" | "", columnProps: DataViewColumnProps<T>) => void): this;
    setExternalSort(external: boolean): this;
    setFilter(func: (itemData: {
        [key: string]: any;
    }) => boolean): this;
    setClickCell(func: DataViewCellClickFunc<T>): this;
    setFiltered(func: (items: Array<$DataViewItem<T>>) => void): this;
    setEnterIsClick(enterIsClick: boolean): this;
    setColBorderless(borderless: boolean): this;
    setRowBorderless(borderless: boolean): this;
    setScrollTimeoutInterval(interval: number): this;
    protected generateElements(): void;
    protected clearSelectedRows(render?: boolean): void;
    protected rangeSelectRow(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number): void;
    protected scrollToIndex(index: number, render?: boolean): void;
    protected scrollToColumn(column: $DataViewColumn<T>, render?: boolean, renderAbsolute?: boolean): boolean;
    protected arrowUpDown(updown: number, focusIndex: number, rangeSelect?: boolean): boolean;
    protected arrowUp(up?: number, rangeSelect?: boolean): boolean;
    protected arrowDown(down?: number, rangeSelect?: boolean): boolean;
    protected arrowLeftRightOptimize(index: number, column: $DataViewColumn<T>, rangeSelect?: boolean): boolean;
    protected arrowLeft(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    protected arrowRight(ctrlKey?: boolean, rangeSelect?: boolean): boolean;
    render(): this;
    protected renderHeaderCells(): this;
    protected renderFooterCells(): this;
    protected renderRow(row: $DataViewRow<T>, allColumn?: boolean): void;
    protected renderRowColumns(columns: Array<$DataViewColumn<T>>, row: $DataViewRow<T>): void;
    protected renderCell(cell: $DataViewCell<T>): void;
    protected renderWhenScrolled(absolute?: boolean): void;
    protected renderWhenResized(absolute?: boolean): boolean;
    protected generateCell(row: $DataViewRow<T>, col: $DataViewColumn<T>, rowElem: HTMLDivElement): $DataViewCell<T>;
    protected optimizeMaxFirstIndex(): void;
    protected optimizeRenderColumns(): boolean;
    protected optimizeRowNumberColumnWidth(): void;
    protected optimizeDummySize(): void;
    protected disposeRows(maxRowLen?: number): void;
    protected findColumn(func: (column: $DataViewColumn<T>) => boolean): $DataViewColumn<T>;
    protected findFirstColumn(): $DataViewColumn<T>;
    protected findLastColumn(): $DataViewColumn<T>;
    protected findPrevColumn(columnName: string): {
        column: $DataViewColumn<T>;
        nextRow: boolean;
    };
    protected findNextColumn(columnName: string): {
        column: $DataViewColumn<T>;
        nextRow: boolean;
    };
    protected disposeColumn(column: $DataViewColumn<T>): void;
    protected disposeColumns(): void;
    protected bindColumns(columns: Array<DataViewColumnProps<T>>): void;
    protected bindColumn(col: DataViewColumnProps<T>, fill: boolean): $DataViewColumn<T>;
    protected buildColumns(): void;
    protected buildColumn(column: $DataViewColumn<T>, element: {
        header: HTMLDivElement;
        footer: HTMLDivElement;
    }): void;
    setColumns(columns: Array<DataViewColumnProps<T>>): this;
    protected columnForEach(func: (column: $DataViewColumn<T>) => void | boolean): void;
    protected bindItems(items: Array<T>): void;
    executeColumnBindedItems(): void;
    protected filterItems(): void;
    protected sortItems(): void;
    setItems(items: Array<T>): this;
    protected cellClickedImpl(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number, ctrlKey: boolean, shiftKey: boolean, e?: MouseEvent): void;
    protected beginEditLastSelectedCell(lastScrollTop?: number): void;
    protected beginEdit(item: $DataViewItem<T>, column: $DataViewColumn<T>, index: number): void;
    protected endEdit(commit: boolean, options?: {
        unmountTimeout?: boolean;
        callback?: (edit: boolean) => void;
    }): void;
    getValue(): Array<T>;
    getFilteredValue(): Array<$DataViewItem<T>>;
    getSortedValue(): Array<$DataViewItem<T>>;
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
export declare const DataViewStyle: JSX.Element;
export default DataView;
