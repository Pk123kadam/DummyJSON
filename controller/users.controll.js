import Users from "../model/users.model"
import c_u from "../model/cart.model"
import t_u from "../model/todo.model"
import fs from "fs"
import path from "path"
import multer from "multer"
import {user_storage} from "../multer/mult"
import bcrypt from "bcrypt";

export const usersTodo = async(req,res)=>{
    try{
        const user_todo = await t_u.find({userId:req.params.ids})
      
        if(user_todo){
            res.status(200).json({
                todo:user_todo,
                message:"successfully fetched"
            })
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }


    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}

export const usersCart = async(req,res)=>{
    try{
        const user_cart = await c_u.find({userId:req.params.ids}).populate("products")
       
        if(user_cart){
            res.status(200).json({
                carts:user_cart,
                message:"successfully fetched"
            })
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }


    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getUser =async (req,res)=>{

    try{
        
        const data = await Users.find({id:req.params.ids})
       
         if(data){
             res.status(200).json({
                 users: data,
                 message:"successfully fetched"
             })
         }else{
             res.status(400).json({
                 message:"something went wrong"
             })
         }
 
 
 
     }catch(err){
         res.status(500).json({
             message:err.message
         })
     }

}

export const getUsers = async(req,res)=>{

    try{let data;
        let spl;
         const {limit,skip,select,key,value} = req.query
        if(key && value){
            if(select){   spl = select.split(",").join(" ") }    
            data =  await Users.find().where(key).equals(value).limit(limit).skip(skip).select(spl)
        }
            
        else{   
            if(select){   spl = select.split(",").join(" ") }    
            data =  await Users.find().limit(limit).skip(skip).select(spl)}
        
        
      
        if(data){
            res.status(200).json({
                users: data,
                message:"successfully fetched"
            })
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }



    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}

export  const searchUsers =async (req,res)=>{
    try{
        const {q} = req.query
        let data;
        
            data = await Users.find({  $or: [
                { firstName: { $regex: `.*${q}.*`, $options: "i" } },
                { lastName: { $regex: `.*${q}.*`, $options: "i" } },
              ],})
            

       
        
       
       
         if(data){
             res.status(200).json({
                 users: data,
                 message:"successfully fetched"
             })
         }else{
             res.status(400).json({
                 message:"something went wrong"
             })
         }
 
 
 
     }catch(err){
         res.status(500).json({
             message:err.message
         })
     }

}


       

export const addUsers = async  (req,res)=>{
    try{const   upload =  multer({ storage: user_storage })
    const uploadData =upload.single("image")
    uploadData(req,res, async function(err){
        if(err){
           return res.status(400).json({
                message:err.message
            })
        }
        const {id,firstName,lastName,maidenName,age,gender,email,hair} = req.body
        console.log(req.body)
        const hash = bcrypt.hashSync(lastName, 10);
        let userData;
        if(req.file){
            const image = req.file.filename
            console.log(image)
            userData = new Users({id,firstName,lastName:hash,maidenName,age,gender,email,image:image,hair:hair

            })
        }
        else{
            userData = new Users({id,firstName,lastName:hash,maidenName,age,gender,email,hair:hair

            })

        }
      
        const saveData =  await userData.save()
        if(saveData){
            res.status(201).json({
                data:saveData,
                message:"successfully inserted"
            })
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }


    })






}catch(err){
    res.status(500).json({
        message:err.message
    })
}
}

export const  loginUser = async(req,res)=>{
    try{
        const {firstName,lastName} = req.body
        const data = await Users.findOne({firstName:firstName})
        if(!data){
            return  res.status(400).json({
                message: "User not found"
            })
        }
        const match = await bcrypt.compare(lastName, data.lastName);
        if(match){
           return res.status(200).json({
                data:data,
                message: "Login successful"
           }) 
        }else{
            return res.status(400).json({
                message: "Invalid credentials"
           }) 
        }


    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const updateUser = async  (req,res)=>{
    try{
        const   upload =  multer({ storage: user_storage })
        const uploadData =upload.single("image")
        uploadData(req,res,async function(err){
            if(err){
                return res.status(400).json({
                    message:err
                })
            }
            const old_data = await Users.findOne({id:req.params.ids})
            let img = old_data.image
            if(req.file){
                fs.unlink(path.join("user.image",img),function(err){
                    if(err){
                        res.status(400).json({
                            message:"something went wrong"
                        })
                    }
                })
                img = req.file.filename
            }
            const {id,firstName,lastName,maidenName,age,gender,email} = req.body
            const upd = await Users.updateOne({id:req.params.ids},{$set:{id,firstName,lastName,maidenName,age,gender,email,image:img}})

            if(upd){
                res.status(200).json({
                    data:upd,
                    message:"successfully updated"
                })
            }
        
        })






    }catch(err){
        res.status(500).json(
         {   message:err.message}
        )
    }
}

export const deleteUser = async  (req,res)=>{
    try{
        const data = await Users.findOne({id:req.params.ids})
  

        if(fs.existsSync(path.join("user.image",data.image))){
            
            fs.unlink(path.join("user.image",data.image),function(err){
                if(err){
                    res.status(400).json({
                        message:"something went wrong"
                    })
                }
            })

        }
      
     
     
      
      
        const del = await Users.deleteOne({id:req.params.ids})
        if(del){
            res.status(200).json({
                data:del,
                message:"deleted"
            })
        }

        
      

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}