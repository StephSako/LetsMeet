const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
var db = require('./db')

const app = express()

app.use(session({
  secret: 'mariynmanson',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
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

app.get('/api/events', function (req, res) {
  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }
    connection.query('SELECT * FROM EVENEMENT NATURAL JOIN POST NATURAL JOIN UTILISATEUR ORDER BY EVENEMENT.DateEvenement', function (err, results, fields) {
      connection.release()
      if (err) console.log('Error request events')
      res.json(results)
    })
  })
})

app.post('/api/my_events', function (req, res) {
  var input = req.body
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }
    connection.query('SELECT Titre, DateEvenement, Id_EVENEMENT, Adresse, Resume, (SELECT GROUP_CONCAT(Prenom, \' \' , Nom))  AS Participants , Longitude, Latitude FROM UTILISATEUR NATURAL JOIN PARTICIPE NATURAL JOIN EVENEMENT WHERE Id_EVENEMENT IN (SELECT Id_EVENEMENT FROM POST NATURAL JOIN EVENEMENT WHERE Id_Utilisateur = ?) GROUP BY Id_EVENEMENT ORDER BY DateEvenement', [idUser], function (err, results, fields) {
      connection.release()
      if (err) console.log('Error request my_events')
      res.json(results)
    })
  })
})

app.post('/api/my_participations', function (req, res) {
  var input = req.body
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }
    connection.query('SELECT * FROM UTILISATEUR NATURAL JOIN POST NATURAL JOIN EVENEMENT WHERE Id_EVENEMENT IN ( SELECT Id_EVENEMENT FROM PARTICIPE NATURAL JOIN EVENEMENT WHERE Id_UTILISATEUR = ? ) ORDER BY DateEvenement', [idUser], function (err, results, fields) {
      connection.release()
      if (err) console.log(err)
      res.json(results)
    })
  })
})

app.post('/api/connexion', function (req, res) {
  var input = req.body
  var email = input.email
  var password = input.password

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }
    connection.query('SELECT * FROM UTILISATEUR WHERE Email = ?', [email], function (error, results, fields) {
      connection.release()
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
        res.json({ auth: 'failed', error: 'Cet email n\'est pas enregistré' })
      }
    })
  })
})

app.post('/api/inscription', function (req, res) {
  var input = req.body
  var email = input.email
  var password = input.password
  var prenom = input.prenom
  var nom = input.nom
  var imageProfil = input.imageProfil

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    connection.query('SELECT * FROM UTILISATEUR WHERE Email = ?', [email], function (error, results, fields) {
      if (error) throw error
      if (results.length === 0) {
        var utilisateur = {
          Email: email,
          Password: password,
          Prenom: prenom,
          Nom: nom,
          ImageProfil: imageProfil
        }

        connection.query('INSERT INTO UTILISATEUR SET ?', utilisateur, function (error, results, fields) {
          connection.release()
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
      } else {
        res.json({ auth: 'failed', error: 'Cet email est déjà pris' })
      }
    })
  })
})

app.post('/api/add_event', function (req, res) {
  var input = req.body
  var titre = input.titre
  var resume = input.resume
  var dateEvent = input.dateEvent
  var adresse = input.adresse
  var latitude = input.latitude
  var longitude = input.longitude
  var idUser = input.idSession
  var dateCreation = input.dateCreation

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    var event = {
      Titre: titre,
      Resume: resume,
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
          connection.release()
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
                auth: 'success'
              }
            )
          }
        })
      }
    })
  })
})

