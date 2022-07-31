import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { NextPage } from "next";
import { useEffect, createRef, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import TreeView, { TreeViewItemTemplateFC, useTreeView } from "../../../react-addon/dist/elements/list/tree-view";

const TreeViewPage: NextPage = () => {
  const [border, setBorder] = useState(false);
  const [checkBox, setCheckBox] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filter, setFilter] = useState<(item: {[key: string]: any; }) => boolean>();
  const [items, setItems] = useState(generator());
  const treeViewHook = useTreeView();
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (StringUtils.isAllEmpty(filterText)) {
      setFilter(undefined);
    }
    setFilter(() => {
      return (item: Struct) => {
        if (StringUtils.isNotEmpty(filterText)) {
          if (!StringUtils.contains(item.label, filterText)) return false;
        }
        return true;
      };
    });
  }, [filterText]);

  return (
    <>
    <Row $fill>
      <Caption $label="border">
        <ToggleBox $value={border} $dispatch={setBorder} />
      </Caption>
      <Caption $label="check box">
        <ToggleBox $value={checkBox} $dispatch={setCheckBox} />
      </Caption>
      <Button $click={() => {
        setItems(generator(50))
      }}>reset</Button>
      <Button $click={() => {
        console.log(items);
      }}>show</Button>
      <Button $click={() => {
        console.log(treeViewHook.getSelectedItems());
      }}>show selected</Button>
      <TextBox $value={filterText} $dispatch={setFilterText} />
      <Button $click={() => {
        console.log(ref.current);
      }}></Button>
    </Row>
    <FlexBox $fto="fy" $padding>
      <TreeView
        ref={ref}
        $hook={treeViewHook}
        $fto="f"
        $checkBox={checkBox}
        $filter={filter}
        $items={items}
        $border={border}
        // $openedIconImage="pull-down"
        // $closedIconImage="folder"
        // $grouping={[{
        //   id: "gorup1",
        //   dataName: "group1",
        // }, {
        //   id: "group2",
        //   dataName: "group2",
        // }]}
        $checkPropagation
      >
        <TreeViewItem
          // $clickToggleSelect
          $clickToggleOpen
          style={{ cursor: "pointer" }}
        />
      </TreeView>
    </FlexBox>
    </>
  );
};

const TreeViewItem: TreeViewItemTemplateFC = ({ $$props, $$nestLevel, $$setChildren, $$toggleOpenChildren, $$toggleSelect }) => {
  // useEffect(() => {
  //   if ($$nestLevel < 3) {
  //     $$setChildren(ArrayUtils.generateArray(5, (idx) => {
  //       return {
  //         id: `${$$props.id}_${idx}`,
  //         label: `item ${idx}`,
  //       }
  //     }));
  //   }
  // }, []);

  return (
    <FlexBox $fto="f" $row>
      <Icon $image="heart" />
      <Label $type="a" onClick={() => {
        console.log($$props);
      }}>{$$props?.data.label}</Label>
    </FlexBox>
  );
}

const generator = (len = 1000) => {
  const items: Array<Struct> = [];
  for (let i = 0, il = 10; i < il; i++) {
    items.push({
      id: `@${i}`,
      pid: String(Math.floor(i / 10)),
      label: `_item ${i}`,
      // selected: true,
    });
  }
  for (let i = 0, il = len; i < il; i++) {
    items.push({
      id: String(i),
      pid: i < 10 ? null : String(Math.floor(i / 10)),
      label: `item ${i}`,
      // selected: true,
      group1: `group${i % 10} [10]`,
      group2: `group${i % 100} [100]`,
      // defaultOpened: true,
    });
  }
  return items;
};

export default TreeViewPage;