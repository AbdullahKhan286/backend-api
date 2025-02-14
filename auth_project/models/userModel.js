const Datastore = require('nedb-promises');

const db = Datastore.create({
    filename: './database.db',
    autoload: true
});

module.exports = db;
