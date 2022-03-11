const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/movieController");
const { movieModel, dbDisney } = require("../Db/mysql/conectionDb");

// LISTAS COMPLETAS


// Get detalle de todas la peliculas y buscar por parametros query
router.get("/", async (req, res) => {


  try {
    if (req.query.name) {
      let data = await movieModel.findAll({
        where: {
          title: req.query.name,
        },
      });
      res.json(data);
    } else if (req.query.idGenero) {
      let data = await movieModel.findAll({
        where: {
          generoId: req.query.idGenero,
        },
      });
      res.json(data);
    } else if (req.query.order === "ASC") {
      let data = await movieModel.findAll({order:[["date", "ASC"]]})
      res.json(data);
    } else if (req.query.order === "DESC") {
      let data =  await movieModel.findAll({order:[["date", "DESC"]]})
      res.json(data);
    } else {
      const data = await movieController.getAll();
      console.log(data);
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error en getAll() MYSQL`);
  }
});



// GET | getMovies Details For ID
router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const data = await movieController.getById(movieId);
    res.json(data);
  } catch (error) {
    res.status(404).send(error.name, "NOT FOUND");
  }
});

// POST | Agregar una pelicula/serie
router.post("/", async (req, res) => {
  const movie = req.body;
  try {
    const result = await movieController.createMovieAndAddGender(movie);

    res.status(201).send("La Pelicula o Serie se agrego en la tabla 'movies' ");
    console.log(result);
  } catch (error) {
    res.status(500).send(error.name);
  }
});

// PUT | Update Movie by id
router.put("/:id", async (req, res) => {
  const movie = req.body;
  try {
    movie.movieId = req.params.id;
     await movieController.update(movie);
    res.send("se actualizo la pelicula/serie")
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE | Eliminar Movies By Id
router.delete("/:id", async (req, res) => {
  try {
    const result = await movieController.removeById(req.params.id);
    res.json({ mensaje: "Se elimino la pelicula con ID: " + result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
