const {getAllProduct} = require('../model/product')
const helper = require('../helper/index.js')

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const result = await getAllProduct();
      return helper.response(response, 200, "Success Get Product", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postProduct: (request, response) => {
    console.log(request.body)
    response.send('Post Berhasil !')
  },
  patchProduct: (request, response) => {
    console.log(request.params.id)
    console.log(request.body)
    response.send('Patch Berhasil !')
  },
  deleteProduct: (request, response) => {
    console.log(request.params.id)
    response.send('Delete Berhasil !')
  }
}