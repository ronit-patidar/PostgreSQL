
const pool = require("../config/db");

const authorizeProjectOwner = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT id
             FROM projects
             WHERE id = $1 AND owner_id = $2`,
            [projectId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Project belongs to the logged-in user
        next();

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = authorizeProjectOwner;
