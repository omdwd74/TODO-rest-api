const express = require('express');
const Todo = require('../models/Todo');
const db = require('../models/db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

app.get('/todos', async (req, res) => {
    Todo.find({})
      .then((todos) => {
        res.send(todos);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('An error occurred while fetching todos');
      });
  });
  

  app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findOne({ id });
      if (!todo) {
        return res.status(404).send(`Todo with id ${id} not found`);
      }
      res.send(todo);
    } catch (err) {
      console.error(err);
      return res.status(500).send('An error occurred while fetching todo');
    }
  });
  
app.post('/todos', (req, res) => {
    
    const todoData = req.body;
    console.log(todoData)
    const newTodo = new Todo({
      id: todoData.id,
      text: todoData.text,
      completed: todoData.completed
    });
    console.log(newTodo);
    newTodo.save()
      .then(todo => {
        res.send(todo);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('An error occurred while creating todo');
      });
  });
  

// PUT /todos/:id - update a todo
app.put('/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const todoData = req.body;
      const updatedTodo = await Todo.findOneAndUpdate({ id }, todoData, { new: true });

    //   if(todoData.completed==true){
    //     console.log("task completed in " + updatedTodo.createdAt- Date.now())
    //   }
      if (!updatedTodo) {
        return res.status(404).send(`Todo with id ${id} not found`);
      }
      res.send(updatedTodo);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

// DELETE /todos/:id - delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
  
  
  // Start the server
  app.listen(3000, () => console.log('Server is running on port 3000'));