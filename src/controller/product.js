const { getProduct, getProductCount, getProductById, postProduct, patchProduct, deleteProduct } = require('../model/product')
const qs = require('querystring')
const helper = require('../helper/index.js');

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    const resultPrevLink = {...currentQuery, ...generatedPage}
    return qs.stringify(resultPrevLink)
  } else {
    return null
  }
}

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    const resultNextLink = {...currentQuery, ...generatedPage}
    return qs.stringify(resultNextLink)
  } else {
    return null
  }
}

module.exports = {
  getAllProduct: async (request, response) => {
    let {page, limit} = request.query
    page = parseInt(page)
    limit = parseInt(limit)
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit)
    let offset = page * limit - limit 
    let prevLink = getPrevLink(page, request.query)
    let nextLink = getNextLink(page, totalPage, request.query)
    const pageInfo = {
      page, // page: page
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`
    }
    try {
      const result = await getProduct(limit, offset);
      return helper.response(response, 200, "Success Get Product", result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  //=======================================================================
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
  postProduct: async (request, response) => {
    try {
      const {product_name, product_harga, product_status} = request.body
      const setData = {
        product_name,
        product_harga,
        product_created_at: new Date(),
        product_status
      }
      const result = await postProduct(setData)
      return helper.response(response, 201, "Product Created", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const { product_name, product_harga, product_status } = request.body
      const setData = {
        product_name,
        product_harga,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductById(id)
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id)
        return helper.response(response, 201, "Product Updated", result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  // ==================================================================
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteProduct(id)
      return helper.response(response, 201, "Product Deleted", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  }
}