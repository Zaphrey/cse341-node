const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.DB_URL);

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("Database is already initialized!");
        return callback(null, _db);
    };

    client.connect(process.env.DB_URL)
        .then(client => {
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error("Db not initialized.")
    };

    return _db;
}

module.exports = {
    initDb,
    getDb,
}