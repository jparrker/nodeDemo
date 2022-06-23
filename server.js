const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db, 
  dbConnectionString = process.env.DB_STRING,
  dbName = 'startrek-facts',
  collection

MongoClient.connect(dbConnectionString)
  .then(client => {
    console.log('connected to database')
    db = client.db(dbName)
    collection = db.collection('aliens')
  })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.get("/", (request, response) => {
  try {
    response.render('index.ejs')

  }
  catch (error) {
    response.status(500).send({message: error.message})
  }
})


app.listen(process.env.PORT || PORT, () => {
  console.log('server is running')
})
