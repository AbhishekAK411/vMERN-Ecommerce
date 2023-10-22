import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['User', 'Seller'],
        default: 'User'
    },
    cartProducts: {
        type: [String]
    },
    order: {
        type: Array
    }
});

export default mongoose.model("User", userSchema);