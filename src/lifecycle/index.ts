/*
 * @Author: Whzcorcd
 * @Date: 2020-08-26 18:13:49
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-08-31 15:08:29
 * @Description: file content
 *
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'

const lifecycleCallback = (data: any): void => {
  logger.log(`<lifecycleCallback>${data}`)
}

export function registerLifecycleInstrumentation(): void {
  addInstrumentationHandler({
    callback: lifecycleCallback,
    type: 'DOMContentLoaded',
  })
  //页面退出时刻
  // addInstrumentationHandler({
  //   callback: lifecycleCallback,
  //   type: '*',
  // })
}
