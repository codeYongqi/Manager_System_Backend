const { query } = require("./Mysql")

async function selectAllTeam () {
    const rows = await query(`select * from team`)
    // console.log(rows)
    return rows;
}

async function selectTeamById( teamId ) {
    const rows = await query(`select * from team where id = ${teamId}`)
    // console.log(rows)
    return rows;
}

async function insertIntoTeam( teamInfo ) {
    const sql = `insert into team (name, manager_id) values ( \'${teamInfo.name}\' , ${teamInfo.manager_id} )`
    const rows = await query(`insert into team (name, manager_id) values ( \'${teamInfo.name}\' , ${teamInfo.manager_id})`)
    // console.log(rows)
    return rows;
}

async function updateTeam( teamInfo ) {
    const rows = await query(`update employee set team_id = NULL , free = 1 where id = ${employeeId}`)
    // console.log(rows)
    return rows;
}

async function deleteTeam( teamId ) {
    const rows = await query(`delete from team where id = ${teamId}`)
    // console.log(rows)
    return rows;
}
// setTeam(5, 12)
// freeFromTeam(12)
module.exports = {selectAllTeam, selectTeamById, insertIntoTeam, updateTeam, deleteTeam}