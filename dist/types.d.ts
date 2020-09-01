/// <reference types="node" />
import { StringDecoder } from 'string_decoder';
export declare type event = loadedEvent | clickEvent | touchEvent | metaEvent | customEvent;
export declare enum EventType {
    Load = "load",
    Click = "click",
    Dblclick = "dblclick",
    Touch = "touch",
    Meta = "meta",
    Custom = "custom"
}
export declare type loadedEvent = {
    type: EventType.Load;
    data: {};
};
export declare type clickEvent = {
    type: EventType.Click;
    data: {
        target: string;
        initialOffset: {
            top: number;
            left: number;
        };
    };
};
export declare type touchEvent = {
    type: EventType.Touch;
    data: {
        target: string;
        initialOffset: {
            top: number;
            left: number;
        };
    };
};
export declare type metaEvent = {
    type: EventType.Meta;
    data: {
        href: string;
        width: number;
        height: number;
    };
};
export declare type customEvent<T = unknown> = {
    type: EventType.Custom;
    data: {
        tag: string;
        payload: T;
    };
};
export declare type eventWithTime = event & {
    timestamp: number;
    delay?: number;
};
export declare type blockClass = string | RegExp;
export declare type monitorOptions<T> = {
    emit?: (e: T, isCheckout?: boolean) => void;
    checkoutEveryNth?: number;
    checkoutEveryNms?: number;
    blockClass?: blockClass;
    ignoreClass?: StringDecoder;
    inlineStylesheet?: boolean;
    mousemoveWait?: number;
};
export declare type mousePosition = {
    x: number;
    y: number;
    id: number;
    timeOffset: number;
};
export declare type Handler = (event?: unknown) => void;
export declare type Emitter = {
    on(type: string, handler: Handler): void;
    emit(type: string, event?: unknown): void;
};
export declare type listenerHandler = () => void;
export interface InstrumentHandler {
    type: InstrumentHandlerType;
    callback: InstrumentHandlerCallback;
}
export declare type InstrumentHandlerType = 'DOMContentLoaded' | 'touch' | 'click' | 'dblclick';
export declare type InstrumentHandlerCallback = (data: any) => void;
