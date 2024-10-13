const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

// Get all players (sorted by points descending)
router.get('/', async (req, res) => {
   try {
      const players = await Player.find().sort({ points: -1 });
      res.json(players);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// Add a new player
router.post('/', async (req, res) => {
   const player = new Player({
      name: req.body.name,
      points: req.body.points,
   });
   try {
      const newPlayer = await player.save();
      res.status(201).json(newPlayer);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Update player points
router.put('/:id', async (req, res) => {
   try {
      const player = await Player.findById(req.params.id);
      if (!player) return res.status(404).json({ message: 'Player not found' });

      player.points = req.body.points;
      const updatedPlayer = await player.save();
      res.json(updatedPlayer);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

module.exports = router;
