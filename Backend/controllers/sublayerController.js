const Sublayer = require("../models/Sublayer");
const Layer = require("../models/layerModel");
const mongoose = require("mongoose");

// get all sublayers
const getsublayers = async (req, res) => {
  const Sublayers = await Sublayer.find({}).sort({ createdAt: -1 });

  res.status(200).json(Sublayers);
};

// get sublayers by layerId
const getsublayerBylayerId = async (req, res) => {
  try {
    const layer = await Layer.findById(req.params.layerId);
    const Sublayers = await Sublayer.find({ layerId: layer._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(Sublayers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single sublayer
const getsublayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sublayer" });
  }

  const sublayer = await Sublayer.findById(id);

  if (!sublayer) {
    return res.status(404).json({ error: "No such sublayer" });
  }

  res.status(200).json(sublayer);
};

// create new sublayer
const createsublayer = async (req, res) => {
  const { layerId, title, Details, questions } = req.body;
  // await user.updateOne({ $push: { followers: req.body.userId } });
  const layer = await Layer.findById(layerId);
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!layerId) {
    emptyFields.push("layerId");
  }
  if (!Details) {
    emptyFields.push("Details");
  }
  if (!questions) {
    emptyFields.push("questions");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const sublayer = await Sublayer.create({
      layerId,
      title,
      Details,
      questions,
    });
    await layer.updateOne({ $push: { sublayer: sublayer } });

    res.status(200).json(sublayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a sublayer
const deletesublayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sublayer" });
  }

  const sublayer = await sublayer.findOneAndDelete({ _id: id });

  if (!sublayer) {
    return res.status(400).json({ error: "No such sublayer" });
  }

  res.status(200).json(sublayer);
};

const updatesublayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sublayer" });
  }

  const { title, Details, questions } = req.body;

  const updatedFields = {};
  if (title) {
    updatedFields.title = title;
  }
  if (Details) {
    updatedFields.Details = Details;
  }
  if (questions) {
    updatedFields.questions = questions;
  }

  const sublayer = await Sublayer.findOneAndUpdate(
    { _id: id },
    { $set: updatedFields },
    { new: true }
  );

  if (!sublayer) {
    return res.status(400).json({ error: "No such Sublayer" });
  }

  // Find the corresponding layer and update the sublayer in its sublayers array
  const layer = await Layer.findOne({ _id: sublayer.layerId });

  if (!layer) {
    return res.status(404).json({ error: "No such Layer" });
  }

  if (layer.sublayers && Array.isArray(layer.sublayers)) {
    const updatedSublayers = layer.sublayers.map((act) =>
      act._id.toString() === id ? { ...sublayer.toObject() } : act
    );

    layer.sublayers = updatedSublayers;
    await layer.save();
  }

  res.status(200).json({ sublayer, layer });
};

module.exports = {
  getsublayers,
  getsublayer,
  getsublayerBylayerId,
  createsublayer,
  deletesublayer,
  updatesublayer,
};
