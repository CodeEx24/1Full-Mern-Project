//Initial Requirement
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");


//Connection
mongoose.connect('mongodb+srv://codeex:codeex@chartapp.fkoetbn.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error', (err)=> {
    console.log("ERROR: "+ err);
})

mongoose.connection.once('open', ()=>{
    console.log("Successful connection in MongoDB");
})

//Parsing the information comes from the web browser
app.use(express.json())

//static web server
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/api/savechart', require('./routes/save.js'))
app.use('/api/readchart', require('./routes/read.js'))

app.listen(3000, ()=>{
    console.log("Listening at the port 3000");
})

//mongodb+srv://codeex:<password>@chartapp.fkoetbn.mongodb.net/?retryWrites=true&w=majority