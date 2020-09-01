const route = require("express").Router()

// import route disini
const product = require("./routes/product")
const users = require("./routes/users")
// const category = ....

// buat middle disini
route.use("/product", product)
route.use("/users", users)
// route.use('/category', category)

module.exports = route
