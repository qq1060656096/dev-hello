function isTypeOfRaw(v,typeofStr){return typeof v===typeofStr}function isUndefined(v){return isTypeOfRaw(v,"undefined")}class WeiPostMan{static nowApiId(){return this.nowRequest().id}static nowApiName(){return this.nowRequest().name}static nowRequest(){return request}static nowResponse(){return response}static nowPm(){return pm}}class WeiRecordApis{debug=!1;debugPrefix="WeiRecordApis";id="";name="";pm;request;response;hasResponse=!1;responseJsonBody={};static _appInstance=new WeiRecordApis;apis={};storeName="WeiRecordApisStoreNameE2D23E49E8685577";constructor(){}static app(){return this._appInstance.load(WeiPostMan.nowPm()),this._appInstance}startDebug(){return this.debug=!0,this}closeDebug(){return this.debug=!1,this}addApi(pm){var obj;return isUndefined(pm.response)||((obj=new WeiRecordApis).init(pm),this.apis[WeiPostMan.nowApiId()]=obj),this.store(pm),this}addApiNow(){return this.addApi(WeiPostMan.nowPm())}api(id){return this.log("api() start",id),isUndefined(this.apis[id])?(this.log("api() no"),null):(this.log("api() end",this.api[id]),this.apis[id])}nowApi(){return this.api(WeiPostMan.nowApiId())}getApis(){return this.apis}getApisIdNames(){var k,apisIdNames={};for(k in this.apis)apisIdNames[k]=this.apis[k].name;return apisIdNames}showApisIdNames(){return console.log(this.getApisIdNames()),this}init(pm){if(this.log("init","start"),this.debugPrefix="AutoTestApp",isUndefined((this.pm=pm).request)||(this.request=pm.request.toJSON()),isUndefined(pm.response)||(this.response=pm.response.toJSON()),this.hasResponse=!1,this.responseJsonBody={},this.log("init","hasResponse","before"),this.hasResponse=!isUndefined(this.response),this.log("init","hasResponse",this.hasResponse),this.hasResponse){this.id=WeiPostMan.nowApiId(),this.name=WeiPostMan.nowApiName();try{this.responseJsonBody=JSON.parse(this.response.text())}catch(e){this.log("JSON.parse","exception",e)}}this.log("init","end",this)}load(pm){var k,apis=WeiPostMan.nowPm().environment.get(this.storeName);for(k in apis){var row=apis[k],obj=new WeiRecordApis;obj.id=row.id,obj.name=row.name,obj.request=row.request,obj.response=row.response,obj.hasResponse=row.hasResponse,obj.responseJsonBody=row.responseJsonBody,this.apis[obj.id]=obj}return this}store(pm){return this.log("store start"),WeiPostMan.nowPm().environment.set(this.storeName,this.getApis()),this.log("store end"),this}log(...messages){return this.debug&&console.log(this.debugPrefix,...messages),this}clear(){return this.apis={},this}getRequestBodyFieldValue(data,name){for(var row in data){row=data[row];if(row.key==name)return row.value}return null}getHeaderByName(header,name){return this.getRequestBodyFieldValue(header,name)}getResponseHeader(name){return isUndefined(this.response)?null:this.getHeaderByName(this.response.header,name)}getRequestHeader(name){return isUndefined(this.request)?null:this.getHeaderByName(this.request.header,name)}getRequestBody(){return isUndefined(this.request)?null:"formdata"==this.request.body.mode?this.request.body.formdata:"urlencoded"==this.request.body.mode?this.request.body.urlencoded:"raw"==this.request.body.mode?this.request.body.raw:"file"==this.request.body.mode?this.request.body.file:this.request.body}getRequestBodyByName(name){return isUndefined(this.request)?null:"formdata"==this.request.body.mode||"urlencoded"==this.request.body.mode?this.getRequestBodyFieldValue(this.getRequestBody(),name):"raw"!=this.request.body.mode&&"file"==this.request.body.mode?this.request.body.file:this.getRequestBody()}}WeiRecordApis.app().addApiNow();