const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

class User {
    constructor(username, email, id){
        this.username = username;
        this.email = email;
        this._id = id ? new ObjectId(id) : null
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = 
                db.collection('users')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('users').insertOne(this); 
        }
        return dbOp
        .then( result => {
            console.log("Result: " + result);
        })
        .catch( err => {
            console.log(err);
        });
    
    }

    static findUser(userId){
        const db = getDb();
        return db.collection('users').findOne({ _id: new ObjectId(userId)})
        .then( result => {
            console.log("User found!");
        })
        .catch( err => {
            console.log(err);
        })
    }
}

module.exports = User;