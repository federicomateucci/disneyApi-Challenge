const express = require("express");
const router = express.Router();
const personajeController = require("../Controllers/personajeController");
const { personajesModel } = require("../Db/mysql/conectionDb");
// LISTAS COMPLETAS


// Get lista completa personajes y busqueda por query
router.get("/", async (req, res) => {
  try {
    if (req.query.name) {
      let data = await personajesModel.findAll({
        where: {
          name: req.query.name,
        },
      });
      res.json(data);
    } else if (req.query.age) {
      let data = await personajesModel.findAll({
        where: {
          age: req.query.age,
        },
      });
      res.json(data);
    } else if (req.query.movies) {
      let data = await personajesModel.findAll({
        where: {
          movieId: req.query.movies,
        },
      });
      res.json(data);
    } else {
      let data = await personajeController.getAllPersonajes();

      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("erro en get personajes All");
  }
});

// GET | Personaje por ID detail
router.get("/:id", async (req, res) => {
  const personajeId = req.params.id;
  const data = await personajeController.getById(personajeId);
  if (data) {
    res.json(data);
  } else {
    res.status(404).send("NOT FOUND");
  }
});

// POST | Agregar un personaje
router.post("/", async (req, res) => {
  const personaje = req.body;
  try {
    const result = await personajeController.addPersonajeAndMovie(personaje);

    console.log(result);

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error.name);
  }
});

// PUT | Update de personaje
router.put("/:id", async (req, res) => {
  const personaje = req.body;
  try {
    personaje.codigo = req.params.id;
    const result = await personajeController.update(personaje);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE | Eliminacion de personaje
router.delete("/:id", async (req, res) => {
  try {
    const result = await personajeController.removeById(req.params.id);
    res.json({ mensaje: "Se elimino el producto con ID: " + result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
