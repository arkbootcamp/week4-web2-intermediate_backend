const connection = require('../config/mysql')

module.exports = {
  getAllProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM product WHERE product_id = ?", id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}