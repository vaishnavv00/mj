import axios from 'axios';


const api = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach Authorization token to every request if user is logged in
api.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
    console.log("Token attached:", user.token); 
  }
  return req;
});

// Auth API Calls
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (userData) => api.put('/users/profile', userData); 
// Product API Calls
export const fetchProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Cart API Calls
export const getCart = () => api.get('/cart');
export const addToCart = (productData) => api.post('/cart', productData);
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const clearCart = () => api.delete('/cart/clear');

// Order API Calls
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Wishlist API Calls
export const getWishlist = async () => {
  try {
    const storedData = localStorage.getItem("userInfo");
    if (!storedData) {
      throw new Error("No user info found in localStorage");
    }

    const userInfo = JSON.parse(storedData);
    console.log("Stored User Info:", userInfo); // Debugging log

    if (!userInfo.data || !userInfo.data.token) {
      throw new Error("No token found in userInfo");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };

    console.log("Request Headers:", config); // Debugging log

    const response = await api.get("/wishlist", config);
    console.log("Wishlist Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error.response?.data || error.message);
    throw error;
  }
};

export const addToWishlist = async (productId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));  
  const token = userInfo?.data?.token;  

  return api.post(`/wishlist/add`, { productId }, {
      headers: { Authorization: `Bearer ${token}` }
  });
};

export const removeFromWishlist = async (productId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));  
  const token = userInfo?.data?.token;  

  return api.delete(`/wishlist/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
  });
};
export default api;
