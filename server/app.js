require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
const router = require("./router/routes")

//mongodb connection
const PORT = process.env.port || 8000;

mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const database = mongoose.connection;
database.once("connected", () => {
    console.log(`mongodb compass connected successfully`);
});
database.on("error", (error) => {
    console.log(error);
});

//middleware
app.use(express.json())
app.use(cors());

app.use(router);
app.get("/", (req, res) => {
    res.send();
})

app.listen(PORT, () => console.log(`on at port ${PORT}`));


