import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import MaskContainer, { MaskImage, useMask } from "../../../react-addon/dist/popups/mask";
import Row from "../../../react-addon/dist/elements/row";

const MaskPage: NextPage = () => {
  const rootMask = useMask();
  const mask = useMask();
  const [maskImage, setMaskImage] = useState<MaskImage>("spin");

  return (
    <>
    <Row $fill>
      <Caption $label="root">
        <Button $click={() => {
          rootMask.show();
          setTimeout(() => {
            rootMask.close();
          }, 3000);
        }}>show</Button>
      </Caption>
      <Caption $label="cont">
        <Button $click={() => {
          mask.show({
            image: maskImage,
            content: "Mask Mask Mask"
          });
        }}>mask</Button>
        <Button $click={() => {
          mask.close();
        }}>close</Button>
      </Caption>
      <RadioButtons
        $value={maskImage}
        $dispatch={setMaskImage}
        $source={[
          { value: null, label: "unset" },
          { value: "spin", label: "spin" },
          { value: "flow", label: "flow" },
        ]}
      />
    </Row>
    <MaskContainer
      $fto="fy"
      $hook={mask}
    >
      <Button $click={() => {
        console.log("clicked");
      }}>Button</Button>
      {ArrayUtils.generateArray(30, idx => <h1 key={idx}>Item {idx}</h1>)}
    </MaskContainer>
    </>
  );
};

export default MaskPage;