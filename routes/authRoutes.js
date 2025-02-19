import express from "express";
import { loginUser,registerUser,forgotPassword,resetPassword } from "../controller/authController.js";
 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
 

export default router;