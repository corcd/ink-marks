import pako from 'pako'
import dayjs from 'dayjs'
import * as hash from 'object-hash'
import { getGlobalObject } from '../utils'

const global = getGlobalObject<Window>()

class Reporter {
  static DELAY_TIME: number = 5000

  private _events: any[]
  private _timer: any = null
  // TODO need url
  private _url: string = '...'

  constructor() {
    this._events = []
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
    // return hash.sha1({ timestamp })
    return timestamp
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
   * 描述
   * @date 2020-09-01
   * @returns {void}
   */
  private _reportTrigger(): void {
    if (this._timer) return

    this._timer = setTimeout(async (): Promise<any> => {
      await this.reportData(this._url).catch(e => console.error(e))
      clearTimeout(this._timer)
      this._timer = null
    }, Reporter.DELAY_TIME)
  }

  private _bufferOverflow(): void {}

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
  public reportData(url: string): Promise<any> {
    const events = this._minimizeSource(this._events)

    const params = {
      events,
      session: this._getSession(),
    }

    this._init()

    // 尝试使用 sendbeacon
    if (global.navigator.sendBeacon && events.length < 65000) {
      const headers = {
        type: 'application/json',
      }
      const blob = new Blob([JSON.stringify(params)], headers)
      const status = global.navigator.sendBeacon(url, blob)

      return Promise.resolve(status)
    }

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors', // no-cors, cors, *same-origin
    })
  }
}

const reporter = (global.__INKMARKS__.reporter = new Reporter())

export { reporter }
