const Customers = require("../Schema/Customer.Schema")
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken")

const AddCustomer = async(req,res)=>{
    const { CustomerName, CustomerEmail, CustomerPhone, CustomerCity, CustomerPinCode ,CustomerGstNumber, CustomerState, CustomerAddress,id } = req.body
    console.log("Customerdata--->",req.body);
    try {
      const oldCustomer = await Customers.findOne({ CustomerEmail });
      console.log("oldUser-->",oldCustomer);
      if (oldCustomer) {
        return res.send({ status: false, message: "Customer Already Already Exist!" });
      } else {
        if(id){
          const Newcustomer = await Customers.create({
            userId:id,
            CustomerName: CustomerName,
            CustomerEmail: CustomerEmail,
            CustomerPhone: CustomerPhone,
            CustomerCity: CustomerCity,
            CustomerPinCode: CustomerPinCode,
            CustomerGstNumber: CustomerGstNumber,
            CustomerState: CustomerState,
            CustomerAddress: CustomerAddress,
          });
          return res.status(200).send({ status: true, message: "Customer Created Succesfully" });
        }else{
          return res.send("Id invalid please check your payload ");
        }
       
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
}

const getAllCustomer = async (req, res) => {
    const { id } = req.query;
    try {
        // let CustomerList = await Customers.find({});
      let CustomerList = await Customers.find({ userId: id });
      return res.status(200).send(CustomerList);
    } catch (error) {
      return res.status(400).send(error);
    }
  };


const DeleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Customers.deleteOne({ _id: id });
    res.send("course Deleted Succesfull");
  } catch (err) {
    res.send(err.message);
  }
};






module.exports ={AddCustomer,getAllCustomer,DeleteCustomer}