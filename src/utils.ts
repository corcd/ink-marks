/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 12:16:52
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-04 10:43:45
 * @Description: file content
 */

import { blockClass, eventWithTime, EventType, listenerHandler } from './types'

interface InkMarksGlobal {
  INKMARKS?: any
  INKMARKS_ENVIRONMENT?: string
  INKMARKS_DSN?: string
  INKMARKS_RELEASE?: {
    id?: string
  }
  __INKMARKS__: {
    globalEventProcessors?: any
    logger?: any
    reporter?: any
  }
}

export function on(
  type: string,
  fn: EventListenerOrEventListenerObject,
  target: Document | Window = document
): listenerHandler {
  const options = { capture: true, passive: true }
  target.addEventListener(type, fn, options)
  return () => target.removeEventListener(type, fn, options)
}

export function isNodeEnv(): boolean {
  return (
    Object.prototype.toString.call(
      typeof process !== 'undefined' ? process : 0
    ) === '[object process]'
  )
}

const fallbackGlobalObject = {}

export function getGlobalObject<T>(): T & typeof globalThis & InkMarksGlobal {
  return (isNodeEnv()
    ? global
    : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : fallbackGlobalObject) as T & typeof globalThis & InkMarksGlobal
}

const defaultFunctionName = '<anonymous>'

export function getFunctionName(fn: unknown): string {
  try {
    if (!fn || typeof fn !== 'function') {
      return defaultFunctionName
    }
    return fn.name || defaultFunctionName
  } catch (e) {
    return defaultFunctionName
  }
}

export function consoleSandbox(callback: () => any): any {
  const global = getGlobalObject<Window>()
  const levels = ['debug', 'info', 'warn', 'error', 'log', 'assert']

  if (!('console' in global)) {
    return callback()
  }

  // Perform callback manipulations
  const result = callback()

  return result
}

interface MsCryptoWindow extends Window {
  msCrypto?: Crypto
}

export function getUuid(): string {
  const global = getGlobalObject() as MsCryptoWindow
  const crypto = global.crypto || global.msCrypto

  if (!(crypto === void 0) && crypto.getRandomValues) {
    // Use window.crypto API if available
    const arr = new Uint16Array(8)
    crypto.getRandomValues(arr)

    // set 4 in byte 7
    arr[3] = (arr[3] & 0xfff) | 0x4000
    // set 2 most significant bits of byte 9 to '10'
    arr[4] = (arr[4] & 0x3fff) | 0x8000

    const pad = (num: number): string => {
      let v = num.toString(16)
      while (v.length < 4) {
        v = `0${v}`
      }
      return v
    }

    return (
      pad(arr[0]) +
      pad(arr[1]) +
      pad(arr[2]) +
      pad(arr[3]) +
      pad(arr[4]) +
      pad(arr[5]) +
      pad(arr[6]) +
      pad(arr[7])
    )
  }
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function parseUrl(
  url: string
): {
  host?: string
  path?: string
  query?: string
  protocol?: string
  relative?: string
} {
  if (!url) {
    return {}
  }

  const match = url.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
  )

  if (!match) {
    return {}
  }

  // coerce to undefined values to empty string so we don't get 'undefined'
  const query = match[6] || ''
  const fragment = match[8] || ''
  return {
    host: match[4],
    path: match[5],
    query: match[7],
    protocol: match[2],
    relative: match[5] + query + fragment, // everything minus origin
  }
}

export function getLocationHref(): string {
  try {
    return document.location.href
  } catch (oO) {
    return ''
  }
}

export function getWindowHeight(): number {
  return (
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight)
  )
}

export function getWindowWidth(): number {
  return (
    window.innerWidth ||
    (document.documentElement && document.documentElement.clientWidth) ||
    (document.body && document.body.clientWidth)
  )
}

export function polyfill() {
  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = (Array.prototype
      .forEach as unknown) as NodeList['forEach']
  }
}
