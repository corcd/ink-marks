/*
 * @Author: Whzcorcd
 * @Date: 2020-08-26 18:13:49
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-02 17:25:48
 * @Description: file content
 *
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'
import dayjs from 'dayjs'
import { getGlobalObject } from '../utils'
import { reporter } from '../reporter'

const global = getGlobalObject<Window>()

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const lifecycleEnterCallback = (data: any): void => {
  logger.log('<lifecycleEnterCallback>')
  const enterTimestamp = dayjs().unix()
  const userAgent = global.navigator.userAgent
  reporter.enterInformation({
    enterTimestamp,
    userAgent,
  })
}

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const lifecycleLeaveCallback = (data: any): void => {
  logger.log('<lifecycleLeaveCallback>')
  const leaveTimestamp = dayjs().unix()
  reporter.enterInformation(
    {
      leaveTimestamp,
    },
    true
  )
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
  addInstrumentationHandler({
    callback: lifecycleLeaveCallback,
    type: 'beforeunload',
  })
}
