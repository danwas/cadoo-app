const express = require('express');
const router = express.Router();
const { v4: uuidV4 } = require('uuid');

const currentRooms = [
  { 
    roomID: "1", 
    topic: "Chess", 
    description: "General discussion on Magnus Carlsen and Hikaru Nakamura and of course the new Netflix series Queens Gambit!", 
    image: '../images/chess.png'
  },
  { 
    roomID: "2", 
    topic: "Horse trotting with Patrik", 
    description: "We discuss the upcoming trotting race @ Solvalla, Sweden.", 
    image: "../images/trav.png" 
  },
  { 
    roomID: "3", 
    topic: "Spanish for beginners", 
    description: "Hablas Espanol? Join us and improve your Spanish!", 
    image: "../images/spanska.png"
  },
  { 
    roomID: "4", 
    topic: "Anything!", 
    description: "I am alone for the evening and would love someone to talk to about anything. Maybe we can enjoy a good ol' whiskey together", 
    image: "../images/chess.png"
  },
]

const plannedRooms = [
  { 
    roomID: "0",
    topic: "OUTER SPACE", 
    description: "Did you see the comet Neowise?? It was amazing! Please only join if you are truly interested in space. I myself is a researcher at NASA and will do my best to answer any questions.", 
    image: "../images/chess.png",
    date: "Thursday",
    time: "18:00"
  },
  { 
    roomID: "1", 
    topic: "US Presidential election", 
    description: "How did you vote? Want to share your opinion on the election? Will Trump agree to leave the White House? Will Kamela Harris become the first female president?", 
    image: "../images/chess.png",
    date: "Thursday",
    time: "21:00"
  },
  { 
    roomID: "2", 
    topic: "Warhammer fanatics", 
    description: "I will show you my latest Warhammers. Today I will unbox and build my latest addition to my collection. As usual I want you to join in on the painting selection.", 
    image: "../images/chess.png",
    date: "Friday",
    time: "19:00"
  },
  { 
    roomID: "3", 
    topic: "Horse trotting with Patrik", 
    description: "We discuss the upcoming trotting race @ Solvalla, Sweden. I have been betting on horses for more than 27 years. I have a pretty decent accuracy if you ask me. My current favourite for Saturday's V75 is Ängsborken. I have really liked what he has done lately.", 
    image: "../images/trav.png",
    date: "Saturday",
    time: "14:45"
  },
  { 
    roomID: "4", 
    topic: "Pizza course", 
    description: "Pizza course by a professional pizza baker - me. Today we will be bake the perfect pizza bottom! Bring your own ingredients!", 
    image: "../images/chess.png",
    date: "Saturday",
    time: "20:00"
  },
  { 
    roomID: "5", 
    topic: "What's your favourite indoor plants?", 
    description: " We begin to discuss on Mostera Variegata, and then continue through mine and your favourites. Of course I will be shaaring one of my secret tricks. Show me your green fingers!", 
    image: "../images/chess.png",
    date: "Saturday",
    time: "20:00"
  },
  { 
    roomID: "6", 
    topic: "Book club - Nobel Prize laureate of the week", 
    description: "Until Sunday we have read Olga Tokarczuk's 'Flights'. We will as usual begin with a short recap of last weeks discussion, which in this case is on Mario Vargas Llosa. ", 
    image: "../images/chess.png",
    date: "Sunday",
    time: "13:00"
  },
  { 
    roomID: "7", 
    topic: "Sunday Premier League", 
    description: "As usual! This Sunday offers four exciting games, where the highlighted one of course will be Man City - Liverpool starting at 17:30 GMT.", 
    image: "../images/chess.png",
    date: "Sunday",
    time: "13:00"
  },
  { 
    roomID: "8", 
    topic: "Berit's knitting circle", 
    description: "Knitting together and talking about whatever we like. I am currently creating a yellow cardigan in lambswool for my little grandson Marcus.", 
    image: "../images/chess.png",
    date: "Sunday",
    time: "16:00"
  },
  { 
    roomID: "9", 
    topic: "THIS WEEK'S NETFLIX SERIES", 
    description: "This week we have all BINCHED 'The Haunting of Hill House'. Scary? What really happened in the third episode. I have a few clips that I will show for EXTRA deep discussion.", 
    image: "../images/chess.png",
    date: "Sunday",
    time: "20:00"
  },
 
]



