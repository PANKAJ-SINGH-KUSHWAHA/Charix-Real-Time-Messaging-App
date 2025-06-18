import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken= (userId, res) => {
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d" // Token will expire in 7 days
    })

    res.cookie("jwt", token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie will expire in 7 days
        httpOnly: true, // Cookie is not accessible via JavaScript, prevents XSS attacks
        sameSite: "Strict", // Cookie is sent only for same-site requests, prevents CSRF attacks
        secure: process.env.NODE_ENV !== 'development' // Cookie is sent only over HTTPS in production
    })
    return token; // Return the generated token
}

export default generateToken; // 

