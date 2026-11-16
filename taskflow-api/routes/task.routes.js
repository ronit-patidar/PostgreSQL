const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth.middleware");
const {createProjectWithTask} = require("../controllers/project.controller.js")
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/task.controller");

router.post("/",authenticateUser,createTask);
router.get("/",authenticateUser,getAllTasks);
router.get("/:id",authenticateUser, getTaskById);
router.put("/:id",authenticateUser, updateTask);
router.delete("/:id",authenticateUser, deleteTask);

// transaction
router.post(
    "/with-task",
    createProjectWithTask
);


module.exports = router;