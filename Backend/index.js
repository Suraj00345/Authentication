const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 3001;

//use body parser to get data from json object
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products",ProductRouter );

//listing the port
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
