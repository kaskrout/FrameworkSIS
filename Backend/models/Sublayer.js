const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sublayerSchema = new Schema(
  {
    layerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    Details: {
      type: String,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sublayer", sublayerSchema);
