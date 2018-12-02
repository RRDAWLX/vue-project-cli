# vue template

## 规范约定
### 目录结构：一个仓库只包含一个项目
```
src     // 项目代码
├── index.js    // 项目入口
├── app.vue   // 项目唯一的应用级组件
├── index.html  // 应用的 html 模板
├── api   // 模块化的 api，可以根据 api url 划分，也可根据页面划分
|   ├── common.js
|   └── a.js
├── assets  // 全局公用资源：图片、文档、音频……
|   └── common.png
├── components // 全局公用组件
|   └── common-comp.vue
├── router  // 路由
|   └── index.js
├── store   // 数据仓库
|   ├── index.js
|   └── modules   // 全局公用数据模块，根据功能划分
|       └── user  // 用户相关模块
├── utils   // 全局公用工具模块
|   └── utils.js
└── views   // 视图（页面）
    └── view-name  // 一个文件夹代表一个视图
        ├── index.vue  // 该视图的主组件
        ├── private-sub-comp.vue    // 视图私有子组件
        ├── private-common-comp.vue   // 视图私有公用组件，如果有必要，可提升为全局公用组件
        ├── private-util.js   // 视图私有工具，如果有必要，可提升为全局公用工具
        ├── assets  // 视图私有资源，如果有必要，可提升为全局公用资源
        ├── store   // 视图数据模块
        └── common  // 如果视图私有的工具和公共组件很多，可以增加一个 common 文件夹来管理

```
### 目录结构：一个仓库包含多个项目(方案一)
```
src     // 项目代码
├── index.js    // 项目入口
├── app.vue   // 项目唯一的应用级组件
├── index.html  // 应用的 html 模板
|
├── api   // 如果有，可提取全局公用 api，可根据 api url 划分
|   └── global-common-api.js
├── assets  // 全局公用资源：图片、文档、音频……
|   └── global-common-asset.png
├── components // 全局公用组件
|   └── global-common-comp.vue
├── router  // 路由
|   └── index.js  // 在这里引用各项目路由
├── store   // 数据仓库
|   ├── index.js  // 在这里引用各项目数据模块
|   └── modules   // 全局公用数据模块，根据功能划分
|       └── global-common-moudle.js
├── utils   // 全局公用工具模块
|   └── global-common-utils.js
|
└── project-name   // 各自项目代码
    ├── api   // 项目内 api，可根据 api url 划分，也可根据页面划分
    |   └── project-api.js
    ├── assets  // 项目内公用资源：图片、文档、音频……
    |   └── project-common-asset.png
    ├── components // 项目公用组件，如有必要，可提升为全局公用组件
    |   └── project-common-comp.vue
    ├── route.js    // 项目路由配置
    ├── store   // 项目数据模块
    |   ├── index.js  // 在这里引用各视图数据模块
    |   └── modules   // 项目内公用数据模块，根据功能划分
    |       └── project-common-module.js
    ├── utils   // 项目内公用工具模块，如有必要，可提升为全局公用工具
    |   └── project-common-utils.js
    └── views   // 视图（页面），根据项目划分
        └── view-name  // 一个文件夹代表一个视图
            ├── index.vue  // 该视图的主组件
            ├── private-sub-comp.vue    // 视图私有子组件
            ├── private-common-comp.vue   // 视图私有公用组件，如果有必要，可提升为全局或项目公用组件
            ├── private-utils.js   // 视图私有工具，如果有必要，可提升为全局或项目公用工具
            ├── assets  // 视图私有资源，如果有必要，可提升为全局公或项目用资源
            ├── store   // 视图数据模块
            └── common  // 如果视图私有的工具和公共组件很多，可以增加一个 common 文件夹来管理
```
### 目录结构：一个仓库包含多个项目(方案二)
```
src     // 项目代码
├── index.js    // 项目入口
├── app.vue   // 项目唯一的应用级组件
├── index.html  // 应用的 html 模板
|
├── api   // 模块化的 api，根据项目划分
|   ├── global-common-api.js   // 如果有，可以提取全局公用的 api
|   └── project-name   // 项目内再划分，可以根据 api url 划分，也可根据页面划分
|       ├── project-common.js
|       └── a.js
├── assets  // 全局和项目公用资源：图片、文档、音频……
|   ├── common  // 全局公用资源
|   |   └── global-common-asset.png
|   └── project-name   // 项目内公用资源
|       └── project-common-asset.png
├── components // 全局和项目公用组件
|   ├── common  // 全局公用组件
|   |   └── global-common-comp.vue
|   └── project-name   // 项目内公用组件
|       └── project-common-comp.vue
├── router  // 路由
|   └── routes    // 模块化路由配置，根据项目划分
|       └── project-name.js
├── store   // 数据仓库
|   ├── common   // 全局公用数据模块，根据功能划分
|   |   └── global-common-moudle  
|   └── project-name  // 项目内公用数据模块，根据功能划分
|       └── index.js    // 在这里引用 views/project-name 中的各视图中的 store
├── utils   // 全局公用工具模块
|   ├── common  //  全局公用工具
|   |   └── global-common-utils.js
|   └── project-name  // 项目内公用工具
|       └── project-common-utils.js
|
└── views   // 视图（页面），根据项目划分
    └── project-name
        └── view-name  // 一个文件夹代表一个视图
            ├── index.vue  // 该视图的主组件
            ├── private-sub-comp.vue    // 视图私有子组件
            ├── private-common-comp.vue   // 视图私有公用组件，如果有必要，可提升为全局或项目公用组件
            ├── private-util.js   // 视图私有工具，如果有必要，可提升为全局或项目公用工具
            ├── assets  // 视图私有资源，如果有必要，可提升为全局或项目公用资源
            ├── store   // 视图数据模块
            └── common  // 如果视图私有的工具和公共组件很多，可以增加一个 common 文件夹来管理
```
### 命名约定
- 文件及文件夹命名使用中划线式： ```kebab-case.js```、```kabab-case.vue```、```kebab-case-folder```
- 变量命名一般使用驼峰式： ```camelCase```
- 组件的 name 属性：```component-name```
- <template\>中的组件标签名使用中划线式：```<component-name>```
- 组件文件夹下的主组件统一命名为 ```index.vue```
- 引用组件时组件名使用帕斯卡式：```import CommonComp from 'common-comp.vue'```
- 路由名使用中划线式，一般与视图主组件名保持一致，路径使用驼峰式：
```
{  
    name: 'view-name',  
    path: '/viewName',  
    component: () => import('../views/view-name')  
}  
```

### 编码规范
- 代码缩进统一使用2个空格
- 代码行末尾不加分号
- 要给组件命名，组件名、组件根元素类名要和组件文件名相同。
- 一般情况下 .vue 文件的 <style\> 标签要加 scoped 属性。

```
// common-comp.vue    
<template>  
  <div class="common-comp"></div>  
</template>  

<script>  
export default {  
  name: 'common-comp'  
}  
</script>  

<style lang="less" scoped>  
.common-comp {}  
</style>  
```

- 要给路由命名，代码中尽量使用路由的 name，避免使用 path。
- vuex(store)要开启[命名空间模式](https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)。


