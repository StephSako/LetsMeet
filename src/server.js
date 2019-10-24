/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 * puis node server.js
 * exemple complet à l'adresse https://github.com/Musinux/first-vue-app
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
var db = require('./db')

const app = express()

app.use(session({
  secret: 'secret', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

var login = {}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

const users = [{
  username: 'admin',
  password: 'admin'
}]

app.get('/api', function (req, res) {
  res.json({ status: 'Working' })
})

app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
    if (!user) {
      // gérez le cas où on n'a pas trouvé d'utilisateur correspondant
    } else {
      // connect the user
      req.session.userId = 1000 // connect the user, and change the id
      res.json({
        message: 'connected'
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
})

app.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
      }
    })
  }
})

app.get('/events', function (req, res) {
  db.pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('SELECT * FROM EVENEMENT NATURAL JOIN UTILISATEUR', function (err, results, fields) {
      if (err) console.log('Error request events')
      res.json(results)
    })
  })
})

app.post('/connexion', function (req, res) {
  var input = req.body
  var email = input.email
  var password = input.password

  db.pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('SELECT * FROM UTILISATEUR WHERE Email = ?', [email], function (error, results, fields) {
      if (error) throw error
      if (results.length > 0) {
        login[results[0].id] = req.session.id
        req.session.key = results[0].id
        if (password === results[0].Password) {
          req.session.Id = results[0].Id
          req.session.Email = results[0].Email
          req.session.Nom = results[0].Nom
          req.session.Prenom = results[0].Prenom
          req.session.ImageProfil = results[0].ImageProfil
          res.json({ auth: 'success', admin: results[0].Id })
        } else {
          res.json({ auth: 'failed', error: 'Mot de passe incorrect' })
        }
      } else {
        res.json({ auth: 'failed', error: 'Email incorrect' })
      }
    })
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
