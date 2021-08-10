const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const User = require('./models/User.js')
const Todo = require('./models/Todo.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const verifyJWT = require('./middleware/verifyJWT.js')
const router = new Router()

router.get('/api/getTodos', verifyJWT, async (req, res) => {
   const id = req.userId
   const user = await User.findById(id)
   if (!user) return res.status(400)
   const todos = await Todo.find({owner: id})
   res.json(todos.map(todo => {
      return {
         title: todo.title,
         completed: todo.completed,
         date: todo.date,
         id: todo._id
      }
   }))
})
router.post('/api/createTodo', verifyJWT, async (req, res) => {
   const { title } = req.body
   const todo = new Todo({
      title,
      owner: req.userId
   })
   await todo.save()
   res.status(201).json({
      title,
      completed: todo.completed,
      date: todo.date,
      id: todo._id
   })
})

router.patch('/api/changeTodoComplete', verifyJWT, async (req, res) => {
   const { id, completed } = req.body
   const todo = await Todo.findByIdAndUpdate(id, {completed}, {new: true})
   res.json({completed: !!todo.completed})
})

router.patch('/api/editTodoTitle', verifyJWT, async (req, res) => {
   const { id, title } = req.body
   const todo = await Todo.findByIdAndUpdate(id, {title}, {new: true})
   res.json({title: todo.title})
})

router.delete('/api/deleteTodo', verifyJWT, async (req, res) => {
   const { id } = req.body
   const deleted = await Todo.findByIdAndDelete(id)
   res.json({isDeleted: !!deleted})
})

router.get('/api/getUser', verifyJWT, async (req, res) => {
   const id = req.userId
   const user = await User.findById(id)
   if (!user) return res.status(400)
   const { username, email } = user
   res.json({ username, email })
})

// AUTH
router.post(
   '/auth/register',
   body('email', 'Invalid email').isEmail().normalizeEmail(),
   body('password', 'Minimum password length is 6 characters').isLength({min: 6}),
   body('username', 'Invalid username').exists().trim().isLength({min: 3, max: 12}),
   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               message: errors.array().map(error => error.msg),
               success: false
            });
         }
         const {email, password, username} = req.body
         const existingUser = await User.findOne({email})
         if (existingUser)
            return res.status(409).json({
               message: 'User with such email already exists',
               success: false
            })
         const hashedPassword = await bcrypt.hash(password, 13)
         const user = new User({
            email,
            password: hashedPassword,
            username
         })
         await user.save()
         // login user after register
         const token = createToken({id: user._id}, '1h')
         res.status(201).json({
            message: 'success',
            success: true,
            token
         })
      } catch (e) {
         res.status(500).json({
            message: e.message,
            success: false
         })
      }
})
router.post(
   '/auth/login',
   body('email', 'Invalid username').isEmail().normalizeEmail(),
   body('password', 'Minimum password length is 6 characters').isLength({min: 6}),
   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               message: errors.array().map(error => error.msg),
               success: false
            });
         }
         const {email, password} = req.body
         const user = await User.findOne({email})
         if (!user)
            return res.status(400).json({
               message: 'User not found',
               success: false
            })
         const matchPassword = await bcrypt.compare(password, user.password)
         if (!matchPassword)
            return res.status(400).json({
               message: 'Wrong password',
               success: false
            })
         // login user
         const token = createToken({id: user._id}, '1h')
         res.json({
            message: 'success',
            success: true,
            token
         }) 
      } catch (e) {
         res.status(500).json({
            message: e.message,
            success: false
         })
      }
})
function createToken(payload, expiresIn) {
   return jwt.sign(
      payload,
      config.get('jwtSecretKey'),
      {expiresIn}
   )
}

module.exports = router