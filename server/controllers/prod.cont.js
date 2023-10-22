import fs from "fs";
import path from "path";
import defProduct from "../models/defproduct.js";
import User from "../models/users.js";

const __dirname = path.resolve();

export const addProduct = async(req,res) => {
    try {
        const {userId, products_category, products_name, products_description, products_price, products_brand, products_image, products_size, products_color} = req.body;
        
        const findUser = await User.findById(userId).exec();
        if(!findUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        if(findUser.role === 'Seller'){

            const lastproduct = await defProduct.find({}).sort({products_id : -1}).limit(1).exec();

            let products_id = 1;
            if(lastproduct.length > 0){
                products_id = parseInt(lastproduct[0].products_id) + 1;
            }
            const newProduct = new defProduct({
                products_category,
                products_id,
                products_name,
                products_description,
                products_price,
                products_brand,
                products_image,
                products_size,
                products_color,
                user: userId
            });

            await newProduct.save();
            return res.status(201).json({status: 201, success: true, message: "Product added successfully."});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const editProduct = async(req,res) => {
    try {
        const {userId, productId, products_category, products_name, products_description, products_price, products_brand, products_image, products_size, products_color} = req.body;

    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getProduct = async(req,res) => {
    try {
        const {userId} = req.body;
        const findProducts = await defProduct.find({user: userId}).exec();
        return res.status(200).json({status: 200, success: true, sellerProducts: findProducts});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const deleteProduct = async(req,res) => {
    try {
        const {productId} = req.body;
        if(!productId) return res.status(404).json({status: 404, success: false, message: "Product not found."});

        const removeProduct = await defProduct.findByIdAndDelete(productId).exec();
        if(removeProduct){
            return res.status(200).json({status: 200, success: true, message: "Product deleted successfully."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const defaultProducts = async(req,res) => {
    try {
        let productData = JSON.parse(fs.readFileSync(__dirname + '/JSON/products.json'));
        
        for(let i=0;i<productData.length;i++){
            let products_category = productData[i]['products_category'];
            let products_id = productData[i]['products_id'];
            let products_name = productData[i]['products_name'];
            let products_description = productData[i]['products_description'];
            let products_price = productData[i]['products_price'];
            let products_brand = productData[i]['products_brand'];
            let products_image = productData[i]['products_image'];
            let products_size = productData[i]['products_size'];
            let products_color = productData[i]['products_color'];

            const newDefProduct = new defProduct({
                products_category: products_category,
                products_id: products_id,
                products_name: products_name,
                products_description: products_description,
                products_price: products_price,
                products_brand: products_brand,
                products_image: products_image,
                products_size: products_size,
                products_color: products_color
            });

            await defProduct.create(newDefProduct);
        }

        return res.status(200).json({status: 200, success: true, message: "Default products added successfully."});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getDefaultProducts = async(req,res) => {
    try {
        const getAllProducts = await defProduct.find({}).exec();
        if(!getAllProducts.length) return res.status(200).json({status: 200, success: false, message: "No Products Found."});
        
        return res.status(200).json({status: 200, success: true, products: getAllProducts});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}