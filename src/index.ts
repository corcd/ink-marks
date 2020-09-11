/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:07:47
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-11 11:15:42
 * @Description: file content
 */

import * as basic from './basic'
import * as lifecycle from './lifecycle'
import * as interaction from './interaction'
import { reporter } from './reporter'
import { logger } from './logger'
import { getGlobalObject } from './utils'
import { UserInfoType } from './types'

const global = getGlobalObject<Window>()

class Inkmarks {
  private static _instance: any

  private constructor() {
    logger.log(`<Init>`)
    this.init()
  }

  public static get Instance(): Inkmarks {
    if (!Inkmarks._instance) {
      Inkmarks._instance = new Inkmarks()
    }
    return Inkmarks._instance
  }

  /**
   * 初始化
   * @date 2020-09-02
   * @returns {void}
   */
  public init(): void {
    basic.registerBasicInstrumentation()
    lifecycle.registerLifecycleInstrumentation()
    interaction.registerInteractionInstrumentation()
  }

  /**
   * 自定义提交地址
   * @date 2020-09-10
   * @param {string} url
   * @returns {void}
   */
  public setReportUrl(url: string): void {
    reporter.setReportUrl(url)
  }

  /**
   * 录入用户信息
   * @date 2020-09-10
   * @param {UserInfoType} userInfo
   * @returns {void}
   */
  public setUser(userInfo: UserInfoType): void {
    reporter.setUser(userInfo)
  }
}

const inkmarks = (global.INKMARKS = Inkmarks.Instance)

export default inkmarks
