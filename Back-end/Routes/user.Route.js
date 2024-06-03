const express = require("express")
const router = express.Router()


const UserController = require("../controller/User.controller")

router.post("/signup",UserController.Signup)
router.post("/login",UserController.Login)

module.exports = router;