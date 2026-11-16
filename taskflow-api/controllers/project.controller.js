
const pool = require("../config/db");

const createProjectWithTask = async (req, res) => {
    const client = await pool.connect();

    try {
        const { name, description, owner_id, task_title } = req.body;

        await client.query("BEGIN");

        // 1. Create project
        const projectResult = await client.query(
            `INSERT INTO projects (name, description, owner_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, description, owner_id]
        );

        const project = projectResult.rows[0];

        // 2. Create initial task for that project
        const taskResult = await client.query(
            `INSERT INTO tasks (title, project_id, assigned_to)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [task_title, project.id, owner_id]
        );

        // 3. Save both operations
        await client.query("COMMIT");

        res.status(201).json({
            message: "Project and task created successfully",
            project,
            task: taskResult.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error(error.message);

        res.status(500).json({
            message: "Failed to create project and task"
        });

    } finally {
        client.release();
    }
};

const getMyProjects = async (req, res) => {
    try {
        // req.user.id comes from the verified JWT
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM projects
             WHERE owner_id = $1
             ORDER BY id DESC`,
            [userId]
        );

        res.status(200).json({
            projects: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const result = await pool.query(
            `UPDATE projects
             SET name = $1, description = $2
             WHERE id = $3
             RETURNING *`,
            [name, description, id]
        );

        res.status(200).json({
            message: "Project updated successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM projects
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        res.status(200).json({
            message: "Project deleted successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { 
    createProjectWithTask,
    getMyProjects,
    updateProject,
    deleteProject
};
