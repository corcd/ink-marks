/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:40
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-08-28 09:38:58
 * @Description: file content
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'

const basicCallback = (data: any): void => {
  logger.log(`<basicCallback>${data}`)
}

export function registerBasicInstrumentation(): void {
  addInstrumentationHandler({
    callback: basicCallback,
    type: 'DOMContentLoaded',
  })
}
