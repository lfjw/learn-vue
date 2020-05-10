import { initState } from './state';
// 通过引入文件的方式，给Vue原型上添加方法
// 在原型上添加一个init方法
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this;
    // Vue中this.$options指代的就是用户传递的属性
    vm.$options = options;
    // 初始化状态
    initState(vm)
  }
}