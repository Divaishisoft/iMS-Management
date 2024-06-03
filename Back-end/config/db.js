const mongoose = require("mongoose");
// -------------- (MongoDb Connection) -------------
const connect = () => {
  return mongoose.connect(
    "mongodb://divaishisoftdevsolutions:VNn8wJcxPdsbjOMN@ac-bnemtzx-shard-00-00.jk4x1n1.mongodb.net:27017,ac-bnemtzx-shard-00-01.jk4x1n1.mongodb.net:27017,ac-bnemtzx-shard-00-02.jk4x1n1.mongodb.net:27017/ISM?ssl=true&replicaSet=atlas-11tshn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  ).then((data)=>{
    console.log("Connected to MongoDb");
  }).catch((err)=>{
    console.log(err);
  })
};

module.exports = connect;