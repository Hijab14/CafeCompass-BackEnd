
import Express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv'; // Add this line to import dotenv
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config(); // Add this line to load environment variables from .env file


const app = Express();

const mongoURL = process.env.MONGODB_URI; // Add this line to get the environment variable

mongoose.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongodb connected")
}).catch((err)=>{
    console.error(err)
});


app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

app.use("/api/products", productRoutes);
app.use("/api/admins", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

