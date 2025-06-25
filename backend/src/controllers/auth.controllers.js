import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Register Controller
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email')
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = user.generateJWT();

   const userData = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  res.status(201).json(
    new ApiResponse(201, { user: userData, token }, 'User registered successfully')
  );

})

// Login Controller
export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json('Login user route')
})

