const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const layerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sublayer: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Layer", layerSchema);
