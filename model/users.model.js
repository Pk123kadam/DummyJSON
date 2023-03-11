import mongoose from "mongoose"
const Schema = mongoose.Schema
const usersSchema = new Schema({
    id:{
        type:Number,required:true
    },
    firstName:{
        type:String,required:true
    },
    lastName:{
        type:String,required:true
    },
    maidenName:{
        type:String,required:true
    },
    age:{
        type:Number,required:true
    },
    gender:{
        type:String,required:true
    },
    email:{
        type:String,required:true
    },
   
   
    image:{
        type:String,default:"default.png"
    },
    hair:{
        type:{
            color:{type:String,required:true}

        }
    },

    date:{
        type:Date,
        default:Date.now()
    }
    

})

export default mongoose.model("users",usersSchema)
