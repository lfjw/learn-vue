// 重写数组的那些方法 7个 push shift unshift pop reverse sort splice
// slice 并不会改变数组本身

import { observe } from ".";

let oldArrayMethods = Array.prototype;
// value.__proto__ = arrayMethods 原型链查找问题，会向上查找，先查找我重写的，重写的没有会继续向上查找
// arrayMethods.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods);

const methods = [
  'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice',
]

methods.forEach(methods => {
  arrayMethods[methods] = function (...args) {
    console.log('用户调用了push方法') // AOP 切片编程
    const result = oldArrayMethods[methods].apply(this,args); //调用了原生的数组方法
    // push unshift 添加的元素可能还是一个对象
    let inserted; // 当前用户插入的元素

    let ob = this.__ob__;
    switch (methods) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":  // 3个 新增 删除 修改 arr.splice(0,1,{c:1})
        inserted = args.slice(2);
      default:
        break;
    }
    // 存在的话是数组
    if (inserted) ob.observerArray(inserted)
    return result
  }
})