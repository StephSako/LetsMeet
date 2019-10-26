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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

app.get('/api', function (req, res) {
  res.json({ status: 'Working' })
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
  db.database.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('SELECT * FROM EVENEMENT NATURAL JOIN POST NATURAL JOIN UTILISATEUR ORDER BY EVENEMENT.DateEvenement', function (err, results, fields) {
      if (err) console.log('Error request events')
      res.json(results)
    })
  })
})

app.post('/my_events', function (req, res) {
  var input = req.body
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('SELECT * FROM EVENEMENT NATURAL JOIN POST NATURAL JOIN UTILISATEUR WHERE Id_UTILISATEUR = ? ORDER BY EVENEMENT.DateEvenement', [idUser], function (err, results, fields) {
      if (err) console.log('Error request my_events')
      res.json(results)
    })
  })
})

app.post('/connexion', function (req, res) {
  var input = req.body
  var email = input.email
  var password = input.password

  db.database.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('SELECT * FROM UTILISATEUR WHERE Email = ?', [email], function (error, results, fields) {
      if (error) throw error
      if (results.length > 0) {
        if (password === results[0].Password) {
          req.session.key = results[0].Id_UTILISATEUR
          req.session.email = results[0].Email
          req.session.nom = results[0].Nom
          req.session.prenom = results[0].Prenom
          req.session.imageProfil = results[0].ImageProfil
          res.json(
            {
              auth: 'success',
              key: req.session.key,
              prenom: req.session.prenom,
              nom: req.session.nom,
              email: req.session.email,
              imageProfil: req.session.imageProfil
            }
          )
        } else {
          res.json(
            {
              auth: 'failed',
              error: 'Mot de passe incorrect'
            }
          )
        }
      } else {
        res.json({ auth: 'failed', error: 'Email incorrect' })
      }
    })
  })
})

app.post('/inscription', function (req, res) {
  var input = req.body
  var email = input.email
  var password = input.password
  var prenom = input.prenom
  var nom = input.nom
  var imageProfil = input.imageProfil

  db.database.getConnection(function (err, connection) {
    if (err) throw err

    var utilisateur = {
      Email: email,
      Password: password,
      Prenom: prenom,
      Nom: nom,
      ImageProfil: imageProfil
    }

    connection.query('INSERT INTO UTILISATEUR SET ?', utilisateur, function (error, results, fields) {
      if (error) {
        res.json(
          {
            auth: 'failed',
            error: 'L\'inscription a échoué'
          }
        )
      } else {
        req.session.key = results.insertId
        req.session.email = email
        req.session.nom = nom
        req.session.prenom = prenom
        req.session.imageProfil = imageProfil
        res.json(
          {
            auth: 'success',
            key: req.session.key,
            prenom: req.session.prenom,
            nom: req.session.nom,
            imageProfil: req.session.imageProfil
          }
        )
      }
    })
  })
})

app.post('/add_event', function (req, res) {
  var input = req.body
  var titre = input.titre
  var resume = input.resume
  var dateEvent = input.dateEvent
  var adresse = input.adresse
  var latitude = input.latitude
  var longitude = input.longitude
  var idUser = input.idSession
  var dateCreation = input.longitude

  db.database.getConnection(function (err, connection) {
    if (err) throw err

    var event = {
      Titre: titre,
      Password: resume,
      DateEvenement: dateEvent,
      Adresse: adresse,
      Latitude: latitude,
      Longitude: longitude
    }

    connection.query('INSERT INTO EVENEMENT SET ?', event, function (error, results, fields) {
      if (error) {
        res.json(
          {
            auth: 'failed',
            error: 'La creation de l\'evenement a échoué'
          }
        )
      } else {
        var post = {
          Id_EVENEMENT: results.insertId,
          Id_UTILISATEUR: idUser,
          DateCreation: dateCreation
        }

        connection.query('INSERT INTO POST SET ?', post, function (error, results, fields) {
          if (error) {
            res.json(
              {
                auth: 'failed',
                error: 'Le post a échoué'
              }
            )
          } else {
            res.json(
              {
                auth: 'failed',
                error: 'Le post a échoué'
              }
            )
          }
        })
      }
    })
  })
})

app.post('/participate', function (req, res) {
  var input = req.body
  var idUtilisateur = input.idSession
  var idEvenement = input.idEvent

  db.database.getConnection(function (err, connection) {
    if (err) throw err

    var participe = {
      Id_UTILISATEUR: idUtilisateur,
      Id_EVENEMENT: idEvenement
    }

    connection.query('INSERT INTO PARTICIPE SET ?', participe, function (error, results, fields) {
      if (error) {
        res.json(
          {
            auth: 'failed',
            error: 'La participation a échoué'
          }
        )
      } else {
        res.json(
          {
            auth: 'success'
          }
        )
      }
    })
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
