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
    premium: {
      type: Boolean,
      required: [true, "No membership status detected"],
    },
    admin: {
      type: Boolean,
      required: [true, "No role detected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
