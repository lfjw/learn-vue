
import { observe } from './observe/index';

export function initState(vm) {
  const opts = vm.$options;

  // Vue 的数据来源： 属性 方法 数据  计算属性 watch 
  if (opts.props) {
    // 属性初始化
    initProps(vm)
  }
  if (opts.methods) {
    // 方法初始化
    initMethods(vm)
  }
  if (opts.data) {
    // 数据初始化
    initData(vm)
  }
  if (opts.computed) {
    // 计算属性初始化
    initComputed(vm)
  }
  if (opts.watch) {
    // 监听属性初始化
    initWatch(vm)
  }
}


function initProps() {

}
function initMethods() {

}
function initData(vm) {
  // 数据初始化工作
  let data = vm.$options.data // 用户传递的data
  // data.call(vm)  data () {console.log(this);  return {}}
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 对象劫持 用户改变数据 我希望可以得到通知 -> 刷新页面
  // mvvm模式 数据变化可以驱动视图变化
  // Object.defineProperty()
  observe(data) // 响应式原理
}
function initComputed() {

}
function initWatch() {

}