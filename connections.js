const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '=Soccer17',
    database: 'employee_db'
});

viewDepartment = () => {
    connection.query(`SELECT * FROM departments`, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
};

viewRoles = () => {
    connection.query(`SELECT * FROM roles`, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
};

viewAllEmployees = () => {
    connection.query(`SELECT * FROM employees`, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
};

addDepartment = (department) => {
    connection.query(`INSERT INTO departments SET ?`,
    {
        name: department
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department inserted!\n');
    });
};

addRole = (title, salary, id) => {
    connection.query(`INSERT INTO roles SET ?`,
    {
        title: title,
        salary: salary,
        department_id: id
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' role inserted!\n');
    });
};


module.exports = {
    viewDepartment,
    viewRoles,
    viewAllEmployees,
    addDepartment,
    addRole
};