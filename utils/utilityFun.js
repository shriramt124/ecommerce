import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

export const generateResetToken = (userId) => {
    // Create a JWT token with the user ID and an expiration time (e.g., 15 minutes)
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

//utility function to send the emails
export const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from:"shriramt.124@gmail.com",
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};