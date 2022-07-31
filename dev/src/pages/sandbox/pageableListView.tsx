import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import PageableListView, { usePageableListView } from "../../../react-addon/dist/elements/list/pageable-list-view";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import { ListViewColumnProps, ListViewSelectMode } from "../../../react-addon/dist/elements/list/list-view";
import Row from "../../../react-addon/dist/elements/row";

const PageableListViewPage: NextPage = () => {
  const generageItems = (len = 10) => {
    return ArrayUtils.generateArray(len, idx => {
      return {
        label: `label-${idx}`,
        number: idx,
        width: `width-${idx}`,
        sort: `no sort-${idx}`,
        anchor: `a-${idx}`,
        anchorNum: idx,
        left: `l-${idx}`,
        center: `c-${idx}`,
        right: `r-${idx}`,
        fill: `fill-${idx}`,
      };
    });
  }

  const [rowNumber, setRowNumber] = useState(true);
  const [radius, setRadius] = useState(true);
  const [padding, setPadding] = useState(true);
  const [border, setBorder] = useState(false);
  const [colBorderless, setColBorderless] = useState(false);
  const [rowBorderless, setRowBorderless] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectMode, setSelectMode] = useState<ListViewSelectMode>();
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [resize, setResize] = useState<"t" | "f" | "x" | "y" | "xy">("t");
  const [filterText, setFilterText] = useState<string>();
  const [filter, setFilter] = useState<(item: Struct) => boolean>();

  const hook = usePageableListView();
  const columns = useMemo(() => {
    const cols: Array<ListViewColumnProps> = [];
    cols.push({
      name: "label",
      label: "Label",
      headerCellLabel: "Label",
      footerCellLabel: "labeL",
      fixed: true,
      borderless: true,
      // clickedCell: (params) => {
      //   console.log(params);
      // },
      // clickedRow: (params) => {
      //   console.log(params);
      // }
      // fill: true,
    });
    cols.push({
      name: "number",
      label: "Number",
      headerCellLabel: "Number",
      dataType: "number",
      width: 60,
      fixed: true,
    })
    cols.push({
      name: "width",
      label: "width",
      headerCellLabel: "Width",
      width: 130,
      resize: false,
    });
    cols.push({
      name: "sort",
      label: "sort",
      headerCellLabel: "Sort",
      sort: false,
    });
    cols.push({
      name: "anchor",
      label: "anchor",
      headerCellLabel: "Anchor",
      appearance: "anchor",
    });
    cols.push({
      name: "anchorNum",
      label: "anchorNum",
      headerCellLabel: "AnchorNum",
      appearance: "anchor",
      dataType: "number",
      width: 60,
    });
    cols.push({
      name: "left",
      label: "left",
      headerCellLabel: "Left",
      cellTextAlign: "left",
      width: 80,
    });
    cols.push({
      name: "center",
      label: "center",
      headerCellLabel: "Center",
      cellTextAlign: "center",
      width: 80,
    });
    cols.push({
      name: "right",
      label: "right",
      headerCellLabel: "Right",
      cellTextAlign: "right",
      width: 80,
    })
    // ArrayUtils.generateArray(10, idx => {
    //   cols.push({
    //     name: `col${idx}`,
    //     label: `Col${idx}`,
    //     headerCellLabel: `Col${idx}`,
    //   });
    // });
    cols.push({
      name: "fill",
      label: "Fill",
      headerCellLabel: "Fill",
      fill: true,
    });
    return cols;
  }, []);
  const [items, setItems] = useState(generageItems(100));

  const r = (() => {
    if (resize === "t") return true;
    if (resize === "f") return false;
    return resize;
  })();

  useEffect(() => {
    if (StringUtils.isAllEmpty(filterText)) {
      setFilter(undefined);
    } else {
      setFilter(() => {
        return (item: Struct) => {
          if (StringUtils.isNotEmpty(filterText)) {
            if (!StringUtils.contains(item.label, filterText)) return false;
          }
          return true;
        }
      });
    }
  }, [filterText]);

  return (
    <>
    <Row $fill>
      <Caption $label="row num">
        <ToggleBox
          $value={rowNumber}
          $dispatch={setRowNumber}
        />
      </Caption>
      <Caption $label="header">
        <ToggleBox
          $value={header}
          $dispatch={setHeader}
        />
      </Caption>
      <Caption $label="footer">
        <ToggleBox
          $value={footer}
          $dispatch={setFooter}
        />
      </Caption>
      <Caption $label="border">
        <ToggleBox
          $value={border}
          $dispatch={setBorder}
        />
      </Caption>
      <Caption $label="col borderless">
        <ToggleBox
          $value={colBorderless}
          $dispatch={setColBorderless}
        />
      </Caption>
      <Caption $label="row borderless">
        <ToggleBox
          $value={rowBorderless}
          $dispatch={setRowBorderless}
        />
      </Caption>
      <Caption $label="radius">
        <ToggleBox
          $value={radius}
          $dispatch={setRadius}
        />
      </Caption>
      <Caption $label="padding">
        <ToggleBox
          $value={padding}
          $dispatch={setPadding}
        />
      </Caption>
    </Row>
    <Row $fill>
      <Caption $label="select mode">
        <RadioButtons
          $value={selectMode}
          $dispatch={setSelectMode}
          $source={[
            { value: null, label: "unset" },
            { value: "none", label: "none" },
            { value: "cell", label: "cell" },
            { value: "row", label: "row" },
          ]}
        />
      </Caption>
      <Caption $label="multiSelect">
        <ToggleBox
          $value={multiSelect}
          $dispatch={setMultiSelect}
        />
      </Caption>
      <Caption $label="resize">
        <RadioButtons
          $value={resize}
          $dispatch={setResize}
          $source={[
            { value: null, label: "auto" },
            { value: "t", label: "T" },
            { value: "f", label: "F" },
            { value: "x", label: "X" },
            { value: "y", label: "Y" },
            { value: "xy", label: "XY" },
          ]}
        />
      </Caption>
    </Row>
    <Row $fill>
      <Caption $label="set items">
        <Button $click={() => {
          setItems(generageItems(0));
        }}>0</Button>
        <Button $click={() => {
          setItems(generageItems(1));
        }}>1</Button>
        <Button $click={() => {
          setItems(generageItems(10));
        }}>10</Button>
        <Button $click={() => {
          setItems(generageItems(100));
        }}>100</Button>
        <Button $click={() => {
          setItems(generageItems(1000));
        }}>1000</Button>
        <Button $click={() => {
          setItems(generageItems(10000));
        }}>10000</Button>
        <Button $click={() => {
          setItems(generageItems(100000));
        }}>100000</Button>
        {/* <Button $click={() => {
          setItems(generageItems(1000000));
        }}>1000000</Button> */}
      </Caption>
      <TextBox
        $changing={v => {
          setFilterText(v);
        }}
        $placeholder="filter text"
      />
      <Button $click={() => {
        hook.focus();
      }}>focus</Button>
      <Button $click={() => {
        console.log(hook.getFilteredItems());
      }}>filtered items</Button>
      <Button $click={() => {
        console.log(hook.getSelectedCells());
      }}>selected cells</Button>
      <Button $click={() => {
        console.log(hook)
        hook.select(6);
      }}>select l-6</Button>
      <Button $click={() => {
        console.log(hook.getPageIndex());
      }}>page</Button>
    </Row>
    <PageableListView
      // $fto="fy"
      style={r == null ? { maxWidth: "100%" } : { height: 480, width: 1100 }}
      $hook={hook}
      $padding={padding}
      $border={border}
      $radius={radius}
      $columns={columns}
      $items={items}
      $options={{
        header,
        footer,
        multiSelect,
        rowBorderless,
        colBorderless,
        rowNumber,
        selectMode,
        // cellClick: (params) => {
        //   console.log("click cell", params);
        // },
        enterIsClick: true,
        filter,
      }}
      $resize={r}
      $preventColumnsMemo
      $preventOptionsMemo
    />
    </>
  );
};

export default PageableListViewPage;