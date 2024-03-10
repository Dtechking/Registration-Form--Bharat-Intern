const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

mongoose.connect("mongodb+srv://darshanthekingmaker:abcd12345@registrationform.5zqmacl.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    phone_no: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/reg_form.html');
});

app.post("/register", (req, res) => {
    const { fname, lname, phone_no, email, password } = req.body;

    const newUser = new User({
        fname,
        lname,
        phone_no,
        email,
        password
    });

    console.log(newUser);

    newUser.save()
    .then(savedUser => {
        res.json(savedUser);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});