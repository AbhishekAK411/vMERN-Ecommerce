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