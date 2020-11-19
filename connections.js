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

addEmployee = (first, last, roleId, managerId) => {
    connection.query(`INSERT INTO employees SET ?`,
    {
        first_name: first,
        last_name: last,
        role_id: roleId,
        manager_id: managerId
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' employee inserted!\n');
    });
};

updateRole = (newId, first, last) => {
    connection.query(`UPDATE employees SET ? WHERE ?`,
    [{role_id: newId}, {first_name: first, last_name: last}],
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' employee role updated!\n');
    });
};


module.exports = {
    viewDepartment,
    viewRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
};