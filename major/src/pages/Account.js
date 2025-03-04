import { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../services/api"; 

const Account = () => {
    const { user } = useSelector((state) => state.auth);
    const [updatedUser, setUpdatedUser] = useState({ name: user.name, email: user.email ,  address: user.address,password: user.password });

    const handleUpdate = async () => {
        try {
            const response = await updateUserProfile(updatedUser);
            console.log("Profile Updated:", response);
        } catch (error) {
            console.error("Update Failed", error);
        }
    };
    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
      };

    return (
        

<div className="auth-container">
<div className="auth-box">
  <h2>Update Account Details</h2>

 

  <form onSubmit={handleUpdate}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={updatedUser.name}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={updatedUser.password}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>address</label>
      <input
        type="text"
        name="address"
        value={updatedUser.address}
        onChange={handleChange}
        className="form-control"
        
      />
    </div>

    <button type="submit" className="btn btn-primary btn-block">
      Update Profile
    </button>
  </form>

  
</div>
</div>
    );
};

export default Account;
