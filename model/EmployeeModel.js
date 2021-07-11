const { query, dynamicSql } = require("./Mysql")

// select all employees from database
async function selectAllEmployees() {
    const results = await query('select * from employee')
    return results
}

// select one employee from database
async function selectEmployeeByInfo(employeeInfo) {
    const results = await query(`select id from employee where phone = \'${employeeInfo.phone}\' and passwd = \'${employeeInfo.passwd}\'`)
    return results
} 

async function selectEmployeeById(employeeId) {
    const results = await query(`select * from employee where id = ${employeeId}`)
    return results
} 

// insert an new employee into database
async function insertEmployee (employeeInfo) {
    const results = await query('insert into employee (name,age,phone,passwd,level)'+ 
    ` values (\'${employeeInfo.name}\', ${employeeInfo.age},\'${employeeInfo.phone}\',\'${employeeInfo.passwd}\',${employeeInfo.level})`)
    return results
}


async function updateEmployee (employeeInfo, employeeId) {
    const sql = 'update employee set ' + await dynamicSql(employeeInfo, ',') + `whereId = ${employeeId} `  
    const results = await query(sql)    
    return results
}


async function deleteEmployee (employeeId) {
    const results = await query(`delete from employee where id = ${employeeId}`)    
    return results
}

// change the team 
async function setTeam( teamId, employeeId ) {
    const sql = `update employee set team_id = ${teamId} , free = 0 where id = ${employeeId}`
    const results = await query(`update employee set team_id = ${teamId} , free = 0 where id = ${employeeId}`)
    console.log(results)
    return results;
}

async function freeFromTeam( employeeId ) {
    const results = await query(`update employee set team_id = NULL , free = 1 where id = ${employeeId}`)
    console.log(results)
    return results;
}

module.exports = {selectAllEmployees, selectEmployeeByInfo, selectEmployeeById
    
    
    
    
    ,insertEmployee, updateEmployee, deleteEmployee, setTeam, freeFromTeam}