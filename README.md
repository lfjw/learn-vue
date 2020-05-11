# 学习vue2.x源码

## 如下流程实现

- 1.rollup的配置（已完成）
- 2.数据劫持（已完成）
- 3.模板编译
- 4.html-parser
- 5.html转化成ast树
- 6.生成代码
- 7.生成render函数
- 8.代理_data属性 proxy
- 9.初始化渲染流程
- 10.初次渲染
- 11.声明周期的合并策略
- 12.对象的依赖收集
- 13.异步更新
- 14.组件定义流程
- 15.组件渲染

## 安装插件

```sh
# @babel/core babel核心模块
# @babel/preset-env 插件集合 高级语法转化低级语法
# cross-env 设置环境变量
npm i rollup rollup-plugin-babel rollup-plugin-serve cross-env @babel/core @babel/preset-env 
```

## 1. rollup的配置

- js打包类库
- 相比webpack更加适应于类库

## 2. 数据劫持
- 数据有关联的内容
  - 属性props
  - data
  - methods
  - watch
  - computed



