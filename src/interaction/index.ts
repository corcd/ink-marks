/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:48:45
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-11 12:29:25
 * @Description: file content
 */

import { getGlobalObject } from '../utils'
import { addInstrumentationHandler } from '../instrument'
import { logger } from '../logger'
import { reporter } from '../reporter'
import configuration from '../config/default'

const global = getGlobalObject<Window>()

type PathMapType = {
  nodeName: string | null
  className: string | null
}

/**
 * 描述
 * @date 2020-09-01
 * @param {any} data
 * @returns {void}
 */
const interactionCallback = (data: any): void => {
  console.log(data)
  logger.log('<interactionCallback>')
  if (data.target) {
    const path = String(data.path || (data.composedPath && data.composedPath()))
    const pathArray = path.split(',')
    const pathMap: Array<PathMapType> = pathArray.map(
      (item: string, index: number): PathMapType => {
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
      }
    )

    const preload = {
      nodeName: (data.target.nodeName || null) as string | null,
      className: (data.target.className || null) as string | null,
      id: (data.target.id || null) as string | null,
      textContent: (data.target.textContent || null) as string | null,
      dataSet: data.target.dataset[configuration['ANCHOR_NAME']] || null,
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
