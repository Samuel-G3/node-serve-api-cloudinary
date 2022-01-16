const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentsSchema = new Schema(
    {
      name: { type: String, required: true, trim: true },
      model: { type: String, trim: true },
    },
    {
      timestamps: true,
    }
  );


  const Component = mongoose.model("components", componentsSchema);

  module.exports = Component;