app.post('/api/participate', function (req, res) {
  var input = req.body
  var idUtilisateur = input.idSession
  var idEvenement = input.idEvent

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    var participe = {
      Id_UTILISATEUR: idUtilisateur,
      Id_EVENEMENT: idEvenement
    }

    connection.query('INSERT INTO PARTICIPE SET ?', participe, function (error, results, fields) {
      connection.release()
      if (error) {
        console.log(error)
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

app.post('/api/update_event', function (req, res) {
  var input = req.body
  var titre = input.titre
  var resume = input.resume
  var dateEvent = input.dateEvent
  var adresse = input.adresse
  var latitude = input.latitude
  var longitude = input.longitude
  var idEvent = input.idEvent

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    var event = {
      Titre: titre,
      Resume: resume,
      DateEvenement: dateEvent,
      Adresse: adresse,
      Latitude: latitude,
      Longitude: longitude
    }

    connection.query('UPDATE EVENEMENT SET ? WHERE Id_EVENEMENT = ?', [event, idEvent], function (error, results, fields) {
      connection.release()
      if (error) {
        console.log(error)
        res.json(
          {
            auth: 'failed',
            error: 'La mise à jour de l\'évènement a échoué'
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

app.post('/api/update_account', function (req, res) {
  var input = req.body
  var nom = input.nom
  var prenom = input.prenom
  var email = input.email
  var imageProfil = input.imageProfil
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    var user = {
      Nom: nom,
      Prenom: prenom,
      Email: email,
      ImageProfil: imageProfil
    }

    connection.query('UPDATE UTILISATEUR SET ? WHERE Id_UTILISATEUR = ?', [user, idUser], function (error, results, fields) {
      connection.release()
      if (error) {
        console.log(error)
        res.json(
          {
            auth: 'failed',
            error: 'La mise à jour du compte a échoué'
          }
        )
      } else {
        req.session.email = email
        req.session.nom = nom
        req.session.prenom = prenom
        req.session.imageProfil = imageProfil
        res.json(
          {
            auth: 'success'
          }
        )
      }
    })
  })
})

app.post('/api/get_account', function (req, res) {
  var input = req.body
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    connection.query('SELECT * FROM UTILISATEUR WHERE Id_UTILISATEUR = ?', [idUser], function (error, results, fields) {
      connection.release()
      if (error) {
        console.log(error)
        res.json(
          {
            auth: 'failed',
            error: 'La requete de get account a échoué'
          }
        )
      } else {
        req.session.email = results[0].Email
        req.session.nom = results[0].Nom
        req.session.prenom = results[0].Prenom
        req.session.imageProfil = results[0].ImageProfil
        res.json(
          {
            auth: 'success',
            prenom: req.session.prenom,
            nom: req.session.nom,
            imageProfil: req.session.imageProfil,
            email: req.session.email
          }
        )
      }
    })
  })
})

app.post('/api/delete_event', function (req, res) {
  var input = req.body
  var idEvent = input.idEvent

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log('ERROR 0 : ' + err)
      throw err
    }

    connection.query('DELETE FROM POST WHERE Id_EVENEMENT = ?', [idEvent], function (error, results, fields) {
      if (error) {
        console.log('ERROR 1 : ' + error)
        res.json(
          {
            auth: 'failed',
            error: 'La suppression du post a échoué'
          }
        )
      } else {
        connection.query('DELETE FROM PARTICIPE WHERE Id_EVENEMENT = ?', [idEvent], function (error, results, fields) {
          if (error) {
            console.log('ERROR 2 : ' + error)
            res.json(
              {
                auth: 'failed',
                error: 'La suppression de la participation a échoué'
              }
            )
          } else {
            connection.query('DELETE FROM EVENEMENT WHERE Id_EVENEMENT = ?', [idEvent], function (error, results, fields) {
              connection.release()
              if (error) {
                console.log('ERROR 3 : ' + error)
                res.json(
                  {
                    auth: 'failed',
                    error: 'La suppression de l\'évènement a échoué'
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
          }
        })
      }
    })
  })
})

app.post('/api/delete_participation', function (req, res) {
  var input = req.body
  var idEvent = input.idEvent
  var idUser = input.idSession

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    connection.query('DELETE FROM PARTICIPE WHERE Id_EVENEMENT = ? AND Id_UTILISATEUR = ?', [idEvent, idUser], function (error, results, fields) {
      connection.release()
      if (error) {
        res.json(
          {
            auth: 'failed',
            error: 'La suppression de la participation a échoué'
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

app.post('/api/update_password', function (req, res) {
  var input = req.body
  var idUser = input.idSession
  var actualPassword = input.actualPassword
  var newPassword = input.newPassword

  db.database.getConnection(function (err, connection) {
    if (err) {
      console.log(err.code)
      throw err
    }

    connection.query('SELECT * FROM UTILISATEUR WHERE Id_UTILISATEUR = ?', [idUser], function (error, results, fields) {
      if (error) throw error

      if (results.length > 0) {
        if (actualPassword === results[0].Password) {
          var user = {
            Password: newPassword
          }

          connection.query('UPDATE UTILISATEUR SET ? WHERE Id_UTILISATEUR = ?', [user, idUser], function (error, results, fields) {
            connection.release()
            if (error) {
              res.json(
                {
                  auth: 'failed',
                  error: 'La mise à jour du mot de passe à échoué'
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
        } else {
          res.json(
            {
              auth: 'failed',
              error: 'Mot de passe actuel incorrect'
            }
          )
        }
      } else {
        res.json({ auth: 'failed', error: 'error search account update password' })
      }
    })
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
