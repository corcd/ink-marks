import { getGlobalObject, getFunctionName } from '../utils'
import { logger } from '../logger'
import {
  InstrumentHandler,
  InstrumentHandlerType,
  InstrumentHandlerCallback,
} from '../types'

const global = getGlobalObject<Window>()

const handlers: {
  [key in InstrumentHandlerType]?: InstrumentHandlerCallback[]
} = {}

const instrumented: { [key in InstrumentHandlerType]?: boolean } = {}

/**
 * 描述
 * @date 2020-09-01
 * @param {InstrumentHandler} handler
 * @returns {void}
 */
export function addInstrumentationHandler(handler: InstrumentHandler): void {
  if (
    !handler ||
    typeof handler.type !== 'string' ||
    typeof handler.callback !== 'function'
  ) {
    return
  }

  handlers[handler.type] = handlers[handler.type] || []
  ;(handlers[handler.type] as InstrumentHandlerCallback[]).push(
    handler.callback
  )

  instrument(handler.type)
}

/**
 * 描述
 * @date 2020-09-01
 * @param {InstrumentHandlerType} type
 * @returns {void}
 */
function instrument(type: InstrumentHandlerType): void {
  if (instrumented[type]) {
    return
  }

  instrumented[type] = true

  switch (type) {
    case 'DOMContentLoaded':
      instrumentLoad()
      break
    case 'touch':
      instrumentTouch()
      break
    case 'click':
      instrumentClick()
      break
    case 'dblclick':
      instrumentDoubleClick()
      break
    default:
      logger.warn(`unknown instrumentation type:${type}`)
  }
}

/**
 * 结构加载完成捕捉器
 * @date 2020-09-01
 * @returns {void}
 */
function instrumentLoad(): void {
  if (!('document' in global)) {
    return
  }

  global.document.addEventListener(
    'DOMContentLoaded',
    (ev: Event): void => {
      triggerHandlers('DOMContentLoaded', ev)
    },
    false
  )
}

/**
 * 单次点击捕捉器
 * @date 2020-09-01
 * @returns {void}
 */
function instrumentClick(): void {
  if (!('document' in global)) {
    return
  }

  global.document.addEventListener(
    'click',
    (ev: MouseEvent): void => {
      triggerHandlers('click', ev)
    },
    false
  )
}

/**
 * 双击捕捉器
 * @date 2020-09-01
 * @returns {void}
 */
function instrumentDoubleClick(): void {
  if (!('document' in global)) {
    return
  }

  global.document.addEventListener(
    'dblclick',
    (ev: MouseEvent): void => {
      triggerHandlers('dblclick', ev)
    },
    false
  )
}

/**
 * 触摸捕捉器
 * @date 2020-09-01
 * @returns {void}
 */
function instrumentTouch(): void {
  if (!('document' in global)) {
    return
  }

  global.document.addEventListener(
    'touchstart',
    (ev: TouchEvent): void => {
      triggerHandlers('touch', ev)
    },
    false
  )
}

/**
 * 描述
 * @date 2020-09-01
 * @param {InstrumentHandlerType} type
 * @param {any} preload
 * @returns {void}
 */
function triggerHandlers(type: InstrumentHandlerType, preload: any): void {
  if (!type || !handlers[type]) {
    return
  }

  for (const handler of handlers[type] || []) {
    try {
      handler(preload)
    } catch (e) {
      logger.error(
        `Error while triggering instrumentation handler.\nType: ${type}\nName: ${getFunctionName(
          handler
        )}\nError: ${e}`
      )
    }
  }
}
