const bcrypt = require("bcrypt")
const helper = require("../helper")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { postUser, checkUser } = require("../model/users")

let refreshTokens = {}

module.exports = {
  registerUser: async (request, response) => {
    const { user_email, user_password, user_name } = request.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(user_password, salt)
    // console.log("user Password = " + user_password)
    // console.log("user Password Bcrypt = " + encryptPassword)
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: 2,
      user_status: 0,
      user_created_at: new Date(),
    }
    try {
      // kondisi jika emailnya sama itu tidak bisa
      // model ngecek apakah emailnya ada di database atau tidak
      // jika ada nanti akan dibuat response
      // jika tidak ada
      const result = await postUser(setData)
      return helper.response(response, 200, "Success Register User", result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request")
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      // console.log(user_email)
      const checkDataUser = await checkUser(user_email)
      if (checkDataUser.length >= 1) {
        // proses 2 = cek password
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        if (checkPassword) {
          // proses 3 = set JWT
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUser[0]
          let payload = {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          }
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "10s" })
          //========================================================================
          const refreshToken = jwt.sign(payload, "RAHASIA", {
            expiresIn: "48h",
          })
          refreshTokens[refreshToken] = user_id
          console.log(refreshTokens)
          payload = { ...payload, token, refreshToken }
          //========================================================================
          return helper.response(response, 200, "Success Login !", payload)
        } else {
          return helper.response(response, 400, "Wrong Password !")
        }
      } else {
        return helper.response(response, 400, "Email / Account not registed !")
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request")
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body
      const keys = Math.round(Math.random() * 10000)
      const checkDataUser = await checkUser(user_email)
      if (checkDataUser.length >= 1) {
        console.log(keys)
        //proses update keys
        //proses email ============================================
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          ignoreTLS: false,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.email, // generated ethereal user
            pass: process.env.passEmail, // generated ethereal password
          },
        })
        await transporter.sendMail({
          from: '"Coffee Shop"', // sender address
          to: user_email, // list of receivers
          subject: "Coffe Shop - Forgot Password", // Subject line
          html: `Your Code is <b>${keys}</b>`, // html body
          // html: `<a href="http://localhost:8080/changePassword?keys=${keys}">Click Here To Change Password</a>`,
        }),
          function (err) {
            if (err) {
              console.log("error boss")
              console.log(err)
              return helper.response(response, 400, "Email not send !")
            }
          }
        //proses email ============================================
        return helper.response(response, 200, "Email has been send !")
      } else {
        return helper.response(response, 400, "Email / Account not registed !")
      }
    } catch (error) {
      console.log("error bad request")
      console.log(error)
      return helper.response(response, 400, "Bad Request")
    }
  },
  refreshToken: async (request, response) => {
    const { userId, refreshToken } = request.body
    if (
      refreshToken in refreshTokens &&
      refreshTokens[refreshToken] == userId
    ) {
      jwt.verify(refreshToken, "RAHASIA", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message)
        } else {
          delete result.iat
          delete result.exp
          delete refreshTokens[refreshToken] // delete refresh token yang lama
          const token = jwt.sign(result, "RAHASIA", { expiresIn: "1h" })
          const refreshTokenAgain = jwt.sign(result, "RAHASIA", {
            //bagian sini dibedakan namanya
            expiresIn: "48h",
          })

          refreshTokens[refreshTokenAgain] = userId // input refresh token yang baru
          console.log(refreshTokens)
          const payload = { ...result, token, refreshToken: refreshTokenAgain }
          return helper.response(
            response,
            200,
            "Success Refresh Token !",
            payload
          )
        }
      })
    } else {
      return helper.response(
        response,
        403,
        "Token Not Match Please Login Again !"
      )
    }
  },
}
