# 豆瓣api电影列表项目
## 分析需求
- 列表功能
    - 正在热映
    - 即将上映
    - top250
- 列表分页
- loading效果
- 查询
- 详情页

## 下载模板，快速开始

- 安装项目依赖
```
npm install bootstrap --save
```
```
.editorconfig -- 统一不同开发者的不同开发工具的不同开发配置
在sublime中需要下载editorconfig插件
```
- 为angular做一个项目骨架的目的是为了快速开始一个新的项目
- angular-seed是angular官方的骨架
- wen-starter-kit是谷歌开发的web小项目的骨架

npm 在package.json中的script节点中可以定义脚本任务

API的概念:(Application Programing Interface)
应用程序编程接口
常见的API：
webApi 通过web方式提供的结构叫做wenApi
Math.random();
所有有输入有输出的事物都可以是API
都是函数


豆瓣Api文档(参数):
取得数据，没有输入:api.douban.com/v2/movie/in_threaters
输入，取10条:api.douban.com/v2/movie/in_threaters?count=10
测试API的工具:POSTMAN

假数据绑定
真数据（之前用的是jquery，但是这边引一个jquery来用，有点大材小用，angular里面有个服务$http,可以帮我们取得数据）

跨域请求
angular.callbacks._0()
angular中将所有的JSONP的callback都挂在angular.callbacks这个对象上，不会污染全局
传统的数据请求:
浏览器发生请求，服务器返回数据，index.html开始执行，发送一个异步请求去请求data.json
jsonP:XMLhttpRequest这个对象不支持跨域请求

制作分页
首先要确定每页显示多少条
1 -> start:0 count:10
2 -> start:10 count:10
3 -> start:11 count 10
start = ((page)(页码)-1)*count;
pageCount = Math.ceil(total/count)
一是要在路由的配置中加上分页参数
二是在控制器中提取page参数


