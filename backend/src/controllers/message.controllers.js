import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getMessagesBetweenUsers = asyncHandler(async (req, res) => {
  const otherUserId = req.params.userId;
  const currentUserId = req.user._id;

const rawPage = parseInt(req.query.page);
const rawLimit = parseInt(req.query.limit);

const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);      // page >= 1
const limit = Math.min(100, isNaN(rawLimit) ? 20 : rawLimit); // limit <= 100

const skip = (page - 1) * limit;

  if (!otherUserId) {
    throw new ApiError(400, 'User ID is required');
  }

  // Get total message count
  const totalMessages = await Message.countDocuments({
    $or: [
      { sender: currentUserId, recipient: otherUserId },
      { sender: otherUserId, recipient: currentUserId }
    ]
  });

  // Get paginated messages
  const messages = await Message.find({
    $or: [
      { sender: currentUserId, recipient: otherUserId },
      { sender: otherUserId, recipient: currentUserId }
    ]
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .populate('sender', "username email avatar")
  .populate('recipient', "username email avatar")

  res.status(200).json(
    new ApiResponse(200, messages, 'chat history fetched successfully')
  )
}) 

export const sendMessage = asyncHandler(async (req, res ) => {
  const { recipient, content } = req.body

  if (!recipient || (!content  && !req.file)) {
    throw new ApiError(400, 'Recipient and content/media are required')
  }

  const message = await Message.create({
    sender: req.user._id,
    recipient,
    content,
    // Add media logic here if using file upload later
  })

  res.status(201).json(
    new ApiResponse(201, message, 'Message sent successfully')
  )
})