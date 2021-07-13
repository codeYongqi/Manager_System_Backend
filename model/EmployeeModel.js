const { query, buildSql } = require("./Mysql")

// select all employees from table employee
async function selectEmployeesByTeamId(teamId) {
    const results = await query(`select * from employee where team_id = ${teamId}`)
    //console.log(rows)
    return results
}

// select employee's id and team_id from table employee by team_id 
async function selectEmployeesBriefInfoByTeamId(teamId) {
    const results = await query(`select name,phone from employee where team_id = ${teamId}`)
    return results
}

// select employee's id and team_id from table employee by phone and passwd
async function selectEmployeeByInfo(employeeInfo) {
    const results = await query(`select id,team_id from employee where phone = \'${employeeInfo.phone}\' and passwd = \'${employeeInfo.passwd}\'`)
    return results
} 

// select employee from table employee by employee's id 
async function selectEmployeeById(employeeId) {
    const results = await query(`select * from employee where id = ${employeeId}`)
    return results
} 

//add a new line to table employee
async function insertEmployee (employeeInfo) {
    const results = await query('insert into employee (name,age,phone,passwd,level,team_id,free)'+ 
    ` values (\'${employeeInfo.name}\', ${employeeInfo.age},\'${employeeInfo.phone}\',\'${employeeInfo.passwd}\',1,\'${employeeInfo.team_id}\',0)`)
    return results
}

// update some fields at table employee
async function updateEmployee (employeeInfo, employeeId) {
    const sql = 'update employee set ' + await buildSql(employeeInfo, ',') + `where id = ${employeeId} `  
    const results = await query(sql)    
    return results
}

// remove a line from from employee 
async function deleteEmployee (employeeId) {
    const results = await query(`delete from employee where id = ${employeeId}`)    
    return results
}

// chanage a line's team_id
async function setTeam( teamId, employeeId ) {
    const sql = `update employee set team_id = ${teamId} , free = 0 where id = ${employeeId}`
    const results = await query(`update employee set team_id = ${teamId} , free = 0 where id = ${employeeId}`)
    //console.log(rows)
    return results;
}

// set a line's free = 1 and team_id = NULL
async function freeFromTeam( employeeId ) {
    const results = await query(`update employee set team_id = NULL , free = 1 where id = ${employeeId}`)
    //console.log(rows)
    return results;
}

module.exports = {selectEmployeesByTeamId, selectEmployeesBriefInfoByTeamId,selectEmployeeByInfo, selectEmployeeById
    ,insertEmployee, updateEmployee, deleteEmployee, setTeam, freeFromTeam}