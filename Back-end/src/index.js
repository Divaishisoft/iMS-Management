const express = require("express");
const dbConnect = require("../config/db");
const authRouter = require("../Routes/user.Route");
const VenderRouter = require("../Routes/Vender.Route")
const CustomerRoutes = require("../Routes/Customer.Route")
const ProductRoute = require("../Routes/Product.Route")
const cors = require("cors");

const app = express();

// -------------(cors Origin)------------------------------------------------
app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
    ],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);


// test
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello My ISM User"));
app.use("/user", authRouter);
app.use('/vender',VenderRouter)
app.use('/customer',CustomerRoutes)
app.use('/product',ProductRoute)


app.listen(8080, async () => {
  await dbConnect();
  console.log("server started on port 8080");
});