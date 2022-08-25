import { NextPage } from "next";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";

const SandBoxPage: NextPage = () => {
  return (
    <FlexBox $fto="f" $scroll $row style={{ gap: 2 }} $padding>
      {colorIterator((s, v) => {
        return (
          <FlexBox key={s} $fto="fx" $center>
            <Label $color={s}>{s}</Label>
            <div
              className="box"
              style={{
                background: v.bgc,
                borderColor: v.bdc,
                color: v.fc
              }}
            >
              {v.bgc}<br/>
              {v.fc}<br/>
              {v.bdc}
            </div>
            head
            <div
              className="box"
              style={{
                background: v.head.bgc,
                borderColor: v.head.bdc,
                color: v.head.fc
              }}
            >
              {v.head.bgc}<br/>
              {v.head.fc}<br/>
              {v.head.bdc}
            </div>
            nav
            <div
              className="box"
              style={{
                background: v.nav.bgc,
                // borderColor: v.nav.bdc,
                color: v.nav.fc
              }}
            >
              {v.nav.bgc}<br/>
              {v.nav.fc}<br/>
              {/* {v.nav.bdc} */}
            </div>
            ipt
            <div
              className="box"
              style={{
                background: v.ipt.bgc,
                borderColor: v.ipt.bdc,
                color: v.ipt.fc
              }}
            >
              {v.ipt.bgc}<br/>
              {v.ipt.fc}<br/>
              {v.ipt.bdc}
            </div>
            <div
              className="box"
              style={{
                background: v.ipt.on,
                borderColor: v.ipt.bdc,
                color: v.ipt.fc
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
              {v.btn.base.bgc}<br/>
              {v.btn.base.bdc}<br/>
              {v.btn.base.fc}
            </div>
            <div
              className="box"
              style={{
                background: v.btn.hvr.bgc,
                borderColor: v.btn.hvr.bdc,
                color: v.btn.hvr.fc,
              }}
            >
              {v.btn.hvr.bgc}<br/>
              {v.btn.hvr.bdc}<br/>
              {v.btn.hvr.fc}
            </div>
            <div
              className="box"
              style={{
                background: v.btn.act.bgc,
                borderColor: v.btn.act.bdc,
                color: v.btn.act.fc,
              }}
            >
              {v.btn.act.bgc}<br/>
              {v.btn.act.bdc}<br/>
              {v.btn.act.fc}
            </div>
          </FlexBox>
        );
      })}
      <style jsx>{`
        .box {
          box-sizing: border-box;
          width: 100%;
          font-size: 1.2rem;
          text-align: center;
          padding: 2px;
          border: 3px double transparent;
          margin-bottom: 2px;
          min-height: 10px;
          max-height: 54px;
          white-space: nowrap;
          overflow: hidden;
          line-height: 1.6rem;
        }
      `}</style>
    </FlexBox>
  );
};

export default SandBoxPage;