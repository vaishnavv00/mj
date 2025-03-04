import { useState } from 'react';
import { loginUser } from '../services/api';
import "./auth.css";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { loginSuccess } from "../redux/slices/authSlice"; 

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const userData = await loginUser({ email, password });
    
            if (userData) {
               
                dispatch(loginSuccess(userData));
    
               
                localStorage.setItem("userInfo", JSON.stringify(userData));
    
                
                console.log("Login successful", userData);
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    return (
        <div className="auth-container">
      <div className="auth-box">
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
           

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
            </div>
            <div className="form-group">

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
            
            </div>
            <div className="form-group">
            <button type="submit"  className="btn btn-primary btn-block">Login</button>
            </div>
        </form>
        </div>
        </div>
    );
};
export default Login;
