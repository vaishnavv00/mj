import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../redux/slices/productSlice';
import { useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products || {});
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-container">
            <h2>Featured Products</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading products.</p>}
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
