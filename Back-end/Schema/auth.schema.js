 const mongoose = require("mongoose")


//  -----------------------------------{User Model }------------------------------------------

 const UserAUth = new  mongoose.Schema({
    name: {type:String, required: true},
    email:{type:String, required: true, unique: true },
    password:{type:String, required: true},
 })

 const USer  = mongoose.model("user",UserAUth)

 module.exports = USer