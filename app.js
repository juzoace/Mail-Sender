const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

const db = 'mongodb://localhost:27017/Mailer';
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => { 
    console.log(`Unable to connect with the database ${err}`)
});

// Load the models
require('./models/user');


// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Json Body Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

// Setting up static directories
// app.use(express.static(path.join(__dirname, 'public')));

// Bring in the Users route
app.use(require('./routes'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

