const express = require('express')
const router = express.Router()
var cors = require('cors');


const users = require('./controllers/users.js')
const todos = require('./controllers/todos.js')
const articulos = require('./controllers/articulos.js')
const auth = require('./middleware/auth')

router.all('*', cors())
router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/todos/:id', auth, todos.getTodo)
router.get('/todos', auth, todos.getTodos)
router.post('/todos', auth, todos.createTodo)
router.patch('/todos/:id', auth, todos.updateTodo)
router.delete('/todos/:id', auth, todos.deleteTodo)

// Rutas para articulos
router.get('/articulos', auth, articulos.getAllArticles)
router.get('/articulos/acrylics', auth, articulos.getAcrylics)
router.get('/articulos/cards', auth, articulos.getCards)
router.get('/articulos/foils', auth, articulos.getFoils)
router.get('/articulos/marbled', auth, articulos.getMarbled)
router.post('/articulos', auth, articulos.createArticle)

router.get('/cart', auth, articulos.getCart)
router.post('/cart', auth, articulos.addToCart)
router.post('/cart/checkout', auth, articulos.checkout)
router.delete('/cart/:id', auth, articulos.deleteFromCart)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router

