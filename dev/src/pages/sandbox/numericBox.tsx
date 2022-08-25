import { NextPage } from "next";
import { createRef, useState } from "react";
import NumericBox, { useNumericBox } from "../../../react-addon/dist/elements/inputs/numeric-box";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import Label from "../../../react-addon/dist/elements/label";
import { CssPV, colorIterator } from "../../../react-addon/dist/styles/css-var";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";

const NumericBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(1);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [resize, setResize] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">();
  const [border, setBorder] = useState<InputBorder>();
  const hook = useNumericBox();

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
        <Button $click={() => setTextAlign("left")}>left</Button>
        <Button $click={() => setTextAlign("center")}>center</Button>
        <Button $click={() => setTextAlign("right")}>right</Button>
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
        <Button $click={() => setBind({ value: 3000 })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue(2000)}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue(1000);
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <FlexBox>
      <Caption $label="NumericBox" $width={120}>
        <Row>
          <NumericBox
            ref={ref}
            $hook={hook}
            $name="value"
            $placeholder="numeric box"
            $bind={bind}
            $value={value}
            $dispatch={setValue}
            $textAlign={textAlign}
            $disabled={disabled}
            $readOnly={readOnly}
            $resize={resize}
            $border={border}
            $changed={(ctx) => {
              console.log(ctx.before, "->", ctx.after);
            }}
            $incrementInterval={0.1}
            $float={1}
            // $max={100}
            // $min={10}
            $changing={(v) => {
              console.log(v);
            }}
          />
          <NumericBox
            $disabled={disabled}
            $readOnly={readOnly}
            $border={border}
            $resize={resize}
            $placeholder="round"
            $round
          />
        </Row>
      </Caption>
      <Caption $label="Value" $width={100}>
        <Label>{value}</Label>
      </Caption>
      <FlexBox>
        {colorIterator((s) => {
          return (
            <FlexBox $row key={s}>
              <NumericBox
                $color={s}
                $disabled={disabled}
                $readOnly={readOnly}
                $border={border}
                // placeholder={s.toUpperCase()}
                $placeholder={s}
              />
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
    </>
  )
};

export default NumericBoxPage;