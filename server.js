const express = require('express')
const customerRouter = require('./routes/customer')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express()

app.use(methodOverride('_method'))

const connectFunction = async() => {
    try {
        await mongoose.connect(process.env.STR_CONNECT)
        console.log('Connect successfully!')
    }
    catch(e) {
        console.log(e)
        console.log('Connect failed!')
    }
}
connectFunction()
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

app.use('/customer', customerRouter)
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)