import { NextPage } from "next";
import { createRef, useState } from "react";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import TextBox, { useTextBox } from "../../../react-addon/dist/elements/inputs/text-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const TextBoxPage: NextPage = () => {
  const eref = createRef<HTMLDivElement>();
  const [value, setValue] = useState("");
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [resize, setResize] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">();
  const [border, setBorder] = useState<InputBorder>();
  const hook = useTextBox();
  const ref = createRef<HTMLDivElement>();

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
      <Caption $label="text align">
        <RadioButtons
          $value={textAlign}
          $dispatch={setTextAlign}
          $source={[
            { value: null, label: "unset" },
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
        />
      </Caption>
      <Caption $label="Border">
        <RadioButtons
          $value={border}
          $dispatch={setBorder}
          $source={[
            { value: null, label: "unset" },
            { value: "less", label: "Less" },
            { value: "under", label: "Under" },
            { value: "round", label: "Round" },
          ]}
        />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: "bind" })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue("state")}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue("hook");
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <FlexBox>
      <Caption $label="TextBox" $width={100}>
        <Row>
          <TextBox
            ref={ref}
            $hook={hook}
            $name="value"
            $bind={bind}
            $value={value}
            $dispatch={setValue}
            $textAlign={textAlign}
            $disabled={disabled}
            $readOnly={readOnly}
            $resize={resize}
            $border={border}
            $changing={(v) => {
              if (v === "1235") return false;
            }}
            $changed={(ctx) => {
              console.log(ctx.before, "->", ctx.after);
            }}
            $placeholder="text box"
          >
          </TextBox>
          <TextBox
            $placeholder="round"
            $disabled={disabled}
            $readOnly={readOnly}
            $resize={resize}
            $textAlign={textAlign}
            $border={border}
            $round
          />
          <TextBox
            ref={eref}
            $disabled={disabled}
            $readOnly={readOnly}
            $resize={resize}
            $border={border}
            placeholder="placeholder"
          >
            <Button $icon="signin" $click={() => {
              console.log(ref.current);
              console.log("TextBox addin Button", eref.current);
            }} />
          </TextBox>
          <TextBox
            ref={eref}
            $disabled={disabled}
            $readOnly={readOnly}
            $resize={resize}
            $border={border}
            placeholder="placeholder"
            $round
          >
            <Button $icon="signin" $round $signal="default" $click={() => {
              console.log(ref.current);
              console.log("TextBox addin Button", eref.current);
            }} />
          </TextBox>
        </Row>
      </Caption>
      <Caption $label="Value" $width={100}>
        <Label>{value}</Label>
      </Caption>
      <FlexBox>
        {signalIterator((s) => {
          return (
            <FlexBox $row key={s}>
              {/* <Label>{s}</Label> */}
              <Row>
                <TextBox
                  $signal={s}
                  $disabled={disabled}
                  $readOnly={readOnly}
                  $border={border}
                  // placeholder={s.toUpperCase()}
                  $placeholder={s}
                >
                  <Button $signal={s} $icon="signin" />
                </TextBox>
                <TextBox
                  $signal={s}
                  $disabled={disabled}
                  $readOnly={readOnly}
                  // $value={s}
                  $border={border}
                  placeholder={s}
                >
                  <Button $signal={s} $transparent $icon="signin"></Button>
                </TextBox>
              </Row>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
    </>
  );
};

export default TextBoxPage;