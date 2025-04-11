import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { generateWorkout } from './utils/generateWorkout.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Mongoose Model
const workoutSchema = new mongoose.Schema({
  title: String,
  exercises: [String],
})

const Workout = mongoose.model('Workout', workoutSchema)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🟢 MongoDB connected')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('🔴 MongoDB connection error:', err)
  })

// GET workouts
app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

// POST workouts (valgfri – hvis du vil indsætte manuelt)
app.post('/api/workouts', async (req, res) => {
  try {
    const newWorkout = new Workout(req.body)
    await newWorkout.save()
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(500).json({ error: 'Failed to save workout' })
  }
})

// Midlertidig seed-route
app.post('/api/workouts/seed', async (req, res) => {
  try {
    await Workout.deleteMany({}) // ryd databasen først

    const seedWorkouts = [
      {
        title: 'The Grinder',
        exercises: [
          'AMRAP 20 minutes:',
          '5 Deadlifts (100/70kg)',
          '10 Burpee Box Jumps',
          '15 Wall Balls (9/6kg)',
        ],
      },
      {
        title: 'Burpee Inferno',
        exercises: [
          'For time:',
          '50 Burpees',
          '40 Air Squats',
          '30 Push-ups',
          '20 Sit-ups',
          '10 Pull-ups',
        ],
      },
      {
        title: 'Sweat Storm',
        exercises: [
          '5 rounds for time:',
          'Run 400m',
          '20 Kettlebell Swings (24/16kg)',
          '15 Goblet Squats',
        ],
      },
      {
        title: 'Engine Builder',
        exercises: [
          'EMOM 12 minutes:',
          'Minute 1: 15 Cal Row',
          'Minute 2: 12 Dumbbell Snatches (alt. arm)',
          'Minute 3: 10 Toes-to-Bar',
        ],
      },
      {
        title: 'Barbell Bash',
        exercises: [
          'For time:',
          '21-15-9',
          'Thrusters (42.5/30kg)',
          'Pull-ups',
        ],
      },
      {
        title: 'Core Meltdown',
        exercises: [
          '3 rounds for quality:',
          '1 min Plank Hold',
          '20 V-Ups',
          '15 Russian Twists (each side)',
          '10 Hollow Rocks',
        ],
      },
      {
        title: 'Cardio Crusher',
        exercises: [
          'For time:',
          'Run 1km',
          '50 Air Squats',
          'Run 1km',
          '50 Jumping Lunges',
        ],
      },
    ]

    await Workout.insertMany(seedWorkouts)
    res.status(200).json({ message: 'Seed data inserted!' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert seed data' })
  }
})

// Route: Generer en ny WOD dynamisk
app.get('/api/workouts/random', (req, res) => {
  const workout = generateWorkout()
  res.json(workout)
})