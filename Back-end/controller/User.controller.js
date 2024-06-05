const User = require("../Schema/auth.schema")
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken")

const Signup = async(req,res)=>{
    const { firstName, lastName, email, password, role } = req.body
    console.log("data--->",firstName, lastName, email, password);
    try {
      const oldUser = await User.findOne({ email });
      console.log("oldUser-->",oldUser);
      if (oldUser) {
        return res.send({ status: false, message: "Email Already Exist!" });
      } else {
        const user = await User.create({
          name: firstName + ' ' + lastName ,
          email: email,
          // password protect ------
          password: CryptoJS.AES.encrypt(password, "%$#@!").toString(),
          role: "user",
        });
        return res.send({ status: true, message: "Sign up Successfully!" });
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    try{
      const user = await User.findOne({email});
      if(user){
        const decryptPass = CryptoJS.AES.decrypt(user.password, "%$#@!");
        const loginPassword = decryptPass.toString(CryptoJS.enc.Utf8);   
        if (password === loginPassword) {
           // --- jwt ------
        const token = Jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          "%$#@!",
          { expiresIn: "30 days" }
        );

        return res.send({
          token: token,
          status: true,
          message: "Log in Successfully!",
        });


      } else {
        return res.send({
          token: null,
          status: false,
          message: "Wrong Password!!",
        });
        }
        
        }else{
            return res.send({
                token: null,
                status: false,
                message: "Wrong Credential!!",
              });
        }
     
    }catch(err){
        res.status(404).send(err.message);
    }
} 


module.exports ={Signup,Login}