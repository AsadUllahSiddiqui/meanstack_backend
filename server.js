require('dotenv').config()
const express=require('express');
const app=express();

//connecting mongodb
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  var cors = require('cors')
  app.use(cors()) 
  
const userRouter=require('./routes/userRouter')
const adminRouter=require('./routes/adminRouter')
const categoryRouter=require('./routes/categoryRouter')
const productRouter=require('./routes/productRouter')
const orderRouter=require('./routes/orderRouter')
//middleware
app.use('/userRouter',userRouter)
app.use('/adminRouter',adminRouter)
app.use('/categoryRouter',categoryRouter)
app.use('/productRouter',productRouter)
app.use('/orderRouter',orderRouter)

app.listen(3000,()=>console.log('Server has started..'))