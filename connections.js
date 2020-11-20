const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '=Soccer17',
    database: 'employee_db'
});

const mainPrompt = require('./server');


// getDepartments = () => {
//     let array = [];
//     connection.promise().query(`SELECT name, id FROM departments`)
//     .then(result => {
//         array = array.concat(result);
//         return Promise.resolve(array);
//     })
//     .catch(err => {
//         console.log(err)
//     })
// };

getDepartments = async() => {
    const mysql2 = require('mysql2/promise');

    const con = mysql2.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '=Soccer17',
        database: 'employee_db'
    });

    try{
        const resultSet = await con.execute(`SELECT name, id FROM departments`)
        return Promise.resolve(resultSet);
    }
    catch (err) {
        console.error(err)
    }
};

viewDepartment = () => {
    connection.query(`SELECT name FROM departments`, function(err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        mainPrompt();
    });
};

viewRoles = () => {
    connection.query(`SELECT title, salary, name AS department
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id
    ORDER BY name;`, 
    function(err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        mainPrompt();
    });
};

viewAllEmployees = () => {
    connection.query(`SELECT A.id, A.first_name, A.last_name, roles.title, departments.name AS department, roles.salary, concat(B.first_name, ' ', B.last_name) AS manager
    FROM employees A
    LEFT JOIN roles
    ON A.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees B
    ON A.manager_id = B.id;`, 
    function(err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        mainPrompt();
    });
};

addDepartment = (department) => {
    
};

addRole = (title, salary, id) => {
    
};

addEmployee = (first, last, roleId, managerId) => {
    
};

updateRole = (newId, first, last) => {
    
};




module.exports = {
    viewDepartment,
    viewRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole,
    getDepartments,
    endConnection,
};