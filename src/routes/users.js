const router = require("express").Router()
const {
  registerUser,
  loginUser,
  forgotPassword,
  refreshToken,
} = require("../controller/users")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot", forgotPassword)
router.post("/token", refreshToken)

module.exports = router
