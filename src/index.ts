/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:07:47
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-10 12:12:21
 * @Description: file content
 */

import * as basic from './basic'
import * as lifecycle from './lifecycle'
import * as interaction from './interaction'
import { getGlobalObject } from './utils'

const global = getGlobalObject<Window>()

class Inkmarks {
  private static _instance: any

  static projectName: string = 'Inkmarks'

  private constructor() {
    console.log(`[${Inkmarks.projectName}] Init`)
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
}

const inkmarks = (global.INKMARKS = Inkmarks.Instance)

export default inkmarks
