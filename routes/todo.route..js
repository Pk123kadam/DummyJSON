import express from "express"
import { addtodo,gettodo ,updatetodo,deletetodo,singletodo} from "../controller/todo.controll"

const todoRoute = express.Router()
todoRoute.get("/todos",gettodo)
todoRoute.get("/todos/:ids",singletodo)
todoRoute.post("/todo/add",addtodo)
todoRoute.patch("/todo/update/:ids",updatetodo)
todoRoute.delete("/todo/delete/:ids",deletetodo)

export default todoRoute