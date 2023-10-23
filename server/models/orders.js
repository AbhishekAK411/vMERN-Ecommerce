import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: Array
    }
});

export default mongoose.model("Order", orderSchema);