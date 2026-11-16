
const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const authorizeProjectOwner = require("../middlewares/authorizeProject");
const {
    getMyProjects,
    updateProject,
    deleteProject,
} = require("../controllers/project.controller");

router.get(
    "/my-projects",
    authenticateUser,
    getMyProjects
);

router.put(
    "/:id",
    authenticateUser,
    authorizeProjectOwner,
    updateProject
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeProjectOwner,
    deleteProject
);


module.exports = router;
