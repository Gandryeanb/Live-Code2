require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection;
const port = process.env.PORT
const cors = require('cors')

mongoose.connect('mongodb://asd:asdasd1@ds049456.mlab.com:49456/livecode', { useNewUrlParser:true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const user = require('./routes/userRoute')
const status = require('./routes/statusRoute')

app.use('/users',user)
app.use('/status',status)

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'server on'
  })
})

app.listen(port,() => {
  console.log(`\n> LISTENING TO PORT ${port}`)
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`> DB CONNECTED`)
})
