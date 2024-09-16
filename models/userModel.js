const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add a password"] },
    member: {
      type: Boolean,
      required: [true, "Please specify user membership"],
    },
    admin: {
      type: Boolean,
      required: [true, "Please specify user role"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
