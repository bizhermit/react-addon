import { KeyboardEvent } from "react";
export declare type DomEventProps = {
    element: HTMLElement | Window;
    type: keyof HTMLElementEventMap;
    listener: EventListenerOrEventListenerObject;
};
export declare class DomComponentClass {
    protected events: Array<DomEventProps>;
    constructor();
    dispose(): void;
    addEvent<T extends HTMLElement | Window>(element: T, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): T;
    removeEvent<T extends HTMLElement | Window>(element: T, type?: keyof HTMLElementEventMap, listener?: EventListenerOrEventListenerObject): T;
    removeEventIterator(func: (props: DomEventProps) => boolean | void): this;
}
export declare const getDomEventManager: () => DomComponentClass;
export declare const cloneDomElement: <T extends HTMLElement>(element: T, func?: (elem: T) => void) => T;
export declare const pressPositiveKey: (e: KeyboardEvent, func: (e: KeyboardEvent) => void, stopEvent?: boolean) => void;
