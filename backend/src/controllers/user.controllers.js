import cloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.models.js";

// get current user 
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'Current user fetched successfully')
  );
});


export const uploadAvatar = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    throw new ApiError(400, "No avatar file uploaded");
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Delete previous avatar from Cloudinary if exists
  if (user.avatar && user.avatar.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  // Upload new avatar
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "ghostecho_avatars",
        width: 300,
        height: 300,
        crop: "fill",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  });

  // Update user's avatar info in DB
  user.avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { avatar: user.avatar }, "Avatar uploaded successfully")
  );
});
