/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 12:16:28
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-02 11:28:16
 * @Description: file content
 */

import { StringDecoder } from 'string_decoder'

export type event =
  | loadedEvent
  | clickEvent
  | touchEvent
  | metaEvent
  | customEvent

export enum EventType {
  Load = 'load',
  Click = 'click',
  Dblclick = 'dblclick',
  Touch = 'touch',
  Meta = 'meta',
  Custom = 'custom',
}

export type loadedEvent = {
  type: EventType.Load
  data: {}
}

export type clickEvent = {
  type: EventType.Click
  data: {
    target: string
    initialOffset: {
      top: number
      left: number
    }
  }
}

export type touchEvent = {
  type: EventType.Touch
  data: {
    target: string
    initialOffset: {
      top: number
      left: number
    }
  }
}

export type metaEvent = {
  type: EventType.Meta
  data: {
    href: string
    width: number
    height: number
  }
}

export type customEvent<T = unknown> = {
  type: EventType.Custom
  data: {
    tag: string
    payload: T
  }
}

export type eventWithTime = event & {
  timestamp: number
  delay?: number
}

export type blockClass = string | RegExp

export type monitorOptions<T> = {
  emit?: (e: T, isCheckout?: boolean) => void
  checkoutEveryNth?: number
  checkoutEveryNms?: number
  blockClass?: blockClass
  ignoreClass?: StringDecoder
  inlineStylesheet?: boolean
  // departed, please use sampling options
  mousemoveWait?: number
}

export type mousePosition = {
  x: number
  y: number
  id: number
  timeOffset: number
}

export type Handler = (event?: unknown) => void

export type Emitter = {
  on(type: string, handler: Handler): void
  emit(type: string, event?: unknown): void
}

export type listenerHandler = () => void

export interface InstrumentHandler {
  type: InstrumentHandlerType
  callback: InstrumentHandlerCallback
}

export type InstrumentHandlerType =
  | 'DOMContentLoaded'
  | 'touch'
  | 'click'
  | 'dblclick'
  | 'beforeunload'

export type InstrumentHandlerCallback = (data: any) => void

export interface InformationType {
  enterTimestamp?: number
  leaveTimestamp?: number
  userAgent?: string
}
