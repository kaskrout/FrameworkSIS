const express = require("express");
const {
  createSubrole,
  getSubroles,
  getSubrole,
  deleteSubrole,
  updateSubrole,
  getSubrolesByRoleId,
} = require("../controllers/SubroleController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
 
// require auth for all Subrole routes
router.use(requireAuth);

// GET all Activities
router.get("/", getSubroles);

//Get Activities by phaseID
router.get("/phase/:phaseId", getSubrolesByRoleId);
//GET a single Subrole
router.get("/:id", getSubrole);

// POST a new Subrole
router.post("/", createSubrole);

// DELETE a Subrole
router.delete("/:id", deleteSubrole);

// UPDATE a Subrole
router.patch("/:id", updateSubrole);

module.exports = router;
