require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const cookieParser = require('cookie-parser')
const corsOptions= require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);
connectDB();

app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

// This is one method for handling bad http requests (404)
// The question is... why do I need to define this at the bottom of the use stack? (says so on express docs)
// and how exactly is this middleware processed and called?
// https://expressjs.com/en/starter/faq.html#:~:text=All%20you%20need%20to%20do,status(404).
app.all('*', (req,res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({message: '404 not found'})
    } else {
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoError.log')
})

