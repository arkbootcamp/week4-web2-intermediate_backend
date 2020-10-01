const midtransClient = require("midtrans-client")

module.exports = {
  createPayment: (id_topup, nominal) => {
    return new Promise((resolve, reject) => {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-KItkJVnyFsZRa-JD5HL_x_DC",
        clientKey: "SB-Mid-client-lyiBVkXY-ImOkiuQ",
      })

      let parameter = {
        transaction_details: {
          order_id: id_topup,
          gross_amount: nominal,
        },
        credit_card: {
          secure: true,
        },
      }

      snap
        .createTransaction(parameter)
        .then((transaction) => {
          console.log(transaction)
          resolve(transaction.redirect_url)
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
}
