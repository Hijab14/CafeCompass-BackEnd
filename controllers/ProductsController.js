import Product from "../models/ProductsModel.js";

export const addProduct = async (req, res) => {
  try {
      const data =  {
          productName: req.body.productName,
          quantity: req.body.quantity,
          price: req.body.price,
          cafeName: req.body.cafeName,
          category: req.body.category,
          location: req.body.location,
          imageURL: req.body.imageURL
      } ;

      const newProduct = await Product.create(data);

      res.json(newProduct);
      console.log("Product requested successfully!");
      res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
      console.error(error);
      console.log("Product not added!");
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};