import multer from "multer"
import fs from "fs"


export const pro_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(fs.existsSync("product.image") == false){
           
            fs.mkdirSync("product.image")
        }


      cb(null, 'product.image')
    },
    filename: function (req, file, cb) {
        const name =  file.originalname
        console.log(name)
        const arr = name.split(".")
        const ext = arr[arr.length -1]
        arr.pop()

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, arr.join(".") + '-' + uniqueSuffix +"."+ext)
    
    }
  })

  export const user_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(fs.existsSync("user.image") == false){
           
            fs.mkdirSync("user.image")
        }


      cb(null, 'user.image')
    },
    filename: function (req, file, cb) {
        const name =  file.originalname
        console.log(name)
        const arr = name.split(".")
        const ext = arr[arr.length -1]
        arr.pop()

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, arr.join(".") + '-' + uniqueSuffix +"."+ext)
    
    }
  })


