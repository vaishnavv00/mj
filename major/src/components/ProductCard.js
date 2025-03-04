import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addItemToWishlist } from "../redux/slices/wishlistSlice";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <div className="product-actions">
                    <button onClick={() => dispatch(addToCart(product))} className="cart-btn">
                        <FaCartPlus /> Add to Cart
                    </button>
                    <button onClick={() => dispatch(addItemToWishlist(product)) } className="wishlist-btn">
                        <FaHeart /> Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
