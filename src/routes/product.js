const router = require("express").Router()
const {
  getAllProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product")
const { authorization } = require("../middleware/auth")
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis,
} = require("../middleware/redis")
const uploadImage = require("../middleware/multer")

// [GET]
router.get("/", authorization, getProductRedis, getAllProduct)
router.get("/:id", authorization, getProductByIdRedis, getProductById)
// [POST]
router.post("/", authorization, clearDataProductRedis, uploadImage, postProduct)
// [PATCH/PUT]
router.patch("/:id", authorization, clearDataProductRedis, patchProduct)
// [DELETE]
router.delete("/:id", authorization, clearDataProductRedis, deleteProduct)

module.exports = router
