import path from "path"
import fs from "fs"
import multer from "multer"
import Products from "../model/product.model"

import { pro_storage } from "../multer/mult"

export const allproCategories =async (req,res)=>{
    try{
       
    
        const data = await Products.find().populate("category")
        const  fil_cat = data.map((v)=>{
            return v.category.category 
        })
       if(fil_cat){
        res.status(200).json({
            data:fil_cat,
            message:"successfully fetched"
        })
       }
      else{
            res.status(404).json({
                message:"something went wrong"
            })
        }
    
    
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    
        }

}

export const proCategories = async (req,res)=>{
    try{
                const cat = req.params.ids
            
                const data = await Products.find().populate("category")
                const  fil_cat = data.filter((v)=>{
                    return v.category.category == cat
                })
               if(fil_cat){
                res.status(200).json({
                    data:fil_cat,
                    message:"successfully fetched"
                })
               }
              else{
                    res.status(404).json({
                        message:"something went wrong"
                    })
                }
            
            
            }catch(err){
                res.status(500).json({
                    message:err.message
                })
            
                }
}

export const getProduct = async (req,res)=>{
    try{
        const find = await Products.findOne({id:req.params.ids}).populate("category")
        if(find){
            res.status(200).json({
                data:find,
                message:"successfully fetched"
            })
        }else
        {
            res.status(404).json({
                message:"not found"
            })
        }



    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const getProducts = async(req,res)=>{
    try{let products;
        let spl;
         const {limit,skip,select} = req.query
        if(limit|| skip || select){
            
           
         if(select){   spl = select.split(",").join(" ") }    
            products =  await Products.find().limit(limit).skip(skip).select(spl).populate("category")

        }
       else{  products =  await Products.find().populate("category")}

        if(products){
            res.status(200).json({
                data:products,
                message:"successfully fetched"
            })
        }else{
            res.status(404).json({
                message:"not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}

export const searchProducts= async (req,res)=>{
    try{
        const {p} = req.query
        console.log(p)
        let searchPro ;
     

  
            searchPro = await Products.find({ $or: [
                { title: { $regex: `.*${p}.*`, $options: "i" } },
                { description: { $regex: `.*${p}.*`, $options: "i" } },
              ]}
              ).populate("category")
             
    
        
        if(searchPro){
            res.status(200).json({
                data:searchPro,
                message:"successfully fetched"
            })
        }else{
            res.status(404).json({
                message:"not found"
            })
        }


    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const addProduct = (req,res)=>{
    try{const   upload =  multer({ storage: pro_storage })
        const uploadData =upload.single("image")
        uploadData(req,res, async function(err){
            if(err){
               return res.status(400).json({
                    message:err.message
                })
            }
            const {id,title,description,price,discountPercentage,rating,stock,brand,category} = req.body
            let productData;
            if(req.file){
                const image = req.file.filename
                console.log(image)
                productData = new Products({id,
                    title,description,price,discountPercentage,rating,stock,brand,category,thumbnail:image

                })
            }
            else{
                productData = new Products({id,
                    title,description,price,discountPercentage,rating,stock,brand,category

                })

            }
            const saveData =  await productData.save()
            if(saveData){
              return  res.status(201).json({
                    data:saveData,
                    message:"successfully inserted"
                })
            }else{
             return   res.status(400).json({
                    message:"something went wrong"
                })
            }


        })






    }catch(err){
      return  res.status(500).json({
            message:err.message
        })
    }
}

 export  const updateProducts = (req,res)=>{
    try{
        const uploadData = product_upload.single("image")
        uploadData(req,res,async function(err){
            if(err){
                return res.status(400).json({
                    message:err
                })
            }
            const old_data = await Products.findOne({id:req.params.ids})
            let img = old_data.thumbnail
            if(req.file){
                fs.unlink(path.join("product.image",img),function(err){
                    if(err){
                        res.status(400).json({
                            message:"something went wrong"
                        })
                    }
                })
                img = req.file.filename
            }
            const {id,title,description,price,discountPercentage,rating,stock,brand,category} = req.body
            const upd = await Products.updateOne({id:req.params.ids},{$set:{id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail:img}})

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


export const deleteProducts = async (req,res)=>{
    try{
        const data = await Products.findOne({id:req.params.ids})
        console.log(data.thumbnail)

        if(fs.existsSync(path.join("product.image",data.thumbnail))){
            
            fs.unlink(path.join("product.image",data.thumbnail),function(err){
                if(err){
                    res.status(400).json({
                        message:"something went wrong"
                    })
                }
            })

        }
      
     
     
      
      
        const del = await Products.deleteOne({id:req.params.ids})
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