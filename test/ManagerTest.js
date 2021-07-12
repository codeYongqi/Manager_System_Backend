const { assert } = require('chai');
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

/**
 * API Test of Manager
 */
describe('Manager API', () => {
    let server = app.listen(4000)
    let id
    let phone = getMoble()
    let passwd = "123456"
    let cookie  

    describe("#Register Test POST route /manager", () => {
        it("It should return code 0", async() => {
            const res = await request(server).post('/manager')
            .type('application/json')
            .send({
                "name":"kirin",
                "age":20,
                "phone":phone,
                "passwd":passwd,
                "team_id":"5"
            })
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
        })
    })

    describe("#Login Test GET route /manager/", () => {
        it("It should return code 0", async() => {
            const res = await request(server).get('/manager/')
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

    describe("#Peronal Info Operate Test route /manager/:id", () => {
        afterEach(async() => {
            const res = await request(server).get(`/manager/${id}`)
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body)
        })

        it("this will change the info", async() => {
            const res = await request(server).put(`/manager/${id}`)
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
        it("this will show team's employees' personal information", async() => {
            const res = await request(server).get(`/team/employees`)
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body.data)
        })
    })

    describe("#this will change employee team state", () => {
        let employeeId = 1

        it("this will set employee free", async() => {
            const res = await request(server).delete(`/team/employee/${employeeId}`)
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body.data)
        })

        it("this will set employee's team", async() => {
            const res = await request(server).put(`/team/employee/${employeeId}`)
            .type('json')
            .send({"team_id":20})
            .set('Cookie',cookie)
            .expect('Content-Type','application/json; charset=utf-8')
            .expect(200)
            assert.equal(res.body.code, 0)
            console.log(res.body.data)
        })
    })
})