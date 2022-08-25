import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import ListViewGanttChartColumn from "../../../react-addon/dist/elements/list/list-view-columns/gantt-chart-column";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import ListView, { ListViewColumnProps, listViewDefaultRowHeight, ListViewSelectMode, useListView } from "../../../react-addon/dist/elements/list/list-view";
import ListViewDateBoxColumn from "../../../react-addon/dist/elements/list/list-view-columns/date-box-column";
import ListViewMultiStageColumn from "../../../react-addon/dist/elements/list/list-view-columns/multi-stage-column";
import ListViewReorderColumn from "../../../react-addon/dist/elements/list/list-view-columns/reorder-column";
import ListViewSliderColumn from "../../../react-addon/dist/elements/list/list-view-columns/slider-column";
import Row from "../../../react-addon/dist/elements/row";

const Page: NextPage = () => {
  const generageItems = (len = 10) => {
    return ArrayUtils.generateArray(len, idx => {
      return {
        label: `label-${idx}`,
        slider: idx % 101,
        scheduledFrom: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 3 + idx);
          return d;
        })(),
        scheduledTo: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 3 + idx + idx % 5);
          return d;
        })(),
        resultFrom: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 3 + idx);
          return d;
        })(),
        resultTo: (() => {
          const d = new Date();
          d.setDate(d.getDate() - 3 + idx + idx % 5);
          return d;
        })(),
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
  const [footer, setFooter] = useState(false);
  const [resize, setResize] = useState<"t" | "f" | "x" | "y" | "xy">("t");
  const [filterText, setFilterText] = useState<string>();
  const [filter, setFilter] = useState<(item: Struct) => boolean>();
  const [disabled, setDisabled] = useState(false);
  const [progressLine, setProgressLine] = useState(true);

  const hook = useListView();
  const columns = useMemo(() => {
    const cols: Array<ListViewColumnProps> = [];
    cols.push(ListViewReorderColumn({
      name: "reorder",
      width: listViewDefaultRowHeight(),
      fixed: true,
    }));
    cols.push(ListViewMultiStageColumn({
      name: "date",
      rows: [{
        columns: [
          ListViewDateBoxColumn({
            name: "scheduledFrom",
            disabled,
            sort: false,
            headerCellLabel: "Scheduled From",
            editedRowData: true,
          }),
          ListViewDateBoxColumn({
            name: "scheduledTo",
            disabled,
            sort: false,
            headerCellLabel: "Scheduled To",
            editedRowData: true,
          }),
        ]
      }, {
        columns: [
          ListViewDateBoxColumn({
            name: "resultFrom",
            disabled,
            sort: false,
            headerCellLabel: "Result From",
            editedRowData: true,
          }),
          ListViewDateBoxColumn({
            name: "resultTo",
            disabled,
            sort: false,
            headerCellLabel: "Result To",
            editedRowData: true,
          }),
        ]
      }]
    }));
    cols.push(ListViewSliderColumn({
      name: "slider",
      labelDataName: "slider_label",
      resize: false,
      sort: false,
      fixed: true,
      format: (val) => `${val ?? "-"}%`,
    }));
    cols.push(ListViewGanttChartColumn({
      name: "chartDate",
      dateCellWidth: 30,
      // disabled,
      progressLine,
      term: {
        from: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 5);
          return date;
        })(),
        to: (() => {
          const date = new Date();
          date.setMonth(date.getMonth() + 2);
          // date.setDate(date.getDate() + 7);
          return date;
        })(),
      },
      dataNames: [{
        dataName: "scheduledDate",
        fromDataName: "scheduledFrom",
        toDataName: "scheduledTo",
        barClassName: "chart-bar-scheduled",
        barLabelDataName: "label",
        disabled: true,
        rateDataName: "slider",
        defaultColor: "secondary",
      }, {
        dataName: "resultDate",
        fromDataName: "resultFrom",
        toDataName: "resultTo",
        barClassName: "chart-bar-result",
        barLabelDataName: "slider_label",
        defaultColor: "primary",
      }],
    }));
    return cols;
  }, [disabled, progressLine]);
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
        {/* <Caption $label="resize">
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
        </Caption> */}
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
        <Caption $label="prgressLine">
          <ToggleBox $value={progressLine} $dispatch={setProgressLine} />
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
        }}>select l-43+1</Button>
      </Row>
      <ListView
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
          headerHeight: listViewDefaultRowHeight() * 2,
          footer,
          footerHeight: listViewDefaultRowHeight() * 2,
          rowHeight: listViewDefaultRowHeight() * 2,
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