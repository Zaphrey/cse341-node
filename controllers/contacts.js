const mongodb = require("../database/mongodb");

const getDocuments = (req, res) => {
    let id = Number(req.query.id)

    if (id == id) {
        let result = mongodb.getDb().db("cse341").collection("contacts").find({ _id: req.query.id });
        result.toArray().then(lists => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send(lists[0]);
        })
    } else {
        let result = mongodb.getDb().db("cse341").collection("contacts").find();
        result.toArray().then(lists => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send(lists);
        })
    }
}

module.exports = {
    getDocuments,
}