import mongoose  from "mongoose";
const Schema = mongoose.Schema
const categorySchema = new Schema({
    category:{type:String,
    required:true}
})

export default mongoose.model("categories",categorySchema)