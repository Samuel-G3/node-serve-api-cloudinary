const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pcSchema = new Schema(
  {
    model: { type: String, required: true, trim: true },
    img: { type: String, trim: true },
    price: { type: Number, trim: true },
    components: [
      { type: Schema.Types.ObjectId, ref: "components", required: true },
    ],
  },
  { timestamp: true }
);

const PC = mongoose.model("Pcs", pcSchema);

module.exports = PC;
