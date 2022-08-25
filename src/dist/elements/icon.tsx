import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React, { HTMLAttributes } from "react";
import CssVar, { CssPV, Color, colorIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-icon";
const cnc = `${cn}_c`;
export const iconCn = cn;

export type IconImage = "" | "favicon"
  | "add" | "minus" | "cross" | "check" | "reorder"
  | "hamburger" | "align-left" | "align-center" | "align-right"
  | "v-hamburger" | "align-top" | "align-middle" | "align-bottom"
  | "pull-up" | "pull-down" | "pull-left" | "pull-right" | "pull-x" | "pull-y"
  | "pull-ul" | "pull-ur" | "pull-dr" | "pull-dl" | "pull-uldr" | "pull-urdl"
  | "pull-left-d" | "pull-right-d"
  | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-x" | "arrow-y"
  | "arrow-ul" | "arrow-ur" | "arrow-dr" | "arrow-dl" | "arrow-uldr" | "arrow-urdl"
  | "signin" | "signout" | "user" | "users" | "post"
  | "power" | "rewind" | "backwards" | "stop" | "pose" | "play" | "fast-forward"
  | "download" | "upload"
  | "cloud" | "cloud-check" | "cloud-download" | "cloud-upload"
  | "home" | "pen" | "gear" | "save" | "save-as" | "delete"
  | "reload" | "revert" | "sync"
  | "search" | "filter" | "graph-bar" | "graph-border" | "history" | "code"
  | "list" | "clock" | "calendar" | "mail" | "tel" | "location" | "flag" | "clip" | "share"
  | "star" | "star-border" | "star-half" | "heart" | "message" | "message-ellipse"
  | "key" | "lock" | "unlock" | "guard"
  | "folder" | "folder-check" | "folder-add" | "document" | "note"
  | "tag" | "bookmark" | "crown" | "beginner"
  | "circle" | "border-circle"
  | "c-check" | "c-cross" | "c-add" | "c-minus" | "c-play" | "c-star"
  | "information" | "warning" | "error" | "question"
  ;

export type IconAttributes = HTMLAttributes<HTMLDivElement> & {
  $color?: Color;
  $image?: IconImage;
  $spinR?: boolean;
  $spinL?: boolean;
  $transition?: boolean;
};

const singleDivImages = ["users", "save-as", "sync", "graph-border", "history", "code", "calendar", "location", "clip", "lock", "unlock", "folder-check", "folder-add", "guard", "c-cross", "c-add", "document"];
const doubleDivImages = ["post", "cloud", "cloud-check", "cloud-download", "cloud-upload", "gear", "list", "share", "note"];

export const iconChildCount = (image: IconImage) => {
  if (singleDivImages.includes(image)) return 1;
  if (doubleDivImages.includes(image)) return 2;
  return 0;
}

const Icon = React.forwardRef<HTMLDivElement, IconAttributes>((attrs, ref) => {
  return (
    <div
      {...attributes(attrs, cn, `${cn}-${attrs.$image}`)}
      ref={ref}
      data-color={attrs.$color}
      data-spin={attrs.$spinR ? "r" : attrs.$spinL ? "l" : undefined}
      data-transition={attrs.$transition}
    >
      {ArrayUtils.generateArray(iconChildCount(attrs.$image), i => <div key={i} className={cnc} />)}
      {IconStyle}
    </div>
  );
});

export const varIconFc = "--bh-icon-fc";
const iconFc = `var(${varIconFc})`;
export const varIconBc = "--bh-icon-bc";
const iconBc = `var(${varIconBc})`;

export const IconStyle = <JsxStyle id={cn}>{() => `
.${cn} {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: calc(${CssVar.fs} * 1.5);
  width: calc(${CssVar.fs} * 1.5);
  flex: none;
  ${varIconFc}: ${CssVar.fc};
  ${varIconBc}: ${CssVar.bgc};
}
.${cnc} {
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  cursor: inherit;
}
.${cn}::before, 
.${cn}::after,
.${cn} > .${cnc}::before,
.${cn} > .${cnc}::after {
  ${CssPV.ba}
}
.${cn}[data-transition="true"]::before, 
.${cn}[data-transition="true"]::after,
.${cn}[data-transition="true"] > .${cnc}::before,
.${cn}[data-transition="true"] > .${cnc}::after {
  transition: background 0.1s, border-color 0.1s;
}
.${cn}[data-spin="r"] {
  animation: iconSpinR 3s linear 0s infinite normal;
}
.${cn}[data-spin="l"] {
  animation: iconSpinL 3s linear 0s infinite normal;
}
@keyframes iconSpinR {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes iconSpinL {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} {
  ${varIconFc}: ${v.fc} !important;
}`).join("")}
.${cn}-favicon::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background: url("/favicon.ico") center center no-repeat;
  background-size: cover;
  overflow: hidden;
}
.${cn}-add::before,
.${cn}-minus::before {
  height: 3px;
  width: 70%;
  top: calc(50% - 1.5px);
  left: 15%;
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-add::after {
  height: 70%;
  width: 3px;
  top: 15%;
  left: calc(50% - 1.5px);
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-cross::before,
.${cn}-cross::after {
  height: 80%;
  width: 3px;
  top: 10%;
  left: calc(50% - 1.5px);
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-cross::before {
  transform: rotate(45deg);
}
.${cn}-cross::after {
  transform: rotate(135deg);
}
.${cn}-check::before {
  width: 44%;
  height: 66%;
  top: 10%;
  left: 30%;
  transform: rotate(40deg);
  border-bottom: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
  border-radius: 1px;
}
.${cn}-reorder::before,
.${cn}-reorder::after {
  height: 3px;
  width: 70%;
  left: 15%;
  background: ${iconFc};
  border-radius: 1px;
}
.${cn}-reorder::before {
  top: calc(50% - 4px);
}
.${cn}-reorder::after {
  bottom: calc(50% - 4px);
}
.${cn}-hamburger::before,
.${cn}-align-left::before,
.${cn}-align-center::before,
.${cn}-align-right::before {
  height: 60%;
  width: 70%;
  top: 20%;
  left: 15%;
  border-top: 3px solid ${iconFc};
  border-bottom: 3px solid ${iconFc};
}
.${cn}-hamburger::after {
  height: 2px;
  width: 70%;
  top: calc(50% - 1.5px);
  left: 15%;
  border-top: 3px solid ${iconFc};
}
.${cn}-align-left::after,
.${cn}-align-center::after,
.${cn}-align-right::after {
  height: 2px;
  width: 50%;
  top: calc(50% - 1.5px);
  border-top: 3px solid ${iconFc};
}
.${cn}-align-left::after {
  left: 15%;
}
.${cn}-align-center::after {
  left: 25%;
}
.${cn}-align-right::after {
  left: 35%;
}
.${cn}-v-hamburger::before,
.${cn}-align-top::before,
.${cn}-align-middle::before,
.${cn}-align-bottom::before {
  height: 70%;
  width: 60%;
  top: 15%;
  left: 20%;
  border-left: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-v-hamburger::after {
  height: 70%;
  width: 2px;
  top: 15%;
  left: calc(50% - 1.5px);
  border-left: 3px solid ${iconFc};
}
.${cn}-align-top::after,
.${cn}-align-middle::after,
.${cn}-align-bottom::after {
  height: 50%;
  width: 2px;
  left: calc(50% - 1.5px);
  border-left: 3px solid ${iconFc};
}
.${cn}-align-top::after {
  top: 15%;
}
.${cn}-align-middle::after {
  top: 25%;
}
.${cn}-align-bottom::after {
  top: 35%;
}
.${cn}-pull-up::before,
.${cn}-pull-down::before,
.${cn}-pull-left::before,
.${cn}-pull-left-d::before,
.${cn}-pull-left-d::after,
.${cn}-pull-right::before,
.${cn}-pull-right-d::before,
.${cn}-pull-right-d::after {
  width: calc(60% - 3px);
  height: calc(60% - 3px);
  transform: rotate(45deg);
}
.${cn}-pull-up::before {
  top: calc(50% - 3px);
  left: 26%;
  border-top: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-down::before {
  bottom: calc(50% - 4px);
  left: 26%;
  border-bottom: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-left::before {
  bottom: 26%;
  right: 15%;
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-left-d::before,
.${cn}-pull-left-d::after {
  bottom: 26%;
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-left-d::before {
  right: -3%;
}
.${cn}-pull-left-d::after {
  right: 32%;
}
.${cn}-pull-right::before {
  bottom: 26%;
  left: 15%;
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-right-d::before,
.${cn}-pull-right-d::after {
  bottom: 26%;
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-right-d::before {
  left: -3%;
}
.${cn}-pull-right-d::after {
  left: 32%;
}
.${cn}-pull-x::before,
.${cn}-pull-x::after {
  width: 45%;
  height: 45%;
  top: 27.5%;
  border-radius: 1px;
  transform: rotate(45deg);
}
.${cn}-pull-x::before {
  left: 17%;
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-x::after {
  right: 17%;
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-y::before,
.${cn}-pull-y::after {
  width: 45%;
  height: 45%;
  left: 27.5%;
  border-radius: 1px;
  transform: rotate(45deg);
}
.${cn}-pull-y::before {
  top: 17%;
  border-top: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-y::after {
  bottom: 17%;
  border-bottom: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-ul::before,
.${cn}-pull-ur::before,
.${cn}-pull-dr::before,
.${cn}-pull-dl::before {
  width: 50%;
  height: 50%;
  border-radius: 1px;
}
.${cn}-pull-ul::before {
  left: 30%;
  top: 30%;
  border-top: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-ur::before {
  right: 30%;
  top: 30%;
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-dr::before {
  right: 30%;
  bottom: 30%;
  border-bottom: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-dl::before {
  left: 30%;
  bottom: 30%;
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-uldr::before,
.${cn}-pull-uldr::after,
.${cn}-pull-urdl::before,
.${cn}-pull-urdl::after {
  width: 45%;
  height: 45%;
  border-radius: 1px;
}
.${cn}-pull-uldr::before {
  top: 20%;
  left: 20%;
  border-top: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-pull-uldr::after {
  bottom: 20%;
  right: 20%;
  border-bottom: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-urdl::before {
  top: 20%;
  right: 20%;
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-pull-urdl::after {
  bottom: 20%;
  left: 20%;
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-arrow-up::before,
.${cn}-arrow-down::before,
.${cn}-arrow-left::before,
.${cn}-arrow-right::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background-color: ${iconFc};
}
.${cn}-arrow-up::before {
  clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 70% 50%, 70% 100%, 30% 100%, 30% 50%);
}
.${cn}-arrow-down::before {
  clip-path: polygon(0% 50%, 50% 100%, 100% 50%, 70% 50%, 70% 0%, 30% 0%, 30% 50%);
}
.${cn}-arrow-left::before {
  clip-path: polygon(0% 50%, 50% 0%, 50% 30%, 100% 30%, 100% 70%, 50% 70%, 50% 100%);
}
.${cn}-arrow-right::before {
  clip-path: polygon(0% 30%, 50% 30%, 50% 0%, 100% 50%, 50% 100%, 50% 70%, 0% 70%);
}
.${cn}-arrow-x::before {
  height: 70%;
  width: 80%;
  top: 15%;
  left: 10%;
  background-color: ${iconFc};
  clip-path: polygon(0% 50%, 35% 0%, 35% 30%, 65% 30%, 65% 0%, 100% 50%, 65% 100%, 65% 70%, 35% 70%, 35% 100%, 0% 50%);
}
.${cn}-arrow-y::before {
  height: 80%;
  width: 70%;
  top: 10%;
  left: 15%;
  background-color: ${iconFc};
  clip-path: polygon(0% 35%, 50% 0%, 100% 35%, 70% 35%, 70% 65%, 100% 65%, 50% 100%, 0% 65%, 30% 65%, 30% 35%);
}
.${cn}-arrow-ul::before,
.${cn}-arrow-ur::before,
.${cn}-arrow-dr::before,
.${cn}-arrow-dl::before {
  height: 66%;
  width: 66%;
  top: 17%;
  left: 17%;
  background-color: ${iconFc};
}
.${cn}-arrow-ul::before {
  clip-path: polygon(0% 0%, 90% 0%, 60% 30%, 100% 70%, 70% 100%, 30% 60%, 0% 90%);
}
.${cn}-arrow-ur::before {
  clip-path: polygon(10% 0%, 100% 0%, 100% 90%, 70% 60%, 30% 100%, 0% 70%, 40% 30%);
}
.${cn}-arrow-dr::before {
  clip-path: polygon(100% 10%, 100% 100%, 10% 100%, 40% 70%, 0% 30%, 30% 0%, 70% 40%);
}
.${cn}-arrow-dl::before {
  clip-path: polygon(90% 100%, 0% 100%, 0% 10%, 30% 40%, 70% 0%, 100% 30%, 60% 70%);
}
.${cn}-arrow-uldr::before,
.${cn}-arrow-urdl::before {
  height: 66%;
  width: 66%;
  top: 17%;
  left: 17%;
  background-color: ${iconFc};
}
.${cn}-arrow-uldr::before {
  clip-path: polygon(0% 75%, 0% 0%, 75% 0%, 50% 25%, 75% 50%, 100% 25%, 100% 100%, 25% 100%, 50% 75%, 25% 50%);
}
.${cn}-arrow-urdl::before {
  clip-path: polygon(100% 75%, 100% 0%, 25% 0%, 50% 25%, 25% 50%, 0% 25%, 0% 100%, 75% 100%, 50% 75%, 75% 50%);
}
.${cn}-signin::before,
.${cn}-signout::before {
  height: 80%;
  width: 60%;
  top: 10%;
  border: 2.5px solid ${iconFc};
}
.${cn}-signin::before {
  right: 15%;
  border-left-color: transparent;
}
.${cn}-signout::before {
  left: 15%;
  border-right-color: transparent;
}
.${cn}-signin::after,
.${cn}-signout::after {
  height: 54%;
  width: 54%;
  top: 23%;
  background-color: ${iconFc};
  clip-path: polygon(0% 30%, 50% 30%, 50% 0%, 100% 50%, 50% 100%, 50% 70%, 0% 70%);
}
.${cn}-signin::after {
  left: 15%;
}
.${cn}-signout::after {
  right: 10%;
}
.${cn}-user::before {
  height: 40%;
  width: 40%;
  border-radius: 50%;
  top: 12%;
  left: 30%;
  background: ${iconFc};
}
.${cn}-user::after {
  height: 33%;
  width: 70%;
  border-radius: 50% 50% 1px 1px;
  background: 50%;
  bottom: 13%;
  left: 15%;
  background: ${iconFc};
}
.${cn}-users::before {
  height: 38%;
  width: 38%;
  border-radius: 50%;
  top: 10%;
  right: 21%;
  background: ${iconFc};
  z-index: 0;
}
.${cn}-users::after {
  height: 33%;
  width: 58%;
  border-radius: 50% 50% 1px 1px;
  background: 50%;
  bottom: 20%;
  right: 10%;
  background: ${iconFc};
  z-index: 0;
}
.${cn}-users > .${cnc}::before {
  height: 38%;
  width: 38%;
  border-radius: 50%;
  top: 20%;
  left: 21%;
  background: ${iconFc};
  z-index: 1;
}
.${cn}-users > .${cnc}::after {
  height: 33%;
  width: 58%;
  border-radius: 50% 50% 1px 1px;
  background: 50%;
  bottom: 10%;
  left: 10%;
  background: ${iconFc};
  z-index: 1;
}
.${cn}-users > .${cnc} {
  filter: drop-shadow(2px -1px 0px ${iconBc});
  z-index: 1;
}
.${cn}-post::before {
  height: 40%;
  width: 2px;
  top: 30%;
  left: calc(50% - 1px);
  background-color: ${iconFc};
}
.${cn}-post::after {
  height: 30%;
  width: 60%;
  top: calc(50% - 1px);
  left: 20%;
  border-top: 2px solid ${iconFc};
  border-left: 2px solid ${iconFc};
  border-right: 2px solid ${iconFc};
}
.${cn}-post > .${cnc}::before,
.${cn}-post > .${cnc}::after {
  height: 24%;
  width: 24%;
  border-radius: 50%;
  background-color: ${iconFc};
}
.${cn}-post > .${cnc}:nth-child(1)::before {
  top: 10%;
  left: 38%;
}
.${cn}-post > .${cnc}:nth-child(1)::after {
  bottom: 10%;
  left: 38%;
}
.${cn}-post > .${cnc}:nth-child(2)::before {
  bottom: 10%;
  left: 10%;
}
.${cn}-post > .${cnc}:nth-child(2)::after {
  bottom: 10%;
  right: 10%;
}
.${cn}-power::before {
  height: 70%;
  width: 70%;
  top: 20%;
  left: 15%;
  border: 3px solid ${iconFc};
  border-radius: 50%;
  clip-path: polygon(0% 0%, 30% 0%, 30% 50%, 70% 50%, 70% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.${cn}-power::after {
  height: 40%;
  width: 3px;
  top: 10%;
  left: calc(50% - 1.5px);
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-stop::before {
  height: 50%;
  width: 50%;
  top: 25%;
  left: 25%;
  background-color: ${iconFc};
}
.${cn}-pose::before,
.${cn}-pose::after {
  height: 50%;
  width: 21%;
  top: 25%;
  background-color: ${iconFc};
}
.${cn}-pose::before {
  left: 25%;
}
.${cn}-pose::after {
  right: 25%;
}
.${cn}-play::before,
.${cn}-backwards::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  background-color: ${iconFc};
}
.${cn}-play::before {
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${cn}-backwards::before {
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}
.${cn}-fast-forward::before,
.${cn}-fast-forward::after,
.${cn}-rewind::before,
.${cn}-rewind::after {
  height: 40%;
  width: 40%;
  top: 30%;
  background-color: ${iconFc};
}
.${cn}-rewind::before,
.${cn}-rewind::after {
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}
.${cn}-fast-forward::before,
.${cn}-fast-forward::after {
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${cn}-fast-forward::before,
.${cn}-rewind::before {
  left: 10%;
}
.${cn}-fast-forward::after,
.${cn}-rewind::after {
  right: 10%;
}
.${cn}-download::before,
.${cn}-upload::before {
  height: 60%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: ${iconFc};
}
.${cn}-download::after,
.${cn}-upload::after {
  height: 30%;
  width: 80%;
  bottom: 15%;
  left: 10%;
  background-color: transparent;
  border-bottom: 2.5px solid ${iconFc};
  border-right: 2.5px solid ${iconFc};
  border-left: 2.5px solid ${iconFc};
}
.${cn}-download::before {
  clip-path: polygon(30% 0%, 70% 0%, 70% 40%, 100% 40%, 50% 100%, 0% 40%, 30% 40%);
}
.${cn}-upload::before {
  clip-path: polygon(50% 0%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%);
}
.${cn}-cloud::before,
.${cn}-cloud-check::before,
.${cn}-cloud-upload::before,
.${cn}-cloud-download::before,
.${cn}-cloud::after,
.${cn}-cloud-check::after,
.${cn}-cloud-upload::after,
.${cn}-cloud-download::after {
  height: 42%;
  width: 42%;
  border-radius: 50%;
  background-color: ${iconFc};
}
.${cn}-cloud::before,
.${cn}-cloud-check::before,
.${cn}-cloud-upload::before,
.${cn}-cloud-download::before {
  bottom: 20%;
  left: 10%;
}
.${cn}-cloud::after,
.${cn}-cloud-check::after,
.${cn}-cloud-upload::after,
.${cn}-cloud-download::after {
  top: 20%;
  left: 22%;
}
.${cn}-cloud > .${cnc}:nth-child(1)::before,
.${cn}-cloud-check > .${cnc}:nth-child(1)::before,
.${cn}-cloud-upload > .${cnc}:nth-child(1)::before,
.${cn}-cloud-download > .${cnc}:nth-child(1)::before {
  bottom: 20%;
  right: 10%;
  height: 34%;
  width: 34%;
  border-radius: 50%;
  background-color: ${iconFc};
}
.${cn}-cloud > .${cnc}:nth-child(1)::after,
.${cn}-cloud-check > .${cnc}:nth-child(1)::after,
.${cn}-cloud-upload > .${cnc}:nth-child(1)::after,
.${cn}-cloud-download > .${cnc}:nth-child(1)::after {
  top: 30%;
  right: 17%;
  height: 30%;
  width: 30%;
  border-radius: 50%;
  background-color: ${iconFc};
}
.${cn}-cloud > .${cnc}:nth-child(2)::before,
.${cn}-cloud-check > .${cnc}:nth-child(2)::before,
.${cn}-cloud-upload > .${cnc}:nth-child(2)::before,
.${cn}-cloud-download > .${cnc}:nth-child(2)::before {
  bottom: 20%;
  left: 30%;
  height: 30%;
  width: 45%;
  background-color: ${iconFc};
}
.${cn}-cloud-check > .${cnc}:nth-child(2)::after {
  height: 40%;
  width: 30%;
  top: 30%;
  left: 34%;
  border-right: 2.5px solid ${iconBc};
  border-bottom: 2.5px solid ${iconBc};
  transform: rotate(40deg);
  z-index: 1;
}
.${cn}-cloud-upload > div:nth-child(2)::after,
.${cn}-cloud-download > div:nth-child(2)::after {
  height: 44%;
  width: 44%;
  bottom: 17%;
  left: 28%;
  background-color: ${iconBc};
  z-index: 1;
}
.${cn}-cloud-upload > div:nth-child(2)::after {
  clip-path: polygon(50% 0%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%);
}
.${cn}-cloud-download > div:nth-child(2)::after {
  clip-path: polygon(30% 0%, 70% 0%, 70% 40%, 100% 40%, 50% 100%, 0% 40%, 30% 40%);
}
.${cn}-home::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  background-color: ${iconFc};
  clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 90% 50%, 90% 100%, 60% 100%, 60% 75%, 40% 75%, 40% 100%, 10% 100%, 10% 50%);
}
.${cn}-pen::before {
  height: 70%;
  width: 25%;
  top: 10%;
  left: 45%;
  border-radius: 2px 2px 0px 0px;
  transform: rotate(45deg);
  background-color: ${iconFc};
}
.${cn}-pen::after {
  height: 20%;
  width: 25%;
  bottom: 10%;
  left: 10%;
  transform: rotate(45deg);
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
.${cn}-gear::before {
  height: 60%;
  width: 60%;
  top: 20%;
  left: 20%;
  border-radius: 50%;
  background: ${iconFc};
}
.${cn}-gear::after {
  height: 40%;
  width: 40%;
  top: 30%;
  left: 30%;
  border-radius: 50%;
  background: ${iconBc};
  border: 3px double ${iconFc};
}
.${cn}-gear > .${cnc}::before,
.${cn}-gear > .${cnc}::after {
  height: 80%;
  width: 16%;
  background: ${iconFc};
  top: 10%;
  left: 42%;
  border-radius: 1px;
}
.${cn}-gear > .${cnc}:nth-child(1)::after {
  transform: rotate(45deg);
}
.${cn}-gear > .${cnc}:nth-child(2)::before {
  transform: rotate(90deg);
}
.${cn}-gear > .${cnc}:nth-child(2)::after {
  transform: rotate(135deg);
}
.${cn}-save::before,
.${cn}-save-as::before {
  height: 74%;
  width: 74%;
  top: 13%;
  left: 13%;
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 30% 0%, 30% 25%, 70% 25%, 70% 0%, 85% 0%, 100% 15%, 100% 100%, 80% 100%, 80% 50%, 20% 50%, 20% 90%, 85% 90%, 85% 100%, 0% 100%);
}
.${cn}-save::after,
.${cn}-save-as::after {
  height: 74%;
  width: 74%;
  top: 13%;
  left: 13%;
  background-color: ${iconFc};
  clip-path: polygon(50% 5%, 60% 5%, 60% 20%, 50% 20%);
}
.${cn}-save-as > .${cnc}::before,
.${cn}-note > .${cnc}:nth-child(2)::before {
  height: 55%;
  width: 20%;
  top: 15%;
  left: 56%;
  border-radius: 2px 2px 0px 0px;
  transform: rotate(45deg);
  background-color: ${iconFc};
  border: 0.5px solid ${iconBc};
  z-index: 2;
}
.${cn}-save-as > .${cnc}::after,
.${cn}-note > .${cnc}:nth-child(2)::after {
  height: 15%;
  width: 20%;
  bottom: 25%;
  left: 30%;
  transform: rotate(45deg);
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  z-index: 2;
}
.${cn}-delete::before {
  height: 76%;
  width: 76%;
  top: 12%;
  left: 12%;
  background-color: ${iconFc};
  clip-path: polygon(5% 10%, 40% 10%, 40% 0%, 60% 0%, 60% 10%, 95% 10%, 95% 20%, 85% 20%, 85% 90%, 75% 100%, 25% 100%, 15% 90%, 15% 20%, 5% 20%);
}
.${cn}-delete::after {
  height: 45%;
  width: 24%;
  top: 32%;
  left: 38%;
  border-left: 2px solid ${iconBc};
  border-right: 2px solid ${iconBc};
}
.${cn}-reload::before,
.${cn}-revert::before,
.${cn}-sync::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  border-radius: 50%;
  border: 2.5px solid ${iconFc};
}
.${cn}-reload::before {
  clip-path: polygon(0% 0%, 100% 0%, 100% 10%, 50% 50%, 100% 70%, 100% 100%, 0% 100%);
}
.${cn}-revert::before {
  clip-path: polygon(50% 50%, 0% 10%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 70%);
}
.${cn}-reload::after,
.${cn}-revert::after,
.${cn}-sync > .${cnc}::before,
.${cn}-sync > .${cnc}::after {
  background-color: ${iconFc};
  height: 40%;
  width: 30%;
}
.${cn}-reload::after {
  top: 17%;
  right: 8%;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  transform: rotate(45deg);
}
.${cn}-revert::after {
  top: 17%;
  left: 8%;
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
  transform: rotate(-45deg);
}
.${cn}-sync::before {
  clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 0% 40%, 0% 80%, 100% 60%, 100% 100%, 0% 100%);
}
.${cn}-sync > .${cnc}::before {
  top: 20%;
  right: 5%;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  transform: rotate(50deg);
}
.${cn}-sync > .${cnc}::after {
  bottom: 20%;
  left: 5%;
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
  transform: rotate(50deg);
}
.${cn}-search::before {
  height: 60%;
  width: 60%;
  top: 10%;
  left: 10%;
  border: 3px solid ${iconFc};
  background-color: transparent;
  border-radius: 50%;
}
.${cn}-search::after {
  height: 4px;
  width: 40%;
  bottom: 19%;
  right: 10%;
  transform: rotate(45deg);
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-filter::before {
  height: 72%;
  width: 72%;
  top: 14%;
  left: 14%;
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 100% 0%, 60% 50%, 60% 90%, 40% 100%, 40% 50%);
}
.${cn}-graph-bar::before,
.${cn}-graph-border::before {
  height: 80%;
  width: 80%;
  left: 10%;
  top: 10%;
  border-left: 2px solid ${iconFc};
  border-bottom: 2px solid ${iconFc};
}
.${cn}-graph-bar::after {
  height: calc(75% - 2px);
  width: 70%;
  left: 15%;
  top: 10%;
  background-color: ${iconFc};
  clip-path: polygon(10% 100%, 10% 50%, 25% 50%, 25% 100%, 35% 100%, 35% 20%, 50% 20%, 50% 100%, 60% 100%, 60% 40%, 75% 40%, 75% 100%, 85% 100%, 85% 0%, 100% 0%, 100% 100%);
}
.${cn}-graph-border > .${cnc}::before {
  height: 35%;
  width: 30%;
  left: calc(20% + 2px);
  top: 40%;
  border-top: 2px solid ${iconFc};
  border-left: 2px solid ${iconFc};
  transform: rotate(35deg);
}
.${cn}-graph-border > .${cnc}::after {
  height: 40%;
  width: 2px;
  left: calc(60% + 3px);
  top: 20%;
  border-left: 2px solid ${iconFc};
  transform: rotate(35deg);
}
.${cn}-history::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  border: 2.5px solid ${iconFc};
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%, 0% 50%);
}
.${cn}-history::after {
  background-color: ${iconFc};
  top: 40%;
  left: 0%;
  height: 25%;
  width: 30%;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}
.${cn}-history > .${cnc}::before {
  height: 30%;
  width: 25%;
  top: calc(25% + 1px);
  right: calc(25% + 1px);
  border-left: 2.5px solid ${iconFc};
  border-bottom: 2.5px solid ${iconFc};
}
.${cn}-code::before,
.${cn}-code::after {
  width: 35%;
  height: 35%;
  top: 35%;
  border-radius: 1px;
}
.${cn}-code::before {
  left: 10%;
  transform: rotate(45deg);
  border-bottom: 3px solid ${iconFc};
  border-left: 3px solid ${iconFc};
}
.${cn}-code::after {
  right: 10%;
  transform: rotate(45deg);
  border-top: 3px solid ${iconFc};
  border-right: 3px solid ${iconFc};
}
.${cn}-code > .${cnc}::before {
  height: 64%;
  width: 2px;
  top: 20%;
  left: calc(50% - 1px);
  background-color: ${iconFc};
  transform: rotate(10deg);
}
.${cn}-list::before,
.${cn}-list > .${cnc}::before {
  height: 20%;
  width: 20%;
  left: 5%;
  background-color: ${iconFc};
  clip-path: circle(40% at 50% 50%);
}
.${cn}-list::after,
.${cn}-list > .${cnc}::after {
  height: 20%;
  width: 55%;
  left: 35%;
  background-color: ${iconFc};
  clip-path: polygon(0% 35%, 100% 35%, 100% 65%, 0% 65%);
}
.${cn}-list::before,
.${cn}-list::after {
  top: 15%;
}
.${cn}-list > .${cnc}:nth-child(1)::before,
.${cn}-list > .${cnc}:nth-child(1)::after {
  top: 40%;
}
.${cn}-list > .${cnc}:nth-child(2)::before,
.${cn}-list > .${cnc}:nth-child(2)::after {
  top: 65%;
}
.${cn}-clock::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border: 2.5px solid ${iconFc};
  border-radius: 50%;
}
.${cn}-clock::after {
  height: 35%;
  width: 30%;
  top: calc(20% + 1px);
  right: calc(20% + 1px);
  border-left: 2.5px solid ${iconFc};
  border-bottom: 2.5px solid ${iconFc};
}
.${cn}-calendar::before {
  height: 70%;
  width: 80%;
  top: 15%;
  left: 10%;
  border: 1.5px solid ${iconFc};
  border-top-width: 4px;
  border-radius: 1px;
}
.${cn}-calendar::after {
  top: 37%;
}
.${cn}-calendar > .${cnc}:nth-child(1)::before {
  top: 52%;
}
.${cn}-calendar > .${cnc}:nth-child(1)::after {
  top: 67%;
}
.${cn}-calendar::after,
.${cn}-calendar > .${cnc}::before,
.${cn}-calendar > .${cnc}::after {
  width: 60%;
  height: 8%;
  left: 20%;
  background-color: ${iconFc};
  clip-path: polygon(0% 100%, 0% 0%, 14.2% 0%, 14.2% 100%, 28.4% 100%, 28.4% 0%, 42.6% 0%, 42.6% 100%, 56.8% 100%, 56.8% 0%, 71% 0%, 71% 100%, 85.2% 100%, 85.2% 0%, 100% 0%, 100% 100%);
}
.${cn}-mail::before {
  height: 60%;
  width: 80%;
  top: 20%;
  left: 10%;
  background-color: ${iconFc};
  clip-path: polygon(0% 10%, 50% 60%, 100% 10%, 100% 100%, 0% 100%);
  border-radius: 2px;
}
.${cn}-mail::after {
  height: calc(40% - 4px);
  width: calc(80% - 2px);
  top: 20%;
  left: calc(10% + 1px);
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
}
.${cn}-tel::before {
  height: 86%;
  width: 44%;
  top: 12%;
  left: 26%;
  border: calc(${CssVar.fs} * 0.4) solid ${iconFc};
  border-right: none;
  border-radius: 50% 1px 1px 50%;
  clip-path: polygon(0% 0%, 75% 0%, 75% 100%, 85% 100%, 85% 0%, 100% 0%, 100% 100%, 0% 100%);
  transform: rotate(-45deg);
}
.${cn}-location::before,
.${cn}-location::after {
  height: 56%;
  width: 56%;
  top: 10%;
  left: 22%;
}
.${cn}-location::before {
  background: ${iconFc};
  clip-path: circle(48% at 50%);
}
.${cn}-location::after {
  background: ${iconBc};
  clip-path: circle(20% at 50%);
}
.${cn}-location > .${cnc}::before {
  height: 41%;
  width: 58%;
  top: 45%;
  left: 21%;
  background-color: ${iconFc};
  clip-path: polygon(5% 0%, 5% 2%, 50% 40%, 95% 0%, 95% 2%, 51% 100%, 49% 100%);
}
.${cn}-flag::before {
  height: 45%;
  width: 60%;
  top: calc(10% + 1px);
  left: calc(15% + 3.5px);
  background: ${iconFc};
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${cn}-flag::after {
  height: 80%;
  width: 2px;
  top: 10%;
  left: 15%;
  background-color: ${iconFc};
  border-radius: 1px;
}
.${cn}-clip::before {
  height: 65%;
  width: 50%;
  left: 25%;
  top: 30%;
  border-radius: 0 0 50% 50% / 0 0 30% 30%;
  border: 2px solid ${iconFc};
  border-top: none;
}
.${cn}-clip::after {
  height: 50%;
  width: 35%;
  left: 25%;
  top: 5%;
  border-radius: 50% 50% 0 0 / 30% 30% 0 0;
  border: 2px solid ${iconFc};
  border-bottom: none;
}
.${cn}-clip > .${cnc}::before {
  height: 45%;
  width: 20%;
  left: 40%;
  top: 30%;
  border-radius: 0 0 50% 50% / 0 0 30% 30%;
  border: 2px solid ${iconFc};
  border-top: none;
}
.${cn}-share::before,
.${cn}-share::after,
.${cn}-share > .${cnc}:nth-child(1)::before {
  height: 24%;
  width: 24%;
  border-radius: 50%;
  background-color: ${iconFc};
}
.${cn}-share::before {
  top: 38%;
  left: 15%;
}
.${cn}-share::after {
  top: 15%;
  right: 15%;
}
.${cn}-share > .${cnc}:nth-child(1)::before {
  right: 15%;
  bottom: 15%;
}
.${cn}-share > .${cnc}:nth-child(2)::before,
.${cn}-share > .${cnc}:nth-child(2)::after {
  height: 2px;
  width: calc(80% - 4px);
  background-color: ${iconFc};
  left: 15%;
}
.${cn}-share > .${cnc}:nth-child(2)::before {
  transform: rotate(-25deg);
  top: 34%;
}
.${cn}-share > .${cnc}:nth-child(2)::after {
  transform: rotate(25deg);
  bottom: 34%;
}
.${cn}-star::before,
.${cn}-star-border::before,
.${cn}-star-half::before {
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  background-color: ${iconFc};
}
.${cn}-star-border::after,
.${cn}-star-half::after {
  height: calc(90% - 10px);
  width: calc(90% - 10px);
  top: calc(5% + 5px);
  left: calc(5% + 5px);
  background-color: ${iconBc};
}
.${cn}-c-star::after {
  height: 60%;
  width: 60%;
  left: 20%;
  top: 20%;
  background: ${iconBc};
}
.${cn}-star::before,
.${cn}-star-border::before,
.${cn}-star-border::after,
.${cn}-star-half::before,
.${cn}-c-star::after {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
.${cn}-star-half::after {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%);
}
.${cn}-heart::before {
  height: 40%;
  width: 70%;
  top: 30%;
  left: 4%;
  background-color: ${iconFc};
  transform: rotate(45deg);
  border-radius: 30% 0 0 50% / 50% 0 0 50%;
}
.${cn}-heart::after {
  height: 40%;
  width: 70%;
  top: 30%;
  right: 4%;
  background-color: ${iconFc};
  transform: rotate(-45deg);
  border-radius: 0 30% 50% 0 / 0 50% 50% 0;
}
.${cn}-message::before,
.${cn}-message-ellipse::before {
  top: 15%;
  left: 10%;
  height: 60%;
  width: 80%;
  border: 2px solid ${iconFc};
  border-radius: 3px;
  z-index: 0;
}
.${cn}-message-ellipse::before {
  border-radius: 50%;
}
.${cn}-message::after {
  bottom: 10%;
  right: 25%;
  height: 20%;
  width: 30%;
  background-color: ${iconFc};
  clip-path: polygon(20% 0%, 100% 0%, 0% 100%);
  z-index: 0;
}
.${cn}-message-ellipse::after {
  bottom: 12%;
  right: 25%;
  height: 20%;
  width: 30%;
  background-color: ${iconFc};
  clip-path: polygon(20% 10%, 100% 0%, 0% 100%);
  z-index: 0;
}
.${cn}-key::before {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 10%;
  background-color: transparent;
  border: 4px solid ${iconFc};
  border-radius: 50%;
}
.${cn}-key::after {
  height: 50%;
  width: 8px;
  top: 35%;
  left: 55%;
  background-color: ${iconFc};
  clip-path: polygon(0% 0%, 0% 100%, 40% 100%, 40% 90%, 100% 90%, 100% 70%, 60% 70%, 60% 60%, 100% 60%, 100% 40%, 40% 40%, 40% 0%);
  transform: rotate(-45deg);
}
.${cn}-lock::before,
.${cn}-unlock::before {
  height: 50%;
  width: 80%;
  bottom: 10%;
  left: 10%;
  background-color: ${iconFc};
  border-radius: 2px;
}
.${cn}-lock::after,
.${cn}-unlock::after {
  height: 50%;
  width: 50%;
  top: 10%;
  left: 25%;
  background-color: transparent;
  border-radius: 50% / 30%;
  border-top: 2.5px solid ${iconFc};
  border-left: 2.5px solid ${iconFc};
  border-right: 2.5px solid ${iconFc};
}
.${cn}-unlock::after {
  clip-path: polygon(0% 0%, 100% 0%, 100% 35%, 50% 35%, 100% 100%, 0% 100%);
}
.${cn}-lock > .${cnc},
.${cn}-unlock > .${cnc} {
  z-index: 1;
}
.${cn}-lock > .${cnc}::before,
.${cn}-unlock > .${cnc}::before {
  height: 16%;
  width: 16%;
  top: 50%;
  left: 42%;
  background-color: ${iconBc};
  border-radius: 50%;
}
.${cn}-lock > .${cnc}::after,
.${cn}-unlock > .${cnc}::after {
  height: 20%;
  width: 4%;
  top: 56%;
  left: 48%;
  background-color: ${iconBc};
}
.${cn}-guard::before,
.${cn}-guard > .${cnc}::before,
.${cn}-guard > .${cnc}::after {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
}
.${cn}-guard::before {
  background-color: ${iconFc};
  clip-path: polygon(0% 10%, 50% 0%, 100% 10%, 90% 80%, 50% 100%, 10% 80%);
}
.${cn}-guard > .${cnc}::before {
  background-color: ${iconBc};
  clip-path: polygon(50% 45%, 85% 45%, 80% 75%, 50% 90%, 50% 75%);
  opacity: 0.8;
}
.${cn}-guard > .${cnc}::after {
  background-color: ${iconBc};
  clip-path: polygon(10% 18%, 50% 10%, 50% 45%, 14% 45%);
  opacity: 0.8;
}
.${cn}-folder::before,
.${cn}-folder-check::before,
.${cn}-folder-add::before {
  height: 15%;
  width: 60%;
  top: 11%;
  left: 10%;
  background: ${iconFc};
  clip-path: polygon(0% 100%, 10% 0%, 90% 0%, 100% 100%);
}
.${cn}-folder::after,
.${cn}-folder-check::after,
.${cn}-folder-add::after {
  height: 60%;
  width: 84%;
  top: 25%;
  left: 8%;
  background: ${iconFc};
  border-radius: 2px;
}
.${cn}-folder-check > .${cnc}::before {
  height: 40%;
  width: 30%;
  top: 29%;
  left: 34%;
  border-right: 2px solid ${iconBc};
  border-bottom: 2px solid ${iconBc};
  transform: rotate(40deg);
  z-index: 1;
}
.${cn}-folder-add > .${cnc} {
  z-index: 1;
}
.${cn}-folder-add > .${cnc}::before {
  height: 44%;
  width: 2.5px;
  top: 28%;
  left: calc(50% - 1.25px);
  background-color: ${iconBc};
  border-radius: 1px;
}
.${cn}-folder-add > .${cnc}::after {
  height: 2.5px;
  width: 44%;
  top: calc(50% - 1.25px);
  left: 28%;
  background-color: ${iconBc};
  border-radius: 1px;
}
.${cn}-document::before,
.${cn}-note::before {
  height: 80%;
  width: 70%;
  top: 10%;
  left: 15%;
  border: 2px solid ${iconFc};
  clip-path: polygon(0% 0%, 60% 0%, 100% 30%, 100% 100%, 0% 100%);
  border-radius: 1px;
}
.${cn}-document::after,
.${cn}-note::after {
  height: 25%;
  width: 25%;
  right: 15%;
  top: 10%;
  background: ${iconFc};
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  border-radius: 1px;
}
.${cn}-document > .${cnc}::before,
.${cn}-note > .${cnc}:nth-child(1)::before {
  height: 40%;
  width: 40%;
  top: 30%;
  left: 30%;
  border-top: 2px solid ${iconFc};
  border-bottom: 2px solid ${iconFc};
}
.${cn}-document > .${cnc}::after,
.${cn}-note > .${cnc}:nth-child(1)::after {
  height: 2px;
  width: 40%;
  top: calc(50% - 1px);
  left: 30%;
  border-top: 2px solid ${iconFc};
}
.${cn}-tag::before {
  height: 80%;
  width: 80%;
  top: 13%;
  left: 13%;
  background: ${iconFc};
  clip-path: polygon(0% 0%, 45% 0%, 100% 55%, 55% 100%, 0% 45%);
}
.${cn}-tag::after {
  height: 3px;
  width: 3px;
  top: 25%;
  left: 25%;
  background: ${iconBc};
  border-radius: 50%;
}
.${cn}-bookmark::before {
  height: 80%;
  width: 50%;
  top: 10%;
  left: 25%;
  border-radius: 2px;
  background: ${iconFc};
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%);
}
.${cn}-crown::before {
  height: 70%;
  width: 80%;
  top: 15%;
  left: 10%;
  background: ${iconFc};
  clip-path: polygon(90% 100%, 10% 100%, 0% 15%, 25% 45%, 50% 0%, 75% 45%, 100% 15%);
}
.${cn}-beginner::before {
  height: 86%;
  width: 60%;
  top: 7%;
  left: 20%;
  border-radius: 2px;
  background: ${iconFc};
  clip-path: polygon(0% 0%, 50% 25%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
}
.${cn}-beginner::after {
  height: calc(86% - 5px);
  width: calc(30% - 2px);
  top: calc(7% + 3px);
  left: calc(20% + 1.5px);
  background: ${iconBc};
  clip-path: polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%);
}
.${cn}-circle::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background: ${iconFc};
  border-radius: 50%;
}
.${cn}-border-circle::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  border: 2px solid ${iconFc};
  border-radius: 50%;
}
.${cn}-c-check::before,
.${cn}-c-cross::before,
.${cn}-c-add::before,
.${cn}-c-minus::before,
.${cn}-c-play::before,
.${cn}-c-star::before,
.${cn}-information::before,
.${cn}-error::before,
.${cn}-question::before {
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  background: ${iconFc};
}
.${cn}-c-check::after {
  width: 33%;
  height: 48%;
  top: 22%;
  left: 33%;
  transform: rotate(40deg);
  border-bottom: 2.5px solid ${iconBc};
  border-right: 2.5px solid ${iconBc};
  border-radius: 1px;
}
.${cn}-c-cross > .${cnc}::before,
.${cn}-c-cross > .${cnc}::after,
.${cn}-c-add > .${cnc}::before,
.${cn}-c-minus::after {
  width: 50%;
  height: 2px;
  top: calc(50% - 1px);
  left: 25%;
  background-color: ${iconBc};
  border-radius: 1px;
}
.${cn}-c-cross > .${cnc}::before {
  transform: rotate(45deg);
}
.${cn}-c-cross > .${cnc}::after {
  transform: rotate(-45deg);
}
.${cn}-c-add > .${cnc}::after {
  width: 2px;
  height: 50%;
  top: 25%;
  left: calc(50% - 1px);
  background-color: ${iconBc};
  border-radius: 1px;
}
.${cn}-c-play::after {
  height: 36%;
  width: 36%;
  top: 32%;
  left: 37%;
  background-color: ${iconBc};
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.${cn}-information::before,
.${cn}-warning::before,
.${cn}-error::before,
.${cn}-question::before {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: ${CssVar.fs};
  color: ${iconBc};
  font-weight: bold;
  padding-top: 2px;
}
.${cn}-information::before {
  content: "i" !important;
}
.${cn}-warning::before {
  content: "!" !important;
  height: 84%;
  width: 84%;
  top: 8%;
  left: 8%;
  background: ${iconFc};
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  padding-top: 7px;
}
.${cn}-error::before {
  content: "!" !important;
}
.${cn}-question::before {
  content: "?" !important;
}
`}</JsxStyle>;

export default Icon;