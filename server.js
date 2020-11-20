const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '=Soccer17',
    database: 'employee_db'
});

// Connect to mysql
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainPrompt();
})

// Starter Prompt
mainPrompt = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [{ name: 'View All Departments', value: 'view-departments' }, { name: 'View All Roles', value: 'view-roles' }, { name: 'View All Employees', value: 'viewAll' }, { name: 'Add a Department', value: 'add-Depart' }, { name: 'Add a Role', value: 'add-Role' }, { name: 'Add an Employee', value: 'add-Employee' }, { name: 'Update an Employee Role', value: 'updateByRole' }, {name: 'Finish', value: 'finish'}]
        }
    )
    .then(({ options }) => {
        switch (options) {
            case "view-departments":
                viewDepartment();
                break;
            case "view-roles":
                viewRoles();
                break;
            case "viewAll": 
                viewAllEmployees();
                break;
            case "add-Depart":
                addDepartmentPrompt();
                break;
            case "add-Role":
                addRolePrompt();
                break;
            case "add-Employee":
                addEmployeePrompt();
                break;
            case "updateByRole":
                updateRolePrompt();
                break;
            case "finish":
                endConnection();
                break;
        }
        console.log('\n');
    });
};

// Make array of roles
let roleArr = [];
function Role() {
    connection.query('SELECT * FROM roles', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

// Make array of departments
let departmentArr = [];
function Department() {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArr.push(res[i].name);
        }
    })
    return departmentArr;
}

// Make array of all employees
let employeeArr = [];
function Employee() {
    connection.query(`SELECT concat(first_name, ' ', last_name) AS full_name FROM employees`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employeeArr.push(res[i].full_name);
        }
    })
    return employeeArr;
}

// View all departments
viewDepartment = () => {
    connection.query(`SELECT name FROM departments`, function(err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        mainPrompt();
    });
};

// View all roles
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

// view all employees
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

//Add a Department
addDepartmentPrompt = () => {
    return inquirer.prompt(
        // add department
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department being added?'
        }
    )
    .then(value => {
        connection.query(`INSERT INTO departments SET ?`,
        {
            name: value.departmentName
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' department inserted!\n');
            mainPrompt();
        });
    });
};

// Add a Role
addRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role being added?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department is this role in?',
            choices: Department()
        }
    ])
    .then(value=> {
        let id = Department().indexOf(value.roleDepartment) + 1;
        connection.query(`INSERT INTO roles SET ?`,
        {
            title: value.roleName,
            salary: value.roleSalary,
            department_id: id
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' role inserted!\n');
            mainPrompt();
        });
    });
};

// Add an Employee
addEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the the employee's first name?" 
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the the employee's last name?" 
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
            choices: Role()
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who manages this employee?",
            choices: Employee()
        }
    ])
    .then(value => {
        let roleId = Role().indexOf(value.employeeRole) + 1;
        let managerId = Employee().indexOf(value.manager) + 1;
        connection.query(`INSERT INTO employees SET ?`,
        {
            first_name: value.firstName,
            last_name: value.lastName,
            role_id: roleId,
            manager_id: managerId
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' employee inserted!\n');
            mainPrompt();
        });
    });
};

// Update employees role
updateRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee's role are you updating?",
            choices: Employee()
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is the employee's new role?",
            choices: Role()
        }
    ])
    .then (value => {
        let employeeId = Employee().indexOf(value.employee) + 1;
        let roleId = Role().indexOf(value.newRole) + 1;
        connection.query(`UPDATE employees SET ? WHERE ?`,
        [{ role_id: roleId }, { id: employeeId }],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' employee role updated!\n');
            mainPrompt();
        });
    });
};

endConnection = () => {
    connection.end();
    return;
}