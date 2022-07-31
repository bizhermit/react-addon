import { NextPage } from "next";
import { createRef, FC, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import FunctionKeyContainer, { generateFunctionKeyProps, useFunctionKey } from "../../../react-addon/dist/elements/function-key-container";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import { useMask } from "../../../react-addon/dist/popups/mask";
import Row from "../../../react-addon/dist/elements/row";

const FunctionKeyContainerPage: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Row>
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
        <Caption $label="buttonVisible">
          <ToggleBox $value={hideButton} $dispatch={setHideButton} />
        </Caption>
      </Row>
      <FunctionKeyContainer
        ref={ref}
        $fto="fy"
        $disabled={disabled}
        $hideButton={hideButton}
        $defaultActions={generateFunctionKeyProps((con) => {
          con
            .set("F11", {
              label: "elem",
              click: () => {
                console.log(ref.current)
              },
            })
            .set("F12", {
              label: "close",
              click: () => {
                console.log("close");
              }
            });
        })}
      >
        <FunctionKeyContent />
      </FunctionKeyContainer>
    </>
  );
};

const FunctionKeyContent: FC = () => {
  const mask = useMask();
  const fnKeyHook = useFunctionKey([{
    label: <FlexBox $center $middle>
      {/* <Icon $image="message" /> */}
      <Label>log</Label>
    </FlexBox>,
    click: (unlock) => {
      console.log("F1")
    },
  }, {
    removeKeyLabel: true,
  }, {
    label: <FlexBox $fto="fy" $center $middle>
      <Label>Mask</Label>
    </FlexBox>,
    click: () => {
      mask.show();
      setTimeout(() => {
        mask.close();
        fnKeyHook.focus();
      }, 1000);
    }
  }, null, {
    label: "alert",
    click: () => {
      alert("F5");
    },
  }]);

  return (
    <Row>
      <Button $click={() => {
        mask.show();
        setTimeout(() => {
          mask.close();
        }, 1500);
      }}>mask</Button>
    </Row>
  )
};

export default FunctionKeyContainerPage;