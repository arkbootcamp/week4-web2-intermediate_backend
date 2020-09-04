const redis = require("redis")
const client = redis.createClient()
const helper = require("../helper/index")

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        // console.log("data ada di dalam redis")
        return helper.response(
          response,
          200,
          "Success Get Data",
          JSON.parse(result)
        )
      } else {
        // console.log("data tidak ada di dalam redis")
        next()
      }
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result)
        if (!error && result != null) {
          // console.log("data ada di dalam redis")
          return helper.response(
            response,
            200,
            "Success Get Data",
            newResult.result,
            newResult.pageInfo
          )
        } else {
          // console.log("data tidak ada di dalam redis")
          next()
        }
      }
    )
  },
  // tambahkan untuk get product yang ada pagination
  clearDataProductRedis: (request, response, next) => {
    client.keys("getproduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
    // client.flushall((error, result) => {
    //   console.log(result)
    // })
    // next()
  },
}
