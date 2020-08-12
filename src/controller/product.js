const {getAllProduct, getProductById} = require('../model/product')
const helper = require('../helper/index.js');

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const result = await getAllProduct();
      return helper.response(response, 200, "Success Get Product", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getProductById: async (request, response) => {
    try {
      // const id = request.params.id
      const { id } = request.params
      const result = await getProductById(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Success Get Product By ID", result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
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