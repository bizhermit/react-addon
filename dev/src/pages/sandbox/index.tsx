import { NextPage } from "next";
import { colorIterator, CssPV } from "../../../react-addon/dist/styles/css-var";
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
            <FlexBox className="box" $color={s} $colorType="base">
              {v.bgc}
              <HLine $padding $margin />
              {v.fc}
              <HLine $padding $margin />
              {v.bdc}
            </FlexBox>
            head
            <FlexBox className="box" $color={s} $colorType="head">
              {v.head.bgc}
              <HLine $padding $margin />
              {v.head.fc}
              <HLine $padding $margin />
              {v.head.bdc}
            </FlexBox>
            nav
            <FlexBox className="box" $color={s} $colorType="nav">
              {v.nav.bgc}
              <HLine $padding $margin />
              {v.nav.fc}
              <HLine $padding $margin />
              {v.nav.bdc}
            </FlexBox>
            ipt
            <div
              className="box"
              style={{
                background: v.ipt.bgc,
                borderColor: v.ipt.bdc,
                color: v.ipt.fc
              }}
            >
              {v.ipt.bgc}
              <HLine />
              {v.ipt.fc}
              <HLine />
              {v.ipt.bdc}
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.on,
                borderColor: v.ipt.bdc,
                color: v.ipt.on_fc ?? v.ipt.fc
              }}
            >
              {v.ipt.on}
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.off,
                borderColor: v.ipt.bdc,
                color: v.ipt.fc
              }}
            >
              {v.ipt.off}
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.knob,
                borderColor: v.ipt.bdc,
                color: v.ipt.fc
              }}
            >
              {v.ipt.knob}
            </div>
            btn
            <div
              className="box"
              style={{
                background: v.btn.base.bgc,
                borderColor: v.btn.base.bdc,
                color: v.btn.base.fc,
              }}
            >
              <Label>base</Label>
            </div>
            <div
              className="box"
              style={{
                background: v.btn.hvr.bgc,
                borderColor: v.btn.hvr.bdc,
                color: v.btn.hvr.fc,
              }}
            >
              <Label>hover</Label>
            </div>
            <div
              className="box"
              style={{
                background: v.btn.act.bgc,
                borderColor: v.btn.act.bdc,
                color: v.btn.act.fc,
              }}
            >
              <Label>active</Label>
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