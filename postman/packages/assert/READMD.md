
## WeiAssert
> 快捷断言

```javascript
WeiAssert.Status200("http 200 assert")
WeiAssert.jsonBodyEqualString("200", "$.code", "json body data assert")
```

### 示例

```javascript
class WeiPackage{_$prefix="postmanWeiPackageF1082EDB73DE098A";static _$app=new WeiPackage;static app(){return this._$app}pm(){return pm}reinstall(name,url){var now=this;return this.pm().sendRequest(url,function(err,content){content=content.text();err?console.log("WeiPackage","install ",name," fail: ",err):now.store(name,content)}),this}install(name,url){return this.exist(name)||this.reinstall(name,url),this}exist(name){return null!=this.pm().environment.get(this.name(name))}store(name,code){return this.pm().environment.set(this.name(name),code),this}name(name){return this._$prefix+":"+name}getCode(name){return this.pm().environment.get(this.name(name))}getInstallPackagesNames(){var varName,names={"__包名__":"包ID（调试）"};for(varName in this.pm().environment.toObject())varName.substr(0,this._$prefix.length)==this._$prefix&&(names[varName.substr(this._$prefix.length+1)]=varName);return names}showInstallPackagesNames(){var names=this.getInstallPackagesNames();console.log(names)}}var code=WeiPackage.app().getCode("jsonpath");eval(code);var cities=[{name:"London",population:8615246},{name:"Berlin",population:3517424},{name:"Madrid",population:3165235},{name:"Rome",population:2870528}],names=jsonpath.query(cities,"$.*.name");console.log(names),WeiPackage.app().showInstallPackagesNames();
WeiPackage.app().install("jsonpath", "https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.min.js")

// 3. 获取包代码并执行
var code =  WeiPackage.app().getCode("jsonpath")
eval(code)

class WeiAssert {
    static pm() {
        return pm
    }

   static Status(status, message) {
        var pm = WeiAssert.pm()
        pm.test(message, function () {
            pm.response.to.have.status(status);
        });
    }

    static Status200(message) {
        WeiAssert.Status(200, message)
    }

    static jsonBodyEqualString(expect, jsonPath, message) {
        var jsonData = pm.response.json();
        var actual = jsonpath.query(jsonData, jsonPath) + "";
        WeiAssert.equal(expect, actual, message)
    }

    static jsonBodyEqual(expect, jsonPath, message) {
        var jsonData = pm.response.json();
        var actual = jsonpath.query(jsonData, jsonPath);
        WeiAssert.equal(expect, actual, message)
    }

    static equal(expect, actual, message) {
        var pm = WeiAssert.pm()
        pm.test(message, function () {
            pm.expect(expect).to.equal(actual);
        });
    }
}

WeiAssert.Status200("100")
WeiAssert.jsonBodyEqualString("200", "$.code", "body assert")
```

### 3.压缩JS
```sh
# 安装压缩js插件
npm install uglify-js -g
# 压缩js
uglifyjs wei_assert.js -c -o wei_assert.min.js
```