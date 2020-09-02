/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:07:47
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-02 09:06:10
 * @Description: file content
 */

import * as basic from './basic'
import * as lifecycle from './lifecycle'
import * as interaction from './interaction'
import { getGlobalObject } from './utils'

const global = getGlobalObject<Window>()

class Inkmarks {
  static projectName: string = 'Inkmarks'

  constructor() {
    console.log(`[${Inkmarks.projectName}] Init`)
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

const inkmarks = (global.INKMARKS = new Inkmarks())
;(function () {
  inkmarks.init()
})()

export default inkmarks
