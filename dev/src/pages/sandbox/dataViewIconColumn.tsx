import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import DataView, { DataViewColumnProps, DataViewSelectMode, useDataView } from "../../../react-addon/dist/elements/list/data-view";
import Row from "../../../react-addon/dist/elements/row";
import DataViewIconColumn from "../../../react-addon/dist/elements/list/data-view-columns/icon-column";

const Page: NextPage = () => {
  const generageItems = (len = 10) => {
    return ArrayUtils.generateArray(len, idx => {
      return {
        label: `label-${idx}`,
        number: idx,
        col0: `label-${idx}`,
        icon1: idx % 2 ? "c-check" : undefined,
        // icon1c: "primary"
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
  const [selectMode, setSelectMode] = useState<DataViewSelectMode>();
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [resize, setResize] = useState<"t" | "f" | "x" | "y" | "xy">("t");
  const [filterText, setFilterText] = useState<string>();
  const [filter, setFilter] = useState<(item: Struct) => boolean>();

  const hook = useDataView();
  const columns = useMemo(() => {
    const cols: Array<DataViewColumnProps> = [];
    cols.push({
      name: "label",
      headerCellLabel: "Label",
    })
    cols.push(DataViewIconColumn({
      name: "icon1",
      colorDataName: "icon1c",
      // defaultIcon: "c-star",
      defaultColor: "danger"
    }));
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
        hook.select(43);
      }}>select l-40</Button>
    </Row>
    <DataView
      // $fto="fy"
      style={r == null ? undefined : { height: 480, width: 1100 }}
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

export default Page;