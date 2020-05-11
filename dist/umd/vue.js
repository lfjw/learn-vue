(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 重写数组的那些方法 7个 push shift unshift pop reverse sort splice
  // slice 并不会改变数组本身
  var oldArrayMethods = Array.prototype; // value.__proto__ = arrayMethods 原型链查找问题，会向上查找，先查找我重写的，重写的没有会继续向上查找
  // arrayMethods.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (methods) {
    arrayMethods[methods] = function () {
      console.log('用户调用了push方法'); // AOP 切片编程

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[methods].apply(this, args); //调用了原生的数组方法
      // push unshift 添加的元素可能还是一个对象

      var inserted; // 当前用户插入的元素

      var ob = this.__ob__;

      switch (methods) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          // 3个 新增 删除 修改 arr.splice(0,1,{c:1})
          inserted = args.slice(2);
      } // 存在的话是数组


      if (inserted) ob.observerArray(inserted);
      return result;
    };
  });

  /**
   * 
   * @param {*} data 当前数据是不是对象
   */
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  // Object.defineProperty 不能兼容ie8及以下

  function observe(data) {
    if (!isObject(data)) {
      return;
    }

    return new Observer(data); // 用来观测数据
  }

  var Observer = /*#__PURE__*/function () {
    // 数据层次过多，需要递归去解析对象中的属性，依次增加set和get方法
    function Observer(value) {
      _classCallCheck(this, Observer);

      // value.__ob__ = this; // 我给每一个监控过的对象都增加一个__ob__属性
      def(value, "__ob__", this); // value是数组的话，并不会对索引进行观测，因为会导致性能问题
      // 因为前端开发很少去操作索引 push shift unshift
      // 数组里放的是对象我在监控

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods; // 函数劫持

        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // [msg]

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); // 定义响应式数据
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // 递归实现深度检测
    observe(value);
    Object.defineProperty(data, key, {
      set: function set(newValue) {
        if (newValue === value) {
          return;
        }

        console.log('改变值');
        observe(newValue); //继续劫持用户设置的值，因为有可能用户

        value = newValue;
      },
      get: function get() {
        return value;
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options; // Vue 的数据来源： 属性 方法 数据  计算属性 watch 

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      // 数据初始化
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 数据初始化工作
    var data = vm.$options.data; // 用户传递的data
    // data.call(vm)  data () {console.log(this);  return {}}

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 对象劫持 用户改变数据 我希望可以得到通知 -> 刷新页面
    // mvvm模式 数据变化可以驱动视图变化
    // Object.defineProperty()

    observe(data); // 响应式原理
  }

  // ast语法树  对象描述原生语法 html语法
  function compileToFunction(template) {
    console.log(template);
    return function render() {};
  }

  // 在原型上添加一个init方法

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据劫持
      var vm = this; // Vue中this.$options指代的就是用户传递的属性

      vm.$options = options; // 初始化状态

      initState(vm); // 如果用户传入了el属性，需要将页面渲染出来
      // 如果用户传入了el 就要实现挂载流程

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    }; // 渲染模板优先级
    // 1 render
    // 2 template
    // 3 el内容、


    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // render不需要编译，模板才需要编译
      // 不存在render函数

      if (!options.render) {
        // 获取模板
        var template = options.template; // 模板不存在 并且el存在，那么将模板赋值为整个的el DOM 节点

        if (!template && el) {
          template = el.outerHTML;
        } // 需要将template转化成render方法 
        // vue1.0 纯字符串编译 正则转换的方式
        // vue2.0 虚拟dom 进行对比


        var render = compileToFunction(template);
        options.render = render;
      }
    };
  }

  // 核心代码

  function Vue(options) {
    // 进行Vue的初始化操作
    this._init(options);
  } // 通过引入文件的方式给Vue原型上添加方法


  initMixin(Vue); // 给Vue的原型上添加一个_init的方法

  return Vue;

})));
//# sourceMappingURL=vue.js.map
