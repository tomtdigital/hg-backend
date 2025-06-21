const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Helper to extract and verify JWT, attach user to req
const protect = (roleCheckFn = null) =>
  asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }
        if (roleCheckFn && !roleCheckFn(user)) {
          res.status(403);
          throw new Error("Not authorized for this role");
        }
        req.user = user;
        return next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    res.status(401);
    throw new Error("Not authorized, no token");
  });

// Role checkers
const isAdminOrOwner = (user) =>
  Array.isArray(user.roles) &&
  (user.roles.includes("admin") || user.roles.includes("owner"));

// Middleware exports
const userProtect = protect();
const adminProtect = protect(isAdminOrOwner);

module.exports = { userProtect, adminProtect };
