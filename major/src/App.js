import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Navbar from './components/navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Your custom styles


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Wishlist" element={<Wishlist />} />

            </Routes>
        </Router>
    );
}
export default App;