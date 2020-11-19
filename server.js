const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewAllEmployees, addDepartment, addRole } = require('./connections');


const departArr = [];
const rolesArr = [];
const employeeArr = [];

const mainPrompt = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [{ name: 'View All Departments', value: 'view-departments' }, { name: 'View All Roles', value: 'view-roles' }, { name: 'View All Employees', value: 'viewAll' }, { name: 'Add a Department', value: 'add-Depart' }, { name: 'Add a Role', value: 'add-Role' }, { name: 'Add an Employee', value: 'add-Employee' }, { name: 'Update and Employee Role', value: 'updateByRole' }]
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
                console.log('update by role');
                break;
        }
    });
};

const addDepartmentPrompt = () => {
    return inquirer.prompt(
        // add department
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department being added?'
        }
    )
    .then(department => {
        const name = JSON.stringify(department).split('"');
        departArr.push(department);
        addDepartment(name[3]);
        mainPrompt();
    });
};

const addRolePrompt = () => {
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
            choices: [{name: 'Sales', value: 1}, {name: 'Engineering', value: 2}, {name: 'Finance', value: 3}, {name: 'Legal', value: 4}]
        }
    ])
    .then((roleData) => {
        const str = JSON.stringify(roleData).split('"');
        const title = str[3];
        const salary = str[7];
        const split1 = str[10].split(':');
        const split2 = split1[1].split('}');
        const id = split2[0];
        console.log(title, salary, id);
        rolesArr.push(roleData)
        addRole(title, salary, id);
        mainPrompt();
    });
};

const addEmployeePrompt = () => {
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
    .then(employeeData => {
        employeeArr.push(employeeData)
        console.log(employeeArr);
        mainPrompt();
    });
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

mainPrompt()
.then(employeeInfo => {
    console.log(employeeInfo);
})
.catch (err => {
    console.log(err)
});