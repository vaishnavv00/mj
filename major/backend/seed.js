const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    const sampleProducts = [
      {
        name: "Laptop X1",
        description: "High performance laptop",
        price: 999.99,
        category: "Electronics",
        stock: 50,
        imageUrl: "https://example.com/laptop.jpg",
      },
      {
        name: "Smartphone Y2",
        description: "Latest smartphone with advanced features",
        price: 699.99,
        category: "Electronics",
        stock: 100,
        imageUrl: "https://example.com/smartphone.jpg",
      },
      {
        name: "Headphones Z3",
        description: "Noise-canceling over-ear headphones",
        price: 199.99,
        category: "Accessories",
        stock: 75,
        imageUrl: "https://example.com/headphones.jpg",
      }
    ];
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();