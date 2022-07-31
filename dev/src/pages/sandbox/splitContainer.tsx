import { NextPage } from "next";
import { useEffect, createRef, useState } from "react";
import CssVar from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import { useMask } from "../../../react-addon/dist/popups/mask";
import Row from "../../../react-addon/dist/elements/row";
import SplitContainer, { SplitContentFC, useSplitContainer } from "../../../react-addon/dist/elements/split-container";

const SplitContainerPage: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [direction, setDirection] = useState<"column" | "row">("row");
  const [reverse, setReverse] = useState(false);
  const [hidePrimary, setHidePrimary] = useState(false);
  const [hideSecondary, setHideSecondary] = useState(false);
  const [hideAbsolute, setHideAbsolute] = useState(false);
  const [secondarySize, setSecondarySize] = useState<number>();
  const splitContainerHook = useSplitContainer();
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Row>
        <Caption $label="direction">
          <RadioButtons
            $value={direction}
            $dispatch={setDirection}
            $source={[{
              value: "column",
              label: "Column",
            }, {
              value: "row",
              label: "Row",
            }]}
          />
        </Caption>
        <Caption $label="reverse">
          <ToggleBox $value={reverse} $dispatch={setReverse} />
        </Caption>
        <Button $click={() => {
          console.log(ref.current);
        }}>ref</Button>
        <Button $click={() => {
          splitContainerHook.showMask();
        }}>show mask</Button>
        <Button $click={() => {
          splitContainerHook.closeMask();
        }}>close mask</Button>
      </Row>
      <Row>
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
        <Caption $label="hide primary">
          <ToggleBox $value={hidePrimary} $dispatch={setHidePrimary} />
        </Caption>
        <Caption $label="hide secondary">
          <ToggleBox $value={hideSecondary} $dispatch={setHideSecondary} />
        </Caption>
        <Caption $label="hide absolute">
          <ToggleBox $value={hideAbsolute} $dispatch={setHideAbsolute} />
        </Caption>
        <Caption $label="secondary size">
          <Button $click={() => {
            setSecondarySize(200);
          }}>set 200</Button>
          <Button $click={() => {
            setSecondarySize(300);
          }}>set 300</Button>
        </Caption>
      </Row>
      <Row>
        <Button $click={() => {
          splitContainerHook.setVisible({ primary: true });
        }}>show primary</Button>
        <Button $click={() => {
          splitContainerHook.setVisible({ primary: false });
        }}>hide primary</Button>
        <Button $click={() => {
          splitContainerHook.setVisible({ secondary: true });
        }}>show secondary</Button>
        <Button $click={() => {
          splitContainerHook.setVisible({ secondary: false });
        }}>hide secondary</Button>
        <Button $click={() => {
          splitContainerHook.setSecondarySize();
        }}>set default size</Button>
        <Button $click={() => {
          splitContainerHook.setSecondarySize(200);
        }}>set 200</Button>
        <Button $click={() => {
          splitContainerHook.setSecondarySize(300);
        }}>set 300</Button>
      </Row>
      <SplitContainer
        ref={ref}
        $fto="fy"
        $hook={splitContainerHook}
        $column={direction === "column"}
        $reverse={reverse}
        $disabled={disabled}
        // $hidePrimary={hidePrimary || hideAbsolute}
        // $hideSecondary={hideSecondary || hideAbsolute}
        // $secondarySize={secondarySize}
        // $defaultHidePrimary
        // $defaultHideSecondary
        // $defaultSecondarySize={300}
      >
        <Content1 />
        <Content2 />
      </SplitContainer>
    </>
  );
};

const Content1: SplitContentFC<{ count?: number; }> = ({ $$mask, $$splitController, count }) => {
  const mask = useMask();
  const [counter, setCount] = useState(0);

  useEffect(() => {
    $$splitController?.setDispatcher((params) => {
      console.log(params);
    });
  }, [$$splitController]);

  return (
    <FlexBox $fto="f" style={{ background: CssVar.primary.bgc }}>
      <Label $type="h2">content 1</Label>
      <Caption $label="counter">
        <Label>{counter}</Label>
      </Caption>
      <Caption $label="count">
        <Label>{count}</Label>
      </Caption>
      <Button $click={() => {
        $$mask?.show();
        setTimeout(() => {
          $$mask?.close();
        }, 3000);
      }}>show parent mask</Button>
      <Button $click={() => {
        mask.show();
        setTimeout(() => {
          mask.close();
        }, 3000);
      }}>show root mask</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ partner: true });
      }}>show partner</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ partner: false });
      }}>hide partner</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ self: false });
      }}>hide self</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ self: false, partner: true });
      }}>toggle</Button>
      <Button $click={() => {
        setCount(c => c+1);
      }}>count up</Button>
      <Button $click={() => {
        $$splitController?.dispatch({
          count: counter,
        });
      }}>dispatch</Button>
      <Button $click={() => {
        console.log($$splitController?.isVisibleSelf(), $$splitController?.isVisiblePartner());
      }}>show visible</Button>
    </FlexBox>
  )
};

const Content2: SplitContentFC<{ count?: number; }> = ({ $$mask, $$splitController, count }) => {
  const mask = useMask();
  const [counter, setCount] = useState(0);

  return (
    <FlexBox $fto="f" style={{ background: CssVar.secondary.bgc }}>
      <Label $type="h2">content 2</Label>
      <Caption $label="counter">
        <Label>{counter}</Label>
      </Caption>
      <Caption $label="count">
        <Label>{count}</Label>
      </Caption>
      <Button $click={() => {
        $$mask?.show();
        setTimeout(() => {
          $$mask?.close();
        }, 3000);
      }}>show parent mask</Button>
      <Button $click={() => {
        mask.show();
        setTimeout(() => {
          mask.close();
        }, 3000);
      }}>show root mask</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ partner: true });
      }}>show partner</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ partner: false });
      }}>hide partner</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ self: false });
      }}>hide self</Button>
      <Button $click={() => {
        $$splitController?.setVisible({ self: false, partner: true });
      }}>toggle</Button>
      <Button $click={() => {
        setCount(c => c+1);
      }}>count up</Button>
      <Button $click={() => {
        $$splitController?.dispatch({
          count: counter,
        });
      }}>dispatch</Button>
      <Button $click={() => {
        console.log($$splitController?.isVisibleSelf(), $$splitController?.isVisiblePartner());
      }}>show visible</Button>
    </FlexBox>
  );
};

export default SplitContainerPage;