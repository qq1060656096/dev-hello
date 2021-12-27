// 断言200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


// body 转json 断言100
pm.test("code 100", function () {
    var jsonData = pm.response.json();
    pm.expect(parseInt(jsonData.code)).to.equal(100);
});



// 断言 schema
var Ajv = require('ajv'),
ajv = new Ajv({logger: console}),
schema = {
    "type": "object",
    "required": ["data"],
    "properties": {
        "data":{
            "type": "object",
            "required": ["skey"],
            "properties": {
                "skey": {
                    "type": "string"
                }
            }
        }
    }
};
pm.test('Schema is valid', function() {
    var jsonData = pm.response.json();
    pm.expect(ajv.validate(schema, {"data": {"skey": "testskey"}})).to.be.true;
});


// 接口之间请求延迟 1秒
setTimeout(function(){}, 1000);
