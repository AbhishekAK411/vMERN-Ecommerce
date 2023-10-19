import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    try {
        const {username, email, password, contact} = req.body;

        const existingUser = await User.findOne({email}).exec();
        if(existingUser) return res.status(200).json({status: 200, success: false, message: "You are already registered."});

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPass,
            contact
        });

        await newUser.save();
        return res.status(201).json({status: 201, success: true, message: "You have registered successfully."});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const login = async(req,res) => {
    try {
        const {field} = req.body;
        const existingUser = await User.findOne({$or: [{username: field}, {email: field}]}).select("-password").exec();
        if(!existingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const userId = {id: existingUser._id};
        const token = jwt.sign(userId, process.env.jwtsecret);
        return res.status(200).json({status: 200, success: true, message: "Logged in successfully.", token: token, user: existingUser});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getCurrentUser = async(req,res) => {
    try {
        const {token} = req.body;

        const decodeToken = jwt.verify(token, process.env.jwtsecret);
        const userId = decodeToken.id;
        const user = await User.findById(userId).select("-password").exec();
        if(user){
            return res.status(200).json({status: 200, success: true, data: user});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}