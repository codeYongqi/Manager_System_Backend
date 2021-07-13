const { query, buildSql } = require("./Mysql")

//select all managers from table manager
async function selectAllManager() {
    const rows = await query('select * from manager')
    //console.log(rows)
    return rows;
}

//select managers from database by phone and passwd
async function selecteManagerByInfo (managerInfo) {
    const rows = await query(`select id,team_id from manager where phone = \'${managerInfo.phone}\' and passwd = \'${managerInfo.passwd}\'`)
    //console.log(rows)
    return rows;
} 

//select managers from database by manager's id
async function selectManagerById(managerId) {
    const rows = await query(`select * from manager where id = ${managerId}`)
    //console.log(rows)
    return rows;
} 

//add a new line to database
async function insertManager (managerInfo) {
    const rows = await query('insert into manager (name,age,phone,passwd,level,team_id)'+ 
    ` values (\'${managerInfo.name}\', ${managerInfo.age},\'${managerInfo.phone}\',\'${managerInfo.passwd}\',2,${managerInfo.team_id})`)
    //console.log(rows)
    return rows;
}

// update some fields at table manager
async function updateManager (managerInfo, managerId) {
    const sql = 'update manager ' + 'SET ' + await buildSql(managerInfo, ',') + `where id = ${managerId}` 
    const rows = await query(sql)
    //console.log(rows)
    return rows
}

// remove a line from table manager
async function deleteManager (managerId) {
    const rows = await query(`delete * from manager where id = ${managerId}`)
    //console.log(rows)
    return rows
}

module.exports = {selecteManagerByInfo, selectAllManager, selectManagerById, insertManager, updateManager, deleteManager}
