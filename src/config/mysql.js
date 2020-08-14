const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: '',
  database: 'online_shop'
})

connection.connect(error => {
  if (error) {
    throw error
  }
  console.log("You are now conected ...")
})

module.exports = connection
