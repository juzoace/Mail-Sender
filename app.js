const express = require("express");

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());

// Bring in the Users route
app.use(require('./routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

