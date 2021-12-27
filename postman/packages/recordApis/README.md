### 记录postman apis 请求响应记录

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