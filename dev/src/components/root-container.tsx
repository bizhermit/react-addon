import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useMemo, useState } from "react";
import { Color, colorIterator } from "../../react-addon/dist/styles/css-var";
import LayoutBox from "./layout-selector";
import NavigationContainer, { Navigation, useNavigationContainer } from "../../react-addon/dist/elements/navigation-container";
import TreeView, { TreeViewItemTemplateFC } from "../../react-addon/dist/elements/list/tree-view";
import Row from "../../react-addon/dist/elements/row";
import Label from "../../react-addon/dist/elements/label";
import FlexBox from "../../react-addon/dist/elements/flex-box";
import useMessage from "../../react-addon/dist/message/message-provider";
import Button from "../../react-addon/dist/elements/button";
import { ScreenSize, useLayout } from "../../react-addon/dist/styles/layout-provider";
import SelectBox from "../../react-addon/dist/elements/inputs/select-box";
import Caption from "../../react-addon/dist/elements/caption";
import Badge from "../../react-addon/dist/elements/badge";
import Header from "../../react-addon/dist/elements/header";
import Footer from "../../react-addon/dist/elements/footer";

const RootContainer: FC<{ children?: ReactNode; }> = ({ children }) => {
  const router = useRouter();
  const [msgCount, setMsgCount] = useState(0);
  const msg = useMessage((msgs) => {
    setMsgCount(msgs.filter(msg => !msg.verified).length);
  });
  const navHook = useNavigationContainer();
  const [opened, setOpen] = useState(false);
  const [color, setColor] = useState<Color>("default");
  const layout = useLayout();
  const menuItems = useMemo(() => {
    const toMenuItem = (url: string, label: string, parent?: string) => {
      const pathname = url ? `/sandbox/${url}` : "/sandbox";
      return {
        id: url,
        pid: parent,
        label,
        pathname,
      };
    }
    return [
      { id: "index", label: "Index", pathname: "/" },
      toMenuItem("", "Color", ""),
      { id: "el", label: "Elements", defaultOpened: true },
      toMenuItem("icon", "Icon", "el"),
      toMenuItem("label", "Label", "el"),
      toMenuItem("badge", "Badge", "el"),
      toMenuItem("button", "Button", "el"),
      toMenuItem("flexBox", "FlexBox", "el"),
      toMenuItem("groupBox", "GroupBox", "el"),
      toMenuItem("splitContainer", "SplitContainer", "el"),
      toMenuItem("tabContainer", "TabContainer", "el"),
      toMenuItem("accordionContainer", "AccordionContainer", "el"),
      toMenuItem("navigationContainer", "NavigationContainer", "el"),
      toMenuItem("functionKeyContainer", "FunctionKeyContainer", "el"),
      toMenuItem("calendar", "Calendar", "el"),
      toMenuItem("table", "Table", "el"),
      toMenuItem("code", "Code", "el"),
      { id: "ipt", label: "Inputs", defaultOpened: true, pid: "el" },
      toMenuItem("textBox", "TextBox", "ipt"),
      toMenuItem("textArea", "TextArea", "ipt"),
      toMenuItem("toggleBox", "ToggleBox", "ipt"),
      toMenuItem("checkBox", "CheckBox", "ipt"),
      toMenuItem("radioButtons", "RadioButtons", "ipt"),
      toMenuItem("numericBox", "NumericBox", "ipt"),
      toMenuItem("slider", "Slider", "ipt"),
      toMenuItem("dateBox", "DateBox", "ipt"),
      toMenuItem("datePicker", "DatePicker", "ipt"),
      toMenuItem("timeBox", "TimeBox", "ipt"),
      toMenuItem("timePicker", "TimePicker", "ipt"),
      toMenuItem("selectBox", "SelectBox", "ipt"),
      toMenuItem("fileBox", "FileBox", "ipt"),
      toMenuItem("fileArea", "FileArea", "ipt"),
      { id: "lst", label: "List", defaultOpened: true, pid: "el" },
      toMenuItem("listView", "ListView", "lst"),
      toMenuItem("pageableListView", "PageableListView", "lst"),
      toMenuItem("listViewIconColumn", "IconColumn", "listView"),
      toMenuItem("listViewGroupColumn", "GroupColumn", "listView"),
      toMenuItem("listViewMultiStageColumn", "MultiStageColumn", "listView"),
      toMenuItem("listViewButtonColumn", "ButtonColumn", "listView"),
      toMenuItem("listViewCheckBoxColumn", "CheckBoxColumn", "listView"),
      toMenuItem("listViewRadioButtonColumn", "RadioButtonColumn", "listView"),
      toMenuItem("listViewTextBoxColumn", "TextBoxColumn", "listView"),
      toMenuItem("listViewNumericBoxColumn", "NumericBoxColumn", "listView"),
      toMenuItem("listViewSliderColumn", "SliderColumn", "listView"),
      toMenuItem("listViewSelectBoxColumn", "SelectBoxColumn", "listView"),
      toMenuItem("listViewDateBoxColumn", "DateBoxColumn", "listView"),
      toMenuItem("listViewTimeBoxColumn", "TimeBoxColumn", "listView"),
      toMenuItem("listViewReorderColumn", "ReorderColumn", "listView"),
      toMenuItem("listViewGanttChartColumn", "GanttChartColumn", "listView"),
      toMenuItem("treeView", "TreeView", "lst"),
      { id: "pop", label: "Popup", defaultOpened: true },
      toMenuItem("mask", "Mask", "pop"),
      toMenuItem("popup", "Popup", "pop"),
      toMenuItem("dialogWindow", "DialogWindow", "pop"),
      { id: "msg", label: "Message", defaultOpened: true },
      toMenuItem("message", "Message", "msg"),
      toMenuItem("messageBox", "MessageBox", "msg"),
    ];
  }, []);
  const headerTitle = useMemo(() => {
    return menuItems.find(item => {
      if ("pathname" in item) {
        if (item.pathname === router.pathname) return true
      }
      return false;
    })?.label ?? "SandBox";
  }, [router.pathname, menuItems]);

  return (
    <>
    <NavigationContainer $fto="fy" $hook={navHook}>
      <Navigation
        $color={color}
        $mode={layout.screenSize > ScreenSize.medium ? "visible" : "manual"}
        $edgeSize={60}
        style={{ alignItems: "flex-start" }}
        $toggled={(opened) => {
          setOpen(opened);
        }}
      >
        <TreeView $fto="fy" $items={menuItems} style={{ width: 300 }}>
          <TreeViewMenuItem />
        </TreeView>
        <FlexBox $padding $fto="x">
          <Caption $label="NavColor">
            <SelectBox
              $color={color}
              $value={color}
              $dispatch={setColor}
              $notInputText
              $source={[
                // { value: undefined, label: "unset" },
                ...colorIterator((c) => {
                  return { value: c, label: c };
                }),
              ]}
            />
          </Caption>
        </FlexBox>
      </Navigation>
      <Header>
        {layout.screenSize > ScreenSize.medium ? <></> : 
          <Button
            $borderless
            $transparent
            $icon={opened ? "cross" : "hamburger"}
            $click={() => {
              setTimeout(() => {
                navHook.toggleNavigation();
              }, 0);
            }}
          />
        }
        <Label $type="h2">{headerTitle}</Label>
        <Row $right>
          <Badge $content={msgCount} $visible={msgCount > 0}>
            <Button
              $icon="message"
              $click={() => {
                msg.show();
              }}
            />
          </Badge>
        </Row>
      </Header>
      <FlexBox $fto="fy">
        <Row $fill>
          <LayoutBox />
          <Label>{layout.screenSize}</Label>
        </Row>
        <FlexBox $fto="fy" $scroll>
          {children}
        </FlexBox>
      </FlexBox>
      <Footer $right>
        <Label>&copy;BizHermit</Label>
      </Footer>
    </NavigationContainer>
    </>
  );
};

export default RootContainer;

const TreeViewMenuItem: TreeViewItemTemplateFC = ({ $$props, $$toggleOpenChildren }) => {
  const router = useRouter();
  if (StringUtils.isEmpty($$props?.data.pathname)) {
    return (
      <Row $fill onClick={() => $$toggleOpenChildren?.()} style={{ cursor: "pointer" }}>
        <Label>{$$props?.data.label}</Label>
      </Row>
    );
  }
  return (
    <Link href={$$props?.data.pathname}>
      <Label
        $fill
        $type={router.pathname === $$props?.data.pathname ? "h4" : "a"}
      >{$$props?.data.label}</Label>
    </Link>
  );
};