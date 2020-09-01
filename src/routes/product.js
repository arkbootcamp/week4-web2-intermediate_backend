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
} = require("../middleware/redis")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/")
  },
  filename: (request, file, callback) => {
    // console.log(file)
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    )
  },
})
let upload = multer({ storage: storage })

// [GET]
router.get("/", authorization, getAllProduct)
router.get("/:id", authorization, getProductByIdRedis, getProductById)
// [POST]
router.post("/", upload.single("product_image"), postProduct)
// [PATCH/PUT]
router.patch("/:id", clearDataProductRedis, patchProduct)
// [DELETE]
router.delete("/:id", clearDataProductRedis, deleteProduct)

module.exports = router
