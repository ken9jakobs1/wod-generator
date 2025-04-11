import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

// Hent alle workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tilføj en ny workout
router.post('/', async (req, res) => {
  const { title, exercises } = req.body;

  const workout = new Workout({ title, exercises });

  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;