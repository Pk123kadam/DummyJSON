
import Categories from "../model/category.model"

export const getCategories = async (req,res)=>
{    try{
   
    const data = await Categories.find()
   
    if(data){
        res.status(200).json({
            data:data,
            message:"successfully fetched"
        })
    }else{
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

// export const  proCategories =async(req,res)=>{
//     try{
//         const cat = req.params.ids
    
//         const data = await Products.find().populate("category")
//         const  fil_cat = data.filter((v)=>{
//             return v.category.category == cat
//         })
//        if(fil_cat){
//         res.status(200).json({
//             data:fil_cat,
//             message:"successfully fetched"
//         })
//        }
//       else{
//             res.status(404).json({
//                 message:"something went wrong"
//             })
//         }
    
    
//     }catch(err){
//         res.status(500).json({
//             message:err.message
//         })
    
//         }

// }

export const addCategories = async(req,res)=>{
    try{
        const {category} = req.body
        const data = new Categories({
            category
        })
        const saveData = await data.save()
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




    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const  updateCategories = async (req,res)=>{
    try{
        const {category} = req.body
        const upd = await Categories.updateOne({_id:req.params.ids},{$set:{category}})
        if(upd){
            res.status(200).json({
                message:"successfully updated"
            })
        }else{
        res.status(400).json({
            message:"something went wrong"
        })}



    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const deleteCategories = async (req,res)=>{
    try{
       
        const del = await Categories.deleteOne({_id:req.params.ids})
        if(del){
            res.status(200).json({
                message:"successfully deleted"
            })
        }else{
        res.status(400).json({
            message:"something went wrong"
        })}



    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}