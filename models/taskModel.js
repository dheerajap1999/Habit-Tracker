const mongoose = require('mongoose');

// Creating Schema for Tasks 

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Done","Not Done", "None"],// Enum => User can only Chosse 3 Data from this Else error in status
        default:"None",
        trim:true
    }
    
},{timestamps:true}) 

// Exporting Schema
module.exports=mongoose.model("task", taskSchema);
