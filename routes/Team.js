var express = require('express');
const { setTeam, freeFromTeam, selectEmployeesBriefInfoByTeamId, selectEmployeesByTeamId } = require('../model/employeeModel');
var router = express.Router();
const { selectTeamById, insertIntoTeam } = require('../model/TeamModel');
const { buildSuccess, buildError } = require('../utils/jsonUtils');

/**
 * Team Information Controller
 * return this team's information 
 */
router.get('/:id', async (req, res, next) => {
    if (typeof req.session.managerId == 'undefined' &&
        typeof req.session.employeeId == 'undefined'){
        return res.json (buildError('please login first'))
    } 
    try {
        const result = await selectTeamById( req.params.id )
        res.json(buildSuccess(result))
    } catch (error) {
        next()
    }
})

/**
 * Team Update Controller
 * add a new team, will return 'successfully insert' if success
 */
router.post('/', async (req, res, next) => {
    try {
        const result = await insertIntoTeam (req.body)
        res.json(buildSuccess('successfully insert'))
    } catch (error) {
        next()
    }
})

/* router.delete('/:id', async (req, res, next) => {
    if (typeof req.session.managerId == 'undefined'){
        return res.json (buildError('please login as a Manager'))
    } 
    const result = await deleteTeam( req.params.id )
    res.json(buildSuccess(result))
}) */

/**
 * Team Employees Controller
 * if Manager login, return this team's employees' all personal information
 * if Employee login, return this team's employees' name and phone
 */
router.get('/employees', async(req, res, next) => {
    if(typeof req.session.managerId != 'undefined'){
        try {
            const result = await selectEmployeesByTeamId(req.session.teamId)
            res.json( buildSuccess(result) )
        } catch (error) {
            next()
        }
    }else if (typeof req.session.employeeId != 'undefined'){
        try {
            const result = await selectEmployeesBriefInfoByTeamId(req.session.teamId)
            res.json( buildSuccess(result) )
        } catch (error) {
            next()
        }
    }else {
        res.json ( buildError(2, 'please login first'))
    }
})


/**
 * Team Employee Upate Controller
 * this will chanage the employee's team if employee is free
 */
router.put('/employee/:id', async (req, res, next) => {
    if (typeof req.session.managerId == 'undefined'){
        return res.json (buildError('please login as a Manager'))
    } 
    try {
        const results = await setTeam(req.body.team_id, req.params.id)
        res.json(buildSuccess('successfully add employee to this team'))
    } catch (error) {
        next()
    }
})

/**
 * Team Employee Delete Controller
 * this will remove the employee from this team
 */
router.delete('/employee/:id', async (req, res, next) => {
    if (typeof req.session.managerId == 'undefined'){
        return res.json (buildError('please login as a Manager'))
    } 
    try {
        const results = await freeFromTeam(req.params.id)
        res.json(buildSuccess('successfully remove employee from this team'))
    } catch (error) {
        next()
    }
})

module.exports = router;