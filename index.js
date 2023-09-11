
const express = require('express');
const sequelize = require('./database/database');
const Product = require('./models/product');
const cors = require('cors');

const candyController = require('./controllers/candycontroller')

const app = express();
app.use(cors());
app.use(express.json());

app.post('/getData', candyController.createProduct);
app.get('/getData', candyController.getAllProducts);
app.put('/getData/:id', candyController.updateProductQuantity);
app.delete('/getData/:id', candyController.deleteProduct);

Product.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
