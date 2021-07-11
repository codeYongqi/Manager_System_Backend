var express = require('express');
var router = express.Router();
const { selectTeamById, insertIntoTeam, deleteTeam } = require('../model/TeamModel');
const { buildSuccess } = require('../utils/jsonUtils');

/* select user from database */
router.get('/:id', async (req, res, next) => {
    const result = await selectTeamById( req.params.id )
    res.json(buildSuccess(result))
})

router.post('/', async (req, res, next) => {
    const result = await insertIntoTeam (req.body)
    res.json(buildSuccess(result))
})

router.delete('/:id', async (req, res, next) => {
    const result = await deleteTeam( req.params.id )
    res.json(buildSuccess(result))
})



module.exports = router;