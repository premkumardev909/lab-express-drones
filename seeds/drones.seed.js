const mongoose = require('mongoose');
const Drone = require('../models/Drone.model'); // Import the Drone model

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

mongoose
  .connect('mongodb://127.0.0.1:27017/droneApp') // Connect to your MongoDB
  .then(() => {
    console.log('Connected to the database');
    return Drone.create(drones); // Seed the drones into the database
  })
  .then((createdDrones) => {
    console.log(`Seeded ${createdDrones.length} drones.`);
    return mongoose.connection.close(); // Close the connection
  })
  .catch((err) => {
    console.error('Error seeding drones:', err);
  });
