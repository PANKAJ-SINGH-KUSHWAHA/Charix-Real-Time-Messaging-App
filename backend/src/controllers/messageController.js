import User from '../models/userModel.js';
import Message from '../models/messageModel.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';
// This controller fetches all users except the logged-in user for the sidebar
export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggedInUsrId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUsrId}}).select("-password");

        res.status(200).json({
            users: filteredUsers,
        });
    }
    catch(error){
        console.error("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

// This controller fetches messages between the logged-in user and a specific user
export const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages)
    }
    catch(error){
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

// This controller handles sending a message from the logged-in user to another user
export const sendMessage = async(req,res)=>{
    try{
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl 
        })

        await newMessage.save();

        //realtime functionality goes here using socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        
        res.status(201).json(newMessage);   
    }
    catch(error){
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }

}
