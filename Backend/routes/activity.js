const express = require("express");
const {
  createActivity,
  getActivities,
  getActivity,
  deleteActivity,
  updateActivity,
  getActivitiesByPhaseId,
} = require("../controllers/activityController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
 
// require auth for all Activity routes
router.use(requireAuth);

// GET all Activities
router.get("/", getActivities);

//Get Activities by phaseID
router.get("/phase/:phaseId", getActivitiesByPhaseId);
//GET a single Activity
router.get("/:id", getActivity);

// POST a new Activity
router.post("/", createActivity);

// DELETE a Activity
router.delete("/:id", deleteActivity);

// UPDATE a Activity
router.patch("/:id", updateActivity);

module.exports = router;
