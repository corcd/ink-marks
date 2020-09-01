/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:07:47
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 19:19:38
 * @Description: file content
 */

import * as basic from './basic'
import * as lifecycle from './lifecycle'
import * as interaction from './interaction'
import { getGlobalObject } from './utils'

const global = getGlobalObject<Window>()

class Inkmarks {
  private name: string

  constructor() {
    this.name = 'Inkmarks'
    console.log(`[${this.name}] Init`)
  }

  public init() {
    basic.registerBasicInstrumentation()
    lifecycle.registerLifecycleInstrumentation()
    interaction.registerInteractionInstrumentation()
  }
}

const inkmarks = (global.INKMARKS = new Inkmarks())

export default inkmarks
