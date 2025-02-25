import jwt from "jsonwebtoken";
import { AppError } from "../utils/ApiError.js";
import User from "../model/user.model.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req?.headers?.authorization &&
        req?.headers?.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userFound = await User.findById(decoded.id);
            
            if (!userFound) {
                return next(new AppError("Invalid user", 404));
            }

            if (userFound.isBlocked) {
                return next(new AppError("Your account has been blocked", 403));
            }

            req.user = userFound;
           
            next();
        } catch (error) {
            return next(new AppError("Not authorized, token failed", 401));
        }
    } else if (!token) {
        return next(new AppError("Not authorized, no token", 401));
    }
};

export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return next(new AppError("Not authorized as an admin", 403));
    }
};

 