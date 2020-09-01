/*
 * @Author: Whzcorcd
 * @Date: 2020-08-27 10:06:53
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 09:42:49
 * @Description: file content
 */

import { consoleSandbox, getGlobalObject } from '../utils'

const global = getGlobalObject<Window | NodeJS.Global>()

const PREFIX = 'Ink-Marks Logger'

class Logger {
  private _enabled: boolean

  constructor() {
    this._enabled = true
  }

  public disable(): void {
    this._enabled = false
  }

  public enable(): void {
    this._enabled = true
  }

  public log(...args: any[]): void {
    if (!this._enabled) {
      return
    }
    consoleSandbox(() => {
      global.console.log(`${PREFIX}[Log]: ${args.join(' ')}`)
    })
  }

  public warn(...args: any[]): void {
    if (!this._enabled) {
      return
    }
    consoleSandbox(() => {
      global.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`)
    })
  }

  public error(...args: any[]): void {
    if (!this._enabled) {
      return
    }
    consoleSandbox(() => {
      global.console.error(`${PREFIX}[Error]: ${args.join(' ')}`)
    })
  }
}

global.__INKMARKS__ = global.__INKMARKS__ || {}
const logger =
  (global.__INKMARKS__.logger as Logger) ||
  (global.__INKMARKS__.logger = new Logger())

export { logger }
