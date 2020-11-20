SELECT A.id, A.first_name, A.last_name, roles.title, departments.name AS department, roles.salary, concat(B.first_name, ' ', B.last_name) AS manager
FROM employees A
LEFT JOIN roles
ON A.role_id = roles.id
LEFT JOIN departments
ON roles.department_id = departments.id
LEFT JOIN employees B
ON A.manager_id = B.id;

SELECT title, salary, name
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id;