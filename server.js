const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDb } = require("./Config/dbConnection");
const userRoute = require("./Routes/UserRoute/user.route");
const movieRoute = require("./Routes/MovieRoute/movie.route");
const runMigration = require("./migration");

app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://54.213.223.10/",
  })
);
app.use("/uploads", express.static("uploads"));

app.use("/api", userRoute);
app.use("/api", movieRoute);

//Connect to Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connectDb();
  runMigration();
});
