const { Product } = require("../models/product");
const cloudinary = require("../utils/cloudinary");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const express = require("express");


const router = express.Router()

router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.productImg) {
    const destroyResponse = await cloudinary.uploader.destroy(
      req.body.product.image.public_id
    );

    if (destroyResponse) {
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.productImg,
        {
          upload_preset: "shoponline",
        }
      );

      if (uploadedResponse) {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body.product,
              image: uploadedResponse,
            },
          },
          { new: true }
        );

        res.status(200).send(updatedProduct);
      }
    }
  } else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send("Product not found...");

    if (product.image.public_id) {
      const destroyResponse = await cloudinary.uploader.destroy(
        product.image.public_id
      );

      if (destroyResponse) {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedProduct);
      }
    } else {
      console.log("Action terminated. Failed to deleted product image...");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/", async (req, res) => {
  const { name, cat, infos, price, image, quantity, comments } = req.body;
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "shoponline",
      });
      if (uploadedResponse) {
        const product = new Product({
          name,
          cat,
          infos,
          price,
          comments,
          image: uploadedResponse,
          quantity,

        });
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);

      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }

});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/cherche/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).send(product.comments);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/comment/:id", async (req, res) => {
  //we create a new comment for the database
  try {
    //we need to try and catch the new comment and save it

    const currentProduct = await Product.findByIdAndUpdate(req.params.id)//we need to find the post  that has the comment via the id
    currentProduct.comments.push(req.body)
    await currentProduct.save()//we saved the new post with the comment
    res.status(200).send(currentProduct)

  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router;
