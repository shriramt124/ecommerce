import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

//utility funciton to send the emails
export const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};