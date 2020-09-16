const router = require("express").Router()
const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controller/users")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot", forgotPassword)

module.exports = router
