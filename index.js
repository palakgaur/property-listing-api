import express from 'express';
import mongoose from 'mongoose';
import { User } from './model/user.js';
import { Property } from './model/property.js';
import jwt from 'jsonwebtoken';
import { secretKey } from './config.js';

console.log(secretKey);
const app = express()

app.use(express.json());

app.post("/api/user/login", async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message: "User not found"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
    
    const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '300s' });
      res.json({token});
});

app.post("/api/user/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" })
    }
    else {
      res.json({
        message: "profile accessed",
        authData
      })
    }
  })
})



function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  }
  else {
    res.send({
      result: 'token is not valid',
    })
  }
}


app.get('/api/user', async (req, res) => {
  try {
    const user = await User.find({})
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/api/user/get-all-property', async(req,res)=>{
  try{
    const property = await Property.find({})
    res.status(200).json(property);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
})

app.get('/api/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})



app.post('/api/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/api/user/create-property', async(req,res)=>{
  try{
    const property = await Property.create(req.body);
    res.status(200).json(property);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
})

app.put('/api/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  }
  catch {
    res.status(500).json({ message: error.message });
  }
})

app.delete('/api/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})

mongoose.connect('mongodb+srv://palakgaur2001:x3CTQXQ3i4G6Ml3u@cluster0.g4kee.mongodb.net?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log('Connection failed:', error.message);
  });