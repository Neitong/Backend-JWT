import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;