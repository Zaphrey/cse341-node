const express = require("express");
const bodyParser = require("body-parser")
const db = require("./database/mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use("/", require("./routes/index"));
// require("./connection").main()

db.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server is listning at port ${port}`);
})