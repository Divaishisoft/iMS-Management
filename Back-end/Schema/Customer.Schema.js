const mongoose = require("mongoose")


//  -----------------------------------{Customer Model }------------------------------------------

 const CustomerSchema = new  mongoose.Schema({
    CustomerName: {type:String, required: true},
    CustomerEmail:{type:String, required: true, unique: true },
    CustomerPhone:{type:String, required: true,unique: true},
    CustomerCity: {type:String, required: true},
    CustomerPinCode:{type:String, required: true },
    CustomerGstNumber:{type:String},
    CustomerState: {type:String, required: true},
    CustomerAddress:{type:String, required: true},
 },
 { timestamps: true }
)

 const Customers  = mongoose.model("customer",CustomerSchema)

 module.exports = Customers