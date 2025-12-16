import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
const user = await User.findOne({ email: req.body.email });
if (!user) return res.status(401).json({ message: 'User not found' });
res.json(user);
});

export default router;