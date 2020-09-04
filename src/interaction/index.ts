/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:45
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-04 14:00:00
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
    logger.log(data.target)
    const path = String(data.path || (data.composedPath && data.composedPath()))
    const pathArray = path.split(',')
    const pathMap = pathArray.map((item, index) => {
      if (item === '[object Window]') {
        return {
          nodeName: 'WINDOW',
          className: null,
        }
      } else if (item === '[object HTMLDocument]') {
        return {
          nodeName: 'DOCUMENT',
          className: null,
        }
      }

      return {
        nodeName:
          (data.path || (data.composedPath && data.composedPath()))[index]
            .nodeName || null,
        className:
          (data.path || (data.composedPath && data.composedPath()))[index]
            .className || null,
      }
    })

    const preload = {
      nodeName: data.target.nodeName || null,
      className: data.target.className || null,
      id: data.target.id || null,
      textContent: data.target.textContent || null,
      path: pathMap,
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
