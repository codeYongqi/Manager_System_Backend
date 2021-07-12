const { should, assert } = require('chai')
const request = require('supertest')
const app = require('../app')

function getMoble() {
    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}

describe('Employee API', () => {
    let server = app.listen(3000)
    let id
    let phone = getMoble()
    let passwd = "123456"
    let cookie  

    describe("#Register Test POST route /employee", () => {
        it("It should return code 0", async() => {
            const res = await request(server).post('/employee')
            .type('application/json')
            .send({
                "name":"kirin",
                "age":20,
                "phone":phone,
                "passwd":passwd,
                "team_id":"1"
            })
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
        })
    })

    describe("#Login Test GET route /employee/", () => {
        it("It should return code 0", async() => {
            const res = await request(server).get('/employee')
            .type('application/json')
            .send({
                "phone":phone,
                "passwd":passwd,
            })
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            id = res.body.data
            cookie = res.header['set-cookie'];
        })
    })

    describe("#Peronal Info Operate Test route /employee/:id", () => {
        afterEach(async() => {
            const res = await request(server).get(`/employee/${id}`)
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body)
        })

        it("this will change the info", async() => {
            const res = await request(server).put(`/employee/${id}`)
            .set('Cookie',cookie)
            .type('json')
            .send({
                "name":"jame"
            })
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
        })
    })

    describe("#Team Info Test route /team/employees", () => {
        it("this will show team's employees' name and phone", async() => {
            const res = await request(server).get(`/team/employees`)
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body.data)
        })
    })
})