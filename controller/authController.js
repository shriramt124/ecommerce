import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js"
import { generateResetToken } from "../utils/utilityFun.js";
import { sendEmail } from "../utils/utilityFun.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
// Generate access token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Generate refresh token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

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
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to user
        user.refreshToken = refreshToken;
        user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await user.save();

        // Set both tokens in HTTP-only cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { Email, Password } = req.body;
    console.log(Email, Password)

    const user = await User.findOne({ Email });
    const isPasswordMathched = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMathched) {
        console.log("Password not matched")
    }
    if (user && (await bcrypt.compare(Password, user.Password))) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to user
        user.refreshToken = refreshToken;
        user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await user.save();

        // Set both tokens in HTTP-only cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1 * 60 * 1000 // 15 minutes
        });

        res.json({
            _id: user._id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            role: user.role ?? "user"
        });
    } else {
        return next(new AppError("Invalid credentials", 401));
    }
});

// Refresh Token
export const refreshToken = catchAsyncError(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken is running")

    if (!refreshToken) {
        return next(new AppError("No refresh token provided", 401));
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken || user.refreshTokenExpires < new Date()) {
            return next(new AppError("Invalid refresh token", 401));
        }

        // Generate new tokens
        const accessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        // Update refresh token in database
        user.refreshToken = newRefreshToken;
        user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await user.save();

        // Set both tokens in HTTP-only cookies
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1 * 60 * 1000 // 15 minutes
        });

        res.json({
            success: true
        });
    } catch (error) {
        return next(new AppError("Invalid refresh token", 401));
    }
});

// Logout User
export const logoutUser = catchAsyncError(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        // Find user and clear refresh token
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            user.refreshTokenExpires = null;
            await user.save();
        }
    }

    // Clear both refresh token and access token cookies
    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0)
    });
    
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0)
    });

    res.json({
        success: true,
        message: "Logged out successfully"
    });
});
export const forgotPassword = async (req, res, next) => {
    const { Email } = req.body;
    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(200).json({ message: "If the email exists, you will receive a reset link." });
        }

        const resetToken = await generateResetToken(user._id);
        console.log('Generated Reset Token:', resetToken);
        user.ResetPasswordToken = resetToken;
        user.ResetPasswordExpires = Date.now() + 15 * 60 * 1000; //15 min
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
        console.log(decoded.id, "decoded")
        // Find the user by the decoded user ID
        const user = await User.findOne({
            _id: decoded.id,
        });
        console.log("user foune ", user)
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

 

// Check if user is logged in
export const isLoggedIn = catchAsyncError(async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = req.cookies?.accessToken;

    // Check if either token exists
    if (!refreshToken && !accessToken) {
        return res.status(401).json({
            success: false,
            isLoggedIn: false,
            message: "Not authorized, no tokens found"
        });
    }

    try {
        let userId;
        let tokenType = '';

        // Try to verify access token first
        if (accessToken) {
            try {
                const decodedAccess = jwt.verify(accessToken, process.env.JWT_SECRET);
                userId = decodedAccess.id;
                tokenType = 'access';
            } catch (accessError) {
                // Access token invalid/expired, try refresh token
                if (refreshToken) {
                    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
                    userId = decodedRefresh.id;
                    tokenType = 'refresh';
                }
            }
        } else if (refreshToken) {
            // Only refresh token available
            const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
            userId = decodedRefresh.id;
            tokenType = 'refresh';
        }

        // Find user and check status
        const user = await User.findById(userId).select('-Password');

        if (!user) {
            return res.status(401).json({
                success: false,
                isLoggedIn: false,
                message: "User not found"
            });
        }

        // Check if user is blocked
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                isLoggedIn: false,
                message: "Your account has been blocked"
            });
        }

        // Verify refresh token validity if it was used
        if (tokenType === 'refresh' &&
            (user.refreshToken !== refreshToken ||
                user.refreshTokenExpires < new Date())) {
            return res.status(401).json({
                success: false,
                isLoggedIn: false,
                message: "Invalid or expired refresh token"
            });
        }

        // Generate new access token if using refresh token or access token is expired
        if (tokenType === 'refresh' || !accessToken) {
            const newAccessToken = generateAccessToken(user._id);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });
        }

        res.status(200).json({
            success: true,
            isLoggedIn: true,
            user: user
        });
    } catch (error) {
        // Clear invalid tokens
        res.cookie('accessToken', '', { expires: new Date(0) });
        res.cookie('refreshToken', '', { expires: new Date(0) });

        return res.status(401).json({
            success: false,
            isLoggedIn: false,
            message: "Authentication failed"
        });
    }
});
