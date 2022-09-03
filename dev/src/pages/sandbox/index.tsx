import { NextPage } from "next";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";
import HLine from "../../../react-addon/dist/elements/line";

const SandBoxPage: NextPage = () => {
  return (
    <FlexBox $fto="f" $scroll $row style={{ gap: 2 }} $padding>
      {colorIterator((s, v) => {
        return (
          <FlexBox key={s} $fto="fx" $center>
            <Label $color={s}>{s}</Label>
            <FlexBox className="box" $color={s} $colorType="base" $border>
              <Label>text</Label>
              <HLine $padding $margin />
              <Label $type="a">link</Label>
            </FlexBox>
            head
            <FlexBox className="box" $color={s} $colorType="head" $border>
              <Label>text</Label>
              <HLine $padding $margin />
              <Label $type="a">link</Label>
            </FlexBox>
            nav
            <FlexBox className="box" $color={s} $colorType="nav" $border>
              <Label>text</Label>
              <HLine $padding $margin />
              <Label $type="a">link</Label>
            </FlexBox>
            ipt
            <div
              className="box"
              style={{
                background: v.ipt.bgc,
                borderColor: v.ipt.bdc,
                color: v.ipt.fgc
              }}
            >
              input
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.on,
                borderColor: v.ipt.bdc,
                color: v.ipt.onf
              }}
            >
              on
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.off,
                borderColor: v.ipt.bdc,
                color: v.ipt.fgc
              }}
            >
              off
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.knb,
                borderColor: v.ipt.bdc,
                color: v.ipt.fgc
              }}
            >
              knob
            </div>
            btn
            <div
              className="box"
              style={{
                background: v.btn.base.bgc,
                borderColor: v.btn.base.bdc,
                color: v.btn.base.fgc,
              }}
            >
              base
            </div>
            <div
              className="box"
              style={{
                background: v.btn.hvr.bgc,
                borderColor: v.btn.hvr.bdc,
                color: v.btn.hvr.fgc,
              }}
            >
              hover
            </div>
            <div
              className="box"
              style={{
                background: v.btn.act.bgc,
                borderColor: v.btn.act.bdc,
                color: v.btn.act.fgc,
              }}
            >
              active
            </div>
          </FlexBox>
        );
      })}
      <style global jsx>{`
        .box {
          box-sizing: border-box;
          width: 100%;
          font-size: 1.2rem;
          text-align: center;
          padding: 2px;
          border: 3px double transparent;
          margin-bottom: 2px;
          min-height: 10px;
          max-width: 200px;
          max-height: 64px;
          white-space: nowrap;
          overflow: hidden;
          line-height: 1.6rem;
        }
      `}</style>
    </FlexBox>
  );
};

export default SandBoxPage;