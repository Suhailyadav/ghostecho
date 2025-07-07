import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb)=> {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const mime = allowedTypes.test(file.mimetype);
  if (mime) {
    cb(null, true)
  } 
  else {
    cb(new Error('Only images and videos are allowed'));
  } 
}

const upload = multer({
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
})

export default upload;