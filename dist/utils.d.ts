import { listenerHandler } from './types';
interface InkMarksGlobal {
    INKMARKS_ENVIRONMENT?: string;
    INKMARKS_DSN?: string;
    INKMARKS_RELEASE?: {
        id?: string;
    };
    __INKMARKS__: {
        globalEventProcessors?: any;
        logger?: any;
    };
}
export declare function on(type: string, fn: EventListenerOrEventListenerObject, target?: Document | Window): listenerHandler;
export declare function isNodeEnv(): boolean;
export declare function getGlobalObject<T>(): T & typeof globalThis & InkMarksGlobal;
export declare function getFunctionName(fn: unknown): string;
export declare function consoleSandbox(callback: () => any): any;
export declare function getUuid(): string;
export declare function parseUrl(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
export declare function getLocationHref(): string;
export declare function getWindowHeight(): number;
export declare function getWindowWidth(): number;
export declare function polyfill(): void;
export {};
