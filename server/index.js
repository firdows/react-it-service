const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const config = require('./config');
const routes = require('./routers');
//use
const PORT = config.port
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({type: '*/*'}))

//connect
// var con = mysql.createConnection(config.dbOptions)
// con.connect(function (err) {
//     if (err) 
//         throw err;
//     console.log("Connected");
// })
app.use(myConnection(mysql,config.dbOptions,'pool'))
routes(app)

app.listen(PORT, () => {
    console.log('ready server on http://localhost:' + PORT)
})