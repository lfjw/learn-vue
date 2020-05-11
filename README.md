# 手写vue2.x版本源码

## 如下流程实现
- rollup的配置（已完成）
- 数据劫持（已完成）

- 模板编译
- html-parser
- html转化成ast树
- 生成代码
- 生成render函数
- 代理_data属性 proxy
- 初始化渲染流程
- 初次渲染
- 声明周期的合并策略
- 对象的依赖收集
- 异步更新
- 组件定义流程
- 组件渲染

## 安装插件

```sh
# @babel/core babel核心模块
# @babel/preset-env 插件集合 高级语法转化低级语法
# cross-env 设置环境变量
npm i rollup rollup-plugin-babel rollup-plugin-serve cross-env @babel/core @babel/preset-env 
```

## 1. rollup.js

- js打包类库

## 2. data进行监控


## 3. data对object类型数据劫持



