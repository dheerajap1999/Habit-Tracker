const Task  = require("../models/taskModel");
const { isTimestampInToday, convertTimeStamp } = require("../utils/helper");

// Creating controller for the route

const createTask = async (req,res) => {
    try {
        const { taskName, date } = req.body;

        // Validate input values (you may add more validation as needed)
        // Create a new task
        const newTask = new Task({
            taskName: taskName,
            date: date
            // Add other properties as needed
        });
        
        // Save the new task to the database
        const savedTask = await newTask.save();
        console.log("savedTask",savedTask);
        res.status(201).send({ status: true, message: "Task added successfully", "data": savedTask });
    } catch (error) {
        res.status(500).send({ "status": false, "error": error.message });
    }
}

// Updating status of the Task list
const updateTask = async(req,res) => {
    try {
        let taskId = req.params.taskId;
        let taskStatus = req.body.status;
        let date = req.body.date;
        console.log("--------------------",taskStatus,req.body);
        if(!["Done","Not Done", "None"].includes(taskStatus)){
            return res.status(400).send({"status":false,"message":"Enter the Valid Status like: Done, Not Done, None"})
        }

        const findTaskData = await Task.findOne({"_id":taskId})// if data does not exits it will come Null or exists it will be in object format[i.e Dict]
        if(!findTaskData){
            return res.status(404).send({"status":false,"message":"Task does not exists"})
        }

        const updateTask = await Task.findOneAndUpdate(
            {'_id':taskId},
            {'status':taskStatus,'date':date},
            {'new':true} // if we not add this data will not show updated one adding this it will directly show updated data
        )
        return res.status(200).send({"status":true,"message":"Task Updated Successfuly","data":updateTask})

    } catch (error) {
        res.status(500).send({"status":false,"error":error.message})
    }
}


// Show All Task in assending order
const showAllDate = async(req,res)=>{
    try {
        let allTaskList = await Task.find()
        if(!allTaskList.length){
            return res.status(404).send({"status":false,"message":"No Task Found"})
        }
        const sortedTask = allTaskList.sort((a, b) => a.date - b.date);// sorting all tas by assending order for decending do b - a
        const parsedDate = sortedTask.map((item)=>{
            let tempItem = {
                ...item._doc,
                parsedDate:convertTimeStamp(+item.date)
            }
            return tempItem
        })
        

        res.render('pages/home', { status: true, message: "All Task List", data: parsedDate });
    } catch (error) {
        return res.status(400).send({"status": false,"message":error.message})
    }
}

// Show Current Date task 
const showCurrentDate = async(req,res)=>{
    try {
        let allTaskList = await Task.find()
        if(!allTaskList.length){
            return res.status(404).send({"status":false,"message":"No Task Found"})
        }
        const sortedTask = allTaskList.filter((item)=>isTimestampInToday(item.date))// sorting function task by current Day

        return res.status(200).send({"status":true,"message":"Current Task List","data":sortedTask})
    } catch (error) {
        return res.status(400).send({"status": false,"message":error.message})
    }
}

/// Getting Single task by id
const getTaskById = async(req,res)=>{
    try {
        let taskId = req.params.taskId;
        let getOneTask = await Task.findById(taskId)
        if(!getOneTask){
            return res.status(404).send({"status":false,"message":"No Task Found"})
        }
        return res.status(200).send({"status":true,"message":"Task Fetch Successfully","data":getOneTask})
    } catch (error) {
        return res.status(400).send({"status": false,"message":error.message})
    }
}

const deleteTask = async(req,res)=>{
    try {
        let taskId = req.params.taskId;
        let getOneTask = await Task.findByIdAndDelete(taskId)
        // let taskStatus = req.body.status;
        if(!getOneTask){
            return res.status(404).send({"status":false,"message":"No Task Found"})
        }
        return res.status(200).send({"status":true,"message":"Task Delete Successfully","data":getOneTask})
    } catch (error) {
        return res.status(400).send({"status": false,"message":error.message})
    }
}



module.exports = {createTask, updateTask, showAllDate, showCurrentDate, getTaskById, deleteTask};

