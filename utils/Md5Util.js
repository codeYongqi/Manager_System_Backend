var crypto = require('crypto')

//get random salt 
function getRandomSalt() {
    return Math.random.toString().slice(2,5)
}

//encode the password and salt by md5
function cryptPwd(passwd, salt) {
    var saltPasswd = passwd + ':' + salt
    var md5 = crypto.createHash('md5')
    return md5.update(saltPasswd).digest('hex')
}