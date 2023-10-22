import User from "../models/users.js";

export const checkChangeRole = async(req, res, next) => {
    try {
        const {userId} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});

        const findUser = await User.findById(userId).exec();
        if(findUser.role === 'User'){
            next();
        }else{
            return res.status(400).json({status: 400, success: false, message: "Contact an Administrator."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const checkAddProduct = async(req,res, next) => {
    try {
        const {userId, products_category, products_name, products_description, products_price, products_brand, products_image, products_size, products_color} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});
        if(!products_category) return res.status(404).json({status: 404, success: false, message:"Category is required."});
        if(!products_name) return res.status(404).json({status: 404, success: false, message: "Name of the product is required."});
        if(!products_description) return res.status(404).json({status: 404, success: false, message: "Description of the product is required."});
        if(!products_price) return res.status(404).json({status: 404, success: false, message: "Price of the product is required."});
        if(!products_brand) return res.status(404).json({status: 404, success: false, message: "Brand of the product is required."});
        if(!products_image) return res.status(404).json({status: 404, success: false, message: "Image of the product is required."});
        if(!products_size) return res.status(404).json({status: 404, success: false, message: "Size of the product is required."});
        if(!products_color) return res.status(404).json({status: 404, success: false, message: "Color of the product is required."});

        const findUser = await User.findById(userId).exec();
        if(findUser.role === "Seller"){
            next();
        }else{
            return res.status(200).json({status: 200, success: false, message: "Please become a seller."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const checkEditProduct = async(req,res,next) => {
    try {
        const {userId, productId, products_category, products_name, products_description, products_price, products_brand, products_image, products_size, products_color} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});
        if(!productId) return res.status(404).json({status: 404, success: false, message: "Product not found."});
        if(!products_category) return res.status(404).json({status: 404, success: false, message:"Category is required."});
        if(!products_name) return res.status(404).json({status: 404, success: false, message: "Name of the product is required."});
        if(!products_description) return res.status(404).json({status: 404, success: false, message: "Description of the product is required."});
        if(!products_price) return res.status(404).json({status: 404, success: false, message: "Price of the product is required."});
        if(!products_brand) return res.status(404).json({status: 404, success: false, message: "Brand of the product is required."});
        if(!products_image) return res.status(404).json({status: 404, success: false, message: "Image of the product is required."});
        if(!products_size) return res.status(404).json({status: 404, success: false, message: "Size of the product is required."});
        if(!products_color) return res.status(404).json({status: 404, success: false, message: "Color of the product is required."});

        const findUser = await User.findById(userId).exec();
        if(findUser.role === 'Seller'){
            
        }else{
            return res.status(200).json({status: 200, success: false, message: "Please become a seller"});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}