router.get('/currentRooms', async (req, res) => {
  res.json({ rooms : currentRooms })
});

router.get("/plannedRooms", async (req, res) => {
  res.json({ rooms: plannedRooms })
});


router.post('/login', async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  // Store in database? Check if username & password match? ==> log user in

  // if logged in; succes = true else false
  res.json({
    success: true
  })

});


module.exports = router;
// Allt nedan kan tas bort men nice att ha kvar för lite js syntax
// Allt nedan kan tas bort men nice att ha kvar för lite js syntax
// Allt nedan kan tas bort men nice att ha kvar för lite js syntax


// router.post('/login', async (req, res) => {
//   var user = await model.getUser(req.body.username, req.body.password);

//   if (user) {
//     // Send response
//     res.json({success: true, message: 'SUCCESS!!'});
//   } else {
//     // Send response
//     res.json({success: false, message: 'Incorrect username or password'});
//   }
// });

// // Return specific users bookings
// router.post('/userBookings', async (req, res) => {
//   let bookings = await model.getUserBookings(req.body.user);
//   res.json(bookings);
// });

// // Return all admins
// router.get('/getAdmin', async (req, res) => {
//   let users = await model.getUsers();
//   let user_info = await model.getUsersInfo();

//   // Send response
//   res.json({ adminList: users, userInfo: user_info });
// });

// // Return bookings for specific date
// router.post('/date', async (req, res) => {
//   let staticTimeSlotsCopy = staticTimeSlots.slice();
//   let bookedTimeSlots = await model.getBookings(req.body.data.dateString);

//   // If no bookings exist at a given date
//   if (bookedTimeSlots.length === 0) {
//     // Send response
//     res.json(staticTimeSlotsCopy);

//     // Remove the bookings from the time slots
//   } else {
//     for (let i = 0; i < bookedTimeSlots.length; i++) {
//       let booked_start = bookedTimeSlots[i].time_start;
//       let booked_end = bookedTimeSlots[i].time_end;
//       let booked_room = bookedTimeSlots[i].roomID;
//       for (let j = 0; j < staticTimeSlotsCopy.length; j++) {
//         let avail_start = staticTimeSlotsCopy[j].time_start;
//         let avail_end = staticTimeSlotsCopy[j].time_end;
//         let avail_room = staticTimeSlotsCopy[j].roomID;
//         if (booked_start == avail_start && booked_end == avail_end && booked_room == avail_room) {
//           staticTimeSlotsCopy.splice(j, 1);
//         }
//       }
//     }
//     // Send response
//     res.json(staticTimeSlotsCopy);
//   }
// });

// // When user enter "My bookings"
// router.post('/userData', async (req, res) => {
//   let data = await model.getUserInfo(req.body.user);

//   // Send response
//   res.json(data);
// });


// router.get('/noteboard', async(req,res) => {
//   const note = await model.getNoteboard();
//   var data = [];
//   for ( var i=0 ; i < note.length ; i++ ){
//     var object = { id: note[i].id, userID: note[i].userID, message: note[i].message, time: note[i].time};
//     data.push(object)
//   }
//   // await model.clear()
//   res.json({ list: data });
// });


// //gets req from CommentScreen.js
// router.post('/log', async (req, res) => {
//   const logs = await model.getLog(req.body.data.id);
//   var data = [];
//   for ( var i=0 ; i < logs.length ; i++ ){
//     var log = { noteID: logs[i].noteID, poster: logs[i].poster, comment: logs[i].comment }
//     data.push(log)
//   }
//   res.json({ list: data })

// });
