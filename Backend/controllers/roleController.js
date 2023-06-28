const Role = require("../models/RoleModel");
const Subrole = require("../models/SubRoleModel");
const mongoose = require("mongoose");

// get all Roles
const getRoles = async (req, res) => {
  const role = await Role.find({}).sort({ createdAt: -1 });

  res.status(200).json(role);
};

// get a single Role
const getRole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Role" });
  }

  const role = await Role.findById(id);

  if (!role) {
    return res.status(404).json({ error: "No such Role" });
  }

  res.status(200).json(role);
};

// create new role
const createRole = async (req, res) => {
  const { RoleName } = req.body;

  let emptyFields = [];

  if (!RoleName) {
    emptyFields.push("RoleName");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const role = await Role.create({ RoleName });
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Role" });
  }

  // const role = await Role.findById(id);
  const subroles = await Subrole.remove({roleId: id})
  const role = await Role.findOneAndDelete({ _id: id });

  if (!role) {
    return res.status(400).json({ error: "No such Role" });
  }

  res.status(200).json(role);
};

// update a role
const updateRole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Role" });
  }

  const role = await Role.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!role) {
    return res.status(400).json({ error: "No such Role" });
  }

  res.status(200).json(role);
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  deleteRole,
  updateRole,
};
