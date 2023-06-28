const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    RoleName: {
      type: String,
      required: true,
    },
    Subroles: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
