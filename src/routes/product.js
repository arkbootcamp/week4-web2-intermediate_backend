const router = require("express").Router()
const product = require('../controller/product')

// [GET]
router.get('/', product.getAllProduct);
router.get('/:id', product.getProductById);
// [POST]
router.post('/', product.postProduct)
// [PATCH/PUT]
router.patch('/:id', product.patchProduct)
// [DELETE]
router.delete('/:id', product.deleteProduct)

module.exports = router