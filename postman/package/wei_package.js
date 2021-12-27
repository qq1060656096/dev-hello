/**
 * mac:1060656096@qq.com:f0:18:98:64:32:9c
 */
class WeiPackage {
    /**
     *
     * @type {string}
     * @private
     */
    _$prefix = "postmanWeiPackageF1082EDB73DE098A"
    static _$app = new WeiPackage()

    /**
     *
     * @returns {WeiPackage}
     */
    static app() {
        return this._$app
    }

    pm() {
        return pm
    }

    /**
     * 安装包
     * @param string name
     * @param string url
     * @returns {WeiPackage}
     */
    reinstall(name, url) {
        var now = this
        this.pm().sendRequest(url, function (err, response) {
            var content = response.text()
            if (err) {
                console.log("WeiPackage", "install ", name, " fail: ", err)
            } else {
                now.store(name, content)
            }
        });
        return this
    }

    /**
     * 安装包
     * @param string name
     * @param string url
     * @returns {WeiPackage}
     */
    install(name, url) {
        if (this.exist(name)) {
            return this;
        }
        this.reinstall(name, url)
        return this
    }

    /**
     * 检测包是否安装
     * @param name
     * @returns {boolean}
     */
    exist(name) {
        if(this.pm().environment.get(this.name(name)) == undefined) {
            return false
        }
        return true
    }

    /**
     * 存储包
     * @param string name
     * @param string code
     * @returns {WeiPackage}
     */
    store(name, code) {
        this.pm().environment.set(this.name(name), code)
        return this
    }

    /**
     * 获取包真实名
     * @param name
     * @returns {string}
     */
    name(name) {
        return this._$prefix +":"+name
    }

    /**
     * 获取包代码
     * @param string name
     * @returns string
     */
    getCode(name) {
        return  this.pm().environment.get(this.name(name))
    }

    /**
     *
     * @returns {{}}
     */
    getInstallPackagesNames() {
        var names = {
            "__包名__": "包ID（调试）",
        }
        var objs = this.pm().environment.toObject()
        for(var varName in objs) {
            if(varName.substr(0, this._$prefix.length) == this._$prefix){
                var pkgName = varName.substr(this._$prefix.length + 1)
                names[pkgName] = varName
            }
        }
        return names
    }

    /**
     * 显示安装包
     */
    showInstallPackagesNames() {
        var names = this.getInstallPackagesNames()
        console.log(names)
    }
}


// 获取包代码并执行
var code =  WeiPackage.app().getCode("jsonpath")
eval(code)
var cities = [
    { name: "London", "population": 8615246 },
    { name: "Berlin", "population": 3517424 },
    { name: "Madrid", "population": 3165235 },
    { name: "Rome",   "population": 2870528 }
];
var names = jsonpath.query(cities, '$.*.name');
console.log(names)

// 显示包基本信息
WeiPackage.app().showInstallPackagesNames()