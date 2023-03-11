import express from "express"
import {addCategories,updateCategories,deleteCategories,getCategories} from "../controller/category.controll"
const catRoute = express.Router()
catRoute.get("/product/categories",getCategories)

catRoute.post("/products/categories/add",addCategories)
catRoute.patch("/products/categories/update/:ids",updateCategories)
catRoute.delete("/products/categories/delete/:ids",deleteCategories)

export default catRoute