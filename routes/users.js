const express = require("express");
const router = express.Router();
const userRepository = require("../Controllers/usersController");
const jwt = require("jsonwebtoken");
const config = require("../util/env");
const {sendWelcomeMail} = require("../util/mailing")


router.post("/login", async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userRepository.getByEmail(email);

   if (!user) {
      return res.status(404).send(`No existe usuario con mail: ${email}`);
   }
   const passValida = await userRepository.validarPasswordBcrypt(email, password);

   if (!passValida) {
      return res.status(404).send(`Contraseña incorrecta`);
   }

   // Creacion de token al logearse
   const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "7d" });

   // Aviso por consola del login
   console.log( `Usuario: "${user.username}" conectado`);

   // Respuesta enviando token
   res.json({ autorizacion: true, token: token, mensaje: "Sesión inciada" });
});

router.post("/register", async (req, res, next) => {
   const { email } = req.body;
   const userEnBase = await userRepository.getByEmail(email);
   const user = req.body;
   

   if (userEnBase != null) {
      res.status(400).send("Este usuario ya existe");
   } else {
      try {
         await userRepository.create(user);
         
         // Aviso por consola de creacion de un nuevo usuario
         console.log(`Usuario: "${user.username}" creado`);
         await sendWelcomeMail(email);
         console.log(`Mail de bienvenida enviado a ${email}`);

         res.json({ autorizacion: true, mensaje: "Usuario registrado, inicie sesion para obtener un token" });
      } catch (error) {
         res.status(500).send(error);
      }
   }
});

router.get("/:id", async (req, res) => {
   const userId = req.params.id;
   const data = await userRepository.getById(userId);
   res.json(data);
}); 

module.exports = router;
