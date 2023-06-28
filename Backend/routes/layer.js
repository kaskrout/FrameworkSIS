const express = require("express");
const {
    createLayer,
  getLayers,
  getLayer,
  deleteLayer,
  updateLayer,
} = require("../controllers/layerController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all phase routes
router.use(requireAuth);

// GET all phases
router.get("/", getLayers);

//GET a single phase
router.get("/:id", getLayer);

// POST a new phase
router.post("/", createLayer);

// DELETE a phase
router.delete("/:id", deleteLayer);

// UPDATE a phase
router.patch("/:id", updateLayer);

module.exports = router;
