
const Sequelize = require("sequelize")
const{DataTypes}=Sequelize;
require('dotenv').config()

let dbDisney = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{host:process.env.DB_HOST,
dialect:"mysql"})

// let dbDisney = new Sequelize("pedidos","root","Popeye101#",{host:"localhost",dialect:"mysql"})

const personajesModel = dbDisney.define("personajes", {
id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
  },
  img:DataTypes.STRING,
  name:{type:DataTypes.STRING,unique:true,allowNull:false} ,
  age: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
  history: DataTypes.STRING,
  
  
}
,
{timestamps:false})
const movieModel = dbDisney.define(
  "movies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: { type: DataTypes.STRING, allowNull: false },
    title: {type:DataTypes.STRING,allowNull:false},
    date: { type: DataTypes.STRING, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    generoId:DataTypes.INTEGER
  
    
  },
  { timestamps: true,constraints:false }

);
const generoModel = dbDisney.define(
  "generos",{
    id:{
      type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true
    },
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    img:{type:DataTypes.STRING},
    
  },
  {timestamps:false,constraints:false}
  )
const pers_movieModel = dbDisney.define(
  "pers_moviemodel",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    personajeId:DataTypes.INTEGER,
    movieId:DataTypes.INTEGER
  },{timestamps:true}
)





dbDisney.personaje= new personajesModel(dbDisney,Sequelize);
dbDisney.movie = new movieModel(dbDisney,Sequelize);
dbDisney.genero = new generoModel(dbDisney,Sequelize);
dbDisney.pers_movieModel = new pers_movieModel(dbDisney,Sequelize);



dbDisney.sync({force:false}).then( () => {
    console.log("Database Mysql is connected");
  }).catch(err => {
    console.log(err);
  })


module.exports ={
dbDisney,personajesModel,movieModel,generoModel,pers_movieModel
}