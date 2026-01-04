const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import your models (replace with your actual models)
const Product = require('./models/Product'); // Adjust the path based on your folder structure

const products = [
  {
    name: 'Classic White T-Shirt',
    category: 'T-Shirts',
    price: 19.99,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    stock: 100,
    description: 'A classic white t-shirt made with 100% cotton.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Slim Fit Jeans',
    category: 'Jeans',
    price: 49.99,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    stock: 50,
    description: 'Slim fit jeans made from premium denim fabric.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Winter Jacket',
    category: 'Jackets',
    price: 79.99,
    sizes: ['M', 'L', 'XL'],
    colors: ['Red', 'Navy Blue'],
    stock: 30,
    description: 'A cozy winter jacket to keep you warm and stylish.',
    image: 'https://via.placeholder.com/150',
  },
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany({}); // Clear existing data
    await Product.insertMany(products);
    console.log('Dummy data inserted successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting dummy data:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
