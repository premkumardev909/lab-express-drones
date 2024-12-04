// Iteration #1
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const droneSchema = new Schema({
  name: { type: String, required: true },
  propellers: { type: Number, required: true },
  maxSpeed: { type: Number, required: true }
});

const Drone = model('Drone', droneSchema);

module.exports = Drone;
