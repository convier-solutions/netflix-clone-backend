const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDb } = require("./Config/dbConnection");
const createUserTable = require("./Modal/user.table");
const userRoute = require("./Routes/UserRoute/user.route");
const movieRoute = require("./Routes/MovieRoute/movie.route");
const createMovieTable = require("./Modal/movie.table");

app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/api", userRoute);
app.use("/api", movieRoute);

//Connect to Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connectDb();

  createUserTable();
  createMovieTable();
});
