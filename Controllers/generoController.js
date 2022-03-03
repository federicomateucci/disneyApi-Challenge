
const {
    generoModel,
    dbDisney,
  } = require("../Db/mysql/conectionDb");

  
  // Get de todos los generos
  async function getAll() {
    const generos = await generoModel.findAll();
    return generos;
  }

  // Create Genero
  async function createGender(gender){
   const genero = generoModel.create({
    name: gender.name,
    img: gender.img,
   })
    return genero;
    
  }
  // Update de genero by id
  async function update(gender) {
    await generoModel.update(
      {
        name: gender.name,
        img: gender.img,
        /* auto: gender.auto,
           lista: gender.lista, */
      },
      { returning: true, where: { id: gender.codigo } }
    );
  }
  

  // Eliminar genero by ID
  async function removeById(id) {
    await generoModel.destroy({
      where: {
        id: id,
      },
    });
    return id;
  }
  
// Detalle genero y peliculas asociadas
  async function getById(id) {
    const genero = await dbDisney.query(`SELECT generos.id as generoId, generos.name,generos.img,movies.id as movieId,movies.img as movieImg,movies.title,movies.date,movies.rating FROM generos, movies 
    WHERE movies.generoId = ${id}`,{type:dbDisney.QueryTypes.SELECT});
    return genero;
  }
  
  module.exports = {
    getAll,
    createGender,
    update,
    removeById,
    getById,
  };
  