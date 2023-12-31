const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, default: "user" },
  addresses: { type: [Schema.Types.Mixed] },
  salt: Buffer,
  resetPasswordToken:{ type: String, default: "" },
},{timestamps:true});

const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", UserSchema);
