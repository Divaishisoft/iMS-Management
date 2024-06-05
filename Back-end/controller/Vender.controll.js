const Venders = require("../Schema/Venders.schema")
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken")

const venderCreate = async(req,res)=>{
    const { VenderName, VenderEmail, VenderPhone, VenderCity, VenderPinCode ,VenderGstNumber, VenderState, VenderAddress } = req.body
    console.log("venderdata--->",req.body);
    try {
      const oldVender = await Venders.findOne({ VenderEmail });
      console.log("oldUser-->",oldVender);
      if (oldVender) {
        return res.send({ status: false, message: "Vender Already Already Exist!" });
      } else {
        const Newvender = await Venders.create({
          VenderName: VenderName,
          VenderEmail: VenderEmail,
          VenderPhone: VenderPhone,
          VenderCity: VenderCity,
          VenderPinCode: VenderPinCode,
          VenderGstNumber: VenderGstNumber,
          VenderState: VenderState,
          VenderAddress: VenderAddress,
        });
        return res.status(200).send({ status: true, message: "Vender Created Succesfully" });
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
}

const getAllVenders = async (req, res) => {
    // const { id } = req.query;
    try {
        let venderList = await Venders.find({});
    //   let venderList = await Venders.find({ userId: id });
      return res.status(200).send(venderList);
    } catch (error) {
      return res.status(400).send(error);
    }
  };


const DeleteVender = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Venders.deleteOne({ _id: id });
    res.send("course Deleted Succesfull");
  } catch (err) {
    res.send(err.message);
  }
};






module.exports ={venderCreate,getAllVenders,DeleteVender}