const helper = require("../helper/index.js")
const { createPayment } = require("../model/payment")
const midtransClient = require("midtrans-client")

module.exports = {
  postPayment: async (request, response) => {
    try {
      // [model 1] proses save data to database : userid. nominal, created_at
      // berhasil simpan ke table topup response : topupId, userid, nominal, created_at
      // [model 2] check saldo sebelumnya untuk di jumlahkan
      // [model 3] update data saldo supaya saldo si user bertambah
      // ==============================================================
      // [model 1] proses save data to database : userid. nominal, status, created_at
      // berhasil simpan ke table topup response : topupId, userid, nominal, status, created_at
      const { id_topup, nominal } = request.body
      const topUp = await createPayment(id_topup, nominal)
      return helper.response(response, 200, "Success Create Payment !", topUp)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postMidtransNotif: async (request, response) => {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.midtransServerKey,
      clientKey: process.env.midtransClientKey,
    })

    snap.transaction.notification(request.body).then((statusResponse) => {
      let orderId = statusResponse.order_id
      let transactionStatus = statusResponse.transaction_status
      let fraudStatus = statusResponse.fraud_status

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      )

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          console.log("challenge")
          // TODO set transaction status on your databaase to 'challenge'
        } else if (fraudStatus == "accept") {
          console.log("accept")
          // TODO set transaction status on your databaase to 'success'
        }
      } else if (transactionStatus == "settlement") {
        console.log("settelement")
        // TODO set transaction status on your databaase to 'success'
        // [model 1] proses update data status to table topup : status berhasil
        // const updateStatusResult = await modelUpdateStatusResult(orderId, transactionStatus)
        // response user_id, nominal topup
        // ==================================
        // [model 2] check nominal sebelumnya dan akan set parameter (user_id)
        // response nominal sebelum topup
        // ==================================
        // saldoBaru = nominal sebelum topup + nominal topup
        // [model 3] update data saldo supaya saldo si user bertambah (user_id, saldoBaru)
      } else if (transactionStatus == "deny") {
        console.log("deny")
        // TODO you can ignore 'deny', because most of the time it allows payment retries
        // and later can become success
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "expire"
      ) {
        console.log("cancel / expire")
        // TODO set transaction status on your databaase to 'failure'
      } else if (transactionStatus == "pending") {
        console.log("pending")
        // TODO set transaction status on your databaase to 'pending' / waiting payment
      }
    })
  },
}
