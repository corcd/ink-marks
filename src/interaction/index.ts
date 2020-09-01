/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:45
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 09:43:43
 * @Description: file content
 */

import { getGlobalObject } from '../utils'
import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'

const global = getGlobalObject<Window>()

const interactionCallback = (data: any): void => {
  console.dir(data)
  logger.log('<interactionCallback>')
  if (data.target) {
    logger.log(data.target.nodeName, data.target.className)
    return
  }
  const elementObject = global.document.elementFromPoint(data.clientX, data.clientY)
  console.dir(elementObject)
  logger.log(elementObject && elementObject.tagName)
}

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
