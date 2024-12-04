const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model'); 
// GET /drones - List all drones
router.get('/drones', async (req, res, next) => {
  try {
    const drones = await Drone.find(); 
    res.render('drones/list', { drones }); 
  } catch (err) {
    console.error('Error fetching drones:', err);
    next(err);
  }
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form'); 
});

router.post('/drones/create', async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body; 
    await Drone.create({ name, propellers, maxSpeed }); 
    res.redirect('/drones'); 
  } catch (err) {
    console.error('Error creating drone:', err);
    res.render('drones/create-form', { error: 'Failed to create drone' }); 
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id); 
    res.render('drones/update-form', { drone }); 
  } catch (err) {
    console.error('Error fetching drone for edit:', err);
    next(err);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body; 
    await Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed }); 
    res.redirect('/drones'); 
  } catch (err) {
    console.error('Error updating drone:', err);
    res.render('drones/update-form', { error: 'Failed to update drone' }); 
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones'); 
  } catch (err) {
    console.error('Error deleting drone:', err);
    next(err);
  }
});

module.exports = router;
