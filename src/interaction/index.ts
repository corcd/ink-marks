/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:45
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 18:29:30
 * @Description: file content
 */

import { getGlobalObject } from '../utils'
import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'
import { reporter } from '../reporter'

const global = getGlobalObject<Window>()

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const interactionCallback = (data: any): void => {
  console.dir(data)
  logger.log('<interactionCallback>')
  if (data.target) {
    logger.log(data.target.nodeName, data.target.className)
    const preload = {
      nodeName: data.target ? data.target.nodeName : null,
      className: data.target ? data.target.className : null,
    }
    reporter.addData(preload)
    return
  }
  const elementObject = global.document.elementFromPoint(
    data.clientX,
    data.clientY
  )
  const preload = {
    tagName: elementObject ? elementObject.tagName : null,
  }
  reporter.addData(preload)
  return
}

/**
 * 描述
 * @date 2020-09-01
 * @returns {void}
 */
export function registerInteractionInstrumentation(): void {
  addInstrumentationHandler({
    callback: interactionCallback,
    type: 'click',
  })
  addInstrumentationHandler({
    callback: interactionCallback,
    type: 'dblclick',
  })
  addInstrumentationHandler({
    callback: interactionCallback,
    type: 'touch',
  })
}
