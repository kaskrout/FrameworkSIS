const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    phaseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
