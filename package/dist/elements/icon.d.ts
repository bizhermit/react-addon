import React, { HTMLAttributes } from "react";
import { Signal } from "../styles/css-var";
export declare const iconCn = "bh-icon";
export declare type IconImage = "" | "favicon" | "add" | "minus" | "cross" | "check" | "reorder" | "hamburger" | "align-left" | "align-center" | "align-right" | "v-hamburger" | "align-top" | "align-middle" | "align-bottom" | "pull-up" | "pull-down" | "pull-left" | "pull-right" | "pull-x" | "pull-y" | "pull-ul" | "pull-ur" | "pull-dr" | "pull-dl" | "pull-uldr" | "pull-urdl" | "pull-left-d" | "pull-right-d" | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-x" | "arrow-y" | "arrow-ul" | "arrow-ur" | "arrow-dr" | "arrow-dl" | "arrow-uldr" | "arrow-urdl" | "signin" | "signout" | "user" | "users" | "post" | "power" | "rewind" | "backwards" | "stop" | "pose" | "play" | "fast-forward" | "download" | "upload" | "cloud" | "cloud-check" | "cloud-download" | "cloud-upload" | "home" | "pen" | "gear" | "save" | "save-as" | "delete" | "reload" | "revert" | "sync" | "search" | "filter" | "graph-bar" | "graph-border" | "history" | "code" | "list" | "clock" | "calendar" | "mail" | "tel" | "location" | "flag" | "clip" | "share" | "star" | "star-border" | "star-half" | "heart" | "message" | "message-ellipse" | "key" | "lock" | "unlock" | "guard" | "folder" | "folder-check" | "folder-add" | "document" | "note" | "tag" | "bookmark" | "crown" | "beginner" | "circle" | "border-circle" | "c-check" | "c-cross" | "c-add" | "c-minus" | "c-play" | "c-star" | "information" | "warning" | "error" | "question";
export declare type IconAttributes = HTMLAttributes<HTMLDivElement> & {
    $signal?: Signal;
    $image?: IconImage;
    $spinR?: boolean;
    $spinL?: boolean;
};
export declare const iconChildCount: (image: IconImage) => 0 | 1 | 2;
declare const Icon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $signal?: Signal;
    $image?: IconImage;
    $spinR?: boolean;
    $spinL?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
export declare const IconStyle: JSX.Element;
export default Icon;
