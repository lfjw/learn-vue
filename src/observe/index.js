
import { arrayMethods } from './array.js';

import { isObject, def } from '../util/index';

// 把data中的数据 都使用Object.defineProperty 重新定义es5
// Object.defineProperty 不能兼容ie8及以下
export function observe(data) {
  if (!isObject(data)) {
    return
  }
  return new Observer(data) // 用来观测数据
}

class Observer {
  // 数据层次过多，需要递归去解析对象中的属性，依次增加set和get方法
  constructor(value) {
    // value.__ob__ = this; // 我给每一个监控过的对象都增加一个__ob__属性
    def(value, "__ob__", this)
    // value是数组的话，并不会对索引进行观测，因为会导致性能问题
    // 因为前端开发很少去操作索引 push shift unshift
    // 数组里放的是对象我在监控
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods // 函数劫持
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }

  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }

  walk(data) {
    let keys = Object.keys(data) // [msg]
    keys.forEach((key) => {
      defineReactive(data, key, data[key]) // 定义响应式数据
    })
  }
}

function defineReactive(data, key, value) {
  // 递归实现深度检测
  observe(value)
  Object.defineProperty(data, key, {
    set(newValue) {
      if (newValue === value) {
        return
      }
      console.log('改变值');
      observe(newValue) //继续劫持用户设置的值，因为有可能用户
      value = newValue
    },
    get() {
      return value
    }
  })
}