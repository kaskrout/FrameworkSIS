const Subrole = require("../models/SubRoleModel");
const Role = require("../models/RoleModel");
const mongoose = require("mongoose");

// get all Subroles
const getSubroles = async (req, res) => {
  const Subroles = await Subrole.find({}).sort({ createdAt: -1 });

  res.status(200).json(Subroles);
};

// get Subroles by phaseId
const getSubrolesByRoleId = async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);
    const Subroles = await Subrole.find({ roleId: Role._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(Subroles);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single Subrole
const getSubrole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Subrole" });
  }

  const subrole = await Subrole.findById(id);

  if (!subrole) {
    return res.status(404).json({ error: "No such subrole" });
  }

  res.status(200).json(subrole);
};

// create new activity
const createSubrole = async (req, res) => {
  const { roleId, subroleName, details } = req.body;
  // await user.updateOne({ $push: { followers: req.body.userId } });
  const role = await Role.findById(roleId);
  let emptyFields = [];

  if (!subroleName) {
    emptyFields.push("subroleName");
  }
  if (!roleId) {
    emptyFields.push("roleId");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const subrole = await Subrole.create({
      roleId,
      subroleName,
      details,
    });
    await role.updateOne({ $push: { Subroles: subrole } });

    res.status(200).json(subrole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a activity
const deleteSubrole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Subrole" });
  }

  const subrole = await Subrole.findOneAndDelete({ _id: id });

  if (!subrole) {
    return res.status(400).json({ error: "No such Subrole" });
  }

  res.status(200).json(subrole);
};

// update a activity
const updateSubrole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Subrole" });
  }

  const subrole = await Subrole.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!subrole) {
    return res.status(400).json({ error: "No such Subrole" });
  }

  res.status(200).json(subrole);
};

module.exports = {
    getSubroles,
  getSubrole,
  getSubrolesByRoleId,
  createSubrole,
  deleteSubrole,
  updateSubrole,
};
