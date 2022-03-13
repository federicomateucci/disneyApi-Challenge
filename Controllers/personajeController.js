const {
  dbDisney,
  personajesModel,
  pers_movieModel,
} = require("../Db/mysql/conectionDb");

// Get de todos los personajes
async function getAllPersonajes() {
  const personajes = await personajesModel.findAll({
    attributes: ["name", "img"],
  });
  return personajes;
}

// crear personaje asociado a pelicula


async function addPersonajeAndMovie(personaje) {
  try {
    const transaction = await dbDisney.transaction();
    const newPersonaje = await personajesModel.create(
      {
        img: personaje.img,
        name: personaje.name,
        age: personaje.age,
        weight: personaje.weight,
        history: personaje.history,
      },
      { transaction }
    );

    await pers_movieModel.create(
      {
        personajeId: newPersonaje.id,
        movieId: personaje.movieId,
      },
      { transaction }
    );

    await transaction.commit();

    return newPersonaje;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }
}

async function update(personaje) {
  const transaction = await dbDisney.transaction();
  const commandResult = await personajesModel.update(
    {
      img: personaje.img,
      name: personaje.name,
      age: personaje.age,
      weight: personaje.weight,
      history: personaje.history,
    },
    { returning: true, where: { id: personaje.codigo },transaction}
  );
  if(personaje.movieId){
    await pers_movieModel.update({
      movieId:personaje.movieId
    },
    {returning:true,where:{personajeId:personaje.codigo},transaction })
  }
 await transaction.commit()
}

async function removeById(id) {
  const transaction = await dbDisney.transaction();
  await personajesModel.destroy({
    where: {
      id: id,
    },
  transaction});
  await pers_movieModel.destroy({
    where:{
      personajeId:id
    },
    transaction
  })
  await transaction.commit();
  return id;
}

async function getById(id) {
  const product = await dbDisney.query(
    `SELECT personajes.id,personajes.img as persimage, personajes.name, personajes.age, personajes.weight,personajes.history,movies.id,movies.img,movies.title,movies.date,movies.rating FROM personajes
  JOIN pers_moviemodels ON personajes.id = pers_moviemodels.personajeId 
  JOIN movies ON movies.id = pers_moviemodels.movieId
  where personajes.id like ${id}`,
    { type: dbDisney.QueryTypes.SELECT }
  );
  return product;
}

module.exports = {
  getAllPersonajes,
  update,
  removeById,
  getById,
  addPersonajeAndMovie,
};
