import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{ type: String }],
}, { timestamps: true });



export default mongoose.model('User', UserSchema);
