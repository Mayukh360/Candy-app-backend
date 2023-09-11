const Product = require('../models/product');

//Post Request
async function createProduct(req, res) {
  try {
    const { candy, price, description, quantity } = req.body;

    // Create a new product using the Product model
    const newProduct = await Product.create({
      candy,
      price,
      description,
      quantity,
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
}

//For Get Request
async function getAllProducts(req, res) {
  try {
    // Retrieve all products from the database
    const products = await Product.findAll();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
}

//For Put Request
async function updateProductQuantity(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Candy not found' });
    }

    if (product.quantity <= 0) {
      return res
        .status(404)
        .json({ success: false, error: 'Candy quantity not enough' });
    } else {
      product.quantity -= quantity; // Update the quantity of the product
    }
    await product.save(); // Save the updated product to the database

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to update quantity' });
  }
}

//For delete Request
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Candy not found' });
    }

    await product.destroy(); // Delete the product from the database

    res
      .status(200)
      .json({ success: true, message: 'Candy deleted successfully' });
  } catch (error) {
    console.error('Error deleting candy:', error);
    res.status(500).json({ success: false, error: 'Failed to delete candy' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProductQuantity,
  deleteProduct,
};
