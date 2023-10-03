const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  size: { type: Schema.Types.Mixed },
  color: { type:  Schema.Types.Mixed },
});

const virtual = CartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", CartSchema);
