var express = require('express');
const { selectManagerById, updateManager, insertManager, deleteManager, selecteManagerByInfo } = require('../model/managerModel');
var router = express.Router();
const { buildSuccess, buildError } = require('../utils/jsonUtils');

/**
 * Manager Login Controller 
 * if success login this will return Manager's id
 * else will return 'name or password is uncorrect'
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await selecteManagerByInfo(req.body)
        if (result.length == 1)  {
            req.session.regenerate(function (err) {
                var id = result[0].id
                req.session.managerId = id 
                console.log(result[0].team_id)
                req.session.teamId = result[0].team_id
                res.json ( buildSuccess(id) )
            })
        }else{
            req.json( buildError(1, 'name or password uncorrect'))
        }
    } catch (error) {
        next()
    }
})

/**
 * Manager Register Controller 
 * if success, will 'successfully register' 
 */
router.post('/', async (req, res, next) => {
    try {
        const result = await insertManager(req.body)
        res.json(buildSuccess ( 'successfully register'))
    } catch (error) {
        next()
    }
})

/**
 * Manager Register Controller 
 * if success will return 'register success' 
 */
router.get('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId){
        try {
            const rows = await selectManagerById(req.params.id)
            res.json(buildSuccess(rows))
        } catch (error) {
            next()
        }
    }else res.json( buildError(2, 'please login first'))
})

/**
 * Manager Delete Controller
 * if success, will return 'delete success'
 */
router.delete('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId) {
        try {
            const rows = await deleteManager(req.params.id)
            res.json(buildSuccess( 'delete success' ))
        } catch (error) {
            next()
        }
    }else res.json( buildError(2, 'please login first'))
})

/**
 * Peronal Information Update Controller
 * if success, will return 'update success'
 */
router.put('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == req.session.managerId) {
        try {
            const rows = await updateManager(req.body, req.params.id)
            res.json(buildSuccess( 'update success'))
        } catch (error) {
            next()
        }
    }else res.json( buildError(2, 'please login first'))
})

module.exports = router;
