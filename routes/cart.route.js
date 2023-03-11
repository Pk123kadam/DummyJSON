import express from "express"

import { addCarts ,updateCart,deleteCarts,getUserCart,getCart} from "../controller/cart.controller"

const cartRoute = express.Router()

cartRoute.get("/carts/:ids",getUserCart)
cartRoute.get("/carts/",getCart)   

cartRoute.post("/carts/add",addCarts)
cartRoute.patch("/carts/update",updateCart)
cartRoute.delete("/carts/delete",deleteCarts)
// cartRoute.delete("/carts/delete",deleteCartsProducts)

export default cartRoute