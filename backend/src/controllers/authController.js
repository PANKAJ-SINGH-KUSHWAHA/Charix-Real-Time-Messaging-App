import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import generateToken from '../lib/utils.js'; 


export const signup = async(req,res)=>{
    const {email, fullname, password} = req.body;
    try{
        // hash the password

        if(!email || !fullname || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({ email });
        
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword, 
        })

        if(newUser){
            // generate jwt token here 
            generateToken(newUser._id, res); // Call the utility function to generate a token
            await newUser.save(); // Save the new user to the database

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
        else{
            return res.status(500).json({message: "User creation failed"});
        }

    }
    catch(error){
        console.error("Error during signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
    
}

export const login = (req,res)=>{
    res.send('Login Page');
}

export const logout = (req,res)=>{
    res.send('Logout Page');
}