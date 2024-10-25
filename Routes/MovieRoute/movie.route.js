const express = require("express");
const route = express.Router();
const movieController = require("../../Controllers/MovieController/movie.controller");

route.post("/createmovie", movieController.createMovie);
route.put("/editmovie/:id", movieController.editMovie);
route.get("/listmovie", movieController.listMovie);

module.exports = route;
