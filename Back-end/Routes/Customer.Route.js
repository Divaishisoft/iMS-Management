const express = require("express")
const router = express.Router()


const CustomerController = require("../controller/Customer.controller")

router.post("/add-customer",CustomerController.AddCustomer)
router.get("/get-customer",CustomerController.getAllCustomer)
router.delete("/delete-customer/:id", CustomerController.DeleteCustomer);

module.exports = router;