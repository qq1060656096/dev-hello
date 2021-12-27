# postman

### 1. WeiPackage 
> 在 postman 中使用 引入外部 js

** WeiPackage 包常用方法**
```javascript
// 安装第三方包
WeiPackage.app().install("jsonpath", "https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.min.js")
// 重新安装第三方包
WeiPackage.app().reinstall("jsonpath", "https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.min.js")

// 获取包代码并执行
var code =  WeiPackage.app().getCode("jsonpath")
eval(code)

// 显示已安装包
WeiPackage.app().showInstallPackagesNames()
```

### WeiPackage 安装第三方JavaScript 包
> 1. 把 package/wei_package.min.js 复制到 postman 脚本中
> 2. 安装 jsonpath 包
> 3. 获取包代码并执行
> 4. 使用 jsonpath 包

```sh
// 1. 把 package/wei_package.min.js 复制到 postman 脚本中
// 2.安装 jsonpath 包
WeiPackage.app().install("jsonpath", "https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.min.js")

// 3. 获取包代码并执行
var code =  WeiPackage.app().getCode("jsonpath")
eval(code)

// 4. 使用 jsonpath 包
var cities = [
    { name: "London", "population": 8615246 },
    { name: "Berlin", "population": 3517424 },
    { name: "Madrid", "population": 3165235 },
    { name: "Rome",   "population": 2870528 }
];
var names = jsonpath.query(cities, '$.*.name');
console.log(names)
```


### 2. 命令行运行集合
```sh
npm install -g newman
newman run mycollection.json

newman run -h

newman run https://www.getpostman.com/collections/bedfb6189bffea28d51f
```

```sh
npm install -g newman-reporter-htmlextra 
newman run https://www.getpostman.com/collections/bedfb6189bffea28d51f -r htmlextra --reporter-html-export index.hml
```

### 3.压缩JS
```sh
# 安装压缩js插件
npm install uglify-js -g
# 压缩js
uglifyjs uglifyjs wei_package.js -c -o wei_package.min.js
```

### 记录 postman apis 请求响应记录

### 使用指南
```sh
1. 复制 wei_record_apis_min.js 或者 wei_record_apis.js 到 postman 脚本
```

```javascript
// 录制请求响应
WeiRecordApis.app().addApiNow()
// 获取所有录制请求响应
WeiRecordApis.app().getApis()
// 获取当前请求header
WeiRecordApis.app().nowApi().getResponseHeader("Host")
// 获取当前请求body
WeiRecordApis.app().nowApi().getRequestBodyByName("bb")
// 显示所有录制请求 id和名称
WeiRecordApis.app().showApisIdNames()
```

### postman操作mysql
```javascript
npm install -g xmysql
xmysql -h localhost -u root -p root -d demo
http://localhost:3000/api/data_source/210
```

### jsonpath使用
```javascript
// https://github.com/dchester/jsonpath/blob/master/README.md\
// 1. 把 https://github.com/dchester/jsonpath/blob/master/jsonpath.min.js 复制到 postman
// 2. 复制以下代码到postman
var cities = [
    { name: "London", "population": 8615246 },
    { name: "Berlin", "population": 3517424 },
    { name: "Madrid", "population": 3165235 },
    { name: "Rome",   "population": 2870528 }
];
var names = jsonpath.query(cities, '$.*.name');
console.log(names)
```