const pool = require("../config/db");

const createTask = async (req, res) => {
    try {
        const { title, description, project_id, assigned_to } = req.body;

        const result = await pool.query(
            `INSERT INTO tasks
            (title, description, project_id, assigned_to)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, description, project_id, assigned_to]
        );

        res.status(201).json({
            message: "Task created successfully",
            task: result.rows[0]
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id ASC"
        );

        res.status(200).json({
            count: result.rows.length,
            tasks: result.rows
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            task: result.rows[0]
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch task"
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, status } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET title = $1,
                 description = $2,
                 status = $3
             WHERE id = $4
             RETURNING *`,
            [title, description, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: result.rows[0]
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
};
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await pool.query(
            `DELETE FROM tasks t
             USING projects p
             WHERE t.project_id = p.id
             AND t.id = $1
             AND p.owner_id = $2
             RETURNING t.*`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};
const getTasksPaginated = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);

        const limit = Math.min(
            100,
            Math.max(1, Number(req.query.limit) || 10)
        );

        const offset = (page - 1) * limit;

        const result = await pool.query(
            `SELECT *
             FROM tasks
             ORDER BY id ASC
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        res.status(200).json({
            page,
            limit,
            tasks: result.rows
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};
module.exports = { 
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksPaginated
};