import Wishlist from'../models/wishlist.js';
import Product from '../models/Product.js';

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find wishlist for the user
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    // If no wishlist exists, create one
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [] });
    }

    // Add product only if it's not already in wishlist
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(201).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getWishlist = async (req, res) => {
  try {
    // Find the wishlist for the logged-in user and populate product details
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
    console.log("Wishlist from DB:", wishlist); 
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Find the wishlist of the logged-in user
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Filter out the product from the wishlist
    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    if (wishlist.products.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    // Save the updated wishlist
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};