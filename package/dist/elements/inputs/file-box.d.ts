import React, { HTMLAttributes, ReactNode } from "react";
import { InputAttributes } from "../../hooks/value";
import { InputHook } from "../../utils/input";
import { ButtonAttributes } from "../button";
export declare type FileBoxHook = InputHook<File>;
export declare type FileAccept = ".txt" | ".csv" | ".jpg" | ".png" | ".gif" | ".conf" | ".zip" | ".data" | string;
export declare type FileBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<File> & {
    $hook?: FileBoxHook;
    $resize?: boolean;
    $accept?: Array<FileAccept>;
    $butotnAttributes?: Omit<ButtonAttributes, "$click" | "$hook">;
    $hideLabel?: boolean;
    children?: ReactNode;
};
declare const FileBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & InputAttributes<File, {}> & {
    $hook?: FileBoxHook;
    $resize?: boolean;
    $accept?: Array<FileAccept>;
    $butotnAttributes?: Omit<ButtonAttributes, "$click" | "$hook">;
    $hideLabel?: boolean;
    children?: ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useFileBox: () => FileBoxHook;
export default FileBox;
