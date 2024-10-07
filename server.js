const express = require("express");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors"); // Import the cors package

const app = express();

// __Whitelist Endpoints__
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "https://hg-frontend-staging-5cefd043eef4.herokuapp.com",
  ],
};
// __Connect Database__
connectDB();

// __Set Middleware 1__
// whitelist urls
app.use(cors(corsOptions));
// access request body
app.use(express.json());
// ensure all data types accepted (if false, only strings/arrays)
app.use(express.urlencoded({ extended: true }));

// __Set Routes__
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/games", require("./routes/gameRoutes"));
app.use("/api/grids", require("./routes/gridRoutes"));
app.use("/api/game-sessions", require("./routes/gameSessionRoutes"));

// __Set Middleware 2__
// error handling
app.use(errorHandler);
// __Get Incoming Requests__
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
