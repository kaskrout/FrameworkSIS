const Layer = require("../models/layerModel");
const Sublayer = require("../models/Sublayer");
const mongoose = require("mongoose");

// get all layer
const getLayers = async (req, res) => {
  const layer = await Layer.find({}).sort({ createdAt: -1 });

  res.status(200).json(layer);
};

// get a single layer
const getLayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Layer" });
  }

  const layer = await Layer.findById(id);

  if (!layer) {
    return res.status(404).json({ error: "No such Layer" });
  }

  res.status(200).json(layer);
};

// create new layer
const createLayer = async (req, res) => {
  const { title } = req.body;
  console.log(title);
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
    const layer = await Layer.create({ title });
    res.status(200).json(layer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a layer
const deleteLayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such layer" });
  }

  // const layer = await layer.findById(id);
  const sublayer = await Sublayer.remove({ layereId: id });
  const layer = await Layer.findOneAndDelete({ _id: id });

  if (!layer) {
    return res.status(400).json({ error: "No such layer" });
  }

  res.status(200).json(layer);
};

// update a layer
const updateLayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such layer" });
  }

  const layer = await Layer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!layer) {
    return res.status(400).json({ error: "No such layer" });
  }

  res.status(200).json(layer);
};

module.exports = {
  getLayers,
  getLayer,
  createLayer,
  deleteLayer,
  updateLayer,
};
