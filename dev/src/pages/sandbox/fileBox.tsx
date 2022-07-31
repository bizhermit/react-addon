import { NextPage } from "next";
import { createRef, useState } from "react";
import FileBox, { useFileBox } from "../../../react-addon/dist/elements/inputs/file-box";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import Label from "../../../react-addon/dist/elements/label";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";

const FileBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<File>();
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [resize, setResize] = useState(false);
  const [hideLabel, setHideLabel] = useState(false);
  const hook = useFileBox();
  
  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
      <Caption $label="resize">
        <ToggleBox $value={resize} $dispatch={setResize} />
      </Caption>
      <Caption $label="hide label">
        <ToggleBox $value={hideLabel} $dispatch={setHideLabel} />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => {
          console.log(value);
        }}>get</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="FileBox" $width={110}>
      <FileBox
        ref={ref}
        $hook={hook}
        $value={value}
        $dispatch={setValue}
        $name="fileBox"
        $bind={bind}
        $disabled={disabled}
        $readOnly={readOnly}
        $placeholder="file box"
        $changed={(ctx => {
          console.log(ctx.before, "->", ctx.after);
        })}
        $resize={resize}
        $butotnAttributes={{
          $icon: "folder"
        }}
        $hideLabel={hideLabel}
      />
    </Caption>
    <Caption $label="Value" $width={110}>
      <Label>{JSON.stringify(value?.type)}</Label>
    </Caption>
    {signalIterator(s => {
      return <FileBox key={s} $signal={s} $readOnly={readOnly} $disabled={disabled} $resize={resize} />;
    })}
    </>
  )
};

export default FileBoxPage;