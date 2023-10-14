const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const connectDB = (uri) => {
    mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongoDb connected succesfully")
})
}

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/post',postRoutes)

const port = process.env.PORT;

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