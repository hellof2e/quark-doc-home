# Quark design 文档公共首页

当前分支提交带有 `patch`, `fixes` 关键词，会触发 yml 自动构建，并发布到 `npm` 仓库。
此外，当 `quark-doc-header` 包版本号发生变更，也会触发 yml 自动构建，并发布到 `npm` 仓库。

同时触发 `hellof2e/quarkd-docs-vue` action 执行，自动构建并推送静态资源到 [quark-ecosystem/quarkd-docs](https://github.com/quark-ecosystem/quarkd-docs)。


https://www.npmjs.com/package/quark-doc-header

<img src="https://github.com/hellof2e/quark-doc-home/assets/14307551/c93b34d1-1244-409b-bdd4-fdcefcbd7235" width="400" />
<img src="https://github.com/hellof2e/quark-doc-home/assets/14307551/e9ee42f1-8bb0-425a-87dd-301c84348165" width="400" />


## 如何使用

```bash
npm install quark-doc-home
```


### 使用

无论是`Vue`，`React`，`Angular`还是`Jq`项目，该组件都可以被使用。

```js
// 引入
import 'quark-doc-home'

// 使用
<quark-doc-home />
```
