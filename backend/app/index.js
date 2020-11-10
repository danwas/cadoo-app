const setupBoilerplate = require('./boilerplate/setup.js');

const { app, io, listen } =  setupBoilerplate();
const port = 8000;


// Bind REST controller to '/'*
const router = require('./controllers/rest.controller.js');
app.use('/api', router);

// Registers socket.io controller
const socketController = require('./controllers/socket.controller.js');
io.on('connection', socket => {
    socketController(socket, io);
});

listen(port, () => {
  console.log("server listening on port", port);
});
