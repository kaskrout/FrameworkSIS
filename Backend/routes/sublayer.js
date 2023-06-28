const express = require("express");
const {
  createsublayer,
  getsublayers,
  getsublayer,
  deletesublayer,
  updatesublayer,
  getsublayerBylayerId,
} = require("../controllers/sublayerController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all sublayer routes
router.use(requireAuth);

// GET all sublayer
router.get("/", getsublayers);

//Get sublayer by layerID
router.get("/layer/:layerId", getsublayerBylayerId);
//GET a single sublayer
router.get("/:id", getsublayer);

// POST a new sublayer
router.post("/", createsublayer);

// DELETE a sublayer
router.delete("/:id", deletesublayer);

// UPDATE a sublayer
router.patch("/:id", updatesublayer);

module.exports = router;
