const Activity = require("../models/activityModel");
const Phase = require("../models/phaseModel");
const mongoose = require("mongoose");

// get all Acitivities
const getActivities = async (req, res) => {
  const Activities = await Activity.find({}).sort({ createdAt: -1 });

  res.status(200).json(Activities);
};

// get Activities by phaseId
const getActivitiesByPhaseId = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.phaseId);
    const Activities = await Activity.find({ phaseId: phase._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(Activities);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single activity
const getActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Activity" });
  }

  const activity = await Activity.findById(id);

  if (!activity) {
    return res.status(404).json({ error: "No such Activity" });
  }

  res.status(200).json(activity);
};

// create new activity
const createActivity = async (req, res) => {
  const { phaseId, title, description, steps } = req.body;
  // await user.updateOne({ $push: { followers: req.body.userId } });
  const phase = await Phase.findById(phaseId);
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!phaseId) {
    emptyFields.push("phaseId");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!steps) {
    emptyFields.push("steps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const activity = await Activity.create({
      phaseId,
      title,
      description,
      steps,
    });
    await phase.updateOne({ $push: { activities: activity } });

    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a activity
const deleteActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Activity" });
  }

  const activity = await Activity.findOneAndDelete({ _id: id });

  if (!activity) {
    return res.status(400).json({ error: "No such Activity" });
  }

  res.status(200).json(activity);
};

// update a activity
const updateActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Activity" });
  }

  const { title, description, steps } = req.body;

  const updatedFields = {};
  if (title) {
    updatedFields.title = title;
  }
  if (description) {
    updatedFields.description = description;
  }
  if (steps) {
    updatedFields.steps = steps;
  }

  const activity = await Activity.findOneAndUpdate(
    { _id: id },
    {
      $set: updatedFields,
    },
    { new: true }
  );

  if (!activity) {
    return res.status(400).json({ error: "No such Activity" });
  }

  // Find the corresponding phase and update the activity in its activities array
  const phase = await Phase.findOne({ _id: activity.phaseId });

  if (!phase) {
    return res.status(404).json({ error: "No such Phase" });
  }

  const updatedActivities = phase.activities.map(
    (act) => (act._id.toString() === id ? { ...activity.toObject() } : act) // Merge the original activity fields back into the updated activity
  );

  phase.activities = updatedActivities;
  await phase.save();

  res.status(200).json({ activity, phase });
};

module.exports = {
  getActivities,
  getActivity,
  getActivitiesByPhaseId,
  createActivity,
  deleteActivity,
  updateActivity,
};
