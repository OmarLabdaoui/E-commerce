const express = require("express");
const cors = require("cors");
const stripe = require("./routes/stripe");
const products = require("./products");
const mongoose = require("mongoose")
const app = express();

const register = require("./routes/register")
const login = require("./routes/login")
const productsRoute = require("./routes/products")

const users = require("./routes/users")
const orders = require("./routes/orders")

require("dotenv").config()
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));


app.use("/api/stripe", stripe)
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/products", productsRoute)
app.use("/api/users", users)
app.use("/api/orders", orders)

app.get("/", (req, res) => {
  res.send("Welcomme de my online Shop");
});
app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.Port || 5000;
const uri = process.env.DB_URI
app.listen(5000, console.log(`Run in Port ${port}`));
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("mongo db connect success"))
  .catch((error) => console.log("mongo db connect error", error.message))
