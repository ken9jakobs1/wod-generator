import express from 'express'
import Workout from '../models/Workout.js'

const router = express.Router()

// Route til at indsætte eksempel-workouts
router.get('/seed', async (req, res) => {
  try {
    await Workout.deleteMany()

    const sampleWorkouts = [
      {
        title: "WOD 1",
        exercises: ["10 Push-ups", "10 Air Squats", "10 Sit-ups"],
      },
      {
        title: "WOD 2",
        exercises: ["5 Pull-ups", "10 Push Press", "15 Box Jumps"],
      },
      {
        title: "WOD 3",
        exercises: ["Run 1km", "50 Burpees", "Run 1km"],
      },
    ]

    await Workout.insertMany(sampleWorkouts)

    res.status(201).json({ message: 'Seed data inserted' })
  } catch (err) {
    res.status(500).json({ message: 'Error inserting seed data', error: err })
  }
})

// Route til at hente alle workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workouts', error: err })
  }
})

export default router