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
    membership: {
      type: String,
      enum: ["free", "premium"],
      required: [true, "Please specify membership type"],
      default: "free",
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "owner"],
      required: [true, "Please specify at least one role"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
