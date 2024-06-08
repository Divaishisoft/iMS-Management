const express = require("express")
const router = express.Router()
// const requireAuth = require("../middleware/middleware")

const ProductController = require("../controller/Product.controller")

router.post("/add-product",ProductController.ProductCreate)
router.get("/get-product",ProductController.getAllProduct)
router.delete("/delete-product/:id", ProductController.DeleteProduct);

module.exports = router;