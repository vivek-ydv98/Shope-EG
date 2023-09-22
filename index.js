const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const productRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const usersRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartsRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

// middlewares
server.use(cors({ exposedHeaders: ["X-Total-Count"] }));
server.use(express.json());
server.use("/products", productRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/carts", cartsRouter.router);
server.use("/orders", ordersRouter.router);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-project");
  console.log("database conneted");
}

server.listen(8080, () => {
  console.log("server started successfully");
});
