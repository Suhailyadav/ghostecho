import jwt from 'jsowebtoken';
import User from '../models/user.models.js';
import ApiError from '../utils/ApiError.js';

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorizaion?.split(' ')[1];
  if (!token) throw new ApiError(401, 'Not Authenticated');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select('-password');
  next();
}

export default isAuthenticated;