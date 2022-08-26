import { NextPage } from "next";
import { createRef, useState } from "react";
import TextArea, { useTextArea } from "../../../react-addon/dist/elements/inputs/text-area";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const TextAreaPage: NextPage = () => {
  const eref = createRef<HTMLDivElement>();
  const [value, setValue] = useState("");
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [resize, setResize] = useState<"t" | "f" | "x" | "y" | "xy">();
  const [border, setBorder] = useState<InputBorder>();
  const hook = useTextArea();
  const ref = createRef<HTMLDivElement>();

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
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
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
      <Caption $label="TextArea" $width={100}>
        <TextArea
          ref={ref}
          $hook={hook}
          $name="value"
          $bind={bind}
          $value={value}
          $dispatch={setValue}
          // $textAlign={textAlign}
          $disabled={disabled}
          $readOnly={readOnly}
          $resize={r}
          $border={border}
          $change={(ctx) => {
            if (ctx.after === "1235") return false;
          }}
          $changed={(ctx) => {
            console.log(ctx.before, "->", ctx.after);
          }}
          $changing={(v) => {
            // console.log(v);
          }}
        />
        <TextArea
          ref={eref}
          $disabled={disabled}
          $readOnly={readOnly}
          $resize={r}
          $border={border}
        />
      </Caption>
      <Caption $label="Value" $width={100}>
        <pre>{value}</pre>
      </Caption>
      <FlexBox>
        {colorIterator((s) => {
          return (
            <FlexBox $row key={s}>
              {/* <Label>{s}</Label> */}
              <Row>
                <TextArea
                  $color={s}
                  $disabled={disabled}
                  $readOnly={readOnly}
                  // placeholder={s.toUpperCase()}
                  $placeholder={s}
                  $resize={r}
                  $border={border}
                />
                <TextArea
                  $color={s}
                  $disabled={disabled}
                  $readOnly={readOnly}
                  $value={s}
                  // placeholder="あかさたな"
                  $resize={r}
                  $border={border}
                />
              </Row>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
    </>
  );
};

export default TextAreaPage;