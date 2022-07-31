import { NextPage } from "next";
import { createRef, useState } from "react";
import { Signal, signalIterator } from "../../../react-addon/dist/styles/css-var";
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
  const [signal, setSignal] = useState<Signal>();
  const [nav, setNav] = useState(false);
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
        <Caption $label="nav">
          <ToggleBox $value={nav} $dispatch={setNav} />
        </Caption>
        <Button $click={() => {
          console.log(ref.current);
        }}>ref</Button>
        <Button $click={() => {
          tabContainerHook.showMask();
        }}>show mask</Button>
        <Button $click={() => {
          tabContainerHook.closeMask();
        }}>close mask</Button>
      </Row>
      <Row>
        <RadioButtons
          $source={[{
            value: null,
            label: `unset`,
          }, ...(signalIterator(s => {
            return {
              value: s,
              label: s,
              signal: s,
            }
          }))]}
          $value={signal}
          $dispatch={setSignal}
        />
      </Row>
      <TabContainer
        ref={ref}
        $fto="fy"
        $hook={tabContainerHook}
        $calcTabWidth={calcTabWidth}
        $signal={signal}
        $navigationBackgroundColor={nav}
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
          $signal="secondary"
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
          $signal="primary"
        >
          hoge
          hoge
          <Label>{count}</Label>
        </TabContentWrapper>
        <TabContent
          key={5}
          title={<>
            <Icon $image="gear" $spinR $signal="danger" />
          </>}
          // $signal="danger"
          callback={() => {
            console.log("callback");
          }}
        />
        {/* <TabContent
          key={7}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={8}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={9}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={10}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={11}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={12}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={13}
          title="あいうえおかきくけこ"
        />
        <TabContent
          key={14}
          title="あいうえおかきくけこ"
        /> */}
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