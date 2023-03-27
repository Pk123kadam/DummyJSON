import Carts from "../model/cart.model"
import Product from "../model/product.model"




export const getCart = async (req, res) => {
    try {

        const data = await Carts.find()



        if (data) {
            res.status(200).json({
                data: data,

                message: "succesfully fetched"
            })
        } else {
            res.status(404).json({
                message: "not found"
            })
        }






    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


// export const addCarts = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         const cart = await Carts.findOne({ userID: userID })
//         const product = await Product.findOne({ _id: productID });

//         let addData;
//         let unique;

//         if (cart) {
//             cart.product.forEach((v) => {


//                 if (v.id == productID) {
//                     v.quantity++
//                     v.price += product.price
//                 }
//                 else {
//                     cart.product.push({
//                         id: product._id,
//                         name: product.title,
//                         thumbnail: product.thumbnail,
//                         price: product.price,
//                         quantity: 1,

//                     })

//                 }
//             })
//             console.log(cart.product)
//             unique = cart.product.filter(
//                 (obj, index) =>
//                     cart.product.findIndex((item) => item.id === obj.id) === index
//             );


//             console.log(unique)
//             addData = new Carts({
//                 product: unique,

//                 userID: userID
//             })

//             await Carts.deleteOne({ userID: userID })

//         } else {
//             addData = new Carts({
//                 product: [{
//                     id: product._id,
//                     name: product.title,
//                     thumbnail: product.thumbnail,
//                     price: product.price,
//                     quantity: 1
//                 }],
//                 userID: userID
//             })


//         }
//         addData.save();
//         if (addData) {
//             res.status(201).json({
//                 data: addData,
//                 message: 'Added to Cart successfully :)'
//             })
//         } else {
//             res.status(400).json({
//                 message: 'Error in storing category data :('
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: `Something went wrong: ${error.message}`
//         })
//     }
// }
export const addCarts = async (req, res) => {
    try {
        let upd;
        let inc;
        const { userID, productID } = req.body
        const data = await Carts.find({ userID: userID })
        let increase = data.filter((e) => {
            return e.product.id == productID
        })
        const product = await Product.findOne({ _id: productID })

        data.length !== 0 ?

            increase.length !== 0 ? inc = await Carts.updateOne({ userID: userID, "product.id": productID }, { $inc: { "product.quantity": 1, "product.price": product.price } })
                : upd = new Carts({
                    product: {
                        id: product._id,
                        name: product.title,
                        thumbnail: product.thumbnail,
                        quantity: 1,
                        price: product.price,
                    },
                    userID: userID

                })

            :
            upd = new Carts({
                product: {
                    id: product._id,
                    name: product.title,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                    price: product.price,
                },
                userID: userID

            })

            ;
        if (upd) {
            await upd.save()
            return res.status(201).json({
                data: upd,
                message: 'successfully created'
            })
        }
        if (inc) {
            return res.status(200).json({
                data: inc,
                message: "updated"
            })
        }

        else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



export const updateCart = async (req, res) => {

    try {
        let dec;
        const { productID, userID } = req.query;
        const data = await Carts.find({ userID: userID })
        const product = await Product.findOne({ productID: productID })


        let increase = data.filter((e) => {
            return e.product.id == productID
        })

        increase.length !== 0 ? dec = await Carts.updateOne({ userID: userID, "product.id": productID }, { $inc: { "product.quantity": -1, "product.price": -product.price } }) : null
        if (dec) {
            res.status(201).json({
                data: dec,
                message: 'updated successfully :)'
            })
        } else {
            res.status(400).json({
                message: 'Error :('
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        })
    }


}

// export const deleteCarts = async (req, res) => {

//     try {
//         const { userID, productID } = req.query
//         let addData;
//         let del;
//         let cart;

//         if (!productID) {

//             del = await Carts.deleteOne({ userID: userID })
//         } else {

//             cart = await Carts.findOne({ userID: userID })

//             cart.product.forEach(async (v) => {
//                 if (v.id == productID) {
//                     cart.product.splice(cart.product.indexOf(v), 1)


//                 }
//             })
//             addData = new Carts({
//                 product: cart.product,
//                 userID: userID
//             })
//             del = await Carts.deleteOne({ userID: userID })

//             await addData.save()
//             if (cart.product.length === 0) {

//                 del = await Carts.deleteOne({ userID: userID })

//             }
//             console.log(cart.product)


//         }



//         // const del =  await Carts.deleteOne({userID:req.params.ids})
//         if (del) {
//             res.status(200).json({
//                 carts: del,
//                 message: "deleted"
//             })
//         }



//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }


// }

export const deleteCarts = async (req, res) => {
    try {

        const { userID, productID } = req.query

        let del = await Carts.deleteOne({ userID: userID }, { "product.id": productID })
        if (del) {
            res.status(200).json({
                message: "deleted",
                data: del
            })
        } else {
            res.status(400).json({
                message: "something went erong"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

