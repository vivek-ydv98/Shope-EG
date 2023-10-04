const mongoose = require("mongoose");
const { Schema } = mongoose;
const paymentMethods = {
  values: ["cash", "card"],
  message: "enum validater failed for Payment Methods",
};

const OrderSchema = new Schema({
    items: { type: [Schema.Types.Mixed] },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "pending" },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
  },{ timestamps: true });

const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", OrderSchema);
