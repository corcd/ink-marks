/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:40
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-04 14:05:50
 * @Description: file content
 */

import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'
import { parseUrl } from '../utils'
import { getGlobalObject } from '../utils'
import { reporter } from '../reporter'

const global = getGlobalObject<Window>()

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const basicCallback = (data: any): void => {
  logger.log('<basicCallback>')
  const res = parseUrl(global.document.location.href)
  const queryArray = res.query ? res.query.split('&') : []
  const queryMap = queryArray.map(item => {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    return { [key]: value }
  })
  console.log(queryMap)
  reporter.enterBasicInfo(
    Object.assign({}, res, { title: global.document.title, query: queryMap })
  )
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
