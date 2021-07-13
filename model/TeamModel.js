const { query } = require("./Mysql")

// select all teams from table team 
async function selectAllTeam () {
    const rows = await query(`select * from team`)
    // console.log(rows)
    return rows;
}

// select from table team by team's id 
async function selectTeamById( teamId ) {
    const rows = await query(`select * from team where id = ${teamId}`)
    // console.log(rows)
    return rows;
}

// add a new line to table team
async function insertIntoTeam( teamInfo ) {
    const sql = `insert into team (name, manager_id) values ( \'${teamInfo.name}\' , ${teamInfo.manager_id} )`
    const rows = await query(`insert into team (name, manager_id) values ( \'${teamInfo.name}\' , ${teamInfo.manager_id})`)
    // console.log(rows)
    return rows;
}

// update some fields at table team
async function updateTeam( teamInfo ) {
    const rows = await query(`update employee set team_id = NULL , free = 1 where id = ${employeeId}`)
    // console.log(rows)
    return rows;
}

// remove a line from table team 
async function deleteTeam( teamId ) {
    const rows = await query(`delete from team where id = ${teamId}`)
    // console.log(rows)
    return rows;
}

module.exports = {selectAllTeam, selectTeamById, insertIntoTeam, updateTeam, deleteTeam}