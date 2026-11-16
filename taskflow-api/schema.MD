// RUN IN POSTGRESQL QUERY TOOL

// Schema for users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Explanation:
- id: Automatically generated unique ID.
- name: User's name.
- email: Unique email address.
- password: Hashed password (we'll implement bcrypt later).
- created_at: Automatically stores the creation timestamp.


// Schema for projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    owner_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_owner
    FOREIGN KEY (owner_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

ON DELETE CASCADE 
Suppose user ID 1 owns three projects.

If you delete user ID 1, PostgreSQL automatically deletes those three projects.

This is called cascading deletion.

We'll discuss other foreign key actions later.

// Schema for tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    status VARCHAR(30) DEFAULT 'pending',

    project_id INTEGER NOT NULL,

    assigned_to INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_task_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_task_user
    FOREIGN KEY (assigned_to)
    REFERENCES users(id)
    ON DELETE SET NULL,

    CONSTRAINT check_task_status
    CHECK (status IN ('pending', 'in_progress', 'completed'))
);

Notice two new things:

1. ON DELETE SET NULL

If a user assigned to a task is deleted, the task remains, but assigned_to becomes NULL.

2. CHECK constraint

Only three task statuses are allowed:
- pending
- in_progress
- completed
You cannot insert an arbitrary status such as hello.