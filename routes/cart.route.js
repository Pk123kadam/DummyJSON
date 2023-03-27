import express from "express"

import { addCarts, updateCart, deleteCarts, getCart } from "../controller/cart.controller"

const cartRoute = express.Router()


cartRoute.get("/carts/", getCart)

cartRoute.post("/carts/add", addCarts)
cartRoute.patch("/carts/update/decrease", updateCart)
cartRoute.delete("/carts/delete", deleteCarts)
// cartRoute.delete("/carts/delete",deleteCartsProducts)

export default cartRoute