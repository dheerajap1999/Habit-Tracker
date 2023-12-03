const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const router = require('./routers/route');
const port = 8000;

// setting ejs so that it can view the EJS page
// to Prase req.body in json format => to get the data from route which is send in json format
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//connection to mongo DB
mongoose.connect('mongodb+srv://root:root@cluster0.pbwxl9n.mongodb.net/HabitStrucure?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDb..."))
.catch(err => console.log(`Error connecting to mongoDB Atlas: ${err}`))

// Calling Route
app.use('/',router)



// hosting server 
app.listen(port,'0.0.0.0',() =>{
    console.log(`server running on port ${port}`)
});