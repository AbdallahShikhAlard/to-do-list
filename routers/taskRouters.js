const express = require('express')
const router = express.Router();
const Task = require('../modules/task')
const authenticateToken = require('../middleware/authenticationToken')

router.get('/tasks' , async (req , res)=>{
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/task', authenticateToken , async (req , res)=>{
    try {
        const tasks = await Task.find({userId: { $eq: req.user.id } })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})
// Create a Task  
router.post('/tasks', authenticateToken, async (req, res) => {  
    const { title } = req.body;  
    const task = new Task({ title, userId: req.user.id });  
    try {  
      await task.save();  
      res.status(201).send(task);  
    } catch (err) {  
      res.status(400).send(err);  
    }  
});  
  
// Update Task Status  
router.put('/tasks/:id', authenticateToken, async (req, res) => {  
    const { completed } = req.body;  
    try {  
      const task = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });  
      if (!task) return res.sendStatus(404);  
      res.json(task);  
    } catch (err) {  
      res.status(400).send(err);  
    }  
});  
  
// Delete Task  
router.delete('/tasks/:id', authenticateToken, async (req, res) => {  
    try {  
      const task = await Task.findByIdAndDelete({_id : req.params.id});  
      if (!task) return res.sendStatus(404);  
      res.sendStatus(204);  
    } catch (err) {  
      res.status(400).send(err);  
    }  
});  


module.exports = router ;