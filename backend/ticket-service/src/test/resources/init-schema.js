// creating the event_database database as our target database
db = db.getSiblingDB('ticket_database');

// create a new user with the username test_container and password test_container. This user is granted read and write permissions for the event database
db.createUser({
    user: 'test_container',
    pwd: 'test_container',
    roles: [
        { role: 'readWrite', db: 'ticket_database' }
    ]
});

// insert event data into container database
db.ticket.insertOne({
   key: {
    eventID: "1",
    eventDateID: "eventDate1",
    section: "112",
    row: "A",
    seatNumber: 1
   },
   user: "Peter Pan",
   category: "CAT1",
   orderId: "1",
   orderDateTime: "2023-11-01T00:00:00"
});
