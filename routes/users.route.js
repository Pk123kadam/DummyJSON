import express from "express"
import jwt from "jsonwebtoken"
import { getUsers, addUsers, updateUser, deleteUser, getUser, searchUsers, usersCart, usersTodo, loginUser } from "../controller/users.controll"
const usersRoute = express.Router()
usersRoute.get("/users/:ids/carts", usersCart)
usersRoute.get("/users/:ids/todo", usersTodo)

usersRoute.get("/users/search", vali, searchUsers)

usersRoute.get("/users/:ids", getUser)
usersRoute.get("/users", getUsers)


usersRoute.post("/users/add", addUsers)

usersRoute.post("/users/login", loginUser)


usersRoute.patch("/users/update/:ids", updateUser)
usersRoute.delete("/users/delete/:ids", deleteUser)

function vali(req, res, next) {
    try {

        if (req.cookies.access_token) {

            const token = req.cookies.access_token
            let decode = jwt.verify(token, "secret")
            console.log(decode)
            if (decode) {
                next()
            } else {
                return res.status(401).json({
                    message: "unauthorized"

                })
            }
        } else {
            return res.status(401).json({
                message: "unauthorized"
            })
        }
    } catch (err) {
        return res.status(500).json(
            { message: err.message }
        )
    }
}

export default usersRoute