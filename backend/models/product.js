const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cat: { type: String, required: true },
    infos: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Object, required: true },
    comments: [{
      comment: String,
      authorname: String,


    }]


  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
