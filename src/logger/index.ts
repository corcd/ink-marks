/*
 * @Author: Whzcorcd
 * @Date: 2020-08-27 10:06:53
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-10 12:12:33
 * @Description: file content
 */

import { consoleSandbox, getGlobalObject } from '../utils'

const global = getGlobalObject<Window | NodeJS.Global>()

const PREFIX = '[Inkmarks] Logger'

class Logger {
  private static _instance: any

  private _enabled: boolean

  private constructor() {
    this._enabled = true
  }

  public static get Instance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger()
    }
    return Logger._instance
  }

  /**
   * 描述
   * @date 2020-09-01
   * @returns {void}
   */
  public disable(): void {
    this._enabled = false
  }

  /**
   * 描述
   * @date 2020-09-01
   * @returns {void}
   */
  public enable(): void {
    this._enabled = true
  }

  /**
   * 描述
   * @date 2020-09-01
   * @param {any} args
   * @returns {void}
   */
  public log(...args: any[]): void {
    if (!this._enabled) {
      return
    }
    consoleSandbox(() => {
      global.console.log(`${PREFIX}[Log]: ${args.join(' ')}`)
    })
  }

  /**
   * 描述
   * @date 2020-09-01
   * @param {any} args
   * @returns {void}
   */
  public warn(...args: any[]): void {
    if (!this._enabled) {
      return
    }
    consoleSandbox(() => {
      global.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`)
    })
  }

  /**
   * 描述
   * @date 2020-09-01
   * @param {any} args
   * @returns {void}
   */
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
  (global.__INKMARKS__.logger = Logger.Instance)

export { logger }
