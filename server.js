const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/mongodb");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;
// require("./connection").main()

db.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "https://cse341-node-hjxg.onrender.com");
            res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
            next();
        });
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use("/", require("./routes/index"));

        app.listen(port, () => {
            console.log(`Server is listening at port ${port}`);
        })
    }
});