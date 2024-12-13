const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

var users=[
  {id:1,nombre:"angel",apellido:"panadero"},
  {id:2,nombre:"pepe",apellido:"Rodriguez"},
  {id:3,nombre:"Fuet",apellido:"Martinez"},
  {id:4,nombre:"Loco",apellido:"Locura"},
]

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});
app.get('/users/user1',(req,res)=>{
  res.json(users[0])
})
app.get('/users',(req,res)=>{
  res.json(users)
})
/*app.post("/api/users",req,res =>{
  const user =req.body
  user.id=users.length+1
  users.push(user)
  res.json(user)
})*/
app.post("/api/users", (req, res) => {
  const { nombre, apellido } = req.body;
  
  if (!nombre || !apellido) {
    return res.status(400).json({ error: 'El nombre y apellido son obligatorios.' });
  }

  const user = { 
    id: users.length + 1, 
    nombre, 
    apellido 
  };
  
  users.push(user);
  res.status(201).json(user); 
});
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id)); 

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(user); 
});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
