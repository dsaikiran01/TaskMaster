const express = require('express');
const { body } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/tasks
// @desc    Get all tasks for authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { completed, tag, priority, dueDate } = req.query;
    
    let query = { userId: req.user._id };
    
    // Filter by completion status
    if (completed !== undefined) {
      query.isCompleted = completed === 'true';
    }
    
    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }
    
    // Filter by due date
    if (dueDate) {
      const date = new Date(dueDate);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      query.dueDate = {
        $gte: date,
        $lt: nextDay
      };
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
], validate, async (req, res) => {
  try {
    const { title, description, dueDate, priority, tags } = req.body;
    
    const task = new Task({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || 'medium',
      tags: tags || [],
      userId: req.user._id
    });
    
    await task.save();
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
], validate, async (req, res) => {
  try {
    const { title, description, dueDate, priority, tags, isCompleted } = req.body;
    
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (priority !== undefined) task.priority = priority;
    if (tags !== undefined) task.tags = tags;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;
    
    await task.save();
    
    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({
      message: 'Task deleted successfully',
      taskId: req.params.id
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task completion status
// @access  Private
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.isCompleted = !task.isCompleted;
    await task.save();
    
    res.json({
      message: `Task marked as ${task.isCompleted ? 'completed' : 'incomplete'}`,
      task
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ message: 'Server error while toggling task' });
  }
});

module.exports = router;
