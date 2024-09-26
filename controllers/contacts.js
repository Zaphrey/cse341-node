const mongodb = require("../database/mongodb");

const getDocument = (req, res) => {
    let id = Number(req.query.id)
    console.log(id)

    if (id == id) {
        let result = mongodb.getDb().db("cse341").collection("contacts").find({ _id: req.query.id });
        result.toArray().then(lists => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send(lists);
        })
    } else {
        res.send(`Invalid query parameter: id = ${req.query.id}, ${id}`);
        res.status(400);
    }
}

const getAllDocuments = (req, res) => {
    let result = mongodb.getDb().db("cse341").collection("contacts").find();
    result.toArray().then(lists => {
        res.setHeader("Content-Type", "application/json");
        res.send(lists);
    })
}

module.exports = {
    getDocument,
    getAllDocuments,
}