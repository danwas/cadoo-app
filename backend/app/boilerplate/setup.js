require('better-logging')(console);
const express = require("express");
const http = require("http");
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const path = require('path');
var cors = require('cors')

module.exports = () => {
    const app = express();
    const server = http.Server(app);
    const io = require('socket.io').listen(server);

    // Setup express
    app.use((req, res, next) => {
        // Logs each incoming request
        console.info(`${req.ip} ${req.path} ${req.body || ''}`);
        next();
    });
    app.use(express.json() /*
        This is a middleware, provided by express, that parses the body of the request into a javascript object.
        It's basically just replacing the body property like this:
        req.body = JSON.parse(req.body)
    */);
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, '..', '..', '..', 'build')) /*
        express.static(absolutePathToPublicDirectory)
        This will serve static files from the public directory, starting with index.html
    */);

    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(path.join(__dirname, '..', '..', '..', 'build'), '/'));
    //  });

    app.use(cors());

    // Setup session
    const session = expressSession({
        secret: `
        If you chose to use this boilerplate for your own project then you should really: 
        1. Change this string to something obscure, like the MD5 hash of your favorite poem.
        2. Put that string in its own separate file.
        `,
        resave: true,
        saveUninitialized: true,
    });
    app.use(session);
    io.use(sharedSession(session));

    return {
        app, io,
        listen: (port, cb) => server.listen(port, cb)
    }
}