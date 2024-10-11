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
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use("/", require("./routes/index"));

        app.listen(port, () => {
            console.log(`Server is listening at port ${port}`);
        })
    }
});