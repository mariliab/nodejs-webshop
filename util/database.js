const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://MaryLee:' + process.env.MONGODB_DATABASE_PASSWORD + '@nodejscompleteguide.9f4ka.mongodb.net/NodeJScompleteguide?retryWrites=true&w=majority')
    .then( client => {
        console.log("Connected to mongo db!");
        _db = client.db();
        callback();
    })
    .catch( err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;