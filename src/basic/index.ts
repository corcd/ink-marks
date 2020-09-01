/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:40
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 19:15:03
 * @Description: file content
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const basicCallback = (data: any): void => {
  logger.log('<basicCallback>')
}

/**
 * 描述
 * @date 2020-09-01
 * @returns {void}
 */
export function registerBasicInstrumentation(): void {
  addInstrumentationHandler({
    callback: basicCallback,
    type: 'DOMContentLoaded',
  })
}
