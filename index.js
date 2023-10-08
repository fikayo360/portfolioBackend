const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')

const connectDB = (uri) => {
    mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongoDb connected succesfully")
})
}


app.use()

const port = process.env.PORT || 5000;

const startServer = () => {
    try{
        app.listen(port,()=>{
            console.log(`server listenng on ${port}`)
        })
        connectDB(process.env.MONGO_URI)
    }catch(err){
        console.log(err)
    }
}

startServer()