const inquirer = require('inquirer');

const mainPrompt = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update and Employee Role']
        }
    )
};

const addDepartment = () => {
    return inquirer.prompt(
        // add department
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department being added?'
        }
    )
};

const addRole = () => {
    return inquirer.prompt([
        // add role
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
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    ])
};

const addEmployee = () => {
    return inquirer.prompt([
        // add employee
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
            choices: [1,2,3]
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who manages this employee?",
            choices: ['none', 1, 2, 3]
        }
    ])
};

const updateRole = () => {
    return inquirer.prompt([
        // update employee role
        {
            type: 'list',
            name: 'employeeName',
            message: "Which employee's role are you updating?",
            choices: [1,2,3]
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is the employee's new role?",
            choices: [1,2,3]
        }
    ])
};

.then(employeeInfo => {
    console.log(employeeInfo);
})
.catch (err => {
    console.log(err)
});