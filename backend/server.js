const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog')
.then(()=>console.log('Mongo DB connected'))
.catch((err)=> console.log('DB error:', err));

//Use routes
app.use('/api/posts', postRoutes)


app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))

