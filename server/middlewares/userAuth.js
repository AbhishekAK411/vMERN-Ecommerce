import User from "../models/users.js";
import { emailValidator } from "../utils/emailValidator.js";
import { passwordValidator } from "../utils/passwordValidator.js";
import bcrypt from "bcrypt";

//* Middleware for register controller
export const authRegister = async(req,res,next) => {
    try {
        const {username, email, password, confirmPassword, contact} = req.body;
        if(!username) return res.status(404).json({status: 404, success: false, message: "Username is required."});        
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});        
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});        
        if(!confirmPassword) return res.status(404).json({status: 404, success: false, message: "Password is required."});        
        if(!contact) return res.status(404).json({status: 404, success: false, message: "Contact is required."});
        
        if(password !== confirmPassword) return res.status(500).json({status: 400, success: false, message: "Passwords do not match."});

        try {
            emailValidator(email);
            passwordValidator(password);
        } catch (error) {
            return res.status(400).json({status: 400, success: false, message: error.message});
        }
        next();
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

//* Middleware for login controller
export const authLogin = async(req,res,next) => {
    try {
        const {field, password} = req.body;
        if(!field) return res.status(404).json({status: 404, success: false, message: "Username or Email is required."});
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});

        const existingUser = await User.findOne({$or: [{username: field}, {email: field}]}).exec();
        if(!existingUser) return res.status(200).json({status: 200, success: false, message: "User not found."});

        const bool = await bcrypt.compare(password, existingUser.password);
        if(bool){
            next();
        }else{
            return res.status(200).json({status: 200, success: false, message: "Invalid credentials."});
        }

    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: 'Internal server error.'});
    }
}

export const checkAddToCart = async(req,res,next) => {
    try {
        const {productId, userId} = req.body;
        if(!productId) return res.status(404).json({status: 404, success: false, message: "Product not found."});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});

        const findUser = await User.findById(userId).exec();
        if(findUser.role  === 'Seller'){
            return res.status(400).json({status: 400, success: false, message: "Error while adding to cart, contact administrator."});
        }
        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const checkGetCartProduct = async(req,res,next) => {
    try {
        const {userId} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});

        const findUser = await User.findById(userId).exec();
        if(!findUser) return res.status(400).json({status: 400, success: false, message: "User not found."});

        if(findUser.role === 'Seller'){
            return res.status(400).json({status: 400, success: false, message: "Contact an administrator."});
        }
        if(findUser.cartProducts.length > 0){
            next();
        }else{
            return res.status(200).json({status: 200, success: true, message: "Your cart is empty."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}