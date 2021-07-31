const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let rooms = [];
let customer = [];

//Create a room
app.post("/create", (req, res) => {
	req.body.id = rooms.length + 1;
	rooms.push(req.body);
	res.json({
		message: "Room created successfully",
	});
});

//Book a room
app.post("/booking", (req, res) => {
	let roomsBooked = 0;
	for (let i = 0; i < rooms.length; i++) {
		if (!rooms[i].isBooked) {
			req.body.room = rooms[i].Room;
			rooms[i].isBooked = true;
			rooms[i].Customer = req.body.Name;
			rooms[i].Date = req.body.Date;
			rooms[i].startTime = req.body.startTime;
			rooms[i].endTime = req.body.endTime;
			roomsBooked++;
			break;
		}
	}
	if (roomsBooked === rooms.length) {
		res.json({
			message: "All rooms are full",
		});
	}
	customer.push(req.body);
	res.json({
		message: "Room booked successfully",
	});
});

//List all rooms
app.get("/rooms", (req, res) => {
	res.json(rooms);
});

//List all customers
app.get("/customers", (req, res) => {
	res.json(customer);
});

app.listen(port);
