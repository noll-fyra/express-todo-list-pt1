const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

// create
router.post('/createTodo', function (req, res) {
  var newTodo = Todo()

  newTodo.name = req.body.name
  newTodo.description = req.body.description || ''
  newTodo.completed = false

  console.log('created' + newTodo)
  newTodo.save(function (err) {
    if (err) console.error(err)
    console.log('saved')
  })
  res.redirect('/')
})

// index
router.get('/', function (req, res) {
  Todo.find({}, function (err, data) {
    if (err) console.error(err)
    res.render('index', {todoList: data})
  })
})

// update/show
router.post('/showUpdate', function (req, res) {
  res.redirect('/update/' + req.body.id)
})

router.get('/update/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, data) {
    if (err) console.error(err)
    console.log(data)
    res.render('update', {updateTodo: data})
  })
})

router.post('/todoUpdated', function (req, res) {
  Todo.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, todo) {
    if (err) console.error(err)
    console.log('updated' + todo)
  })
  res.redirect('/')
})

// remove
router.post('/removeTodo', function (req, res) {
  Todo.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) console.error(err)
    console.log('Todo deleted!')
  })
  res.redirect('/')
})

module.exports = router
