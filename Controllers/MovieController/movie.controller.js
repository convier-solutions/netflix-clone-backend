const { db } = require("../../Config/dbConnection");
const path = require("path");
const { upload, unlinkImage } = require("../../Middleware/multer.config");

// Create Movie API
exports.createMovie = async (req, res) => {
  upload.single("picture")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    const { title, publishing_year } = req.body;
    const picture = req.file ? req.file.filename : null;

    // Validate fields
    if (!title || !publishing_year || !picture) {
      return res
        .status(400)
        .json({ status: "Error", message: "All fields are required" });
    }

    if (!/^\d{4}$/.test(publishing_year)) {
      return res.status(400).json({
        status: "Error",
        message: "Publishing year must be a valid 4-digit year",
      });
    }

    try {
      const insertMovieQuery = `INSERT INTO movie_data (title, picture, publishing_year) VALUES (?, ?, ?)`;
      db.query(
        insertMovieQuery,
        [title, picture, publishing_year],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              status: "Error",
              message: "Database error",
              error: error.message,
            });
          }

          return res.status(201).json({
            status: "Success",
            message: "Movie created successfully",
            movie: [
              {
                id: result.insertId,
                title,
                picture,
                publishing_year,
              },
            ],
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};

//Edit Movie API
exports.editMovie = async (req, res) => {
  const movieId = req.params.id;

  // Use Multer middleware to handle new image uploads
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    const { title, publishing_year } = req.body;
    const newPicture = req.file ? req.file.filename : null;

    if (
      !title ||
      !publishing_year ||
      (newPicture && !/^\d{4}$/.test(publishing_year))
    ) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid input, all fields required",
      });
    }

    try {
      const fetchMovieQuery = `SELECT picture FROM movie_data WHERE id = ?`;
      const oldPicture = await new Promise((resolve, reject) => {
        db.query(fetchMovieQuery, [movieId], (error, results) => {
          if (error) {
            return reject({
              status: 500,
              message: "Database error",
              error: error.message,
            });
          }
          if (results.length === 0) {
            return reject({ status: 404, message: "Movie not found" });
          }
          resolve(results[0].picture);
        });
      });

      // Update movie data with the new fields
      const updatedFields = { title, publishing_year };
      if (newPicture) updatedFields.picture = newPicture;

      const fields = Object.keys(updatedFields)
        .map((field) => `${field} = ?`)
        .join(", ");
      const values = Object.values(updatedFields);
      values.push(movieId);

      const updateMovieQuery = `UPDATE movie_data SET ${fields} WHERE id = ?`;

      db.query(updateMovieQuery, values, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Database error", error: error.message });
        }

        // If a new picture is uploaded, remove the old one
        if (newPicture && oldPicture) {
          unlinkImage(oldPicture); // Call the function to delete the old image
        }

        return res.status(200).json({
          status: "Success",
          message: "Movie updated successfully",
          movie: [
            {
              id: movieId,
              title,
              publishing_year,
              picture: newPicture || oldPicture,
            },
          ],
        });
      });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  });
};

// Listing Movie
exports.listMovie = async (req, res) => {
  try {
    const listQuery = `SELECT * FROM movie_data`;
    db.query(listQuery, (err, result) => {
      if (err) {
        return res.json({
          status: "Error",
          message: "Database Error",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Successfully fetch all movies data",
        data: [
          {
            result,
          },
        ],
      });
    });
  } catch (error) {
    return res.json({
      success: "Error",
      message: "Internal Server Error",
    });
  }
};
