const express = require('express');
const app = express();
var bodyParser = require('body-parser');

require('dotenv').config();

var cors = require('cors');
app.use(cors());

require('./api/routes/page.router')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/routes/home.router')(app);

console.log("Start main server port: "+process.env.PORT);
app.listen(process.env.PORT);