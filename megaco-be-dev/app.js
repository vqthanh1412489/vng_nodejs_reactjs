// External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Internal Dependencies
const DefaultRoutes = require('./config/DefaultRoutes');
const MongoConfig = require('./config/MongoConfig');
// Main app
const app = express();

// Express configuration
// app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Database setup
mongoose.connect(MongoConfig.CONNECTION_STRING, {
    useNewUrlParser: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error!'));
db.once('open', () => {
    console.log("[MongoDB] Connected!");
})

// Main APIs
app.use(DefaultRoutes.BASE_URL, require('./routes'));


/// 404 Error
app.use((_req, res) => {
    let err = new Error('Not Found');
    err.status = 404;

    res.send("404 NOT FOUND");
});

// Start server

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const port = normalizePort(process.env.PORT || '3000');

const server = app.listen(process.env.PORT || port, function () {
    console.log(`[PORT:${server.address().port}] Server is running...`);
});
