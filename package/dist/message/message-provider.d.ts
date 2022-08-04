import React, { FC, ReactNode } from "react";
import { Signal } from "../styles/css-var";
declare type MessageCounts = {
    total: number;
    info: number;
    warn: number;
    err: number;
    notVerified: number;
};
export declare type MessageContextProps = {
    show: () => void;
    close: () => void;
    clear: () => void;
    append: (messages: Array<Message>) => void;
    error: (e: any) => void;
    getCounts: () => MessageCounts;
};
export declare const MessageContext: React.Context<MessageContextProps>;
export declare type MessageType = Signal | "info" | "error" | "";
export declare type Message = {
    title?: string;
    body?: string | Array<string>;
    type?: MessageType;
};
declare type _Message = {
    title?: string;
    body: Array<string>;
    type?: MessageType;
    verified: boolean;
    popuped: boolean;
    timestamp: number;
    key: number;
};
declare type ErrorMessage = {
    title: string;
    body: string;
};
export declare const MessageProvider: FC<{
    id?: string;
    defaultShowed?: boolean;
    popupStayingTime?: number;
    popupClickAction?: "close" | "showHistory" | "none";
    historyShowAnimationDuration?: number;
    preventClickToHideHistory?: boolean;
    errorMessage?: ErrorMessage | ((e: any) => ErrorMessage);
    changed?: (messages: Array<_Message>) => void;
    children?: ReactNode;
}>;
declare const useMessage: (callback?: (messages: Array<_Message>) => void) => MessageContextProps;
export default useMessage;
