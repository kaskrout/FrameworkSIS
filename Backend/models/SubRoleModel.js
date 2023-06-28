const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subroleSchema = new Schema(
  {
    roleId: {
      type: String,
      required: true,
    },
    subroleName: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subrole", subroleSchema);
