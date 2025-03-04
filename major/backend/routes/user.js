import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser, getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.get('/', protect, admin, getAllUsers);

export default router;