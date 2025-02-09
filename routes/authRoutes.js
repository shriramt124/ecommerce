import express from "express";
import { loginUser,registerUser,forgotPassword,resetPassword } from "../controller/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
//protect this route from being accessed publically
router.get("/profile",protect,(req,res)=>{
    return res.json({
        message:"Protected routes accessed"
    })
})

export default router;