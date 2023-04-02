import mongoose from "mongoose";
import products from "../model/product.model"
const Schema = mongoose.Schema
const cartSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    ,
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

export default mongoose.model("carts", cartSchema)