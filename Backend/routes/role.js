const express = require("express");
const {
  createRole,
  getRoles,
  getRole,
  deleteRole,
  updateRole,
} = require("../controllers/RoleController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all Role routes
router.use(requireAuth);

// GET all Roles
router.get("/", getRoles);

//GET a single Role
router.get("/:id", getRole);

// POST a new Role
router.post("/", createRole);

// DELETE a Role
router.delete("/:id", deleteRole);

// UPDATE a Role
router.patch("/:id", updateRole);

module.exports = router;
