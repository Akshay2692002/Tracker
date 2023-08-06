const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const app=express();
const mongoose=require('mongoose');



app.use(cors());
app.use(express.json());

dotenv.config();
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("Mongo connected");
})

const exerciseRoute= require('./routes/exercises');
const userRoute= require('./routes/users');

app.use('/exercises',exerciseRoute);
app.use('/users',userRoute);

app.get('/',(req,res)=>{res.send("Listerning...")});
app.post('/',(req,res)=>{res.send(req.body.username)})

const port=process.env.PORT||5000;
app.listen(port,()=>{
  console.log(`Listerning to port ${port}`)
})