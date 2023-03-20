import express from "express"
import { getUsers, addUsers, updateUser, deleteUser, getUser, searchUsers, usersCart, usersTodo } from "../controller/users.controll"
const usersRoute = express.Router()
usersRoute.get("/users/:ids/carts", usersCart)
usersRoute.get("/users/:ids/todo", usersTodo)

usersRoute.get("/users/search", searchUsers)

usersRoute.get("/users/:ids", getUser)
usersRoute.get("/users", getUsers)


usersRoute.post("/users/add", addUsers)

// usersRoute.post("/users/login",loginUser)


usersRoute.patch("/users/update/:ids", updateUser)
usersRoute.delete("/users/delete/:ids", deleteUser)

export default usersRoute