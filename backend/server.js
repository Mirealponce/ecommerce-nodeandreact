import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';

dotenv.config();
const mongodbUrl= config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error => console.log(error.reason));




const app =express();
app.use(bodyParser.json());

app.use("/api/users",userRoute);
app.get('/api/products/:id',(req,res)=>{
    const idProduct=req.params.id;
    const DetailProduct=data.products.find(p=>p._id===idProduct);
    if(DetailProduct){
        res.send(DetailProduct);
    }else{
        res.status(404).send({msg:'Producto no encontrado. '});
    }
   

});

app.get('/api/products',(req,res)=>{
    res.send(data.products);

});

app.listen(5000,()=>{
    console.log('server iniciado');
});
