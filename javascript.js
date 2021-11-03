//test 1
//html managing
document.getElementById("add").style.display = "none";
document.getElementById("quit").style.display = "none";

function showAdd(){
    document.getElementById("quit").style.display = "none";
    document.getElementById("add").style.display = "block";
}
function showQuit(){
    document.getElementById("add").style.display = "none";
    document.getElementById("quit").style.display = "block";
}



class Hotel{
    constructor(id, name, address, n_rooms){
        this.id = id;
        this.name = name;
        this.address = address;
        this. n_rooms = n_rooms;
    }
}

class Client{
    constructor(id, name, surname, phone, room_id){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this. phone = phone;
        this.room_id = room_id;
    }
}


//Rooms
var n_rooms = prompt("Number of rooms");
var h = new Hotel(1, "Hotel", "Avenue n°1", n_rooms);
var rooms = [];
var clients = [];
var bookings = [];
var bookings_updated = [];

var typesOfRoom = ["Single", "Double", "Suit", "Familiar"];

for(let i=0; i<h.n_rooms; i++){
    let room_id = i;
    let typeOf = typesOfRoom[Math.floor(Math.random() * 4)];
    let floor = Math.trunc(i/20)+1;
    var room = {"id":room_id, "typeOf":typeOf, "floor":floor, "rented":0};
    JSONroom = JSON.stringify(room);
    rooms.push(JSONroom);
}

for(let i=0; i<n_rooms; i++){
    var parsedRooms = JSON.parse(rooms[i]);
    console.log("ID: "+ parsedRooms.id);
    console.log("Type of: " + parsedRooms.typeOf);
    console.log("Floor: " + parsedRooms.floor);
    console.log("\n");
}

//Clients
/////////////////////
function clientInfo(){
    let client_id = document.getElementById("idClient").value;
    let client_name = document.getElementById("name").value;
    let client_surname = document.getElementById("surname").value;
    let client_phone = document.getElementById("phone").value;
    let room_id = document.getElementById("idRoom").value;

    if(Number(room_id)<Number(n_rooms) && Number(room_id) > -1 && checkRoomRented(room_id, 1)){
        var client = new Client(client_id, client_name, client_surname, client_phone, room_id);
        var JSONClient = JSON.stringify(client);
        clients.push(JSONClient);
        booking(client.id, client.room_id);
    }
    else
        console.log("Room already rented");
}

function checkRoomRented(room_id, bookOrQuit){
    JSRoom = JSON.parse(rooms[room_id]);
    if((JSRoom.rented == 0 && bookOrQuit==1) || (JSRoom.rented == 1 && bookOrQuit == 0))
        return 1;
    else
        return 0;
}
/////////////////////

//Booking

function booking(clientId, roomId){
    let room = JSON.parse(rooms[roomId]).id;
    let booking = {"idRoom":room, "idClient":clientId};
    let JSONBooking = JSON.stringify(booking);
    bookings[roomId] = (JSONBooking);

    changeReservationStatus(roomId, 1);
}

function updateBookings(){
    bookings_updated = [];
    for(let i=0; i<bookings.length; i++){
        if(bookings[i] != "cancelled")
            bookings_updated.push(bookings[i]);
    }
}

var variable_ = 5;

//////////////

//cancel reservation

function quit(){
    let idQuit = document.getElementById("idQuit").value;
    if(Number(idQuit)<Number(n_rooms) && Number(idQuit) > -1 && checkRoomRented(idQuit, 0))
        changeReservationStatus(idQuit, 0);
    else
        console.log("Room not available");
}

function changeReservationStatus(roomId, zeroOrOne){
    let changeRented = JSON.parse(rooms[roomId]);
    changeRented.rented = zeroOrOne;
    JSONChangeRented = JSON.stringify(changeRented);
    rooms[roomId] = JSONChangeRented;
    if(zeroOrOne==0)
        bookings.splice(roomId, 1, "cancelled");    
    updateBookings();
    printBookings();
}

function printBookings(){
    console.log("\nBookings:");
    for(let i of bookings_updated)
        console.log(i);
}