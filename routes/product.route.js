import express from "express"
import {getProducts,addProduct,updateProducts,deleteProducts,getProduct,proCategories,searchProducts,allproCategories} from "../controller/product.controll"
export const product_route = express.Router()
product_route.get("/search", searchProducts)
product_route.get("/categories", allproCategories)
product_route.get("/categories/:ids", proCategories)
product_route.get("/:ids", getProduct)
product_route.get("", getProducts)

product_route.post("/add", addProduct)
product_route.patch("/update/:ids", updateProducts)
product_route.delete("/delete/:ids", deleteProducts)

