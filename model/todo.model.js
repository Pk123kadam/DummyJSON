import mongoose from "mongoose";
const Schema = mongoose.Schema
const todoSchema = new Schema({
    id:{type:Number,required:true},
    todo:{type:String,required:true},
    completed:{type:Boolean,required:true},
    userId:{type:Number,required:true},
    date:{type:Date,
    default:Date.now()}
})

export default mongoose.model("todos",todoSchema)