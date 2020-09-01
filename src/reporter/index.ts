
import pako from 'pako'
import dayjs from 'dayjs'
import Hash from 'object-hash'
import { getGlobalObject } from '../utils'

const global = getGlobalObject<Window>()

class Report {
  private _events: any[]

  constructor() {
    this._events = []
  }

  private _getSession(): string {
    const timestamp = dayjs().format('{YYYY} MM-DDTHH:mm:ss')
    return Hash({ timestamp })
  }

  private _minimizeSource(source: any): string {
    return pako.deflate(JSON.stringify(source), { to: 'string' })
  }

  public addData() {
    // TODO
  }

  /**
   * 综合数据提交
   * @date 2020-09-01
   * @param {string} url 提交地址
   * @returns {void}
   */
  public reporter(url: string): void {
    const data = this._minimizeSource(this._events)

    const params = {
      data,
      session: this._getSession(),
    }

    // 尝试使用 sendbeacon
    if (global.navigator.sendBeacon && data.length < 65000) {
      const headers = {
        type: 'application/json',
      }
      const blob = new Blob([JSON.stringify(params)], headers)
      const status = global.navigator.sendBeacon(url, blob)
      status && console.error(status)
      return
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors', // no-cors, cors, *same-origin
    })
      .then(response => {
        return response.json()
      })
      .catch(e => {
        console.error(e)
      })
  }
}
