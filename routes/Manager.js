var express = require('express');
const { selectManagerById, updateManager, insertManager, deleteManager, selecteManagerByInfo } = require('../model/managerModel');
var router = express.Router();
const { buildSuccess } = require('../utils/jsonUtils');

let login_id;
let login_level;

router.get('/', async (req, res, next) => {
    const result = await selecteManagerByInfo(req.body)
    if (result.length == 1)  {
        login_level = 2
        login_id = result[0].id
        res.json(buildSuccess(result))
    }
})

/**
 * Register page
 * if success, this will return {'affectedRows' : rows.affectedRows}
 */
router.post('/', async (req, res, next) => {
    const result = await insertManager(req.body)
    res.json(buildSuccess ( {'affectedRows' : result.affectedRows} ))
    next()
})

/**
 * Info page, this will return manager's personal infomation
 */
router.get('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(login_id == requestId){
        const rows = await selectManagerById(req.params.id)
        res.json(buildSuccess(rows))
    }
    next()
})

router.delete('/:id', async (req, res, next) => {
    var requestId = req.params.id
    if(requestId == login_id) {
        const rows = await deleteManager(req.params.id)
        res.json(buildSuccess( {'affectedRows' : rows.affectedRows} ))
    }
    next()
})

/**
 * Update personal information
 * if success, will return {'affectedRows' : 1}
 */
router.put('/:id', async (req, res, next) => {
    const rows = await updateManager(req.body, req.params.id)
    res.json(buildSuccess( {'affectedRows' : rows.affectedRows} ))
    next()
})

module.exports = router;
