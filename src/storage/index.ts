/*
 * @Author: Whzcorcd
 * @Date: 2020-09-02 16:59:50
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-02 17:07:07
 * @Description: file content
 */

import { getGlobalObject } from '../utils'

const global = getGlobalObject<Window>()

class Storage {
  constructor() {}

  /**
   * 获取 localStorage 键值
   * @date 2020-09-02
   * @param {string} key
   * @returns {string | boolean}
   */
  public get(key: string): string | boolean {
    const temp: string | null = global.localStorage.getItem(key)
    if (temp) {
      return temp
    }
    return false
  }

  /**
   * 设置 localStorage 键值
   * @date 2020-09-02
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  public set(key: string, value: string): void {
    global.localStorage.setItem(key, value)
  }

  /**
   * 移除 localStorage 键值
   * @date 2020-09-02
   * @param {string} key
   * @returns {void}
   */
  public remove(key: string): void {
    global.localStorage.removeItem(key)
  }
}

const storage = new Storage()
export { storage }
