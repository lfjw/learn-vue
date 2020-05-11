import { initState } from './state';
import {compileToFunction} from './compiler/index';

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
    // 如果用户传入了el属性，需要将页面渲染出来
    // 如果用户传入了el 就要实现挂载流程
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }

  }

  // 渲染模板优先级
  // 1 render
  // 2 template
  // 3 el内容、
  Vue.prototype.$mount = function(el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // render不需要编译，模板才需要编译
    // 不存在render函数
    if (!options.render) {
      // 获取模板
      let template = options.template;
      // 模板不存在 并且el存在，那么将模板赋值为整个的el DOM 节点
      if (!template && el) {
        template = el.outerHTML;
      }
      // 需要将template转化成render方法 
      // vue1.0 纯字符串编译 正则转换的方式
      // vue2.0 虚拟dom 进行对比
      const render = compileToFunction(template);
      options.render = render;
    }
  }
}