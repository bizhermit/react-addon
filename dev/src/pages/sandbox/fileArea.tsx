import { NextPage } from "next";
import { createRef, useState } from "react";
import { Color, colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import FileArea, { useFileArea } from "../../../react-addon/dist/elements/inputs/file-area";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";

const FileAreaPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<Array<File>>([]);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [padding, setPadding] = useState(true);
  const [resize, setResize] = useState<"t" | "f" | "x" | "y" | "xy">();
  const [color, setColor] = useState<Color>();
  const hook = useFileArea();

  const r = (() => {
    if (resize === "t") return true;
    if (resize === "f") return false;
    return resize;
  })();

  return (
    <>
      <Row $fill>
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
        <Caption $label="padding">
          <ToggleBox
            $value={padding}
            $dispatch={setPadding}
          />
        </Caption>
        <Caption $label="resize">
          <RadioButtons
            $source={[
              { value: null, label: "unset" },
              { value: "t", label: "True" },
              { value: "f", label: "False" },
              { value: "x", label: "X" },
              { value: "y", label: "Y" },
              { value: "xy", label: "XY" },
            ]}
            $value={resize}
            $dispatch={setResize}
          />
      </Caption>
      </Row>
      <Row>
        <Caption $label="bind">
          <Button $click={() => setBind({})}>clear</Button>
          <Button $click={() => setBind({})} >set</Button>
          <Button $click={() => console.log(bind)}>show</Button>
        </Caption>
        <Caption $label="hook">
          <Button $click={() => {
            hook.focus();
          }}>focus</Button>
          <Button $click={() => {
            console.log(hook.getValue());
          }}>get</Button>
          <Button $click={() => {
            // hook.setValue();
          }}>set</Button>
        </Caption>
        <Button $click={() => console.log(ref.current)}>ref</Button>
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
      <FlexBox $fto="fy" $padding $scroll>
        <FileArea
          $hook={hook}
          $disabled={disabled}
          $noPadding={!padding}
          style={{
            width: 500,
            height: 150,
          }}
          $color={color}
          $resize={r}
          ref={ref}
          $changed={(ctx) => {
            const files = [...value, ...ctx.files];
            setValue(files);
            return true;
          }}
        >
          <Label>ファイルを置いていけやァ！！</Label>
          <Icon $image="heart" />
          <Icon $image="folder-add" $color="disabled" />
        </FileArea>
        <FlexBox $fto="x">
          {value?.map((file, idx) => {
            return (
              <FlexBox $row $fto="x" key={idx + file.name}>
                <Label style={{ flex: 1 }}>{file.name}</Label>
                <Button $icon="delete" $click={() => {
                  value.splice(idx, 1);
                  setValue([...value]);
                }} />
              </FlexBox>
            );
          })}
        </FlexBox>
      </FlexBox>
    </>
  )
};

export default FileAreaPage;