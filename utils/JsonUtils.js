// Common Utils to build json format message


var buildSuccess = function (data) {
    return {
        "code":0,
        "data":data
    }
}

var buildError = function (code, err) {
    return {
        "code":code,
        "message":err
    }
}

module.exports = {buildSuccess, buildError}