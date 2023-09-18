const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const cors = require("cors");

// middlewares
server.use(cors({exposedHeaders:['X-Total-Count']}))
server.use(express.json());
server.use("/products", productRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandRouter.router);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-project");
  console.log("database conneted");
}

server.listen(8080, () => {
  console.log("server started successfully");
});
