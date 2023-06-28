const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const phaseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    activities: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phase", phaseSchema);
