import express from "express";
import { loginUser,registerUser,forgotPassword,resetPassword, isLoggedIn } from "../controller/authController.js";
 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/isLoggedin", isLoggedIn);
 

export default router;