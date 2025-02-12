import jwt from "jsonwebtoken";
import { AppError } from "../utils/ApiError.js";

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           // req.user = decoded.id; // Attach user ID to request object
            const userFound = await User.findById(decoded.id);
            if (!userFound) {
                return next(new AppError("Invalid user", 404));
                //not authorized this route if user i snot found 
            } 
            req.user = userFound;
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;