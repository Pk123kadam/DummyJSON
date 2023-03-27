import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { product_route } from "./routes/product.route"
import catRoute from "./routes/category.route"
import cartRoute from "./routes/cart.route"
import usersRoute from "./routes/users.route"
import todoRoute from "./routes/todo.route."
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/dummydatabase').then(() => console.log('Connected!'));

const app = express()

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/products", product_route)
app.use(catRoute)
app.use(cartRoute)
app.use(usersRoute)
app.use(todoRoute)

app.listen(5090, () => {
    console.log("connected to port 6060")
})