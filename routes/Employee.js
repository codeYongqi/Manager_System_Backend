var express = require('express');
var router = express.Router();
const { insertEmployee,updateEmployee, deleteEmployee, selectEmployeeByInfo, selectEmployeeById } = require('../model/employeeModel');
const { buildSuccess, buildError } = require('../utils/jsonUtils');

/**
 * Employee Login Controller 
 * if success login this will return Employee's id
 * else will return 'name or password is uncorrect'
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await selectEmployeeByInfo(req.body)
        if(result.length == 1){
            req.session.regenerate(function(err){
                    var id = result[0].id
                    req.session.employeeId = id 
                    req.session.teamId = result[0].team_id
                    res.json( buildSuccess(id) )
            })
        } else {
            res.json( buildError(1, 'name or password is uncorrect'))
        }
    } catch (error) {
        next()
    }
})

/**
 * Employee Register Controller 
 * if success, will 'successfully register' 
 */
router.post('/', async (req, res, next) => {
    try {
        const rows = await insertEmployee(req.body)
        res.json( buildSuccess('successfully register') )
    } catch (error) {
        next()
    }
})

/**
 * Employee Info Controller 
 * if success will employee's personal infomation  
 */
router.get('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.employeeId){
        try {
            const rows = await selectEmployeeById(req.params.id)
            res.json(buildSuccess(rows))
        } catch (error) {
            next()   
        }
    } else res.json( buildError(2, 'please login first'))
})

/**
 * Peronal Information Update Controller
 * if success, will return 'update success'
 */
router.put('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.employeeId){
        try {
            const rows = await updateEmployee(req.body, req.params.id)
            res.json(buildSuccess(  'update success' ))
        } catch (error) {
            next()
        }
    } else res.json( buildError(2, 'please login first'))
})

/**
 * Employee Delete Controller
 * if success, will return 'delete success'
 */
router.delete('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == login_id){
        try {
            const rows = await deleteEmployee(req.params.id)
            res.json(buildSuccess(  'delete success'  ))
        } catch (error) {
            next()
        }
    } else res.json( buildError(2, 'please login first'))
})


module.exports = router;
