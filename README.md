# jr8前端工程化整体解决方案
jr8是58金融事业部在百度fis2和jello的基础上封装改造而来，用以和后端Java配合的**整体解决方案**


# 架构流程
![step1](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step1.png)
![step2](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step2.png)
![step2-2](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step2-2.png)
![step2-3](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step2-3.png)
![step3](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step3.png)
![step3-2](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step3-2.png)
![step4](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step4.png)
![step5](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step5.png)
![step5-2](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step5-2.png)
![step5-3](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step5-3.png)
![step6](https://github.com/jiajianrong/MarkdownPhotos/blob/master/steps/step6.png)


##使用jr8有如下限制：
- 后端为Java
- 前后端分离，前端负责制定页面样式，后端负责填充页面数据
- 后端Java使用velocity模板
- nodejs版本为v4及以下


##jr8基础功能
- 各种编译器转换，ES6、coffee、markd、_.template、jade、react、less、sass、scss...
- 校验jshint、csslint...
- 资源优化、压缩：uglifyjs、cleancss...
- 图片sprite、图片压缩、base64等常用前端优化手段
- md5戳
- amd定义包装
- css类化(js加载)


##jr8核心功能
- 一键发布、实时监听并更新资源到tomcat
 <br />`jr8 release -cwL`


- 模拟vm数据及ajax异步数据
> 彻底分离前后端，从此FEer自行调试vm及其变量，再也不用等后端渲染数据。
> <br />FE模拟vm路径及vm变量和ajax返回值变得及其简单
> <br />
> <br />`rewrite ^\/login$  /page/login/login.vm`
> <br />代表http://localhost/login 请求被分发到login.vm渲染
> <br />
> <br />`login.json:   {username: "张三", password: "123456"}`
> <br />表示用json数据 mock vm变量：username和password的具体值
> <br />ajax返回值mock方法同上


- 资源定位
> 分离开发路径与部署路径，完美支持html、js、css中的任意资源定位。
> 
> - 还在写gulp、grunt过滤流操作吗？
> - 还在为各种奇怪的定位关键字命名发愁吗？


- 内容嵌入
> - html里嵌入html、js、css、base64
> - js里嵌入template、js、css、base64
> - css里嵌入css、base64


- 依赖声明 - 产出资源文件列表
> - html依赖html、js、css
> - js依赖js、css
> - css依赖css


- **自动加载所有依赖文件(CSS合并&前置 | JS后置)**

> - 假设login页面引用了slider.js和form.js，而form.js又依赖validate.js、button.js和modal.js
> - 每一个js文件可能有对应的css文件，也可能没有
> - 某天form.js不需要依赖button.js了，这么多页面，button.css怎么删？
> - login页面的开发者需要手动维护这么多js和css引用吗？
 
- 业务页面无需引入业务JS、CSS文件，jr8框架自动加载依赖并优化合并页面所需资源。开发人员再也不用担心性能优化的问题了


- 页面加载及渲染性能统计(一个参数搞定：performance)

  `jr8 release -cw performance`

- 页面打点统计(一个参数搞定：trace)

  `jr8 release -cw trace`

- 页面越来越多，测试时找到对应的url地址越来越麻烦，浏览器里还得手动输入url？
> 自动生成黄页，列出所有页面路径


##安装jr8

- 安装nodejs
> *推荐安装node-v0.12.x*

- 安装jr8：  npm install -g jr8
> *如果网速慢的话也可以使用国内npm代理安装jr8：  npm --registry http://registry.cnpmjs.org install -g  jr8*


##使用jr8

参见demo工程

[jr8-proj-demo](https://github.com/jiajianrong/jr8-proj-demo)









