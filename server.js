const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var routes = require('./routes/index');
var config = require('./config');
var port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('secretKey', config.secret);
app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started on port `+port);
});