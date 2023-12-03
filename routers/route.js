const express = require('express');
const { createTask, updateTask, deleteTask, showAllDate, showCurrentDate, getTaskById } = require('../controllers/contorller');
const router = express.Router();

// Creating route and calling controller with appropiate methods
router.post('/create',createTask)
router.post('/update/:taskId',updateTask)
router.delete('/delete/:taskId',deleteTask)
router.get('/', showAllDate)
router.get('/currentDate',showCurrentDate)
router.get('/task/:taskId',getTaskById)


module.exports = router;