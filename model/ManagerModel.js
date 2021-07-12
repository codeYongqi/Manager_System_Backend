const { query, buildSql } = require("./Mysql")

async function selectAllManager() {
    const rows = await query('select * from manager')
    //console.log(rows)
    return rows;
}

async function selecteManagerByInfo (managerInfo) {
    const rows = await query(`select id,team_id from manager where phone = \'${managerInfo.phone}\' and passwd = \'${managerInfo.passwd}\'`)
    //console.log(rows)
    return rows;
} 

async function selectManagerById(managerId) {
    const rows = await query(`select * from manager where id = ${managerId}`)
    //console.log(rows)
    return rows;
} 

async function insertManager (managerInfo) {
    const rows = await query('insert into manager (name,age,phone,passwd,level,team_id)'+ 
    ` values (\'${managerInfo.name}\', ${managerInfo.age},\'${managerInfo.phone}\',\'${managerInfo.passwd}\',2,${managerInfo.team_id})`)
    //console.log(rows)
    return rows;
}

async function updateManager (managerInfo, managerId) {
    const sql = 'update manager ' + 'SET ' + await buildSql(managerInfo, ',') + `where id = ${managerId}` 
    const rows = await query(sql)
    //console.log(rows)
    return rows
}


async function deleteManager (managerId) {
    const rows = await query(`delete * from manager where id = ${managerId}`)
    //console.log(rows)
    return rows
}

/*insertManager(
   {
    "name":"Leo",
    "age":41,
    "phone":"1778855",
    "passwd":"123456",
    "level":2
    }
)*/

/* selectOneManager({
    "passwd":"Leo",
    "passwd":"123456"
})*/

/*updateManager({
    "id":2,
    "passwd":"Leo",
    "age":42,
    "phone":"1778855",
    "passwd":"123456",
})*/

module.exports = {selecteManagerByInfo, selectAllManager, selectManagerById, insertManager, updateManager, deleteManager}
