import { NextPage } from "next";
import { createRef, useState } from "react";
import { Color, colorIterator, ColorType } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import TabContainer, { TabContentFC, TabContentWrapper, useTabContainer } from "../../../react-addon/dist/elements/tab-container";

const TabContainerPage: NextPage = () => {
  const [count, setCount] = useState(0);
  const [calcTabWidth, setCalcTabWidth] = useState(false);
  const [color, setColor] = useState<Color>();
  const [colorType, setColorType] = useState<ColorType>();
  const tabContainerHook = useTabContainer();
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Row>
        <Caption $label="calcTabWidth">
          <ToggleBox $value={calcTabWidth} $dispatch={setCalcTabWidth} />
        </Caption>
        <Button $click={() => {
          setCount(c => c+1);
        }}>count up {count}</Button>
        <Button $click={() => {
          tabContainerHook.selectTab(4);
        }}>set tab 4</Button>
        <Button $click={() => {
          console.log(ref.current);
        }}>ref</Button>
        <Button $click={() => {
          tabContainerHook.showMask();
        }}>show mask</Button>
        <Button $click={() => {
          tabContainerHook.closeMask();
        }}>close mask</Button>
        <RadioButtons
          $source={[{
            value: null,
            label: `unset`,
          }, {
            value: "base",
            label: "base",
          }, {
            value: "head",
            label: "head",
          }, {
            value: "nav",
            label: "nav",
          }]}
          $value={colorType}
          $dispatch={setColorType}
        />
      </Row>
      <Row>
        <RadioButtons
          $source={[{
            value: null,
            label: `unset`,
          }, ...(colorIterator(s => {
            return {
              value: s,
              label: s,
              color: s,
            }
          }))]}
          $value={color}
          $dispatch={setColor}
        />
      </Row>
      <TabContainer
        ref={ref}
        $fto="fy"
        $hook={tabContainerHook}
        $calcTabWidth={calcTabWidth}
        $color={color}
        $colorType={colorType}
      >
        <div key={1} title="タブ１">
          <Label $type="h1">Tab 1</Label>
          <Label>{count}</Label>
          <Label>hoge</Label>
        </div>
        <div key={2} title="タブ２">
          <Label $type="h1">Tab 2</Label>
          <Label>{count}</Label>
          <Label>hoge</Label>
        </div>
        <FlexBox key={3} title="FlexBox">
          flex box
          <Label>{count}</Label>
        </FlexBox>
        <TabContentWrapper
          key={44}
          title={
            <FlexBox $center>
              <Icon $image="lock" />
              <Label $type="h4">Lock</Label>
            </FlexBox>
          }
          $color="secondary"
        >
          <h1>hoge</h1>
          <h2>fuga</h2>
        </TabContentWrapper>
        <TabContentWrapper
          key={4}
          title={<>
            <Icon $image="heart" />
            <Label $type="h4">WISH</Label>
          </>}
          $color="primary"
        >
          hoge
          hoge
          <Label>{count}</Label>
        </TabContentWrapper>
        <TabContent
          key={5}
          title={<>
            <Icon $image="gear" $spinR $color="danger" />
          </>}
          // $color="danger"
          callback={() => {
            console.log("callback");
          }}
        />
        <TabContentWrapper
          key={6}
          title="tab6"
          $color="primary"
        >
          hoge
          hoge
          <Label>{count}</Label>
        </TabContentWrapper>
      </TabContainer>
    </>
  );
};

const TabContent: TabContentFC<{ callback: VoidFunc }> = ({ $$mask, callback }) => {
  return (
    <FlexBox>
      <Button $click={() => {
        $$mask?.show();
        setTimeout(() => {
          $$mask?.close();
        }, 2000);
      }}>show mask</Button>
      <Button $click={() => {
        callback();
      }}>callback</Button>
    </FlexBox>
  );
};

export default TabContainerPage;