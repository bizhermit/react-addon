import { NextPage } from "next";
import DialogWindow, { DialogWindowFC, useDialogWindow } from "../../../react-addon/dist/popups/dialog-window";
import Button from "../../../react-addon/dist/elements/button";
import Row from "../../../react-addon/dist/elements/row";
import Label from "../../../react-addon/dist/elements/label";
import { useEffect, useState } from "react";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { Color, colorIterator, ColorType } from "../../../react-addon/dist/styles/css-var";
import DateBox from "../../../react-addon/dist/elements/inputs/date-box";

const DialogWindowPage: NextPage = () => {
  const hook = useDialogWindow();
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<Color>();
  const [colorType, setColorType] = useState<ColorType>();

  return (
    <>
    <Row $fill>
      <Button $click={() => {
        hook.show();
      }}>show</Button>
      <Button $click={() => {
        hook.close({ action: "close by parent button" });
      }}>close</Button>
      <Button $click={() => {
        hook.hide({ action: "hide by parent button" });
      }}>hide</Button>
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
    <Row $fill>
      <Button $click={() => {
        setCount(c => c+1);
      }}>count {count}</Button>
    </Row>
    <DialogWindow
      $hook={hook}
      $title="DialogWindow Title"
      // $modal
      $clickMaskAction="close"
      // $fullScreen
      $showed={() => {
        console.log("showed");
      }}
      $closed={(p) => {
        console.log("closed", p);
      }}
      $hid={(p) => {
        console.log("hid", p);
      }}
      $color={color}
      $colorType={colorType}
      // $hideHeader
      // $preventMove
      // $preventResize
    >
      <DialogWindowContent count={count} />
    </DialogWindow>
    </>
  );
};

const DialogWindowContent: DialogWindowFC<{ count: number; }> = ({ count, $$mask, $$dialogWindowController }) => {

  useEffect(() => {
    console.log("mount dialog window component");
    return () => {
      console.log("unmount dialog window component");
    };
  }, []);

  return (
    <>
      <Label>DialogWindow</Label>
      <Label>{count}</Label>
      <DateBox />
      <Row $fill>
        <Button $click={() => {
          $$mask?.show();
          setTimeout(() => {
            $$mask?.close();
          }, 2000);
        }}>mask</Button>
        <Button $click={() => {
          $$dialogWindowController?.close({ action: "close by button" });
        }}>close this</Button>
        <Button $click={() => {
          $$dialogWindowController?.hide({ action: "hide by button" });
        }}>hide this</Button>
      </Row>
      <DialogWindowPage />
    </>
  )
};

export default DialogWindowPage;