import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js"
import { generateResetToken } from "../utils/utilityFun.js";
import { sendEmail } from "../utils/utilityFun.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
// Register User
export const registerUser = catchAsyncError(async (req, res, next) => {
    const { FirstName, LastName, Email, Password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ Email });
    if (userExists) {
        return next(new AppError("User already exists", 400));
    }

    try {
        // Handle profile image upload if present
        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file);
            req.body.profileImage = uploadedImage;
            
            // Cleanup temporary file
            await fs.unlink(req.file.path);
        }

        // Create user
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
export const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await User.findOne({ Email });

        if (user && (await bcrypt.compare(Password, user.Password))) {
            res.json({
                _id: user._id,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export const forgotPassword = async(req,res,next)=>{
    const {Email} = req.body;
try {
    const user = await User.findOne({Email});
    if(!user){
        return res.status(200).json({ message: "If the email exists, you will receive a reset link." });
    }

    const resetToken = await generateResetToken(user._id);
    console.log('Generated Reset Token:', resetToken);
    user.ResetPasswordToken = resetToken;
    user.ResetPasswordExpires = Date.now() + 15*60*1000; //15 min
    await user.save();
     // Create the reset password link
     const resetUrl = `http://localhost:3000/api/reset-password?token=${resetToken}`;
     // Send the reset password link to the user's email
     const message = `You are receiving this email because you (or someone else) requested a password reset. Please click the following link to reset your password: ${resetUrl}`;
     await sendEmail({
         to: user.Email,
         subject: "Password Reset Request",
         text: message,
     });
     res.status(200).json({ message: "If the email exists, you will receive a reset link." });
    
} catch (error) {
    next(error);
}
}


 
export const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        console.log(process.env.JWT_SECRET)
console.log('Received Token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
               console.log(decoded.id,"decoded")
        // Find the user by the decoded user ID
        const user = await User.findOne({
            _id: decoded.id, 
        });
         console.log("user foune ",user)
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password and clear the reset token fields
        user.Password = hashedPassword;
        user.ResetPasswordToken = undefined;
        user.ResetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Token has expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "Invalid token" });
        }
        next(error);
    }
};


//here roles will the array 
export const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('you are not authorized to access this route', 401));
        } else {
            next();
        }
    })
}
