const express = require("express");
const app = express();

const PORT = 3000;

app.use("/", require("./routes/index"));

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT || PORT}`);
})