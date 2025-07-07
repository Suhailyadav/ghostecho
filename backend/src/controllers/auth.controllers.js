import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Register Controller
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email')
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = user.generateJWT();

   const userData = {
    id: user._id,
    name: user.username,
    email: user.email
  };

  res.status(201).json(
    new ApiResponse(201, { user: userData, token }, 'User registered successfully')
  );

})

// Login Controller
export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email|| !password) {
    throw new ApiError(400, 'Email and Password are required');
  }

  const user = await User.findOne({ email }).select('+password')
  console.log('Entered Password:', password);
 
console.log('Saved Hashed Password:', user.password);

  if (!user){
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password)
  console.log(isMatch)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = user.generateJWT();
  console.log('Incoming login:', email, password);
console.log('User from DB:', user);
console.log('Password match:', isMatch);

 res.status(200).json(
    new ApiResponse(200, { token, user: { id: user._id, name: user.name, email: user.email } }, 'Login successful')
  );
})


