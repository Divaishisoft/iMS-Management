const mongoose = require("mongoose")


//  -----------------------------------{Venders Model }------------------------------------------

 const VenderSchema = new  mongoose.Schema({
    VenderName: {type:String, required: true},
    VenderEmail:{type:String, required: true, unique: true },
    VenderPhone:{type:String, required: true,unique: true},
    VenderCity: {type:String, required: true},
    VenderPinCode:{type:String, required: true },
    VenderGstNumber:{type:String, required: true},
    VenderState: {type:String, required: true},
    VenderAddress:{type:String, required: true},
 },
 { timestamps: true }
)

 const venders  = mongoose.model("vender",VenderSchema)

 module.exports = venders