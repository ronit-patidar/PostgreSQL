We'll build a Task Management API

Users can:
- Register and log in.
- Create projects.
- Create tasks inside projects.
- Assign tasks to users.
- Update task status.
- Delete projects and tasks.
- View all tasks belonging to a project.
- Filter and search tasks.

1. Technology stack
Technology	         Purpose
Node.js	             Runtime
Express.js	         Backend framework
PostgreSQL	         Database
pg	                 PostgreSQL driver
dotenv	             Environment variables
bcrypt	             Password hashing
jsonwebtoken	       Authentication
express-validator	   Request validation
Postman	             API testing

Learning roadmap
1. Project setup
   
   Node.js, Express, PostgreSQL installation, pg package, Pool and database connection.
   Starting now
2. Database design
   
   Tables, data types, PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, DEFAULT, CHECK.
3. SQL CRUD operations
   
   INSERT, SELECT, UPDATE, DELETE, RETURNING.
4. Relationships
   
   One-to-one, one-to-many, many-to-many, JOINs and relational database design.
5. Advanced SQL
   
   GROUP BY, HAVING, aggregate functions, subqueries, CTEs and PostgreSQL JSONB basics.
6. Backend integration
   
   Express routes, controllers, middleware, connection pooling, parameterized queries and error handling.
7. Authentication
   
   Registration, login, bcrypt, JWT and protected routes.
8. Advanced database concepts
   
   Transactions, ACID, indexes, pagination, filtering and sorting.
9. Testing and finalization
   
   Postman, validation, HTTP status codes and clean project structure.

DATABASE DESIGN
users
Column	Type
id	SERIAL PRIMARY KEY
name	VARCHAR(100)
email	VARCHAR(255) UNIQUE
password	TEXT
created_at	TIMESTAMP   

              One user can create many projects

projects
Column	Type
id	SERIAL PRIMARY KEY
name	VARCHAR(150)
description	TEXT
owner_id	INTEGER (FK)  

              One project can have many tasks
                
tasks
Column	Type
id	SERIAL PRIMARY KEY
title	VARCHAR(200)
description	TEXT
status	VARCHAR(30)
project_id	INTEGER (FK)
assigned_to	INTEGER (FK)
created_at	TIMESTAMP                    

FOLDER STRUCTURE

config: Database configuration.
controllers: Business logic.
routes: API endpoints.
middleware: Authentication and validation.
models: Database-related operations.
server.js: Main application entry point.


Pool: manages multiple reusable database connections.

Client: represents one dedicated database connection.
(Used in transactions, but not recommended for general use.)

Property	Meaning	TaskFlow example
Atomicity	All operations succeed or none do	Project and task are both saved, or neither is
Consistency	Data must follow database rules	A task cannot reference a nonexistent project
Isolation	Concurrent transactions should not interfere incorrectly	Two users creating projects at the same time should not corrupt each other's data
Durability	Committed changes persist	After COMMIT, the project remains saved even if the server restarts

