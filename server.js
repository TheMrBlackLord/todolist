const express = require('express')
const path = require('path')
const router = require('./router.js')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json({extended: true}))
app.use(cors())
app.use('/', router)

mongoose.connect(config.get('mongoUri'), {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
})

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))