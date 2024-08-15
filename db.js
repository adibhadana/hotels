const mongoose = require("mongoose");

// Define Mongo db URL
const mongoURL = 'mongodb://localhost:27017/hotels'

//Set up Mongodb connection
mongoose.connect(mongoURL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
  })

const db = mongoose.connection;

db.on('connected',() =>{
  console.log('Connected to MongoDB server');
})
db.on('error',(err) =>{
  console.log('MongoDB connection error',err);
})
db.on('disconnected',() =>{
  console.log('disconnected to MongoDB server');
})

//Export a database connection
module.exports = db;