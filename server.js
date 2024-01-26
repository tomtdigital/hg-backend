const express = require("express");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
// __Connect Database__
connectDB();

// __Set Middleware 1__
// access request body
app.use(express.json());
// ensure all data types accepted (if false, only strings/arrays)
app.use(express.urlencoded({ extended: true }));

// __Set Routes__
app.use("/api/users", require("./routes/userRoutes"));

// __Set Middleware 2__
// error handling
app.use(errorHandler);
// __Get Incoming Requests__
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
