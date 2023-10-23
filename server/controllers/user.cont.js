import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import defProduct from "../models/defproduct.js";

//* Controller for registration
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
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internallll server error."});
    }
}

//* Controller for Login
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

//* Controller for getCurrentUser (Context API)
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

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const findUser = await User.findById(userId).exec();
        const findSingleProduct = await defProduct.findById(productId).exec();

        if (findUser.role === "User") {
            const productIndex = findUser.cartProducts.findIndex(
                (cartProduct) => cartProduct.product === findSingleProduct.products_id
            );

            if (productIndex !== -1) {
                findUser.cartProducts[productIndex].qty += 1;
            } else {
                findUser.cartProducts.push({
                    product: findSingleProduct.products_id,
                    qty: 1,
                });
            }

            await findUser.save();

            return res.status(200).json({
                status: 200,
                success: true,
                message: productIndex !== -1 ? "Product added again." : "Product added to the cart successfully.",
                quantity: findUser.cartProducts[productIndex]?.qty || 1,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error.",
        });
    }
}

export const getCartProduct = async(req,res) => {
    try {
        const {userId} = req.body;

        const findUser = await User.findById(userId).exec();
        let array1 = [];
        if(findUser.cartProducts.length > 0){
            for(let i=0;i<findUser.cartProducts.length;i++){
                let productDetails = await defProduct.find({products_id: findUser.cartProducts[i].product}).exec();
                array1.push({
                    product: productDetails,
                    qty: findUser.cartProducts[i].qty
                });
            }

            return res.status(200).json({status: 200, success: true, array1});
        }else{
            return res.status(200).json({status: 200, success: true, message: "Your cart is empty."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

