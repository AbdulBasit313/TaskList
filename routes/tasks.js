const express = require('express')
const router = express.Router()

const Task = require('../models/Task')

// get all tasks
router.get('/', async (req, res) => {
   try {
      const tasks = await Task.find()
      res.json(tasks)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// get one task by id
router.get('/:id', async (req, res) => {
   try {
      const task = await Task.findOne({ _id: req.params.id })
      res.json(task)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})


// create task
router.post('/', async (req, res) => {
   const task = new Task({
      task: req.body.task
   })

   try {
      await task.save()
      res.json(task)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// delete task
router.delete('/:id', async (req, res) => {
   try {
      const task = await Task.findByIdAndDelete({ _id: req.params.id })
      res.json(task)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// update task
router.put('/:id', async (req, res) => {
   try {
      const task = await Task.findByIdAndUpdate({ _id: req.params.id },
         req.body,
         {
            new: true,
            runValidators: true
         }
      )
      res.json(task)
   } catch (error) {
      res.status(400).json({ message: err.message })
   }
})


module.exports = router