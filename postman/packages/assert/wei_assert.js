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