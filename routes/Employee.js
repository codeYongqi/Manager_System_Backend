const cookieParser = require('cookie-parser');
const { json } = require('express');
var express = require('express');
var router = express.Router();
const { insertEmployee,updateEmployee, deleteEmployee, setTeam, freeFromTeam, selectEmployeeByInfo, selectEmployeeById } = require('../model/employeeModel');
const { buildSuccess, buildError } = require('../utils/jsonUtils');
const session = require('express-session')

router.use(session({
    name: 'loginKey',
    secret: 'manage-system',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 3600 * 24 * 7
    }
}))

router.get('/', async (req, res, next) => {
    const result = await selectEmployeeByInfo(req.body)
    if(result.length == 1){
        await req.session.regenerate(function(err){
            if (err) {
                return res.json( buildError(2, "login fail") )
            } else {
                var id = result[0].id
                req.session.sessionName = id 
                res.json( buildSuccess(id) )
            }
        })
    } else {
        res.json( buildError(1, 'name or password is uncorrect'))
    }
})

router.post('/', async (req, res, next) => {
    const rows = await insertEmployee(req.body)
    res.json(buildSuccess( {'affectedRows' : rows.affectedRows} ))
})

router.get('/:id', async (req, res, next) => {
    var sessionName = 'employee_'+req.params.id
    var requestId = req.params.id
  if(requestId == req.session.sessionName){
    const rows = await selectEmployeeById(req.params.id)
    res.json(buildSuccess(rows))
  } else res.json( buildError(2, 'please login first'))
})

router.put('/:id', async (req, res, next) => {
  var requestId = req.params.id
  if(requestId == login_id){
    const rows = await updateEmployee(req.body, req.params.id)
    res.json(buildSuccess( {'affectedRows' : rows.affectedRows} ))
  }
})

router.delete('/:id', async (req, res, next) => {
  var requestId = req.params.id
  if(requestId == login_id){
    const rows = await deleteEmployee(req.params.id)
    res.json(buildSuccess( {'affectedRows' : rows.affectedRows} ))
  }
})

router.put('/:id/team', (req, res, next) => {
    const results = setTeam(req.body.teamId, req.params.id)
    res.json(buildSuccess(results))
})

router.delete('/:id/team', (req, res, next) => {
    const results = freeFromTeam(req.params.id)
    res.json(buildSuccess(results))
})

module.exports = router;
