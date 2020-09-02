import pako from 'pako'
import dayjs from 'dayjs'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { getGlobalObject } from '../utils'
// import { storage } from '../storage'
import { InformationType } from '../types'
import configuration from '../config/default'

const global = getGlobalObject<Window>()

class Reporter {
  static _url: string = configuration.REPORT_URL
  static _delay: number = configuration.DELAY_TIME

  private _information: InformationType = {
    enterTimestamp: 0,
    leaveTimestamp: 0,
    userAgent: '',
  }
  private _events: any[] = []
  private _timer: any = null

  constructor() {
    this._init()
  }

  /**
   * 初始化
   * @date 2020-09-01
   * @returns {void}
   */
  private _init(): void {
    this._events = []
  }

  /**
   * 获取 session
   * @date 2020-09-01
   * @returns {string}
   */
  private _getSession(): string {
    const timestamp = dayjs().format('{YYYY} MM-DDTHH:mm:ss')
    return Base64.stringify(sha256(`${timestamp}-${Math.random() * 10}`))
    // return timestamp
  }

  /**
   * 二进制压缩数据
   * @date 2020-09-01
   * @param {any} source
   * @returns {any}
   */
  private _minimizeSource(source: any): string {
    return pako.deflate(JSON.stringify(source), { to: 'string' })
  }

  /**
   * 数据提交触发器
   * @date 2020-09-01
   * @returns {void}
   */
  private _reportTrigger(): void {
    if (this._timer) return

    this._timer = setTimeout(async (): Promise<any> => {
      await this.reportData(Reporter._url).catch(e => console.error(e))
      clearTimeout(this._timer)
      this._timer = null
    }, Reporter._delay)
  }

  /**
   * 录入信息
   * @date 2020-09-02
   * @param {InformationType} information
   * @param {boolean} immediate
   * @returns {void}
   */
  public async enterInformation(
    information: InformationType,
    immediate: boolean = false
  ): Promise<any> {
    Object.assign(this._information, information)
    if (immediate) {
      // const leaveTimestamp = storage.get('leaveTimestamp')
      await this.reportData()
      return
    }
    this._reportTrigger()
    return
  }

  /**
   * 新增数据条目
   * @date 2020-09-01
   * @param {any} data
   * @returns {boolean}
   */
  public addData(data: any): boolean {
    console.dir(data)
    if (Object.prototype.toString.call(data) === '[object Object]') {
      this._events.push(data)
      // TODO 堆栈溢出处理
      this._reportTrigger()
      return true
    }
    return false
  }

  /**
   * 综合数据提交
   * @date 2020-09-01
   * @param {string} url 提交地址
   * @returns {void}
   */
  public reportData(url: string = Reporter._url): Promise<any> {
    const events = this._minimizeSource(this._events)

    const params = {
      information: this._information,
      events,
      session: this._getSession(),
      timestamp: dayjs().unix(),
    }

    // storage.set('params', JSON.stringify(params))

    this._init()

    // 尝试使用 sendbeacon
    if (global.navigator.sendBeacon && events.length < 65000) {
      console.log('Use sendbeacon')
      const headers = {
        type: 'application/x-www-form-urlencoded',
      }
      const blob = new Blob([JSON.stringify(params)], headers)
      const status = global.navigator.sendBeacon(url, blob)

      return status ? Promise.resolve(status) : Promise.reject(status)
    }

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      mode: 'cors', // no-cors, cors, *same-origin
    })
  }
}

const reporter = (global.__INKMARKS__.reporter = new Reporter())

export { reporter }
