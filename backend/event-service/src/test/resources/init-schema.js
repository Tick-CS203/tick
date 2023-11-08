// creating the event_database database as our target database
db = db.getSiblingDB('event_database');

// create a new user with the username test_container and password test_container. This user is granted read and write permissions for the event database
db.createUser({
    user: 'test_container',
    pwd: 'test_container',
    roles: [
        { role: 'readWrite', db: 'event_database' }
    ]
});

// insert event data into container database
db.event.insertOne({
    eventID: "1",
    name: "name_1",
    description: "description_1",
    ticketLimit: 5,
    date: [],
    venueID: "national_stadium",
});
