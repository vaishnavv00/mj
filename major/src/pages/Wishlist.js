import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeItemFromWishlist } from "../redux/slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Wishlist</h2>
      {items ? <p>Your wishlist is empty.</p> : (
        <div>
          {(items ?? []).map((item) => ( 
            <div key={item._id} className="wishlist-item">
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <button onClick={() => dispatch(removeItemFromWishlist(item._id))}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
