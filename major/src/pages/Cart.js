import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const cart = useSelector((state) => state.cart.cart || []);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/products">Shop Now</Link></p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-details">
                                <h4>{item.name}</h4>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ₹{totalPrice}</h3>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
