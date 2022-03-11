const express = require("express");
const router = express.Router();
const generoController = require("../Controllers/generoController")





// Lista detalle de genero
router.get("/", async (req, res) => {
   try {
      const data = await generoController.getAll();
      console.log(data);
      res.json(data);
   } catch (err) {
      console.log(err);
      res.status(500).send(`Error en getAll() MYSQL`);
   }
});


// GET | Genero por id
router.get("/:id", async (req, res) => {
   const generoId = req.params.id;
   const data = await generoController.getById(generoId);
   if (data) {
      res.json(data);
   } else {
      res.status(404).send("NOT FOUND");
   }
});









// POST | Crear un Genero
router.post("/",  async (req, res) => {
   const movie = req.body;
   try {
      const result = await generoController.createGender(movie);

      res.status(201).send("El Genero Fue Agregado ");
      console.log(result);
   } catch (error) {
      res.status(500).send(error.name);
   }
});

// PUT | Update de genero
router.put("/:id",  async (req, res) => {
   const genero = req.body;
   try {
      genero.generoId = req.params.id;
      const result = await generoController.update(genero);
      res.json(result);
   } catch (error) {
      res.status(500).json({ error: error });
   }
});

// DELETE | Eliminacion de genero
router.delete("/:id", async (req, res) => {
   try {
      const result = await generoController.removeById(req.params.id);
      res.json({ mensaje: "Se elimino el Genero con ID: " + result });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});


module.exports = router;
