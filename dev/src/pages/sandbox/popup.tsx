import { NextPage } from "next";
import Button from "../../../react-addon/dist/elements/button";
import Popup, { usePopup } from "../../../react-addon/dist/popups/popup";
import { createRef, useState } from "react";
import Row from "../../../react-addon/dist/elements/row";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import Icon from "../../../react-addon/dist/elements/icon";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import { useMask } from "../../../react-addon/dist/popups/mask";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import Label from "../../../react-addon/dist/elements/label";
import useMessage from "../../../react-addon/dist/message/message-provider";

const xPosArray = ["center", "outer", "inner", "outer-left", "outer-right", "inner-left", "inner-right"] as const;
type POSX = typeof xPosArray[number];
const yPosArray = ["center", "outer", "inner", "outer-bottom", "outer-top", "inner-bottom", "inner-top"] as const;
type POSY = typeof yPosArray[number]

const PopupPage: NextPage = () => {
  const popup = usePopup();
  const mask = useMask();
  const msg = useMessage();
  const [text, setText] = useState("text");
  const [useAnchorElement, setUseAnchorElement] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [posX, setPosX] = useState<POSX>();
  const [posY, setPosY] = useState<POSY>();
  const ref = createRef<HTMLDivElement>();

  return (
    <>
    <Row $fill>
      <Caption $label="transparent">
        <ToggleBox $value={transparent} $dispatch={setTransparent} />
      </Caption>
      <Caption $label="use anchor element">
        <ToggleBox $value={useAnchorElement} $dispatch={setUseAnchorElement} />
      </Caption>
    </Row>
    <Row $fill>
      <Caption $label="Pos X">
        <RadioButtons
          $value={posX}
          $dispatch={setPosX}
          $source={[{ label: "unset", value: null }, ...xPosArray.map(item => {
            return {
              label: item,
              value: item,
            }
          })]}
        />
      </Caption>
    </Row>
    <Row $fill>
      <Caption $label="Pos Y">
        <RadioButtons
          $value={posY}
          $dispatch={setPosY}
          $source={[{ label: "unset", value: null }, ...yPosArray.map(item => {
            return {
              label: item,
              value: item,
            }
          })]}
        />
      </Caption>
    </Row>
    <Row $fill>
      <TextBox
        ref={ref}
        $value={text}
        $dispatch={setText}
        $resize
      />
      <Button $click={() => {
        popup.show({
          transparent,
          position: {
            x: posX,
            y: posY,
          },
          anchor: useAnchorElement ? ref.current : undefined,
        });
        // mask.show();
        // setTimeout(() => {
        //   mask.close();
        // }, 3000);
      }}>show</Button>
      <Button $click={() => {
        popup.close();
      }}>close</Button>
      <Button $click={() => {
        popup.hide();
      }}>hide</Button>
      <Button $click={() => {
        popup.show();
        setTimeout(() => {
          popup.close();
        }, 3000);
      }}>show & timeout</Button>
    </Row>
    <Popup
      $hook={popup}
      $showed={() => {
        console.log("showed");
      }}
      $hid={() => {
        console.log("hid");
      }}
      $closed={() => {
        console.log("closed");
      }}
      $preventClickClose
      // $mask
    >
      <FlexBox
        $padding $center $middle style={{ width: 200, height: 200 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Icon $image="heart" />
        <Label>{text}</Label>
        <Button $click={() => {
          msg.show();
        }}>msg</Button>
      </FlexBox>
    </Popup>
    </>
  );
};

export default PopupPage;