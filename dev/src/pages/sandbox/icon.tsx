import { NextPage } from "next";
import { createRef, useEffect, useMemo, useState } from "react";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon, { IconImage } from "../../../react-addon/dist/elements/icon";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import NumericBox from "../../../react-addon/dist/elements/inputs/numeric-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";

const icons: Array<IconImage> = [
  "favicon",
  "add",
  "minus",
  "cross",
  "check",
  "reorder",
  "hamburger",
  "align-left",
  "align-center",
  "align-right",
  "v-hamburger",
  "align-top",
  "align-middle",
  "align-bottom",
  "pull-up",
  "pull-down",
  "pull-left",
  "pull-right",
  "pull-left-d",
  "pull-right-d",
  "pull-x",
  "pull-y",
  "pull-ul",
  "pull-ur",
  "pull-dr",
  "pull-dl",
  "pull-uldr",
  "pull-urdl",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-x",
  "arrow-y",
  "arrow-ul",
  "arrow-ur",
  "arrow-dr",
  "arrow-dl",
  "arrow-uldr",
  "arrow-urdl",
  "signin",
  "signout",
  "user",
  "users",
  "post",
  "power",
  "rewind",
  "backwards",
  "stop",
  "pose",
  "play",
  "fast-forward",
  "download",
  "upload",
  "cloud",
  "cloud-check",
  "cloud-download",
  "cloud-upload",
  "home",
  "pen",
  "gear",
  "save",
  "save-as",
  "delete",
  "reload",
  "revert",
  "sync",
  "search",
  "filter",
  "graph-bar",
  "graph-border",
  "history",
  "code",
  "list",
  "clock",
  "calendar",
  "mail",
  "tel",
  "location",
  "flag",
  "clip",
  "share",
  "star",
  "star-border",
  "star-half",
  "heart",
  "message",
  "message-ellipse",
  "key",
  "lock",
  "unlock",
  "guard",
  "folder",
  "folder-check",
  "folder-add",
  "document",
  "note",
  "tag",
  "bookmark",
  "crown",
  "beginner",
  "circle",
  "border-circle",
  "c-check",
  "c-cross",
  "c-add",
  "c-minus",
  "c-play",
  "c-star",
  "information",
  "warning",
  "error",
  "question",
  "bell",
];

const IconPage: NextPage = () => {
  const [size, setSize] = useState(1.6);
  const [all, setAll] = useState(false);

  const elem = createRef<HTMLDivElement>();
  useEffect(() => {
    if (elem.current) elem.current.scrollTop = icons.length * 36;
  }, []);

  return (
    <>
    <Row>
      <Label>{icons.length}</Label>
      <Caption $label="Size">
        <NumericBox
          $value={size}
          $dispatch={setSize}
          $float={1}
          $incrementInterval={0.1}
          style={{ width: 80 }}
        />
      </Caption>
      <Caption $label="show all">
        <ToggleBox $value={all} $dispatch={setAll} />
      </Caption>
    </Row>
    <FlexBox $fto="fy" $scroll ref={elem} className="icon-container">
      {useMemo(() => {
        return icons.filter((v, idx) => {
          if (all) return true;
          return icons.length - idx < 10;
        }).map(icon => {
          return (
            <Caption key={icon} $label={icon} $width={150}>
              <Icon $image={icon} />
              {/* {colorIterator(s => {
                return <Icon key={s} $image={icon} $color={s} />;
              })} */}
              <Button $icon={{ $image: icon }} />
              <Button $icon={{ $image: icon }} $color="default" />
              <Button $icon={{ $image: icon }} $color="default" $transparent />
              {/* <Button $transparent $icon={{ $image: icon }} /> */}
              {/* <Button $transparent $icon={{ $image: icon }} $color="primary" /> */}
              <Button $icon={{ $image: icon, $color: "danger" }} $fillLabel>ボタン</Button>
              {/* <Icon $image={icon} $spinR />
              <Icon $image={icon} $spinL /> */}
            </Caption>
          );
        })
      }, []) }
      {/* <style global jsx>{`
        .bh-icon:hover {
          background: #d8d8d8;
        }
      `}</style> */}
      <style global jsx>{`
        .icon-container .bh-icon {
          --bh-fs: ${size}rem;
        }
      `}</style>
    </FlexBox>
    </>
  );
};

export default IconPage;