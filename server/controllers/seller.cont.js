import User from "../models/users.js";

export const changeRole = async(req,res) => {
    try {
        const {userId} = req.body;

        const existUser = await User.findById(userId).exec();

        existUser.role = 'Seller';

        await existUser.save();
        return res.status(200).json({status: 200, success: true, message: "You are now a seller."});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
} 