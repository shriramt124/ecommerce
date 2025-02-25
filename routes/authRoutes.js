import express from "express";
import { loginUser,registerUser,forgotPassword,resetPassword, isLoggedIn, refreshToken, logoutUser } from "../controller/authController.js";
 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/isLoggedin", isLoggedIn);
router.get("/refreshToken", refreshToken);
router.post("/logout", logoutUser);
 

export default router;