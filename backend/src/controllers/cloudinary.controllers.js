import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded')
    }

    const result = await cloudinary.uploader.upload_stream({
      resource_type: 'auto',
      folder: 'ghostecho_media'
    },
    (error, result) => {
      if (error){
        return next(new ApiError(500, 'Upload failed'))
      }
      return res.status(200).json(
        new ApiResponse(200, {
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type
        },'Upload Successfull')
      )
    }
  )
  req.file.stream.pipe(result);

  
  } catch (err) {
    next(err)
  }
}