const Phase = require("../models/phaseModel");
const Activity = require("../models/activityModel");
const mongoose = require("mongoose");

// get all Phases
const getPhases = async (req, res) => {
  const phases = await Phase.find({}).sort({ createdAt: -1 });

  res.status(200).json(phases);
};

// get a single phase
const getPhase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Phase" });
  }

  const phase = await Phase.findById(id);

  if (!phase) {
    return res.status(404).json({ error: "No such Phase" });
  }

  res.status(200).json(phase);
};

// create new phase
const createPhase = async (req, res) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const phase = await Phase.create({ title });
    res.status(200).json(phase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a phase
const deletePhase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Phase" });
  }

  // const phase = await Phase.findById(id);
  const activities = await Activity.remove({phaseId: id})
  const phase = await Phase.findOneAndDelete({ _id: id });

  if (!phase) {
    return res.status(400).json({ error: "No such Phase" });
  }

  res.status(200).json(phase);
};

// update a phase
const updatePhase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Phase" });
  }

  const phase = await Phase.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!phase) {
    return res.status(400).json({ error: "No such Phase" });
  }

  res.status(200).json(phase);
};

module.exports = {
  getPhases,
  getPhase,
  createPhase,
  deletePhase,
  updatePhase,
};
