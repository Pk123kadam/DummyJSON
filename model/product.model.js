import mongoose from "mongoose";
const Schema = mongoose.Schema
import category from "../model/category.model"
const productSchema = new Schema({
     id:{type:Number,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{
        type:Number,required:true
    },
    discountPercentage:{
        type:Number,required:true
    },
    rating:{
        type:Number ,
        required:true
    
    },
    stock:{
        type:Number ,
        required:true
      
    },
    brand:{
        type:String ,
        required:true
     
    },
    category:{
       type:Schema.Types.ObjectId,ref:category 
       
    },
    thumbnail:{
        type:String ,
        default:"default.png"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

export  default mongoose.model("products",productSchema)