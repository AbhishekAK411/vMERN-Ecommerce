import mongoose, {Schema} from "mongoose";

const defProductSchema = new Schema({
    products_category: {
        type: String,
        required: true,
    },
    products_id: {
        type: Number,
        required: true,
        unique: true,
    },
    products_name: {
        type: String,
        required: true,
    },
    products_description: {
        type: String,
        required: true,
    },
    products_price: {
        type: Number,
        required: true
    },
    products_brand: {
        type: String,
        required: true,
    },
    products_image: {
        type: String,
        required: true
    },
    products_size: {
        type: [String]
    },
    products_color: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model("defProduct", defProductSchema);