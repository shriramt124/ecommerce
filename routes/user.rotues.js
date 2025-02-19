 
import express from "express"
import { getAllUsers, updateUser, deleteUser, blockUser, unblockUser } from "../controller/user.controller.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage, handleMulterError } from "../middlewares/uploadMiddleware.js";
const userRouter = express.Router()
 
 
 
// Admin routes
userRouter.get("/", protect, isAdmin, getAllUsers);
userRouter.delete("/:id", protect, isAdmin, deleteUser);
userRouter.put("/block-user/:id", protect, isAdmin, blockUser);
userRouter.put("/unblock-user/:id", protect, isAdmin, unblockUser);

// User routes
userRouter.put("/update", protect, uploadSingleImage, handleMulterError, updateUser);

export default userRouter;
