const Product = require("../Schema/Product.schema")

const ProductCreate = async(req,res)=>{
    const { ProductName, ProductHsnNumber, ProductUnit, ProductSubUnit, ProductQuantity ,ProductSubQuantity,id } = req.body
    console.log("ProductData--->",req.body);
    try {
      const oldproduct = await Product.findOne({ ProductHsnNumber });
      console.log("oldproduct-->",oldproduct);
      if (oldproduct) {
        return res.send({ status: false, message: "Product HSR Number Already Exist!" });
      } else {
        if(id){
          const NewProduct = await Product.create({
            userId:id,
            ProductName: ProductName,
            ProductHsnNumber: ProductHsnNumber,
            ProductUnit: ProductUnit,
            ProductSubUnit: ProductSubUnit,
            ProductQuantity: ProductQuantity,
            ProductSubQuantity: ProductSubQuantity,
          });
          return res.status(200).send({ status: true, message: "Product Added Succesfully" });

        }else{
          return res.status(404).send("Id invalid please check your payload ");
        }
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
}


const getAllProduct = async (req, res) => {
  const { id } = req.query;
  try {
      // let ProductList = await Product.find({});
    let ProductList = await Product.find({ userId: id });
    return res.status(200).send(ProductList);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
;
const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Product.deleteOne({ _id: id });
    res.send("Product Deleted Succesfull");
  } catch (err) {
    res.send(err.message);
  }
};




module.exports ={ProductCreate,getAllProduct,DeleteProduct}