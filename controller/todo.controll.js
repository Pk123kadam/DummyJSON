import Todo from "../model/todo.model"

export const singletodo =async (req,res)=>{
    try{
   
    
        const todo = await Todo.find({id:req.params.ids})
        if(todo){
            res.status(200).json({
                todo:todo,
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


export const gettodo = async(req,res)=>{

    try{
        const {limit,skip} = req.query
        let todo;
        if(limit || skip){
             todo = await Todo.find().limit(limit).skip(skip)

        }
   
    
         else{todo = await Todo.find()}
        if(todo){
            res.status(200).json({
                todo:todo,
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

export const addtodo = async(req,res)=>{
    try{
   
        const {id,todo,completed,userId} = req.body
        const data = new Todo({
            id,todo,completed,userId
        })
        const saveData = await data.save()
        if(saveData){
            res.status(201).json({
                todo:data,
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



export const updatetodo = async(req,res)=>{
    try{
   
        const {id,todo,completed,userId} = req.body
      
        const updateData = await Todo.updateOne({id:req.params.ids},{$set:{id,todo,completed,userId}})
        if(updateData){
            res.status(200).json({
                todo:updateData,
                message:"successfully updated"
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


export const deletetodo = async(req,res)=>{
    try{
   
       
      
        const deleteData = await Todo.deleteOne({id:req.params.ids})
        if(deleteData){
            res.status(200).json({
                todo:deleteData,
                message:"successfully deleted"
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