import express from 'express';
import Appointment from '../models/Appointment.js';
import Receipt from '../models/Receipt.js';
import { auth, authorize } from '../middleware/auth.js'; // Correct path with .js extension

const router = express.Router();

export const auth = async (req, res, next) => {
  
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({ 
        message: 'Not authorized to access this resource' 
      });
    }
    next();
  };
};