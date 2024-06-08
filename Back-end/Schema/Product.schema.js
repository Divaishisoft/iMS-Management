const mongoose = require("mongoose")


//  -----------------------------------{Product Model }------------------------------------------

 const ProductSchema = new  mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ProductName: {type:String, required: true},
    ProductHsnNumber:{type:String, required: true, unique: true },
    ProductUnit: {type:String, required: true},
    ProductSubUnit: {type:String, required: true},
    ProductQuantity: {type:String, required: true},
    ProductSubQuantity: {type:String, required: true},

 },
 { timestamps: true }
)

 const Product  = mongoose.model("product",ProductSchema)

 module.exports = Product