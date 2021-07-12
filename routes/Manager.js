var express = require('express');
const { selectAllEmployees, setTeam, freeFromTeam } = require('../model/employeeModel');
const { selectManagerById, updateManager, insertManager, deleteManager, selecteManagerByInfo } = require('../model/managerModel');
var router = express.Router();
const { buildSuccess, buildError } = require('../utils/jsonUtils');

/**
 * Peronal Infomation Page
 */
router.get('/', async (req, res, next) => {
    const result = await selecteManagerByInfo(req.body)
    if (result.length == 1)  {
        req.session.regenerate(function (err) {
            if (err) {
                return res.json( buildError(2, 'login fail') )
            }else{
                var id = result[0].id
                req.session.managerId = id 
                res.json ( buildSuccess(id) )
            }
        })
    }else{
        req.json( buildError(1, 'name or password uncorrect'))
    }
})

router.get('/employees', async(req, res, next) => {
    if(typeof req.session.managerId != 'undefined'){
        const result = await selectAllEmployees()
        res.json( buildSuccess(result) )
    }else {
        res.json ( buildError(2, 'please login first'))
    }
})

/**
 * Register page
 * if success, this will return {'affectedRows' : rows.affectedRows}
 */
router.post('/', async (req, res, next) => {
    const result = await insertManager(req.body)
    res.json(buildSuccess ( 'success register'))
})

/**
 * Info page, this will return manager's personal infomation
 */
router.get('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId){
        const rows = await selectManagerById(req.params.id)
        res.json(buildSuccess(rows))
    }
})

router.delete('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId) {
        const rows = await deleteManager(req.params.id)
        res.json(buildSuccess( 'delete success' ))
    }
})

/**
 * Update personal information
 * if success, will return {'affectedRows' : 1}
 */
router.put('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId) {
        const rows = await updateManager(req.body, req.params.id)
        res.json(buildSuccess( 'update success'))
    }
})


router.put('/employee/:id/team', async (req, res, next) => {
    const results = await setTeam(req.body.teamId, req.params.id)
    res.json(buildSuccess(results))
})

router.delete('/employee/:id/team', async (req, res, next) => {
    const results = await freeFromTeam(req.params.id)
    res.json(buildSuccess('successfully remove employee from this team'))
})

module.exports = router;
