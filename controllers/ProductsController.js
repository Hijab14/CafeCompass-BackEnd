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

export const getProductsCategory = async (req, res) => {
    try {
      const { category } = req.query;
      console.log(category);
      const products = await Product.find({ category });
      console.log(products);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getProductsLocation = async (req, res) => {
    console.log("hh");
    try {
      const { location } = req.query;
      const products = await Product.find({ location });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const getProductsCafe = async (req, res) => {
try {
    const { cafeName } = req.query;
    const products = await Product.find({ cafeName });
    res.json(products);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export const getProductsName = async (req, res) => {
    try {
      const { productName } = req.query;
      const products = await Product.find({ productName });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const deleteProductById = async (req, res) => {
    // try {
    //   const { productId } = req.params;
    //   const deletedProduct = await Product.findByIdAndDelete(productId);
    //   if (!deletedProduct) {
    //     return res.status(404).json({ message: 'Product not found' });
    //   }
    //   res.json({ message: 'Product deleted successfully' });
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
    try {
        const { productName, cafeName } = req.body;
        console.log(productName);
        
        // Find the product by name and cafe name
        const deletedProduct = await Product.findOneAndDelete({ productName, cafeName });
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

export const updateProduct = async (req, res) => {
  try {
    const { productName, cafeName, newQuantity, newPrice } = req.body;
    console.log(cafeName);
    
    // Find the product by product name and cafe name
    const product = await Product.findOne({ productName, cafeName });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product's quantity and price
    product.quantity = newQuantity;
    product.price = newPrice;

    // Save the updated product
    await product.save();

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
    console.log("JJJ");
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Send the products as a response
        res.json(products);
    } catch (error) {
        // If there's an error, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};
