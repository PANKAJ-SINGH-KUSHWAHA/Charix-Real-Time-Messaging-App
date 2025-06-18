import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async(req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized, no token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Unauthorized, invalid token"});
        }

        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler

    }
    catch(error){
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}