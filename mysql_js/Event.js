var db = require('./db');

var Event = {
    getevents: function(callback)
    {
        return db.query('SELECT * FROM EVENEMENT NATURAL JOIN UTILISATEUR', callback);
    }
}

module.exports = Event;