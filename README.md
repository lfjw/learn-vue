## rollup.js
- js打包类库

```sh
# @babel/core babel核心模块
# @babel/preset-env 插件集合 高级语法转化低级语法
# cross-env 设置环境变量
npm i rollup rollup-plugin-babel rollup-plugin-serve cross-env @babel/core @babel/preset-env 
```


## 深入历程
- rollup的配置（已完成）
- 对数据进行监控（已完成）
- 对象的数据劫持（已完成）
- 数组的劫持（已完成）

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