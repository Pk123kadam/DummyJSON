import mongoose from "mongoose";

const Schema = mongoose.Schema
import users from "../model/users.model"
const todoSchema = new Schema({

    todo: { type: String, required: true },
    completed: { type: Boolean, required: true },
    userId: { type: Schema.Types.ObjectId, ref: users },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("todos", todoSchema)