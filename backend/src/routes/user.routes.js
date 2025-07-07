import express from "express";
import { getCurrentUser, uploadAvatar } from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

// Avatar upload route
router.post("/upload-avatar", verifyJWT, upload.single("avatar"), uploadAvatar);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
