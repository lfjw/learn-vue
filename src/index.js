// 核心代码
// Vue的声明

import { initMixin } from './init';

function Vue(options) {
  // 进行Vue的初始化操作
  this._init(options)
}

// 通过引入文件的方式给Vue原型上添加方法
initMixin(Vue) // 给Vue的原型上添加一个_init的方法

export default Vue;