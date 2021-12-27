function isTypeOfRaw(v, typeofStr) {
    if (typeof v === typeofStr) {
        return true
    }
    return false
}

function isUndefined(v) {
    return isTypeOfRaw(v, "undefined")
}

class WeiPostMan {
    static nowApiId() {
        return this.nowRequest().id
    }

    static nowApiName() {
        return this.nowRequest().name
    }

    static nowRequest() {
        return request
    }

    static nowResponse() {
        return response
    }

    static nowPm() {
        return pm
    }
}

class WeiRecordApis {
    debug = false
    debugPrefix = "WeiRecordApis"
    id = ""
    name = ""
    pm
    request
    response
    hasResponse = false
    responseJsonBody = {}

    static _appInstance = new WeiRecordApis()
    apis = {}
    storeName = "WeiRecordApisStoreNameE2D23E49E8685577"// zwei:mac:20211128.102101.f0:18:98:64:32:9c
    constructor() {
    }

    /**
     *
     * @returns {WeiRecordApis}
     */
    static app() {
        this._appInstance.load(WeiPostMan.nowPm())
        return this._appInstance
    }

    /**
     *
     * @returns {WeiRecordApis}
     */
    startDebug() {
        this.debug = true
        return this
    }

    /**
     *
     * @returns {WeiRecordApis}
     */
    closeDebug() {
        this.debug = false
        return this
    }

    /**
     * 添加 api
     * @param pm
     * @returns {*}
     */
    addApi(pm) {
        if (!isUndefined(pm.response)) {
            var obj = new WeiRecordApis()
            obj.init(pm)
            this.apis[WeiPostMan.nowApiId()] = obj
        }
        this.store(pm)
        return this
    }
    addApiNow() {
        return this.addApi(WeiPostMan.nowPm())
    }
    /**
     *
     * @param id
     * @return {WeiRecordApis}
     */
    api(id) {
        this.log("api() start", id)
        if(isUndefined(this.apis[id])) {
            this.log("api() no",)
            return null
        }
        this.log("api() end", this.api[id])
        return this.apis[id]
    }
    nowApi() {
        return this.api(WeiPostMan.nowApiId())
    }

    getApis() {
        return this.apis
    }

    getApisIdNames() {
        var apisIdNames = {}
        for (var k  in this.apis) {
            apisIdNames[k] = this.apis[k].name
        }
        return apisIdNames
    }

    showApisIdNames() {
        console.log(this.getApisIdNames())
        return this
    }

    /**
     * 初始化
     */
    init(pm) {
        this.log("init", "start")
        this.debugPrefix = "AutoTestApp"

        this.pm = pm
        if (!isUndefined(pm.request)) {
            this.request = pm.request.toJSON()
        }
        if (!isUndefined(pm.response)) {
            this.response = pm.response.toJSON()
        }
        this.hasResponse = false
        this.responseJsonBody = {}
        this.log("init", "hasResponse", "before")
        this.hasResponse = !isUndefined(this.response)
        this.log("init", "hasResponse", this.hasResponse)
        if (this.hasResponse) {
            this.id = WeiPostMan.nowApiId()
            this.name = WeiPostMan.nowApiName()
            try {
                this.responseJsonBody = JSON.parse(this.response.text())
            } catch (e) {
                this.log("JSON.parse", "exception", e)
            }
        }
        this.log("init", "end", this)
    }

    load(pm) {
        var apis = WeiPostMan.nowPm().environment.get(this.storeName)
        for (var k in apis) {
            var row = apis[k]
            var obj = new WeiRecordApis()
            obj.id  = row.id
            obj.name = row.name
            obj.request = row.request
            obj.response = row.response
            obj.hasResponse = row.hasResponse
            obj.responseJsonBody = row.responseJsonBody
            this.apis[obj.id] = obj
        }
        return this
    }

    store(pm) {
        this.log("store start")
        WeiPostMan.nowPm().environment.set(this.storeName, this.getApis())
        this.log("store end")
        return this
    }

    /**
     * 日志
     *
     * @param messages
     * @returns {WeiRecordApis}
     */
    log(...messages) {
        if (this.debug) {
            console.log(this.debugPrefix, ...messages)
        }
        return this
    }

    clear() {
        this.apis = {}
        return this
    }
    getRequestBodyFieldValue(data, name) {
        for (var k in data) {
            var row  =  data[k]
            if (row.key == name) {
                return row.value
            }
        }
        return null
    }
    getHeaderByName(header, name) {
        return this.getRequestBodyFieldValue(header, name)
        return null
    }

    getResponseHeader(name) {
        if (isUndefined(this.response)) {
            return null
        }
        return this.getHeaderByName(this.response.header, name)
    }

    getRequestHeader(name) {
        if (isUndefined(this.request)) {
            return null
        }
        return this.getHeaderByName(this.request.header, name)
    }
    getRequestBody() {
        if (isUndefined(this.request)) {
            return null
        }
        if (this.request.body.mode == "formdata") {
            return this.request.body.formdata
        }
        if (this.request.body.mode == "urlencoded") {
            return this.request.body.urlencoded
        }
        if (this.request.body.mode == "raw") {
            return this.request.body.raw
        }
        if (this.request.body.mode == "file") {
            return this.request.body.file
        }
        return this.request.body
    }

    getRequestBodyByName(name) {
        if (isUndefined(this.request)) {
            return null
        }
        if (this.request.body.mode == "formdata") {
            return this.getRequestBodyFieldValue(this.getRequestBody(), name)
        }
        if (this.request.body.mode == "urlencoded") {
            return this.getRequestBodyFieldValue(this.getRequestBody(), name)
        }
        if (this.request.body.mode == "raw") {
            return this.getRequestBody()
        }
        if (this.request.body.mode == "file") {
            return this.request.body.file
        }
        return this.getRequestBody()
    }
}
WeiRecordApis.app().addApiNow()
