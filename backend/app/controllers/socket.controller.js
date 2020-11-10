// const model = require('../model.js');

const rooms = {};
const rooms_new = {};
const socketToRoom = {};


module.exports = (socket, io) => {

    socket.on("create-room", ({ roomID, description, name, topic, participants_num }) => {
        rooms_new[roomID] = {
            participants: [socket.id],
            participantsNum: participants_num,
            topic: topic,
            description: description,
            createdBy: name,
        }
        socketToRoom[socket.id] = roomID;

        const usersInThisRoom = rooms[roomID].filter(id => id !== socket.id);
        socket.emit("all-users", usersInThisRoom);
    });

    socket.on("join-room", ({ roomID, name }) => {
        if (rooms[roomID]) {
            const length = rooms[roomID].length;
            if (length === 8) {
                socket.emit("room-full");
                return;
            }
            rooms[roomID].push({ id: socket.id, name: name });
        } else {
            rooms[roomID] = [{ id: socket.id, name: name }];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = rooms[roomID].filter(participants => participants.id !== socket.id);
        socket.emit("all-users", usersInThisRoom);
    });

    socket.on("sending-signal", payload => {
        io.to(payload.userToSignal).emit('user-joined', { name: payload.name, signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning-signal", payload => {
        io.to(payload.callerID).emit('receiving-returned-signal', { name: payload.name, signal: payload.signal, id: socket.id });
    });


    socket.on("disconnect-button", () => {
        const roomID = socketToRoom[socket.id];
        let room = rooms[roomID];
        if (room) {
            room = room.filter(participants => participants.id !== socket.id);
            rooms[roomID] = room;
        }
        socket.broadcast.emit("user-left", socket.id);
        //socket.disconnect();
    });

    socket.on("disconnect", () => {
        const roomID = socketToRoom[socket.id];
        let room = rooms[roomID];
        if (room) {
            room = room.filter(participants => participants.id !== socket.id);
            rooms[roomID] = room;
        }
        socket.broadcast.emit("user-left", socket.id);
        //socket.disconnect();
    });

};


// Allt nedan kan tas bort men nice att ha kvar för lite js syntax
// Allt nedan kan tas bort men nice att ha kvar för lite js syntax
// Allt nedan kan tas bort men nice att ha kvar för lite js syntax

//   // User joins room
//   socket.on('join', async req => {
//     const room = req.room;
//     socket.join(room);
//     io.to(room).emit('join', req);
//   });

//   socket.on('update', async req => {
//     var room = req.data.roomID;
//     var booked_by = req.user;
//     var time_start = req.data.time_start;
//     var time_end = req.data.time_end;
//     var time_date = req.date;

//     // Add a booking
//     await model.addBooking(room, booked_by, time_date, time_start, time_end);

//     // Emit to others in same room
//     io.to(time_date).emit('update', req);
//   });

//   /*
//   * When user removes a booking
//   */
//   socket.on('removeBooking', async req => {
//     var user = req.data.booked_by;
//     var booking_id = req.data.slotID;

//     // remove booking
//     await model.removeBooking(booking_id);

//     // Emit to room
//     io.to(user).emit('removeBooking', req);
//   });

//   /*
//   * When admin removes a user
//   */
//   socket.on('removeUser', async req => {
//     var user_id = req.data;

//     // remove booking
//     await model.removeUser(user_id);

//     // Emit to room
//     io.to('admin').emit('removeUser', req);
//   });

//   /*
//   * When admin adds a user
//   */
//   socket.on('addUser', async req => {
//     var user_id = req.email;
//     var password = req.password;
//     var firstname = req.firstname;
//     var lastname = req.lastname;
//     var appartment = parseInt(req.appartment);

//     // remove booking
//     await model.addUser(user_id, password);
//     await model.addUserInfo(user_id, lastname, firstname, appartment)

//     // Emit to room
//     io.to('admin').emit('addUser', req);
//   });

// // timeOut server side
// function startTimer(req) {
//   setTimeout(async function() {
//     let timeslot = await model.getTimeslot(req.time_id);
//
//     if (timeslot.booked_by === 'RESERVED') {
//       await model.updateBooking(req.time_id, null);
//       io.sockets.emit('update', req);
//     }
//   }, 20000);
// };
//
// // admin removes a booking
// socket.on('removeBooking', async function(req) {
//   await model.removeBooking(req.time_id);
//   io.sockets.emit('update', req);
// });
//
// // admin removes a time slot
// socket.on('removeTimeSlot', async function(req) {
//   await model.removeTimeSlot(req.time_id);
//   io.sockets.emit('update', req);
// });
//
// // user adds a time slot
//   socket.on('addBooking', async function(req) {
//   await model.addTimeSlot(req.time, req.assistant_id);
//   io.sockets.emit('update', req);
// });
//
// // user updates a booking for confirmed or reserved
// socket.on('update', async function(req) {
//   await model.updateBooking(req.time_id, req.booked_by);
//   io.sockets.emit('update', req);
//   startTimer(req);
// });
