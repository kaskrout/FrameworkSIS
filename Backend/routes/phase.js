const express = require("express");
const {
  createPhase,
  getPhases,
  getPhase,
  deletePhase,
  updatePhase,
} = require("../controllers/phaseController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all phase routes
router.use(requireAuth);

// GET all phases
router.get("/", getPhases);

//GET a single phase
router.get("/:id", getPhase);

// POST a new phase
router.post("/", createPhase);

// DELETE a phase
router.delete("/:id", deletePhase);

// UPDATE a phase
router.patch("/:id", updatePhase);

module.exports = router;
