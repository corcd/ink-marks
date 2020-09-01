/*
 * @Author: Whzcorcd
 * @Date: 2020-08-26 18:13:49
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 19:45:57
 * @Description: file content
 *
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'
import dayjs from 'dayjs'
import { getGlobalObject } from '../utils'

const global = getGlobalObject<Window>()

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const lifecycleEnterCallback = (data: any): void => {
  logger.log('<lifecycleCallback>')
  const enterTimestamp = dayjs().unix()
  const userAgent = global.navigator.userAgent
  // TODO 录入用户信息
}

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const lifecycleLeaveCallback = (data: any): void => {
  logger.log('<lifecycleCallback>')
  const leaveTimestamp = dayjs().unix()
}

/**
 * 描述
 * @date 2020-09-01
 * @returns {void}
 */
export function registerLifecycleInstrumentation(): void {
  addInstrumentationHandler({
    callback: lifecycleEnterCallback,
    type: 'DOMContentLoaded',
  })
  //TODO 页面退出事件
  // addInstrumentationHandler({
  //   callback: lifecycleLeaveCallback,
  //   type: '*',
  // })
}
