const {
  movieModel,
  dbDisney,
} = require("../Db/mysql/conectionDb");



// Get de todos los productos
async function getAll() {
  const products = await movieModel.findAll({
    attributes: ["img", "title", "date"],
  });
  return products;
}
async function createMovieAndAddGender(movie) {
  try {
    const transactions = await dbDisney.transaction();
    const resultado = await movieModel.create(
      {
        img: movie.img,
        title: movie.title,
        date: movie.date,
        rating: movie.rating,
        generoId: movie.generoId,
      },
      { transactions }
    );

    return resultado;
  } catch (error) {
    console.log(error);
  }
}

async function update(movie) {
  await movieModel.update(
    {
      img: movie.descrip,
      title: movie.venta,
      date: movie.date,
      rating: movie.rating,
      generoId: movie.generoId,
    },
    { returning: true, where: { id: movie.movieId } }
  );
}

async function removeById(id) {
  await movieModel.destroy({
    where: {
      id: id,
    },
  });
  return id;
}

async function getById(id) {
  const movieDetail = await dbDisney.query(
    `SELECT movies.id as movieId,movies.img as movieImage, movies.title, movies.date, movies.rating,personajes.id as personajeId,personajes.img,personajes.name,personajes.age,personajes.weight,personajes.history FROM movies
  JOIN pers_moviemodels ON movies.id = pers_moviemodels.movieId 
  JOIN personajes ON personajes.id = pers_moviemodels.personajeId
  where movies.id like ${id}`,
    { type: dbDisney.QueryTypes.SELECT }
  );
  return movieDetail;
}

module.exports = {
  getAll,
  update,
  removeById,
  getById,
  createMovieAndAddGender,
};
