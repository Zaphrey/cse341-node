const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Zachary Humphreys");
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT || PORT}`);
})