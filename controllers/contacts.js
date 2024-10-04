const mongodb = require("../database/mongodb");

const getDocuments = (req, res) => {
    console.log(req.params.id)
    let result = mongodb.getDb().db("cse341").collection("contacts").find();

    result.toArray().then(lists => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(lists);
    });
}

const getDocument = (req, res) => {
    console.log(req.params.id)
    let result = mongodb.getDb().db("cse341").collection("contacts").find({ id: Number(req.params.id) });
    result.toArray().then(lists => {
        if (lists.length > 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(lists[0]);
        }
        else {
            res.status(400).send("Could not find user")
        }
    })
}

const addDocument = async (req, res) => {
    // Declare our data variables to be added to the document.
    let allDocuments = await mongodb.getDb().db("cse341").collection("contacts").find().sort({ "id": -1 }).toArray();
    let userId = 1

    if (allDocuments.length > 0) {
        // Increment the largest user id by 1 to get the new users id:
        userId += allDocuments[0].id
    }

    // I understand that this method is susceptible to duplicate ids,
    // but I'm not really sure of how to tackle that problem quite yet.
    // So for now, data just needs to be inputted carefully to ensure
    // that no duplicate ids get added to the database.

    let fName = req.query.fName;
    let lName = req.query.lName;
    let email = req.query.email;
    let favoriteColor = req.query.favoriteColor;
    let birthday = req.query.birthday;
    console.log(userId)

    if (fName && lName && email && favoriteColor && birthday) {
        let userData = {
            id: userId,
            fName: fName,
            lName: lName,
            email: email,
            favoriteColor: favoriteColor,
            birthday: birthday
        };

        mongodb.getDb().db("cse341").collection("contacts").insertOne(userData)
        res.status(201).send(`New user created. ID: ${userId}`);
    } else {
        res.status(400).send("Missing parameter content")
    };
};

const updateDocument = (req, res) => {
    let userData = mongodb.getDb().db("cse341").collection("contacts").find({ id: Number(req.params.id) });

    userData.toArray().then(lists => {
        if (lists.length > 0) {
            // Create a dictionary to store our compatible values
            let dataToUpdate = {};

            // Get the user data and compare the data to the request,
            // if the key matches, add the data to the query:
            for (const key in req.query) {
                if (lists[0].hasOwnProperty && key !== "id" && key !== "_id") {
                    dataToUpdate[key] = req.query[key];
                }
            }

            mongodb.getDb().db("cse341").collection("contacts").findOneAndUpdate({ id: lists[0].id }, { $set: dataToUpdate })

            res.status(204).send("Updated contact successfully");
        }
        else {
            res.status(400).send("Could not find user")
        };
    });
};

const removeDocument = (req, res) => {
    let userData = mongodb.getDb().db("cse341").collection("contacts").find({ id: Number(req.params.id) });
    (userData.toArray().then(lists => {
        console.log(lists)

        for (data in lists) {
            mongodb.getDb().db("cse341").collection("contacts").deleteOne({ id: Number(req.params.id) });
            res.status(200).send("Successfully deleted contact")
            return;
        }

        res.status(400).send("Could not delete contact")
    }))
}

module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    removeDocument,
}