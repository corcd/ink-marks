/*
 * @Author: Whzcorcd
 * @Date: 2020-08-27 10:06:53
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 10:45:05
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
  (global.__INKMARKS__.logger = new Logger())

export { logger }
