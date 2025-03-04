import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './navbar.css';
import { logout } from "../redux/slices/authSlice";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";



const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    // const { cart } = useSelector((state) => state.cart?.cart || []);
    // const { wishlist } = useSelector((state) => state.wishlist?.wishlist || []);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("userInfo");
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Bazario
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex ms-3">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search products..."
            />
          </form>

          {/* Icons */}
          <div className="navbar-icons ms-3">
            <Link to="/wishlist">
              <i className="bi bi-heart"></i>
            </Link>
            <Link to="/cart">
              <i className="bi bi-cart"></i>
            </Link>
          </div>

          {/* Login & Register Buttons */}

          {user ? (
            
                <div className="account-section">
                    <Link to="/account" className="btn btn-outline-primary me-2"><FaUser size={22} color="black" /></Link>

                    <Link to="/wishlist" className="nav-icon">
                                <FaHeart size={22} color="red" /> 
                               
                            </Link>

                    <Link to="/cart" className="nav-icon">
                                <FaShoppingCart size={22} color="blue" />
                                
                            </Link>



                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>


                </div>
            // <>
            //     <li className="dropdown">
            //                 <Link to="/account">Account</Link>
            //                 <div className="dropdown-content">
            //                     <Link to="/cart">Cart</Link>
            //                     <Link to="/wishlist">Wishlist</Link>
            //                     <Link to="/logout">Logout</Link>
            //                 </div>
            //             </li>
            // </>
            ) 
                
                : (
                <div className="auth-buttons ms-3">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
            )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
