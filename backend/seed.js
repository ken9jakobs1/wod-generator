// backend/seed.js

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Workout from './models/Workout.js'

dotenv.config()

const exercisesPool = [
  'Push-ups', 'Air Squats', 'Burpees', 'Sit-ups', 'Lunges',
  'Pull-ups', 'Box Jumps', 'Wall Balls', 'Deadlifts', 'Kettlebell Swings',
  'Double Unders', 'Handstand Push-ups', 'Row 500m', 'Run 1km',
  'Push Press', 'Thrusters', 'Jumping Jacks', 'Mountain Climbers'
]

const wodNames = [
  'Beast Mode', 'Sweat Storm', 'Iron Jungle', 'Burpee Inferno',
  'Core Crusher', 'Full Throttle', 'Grit Grind', 'Pain Train',
  'The Grinder', 'No Mercy'
]

function getRandomExercises(count) {
  const shuffled = [...exercisesPool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateWorkouts(amount = 10) {
  const wods = []
  for (let i = 0; i < amount; i++) {
    const title = wodNames[Math.floor(Math.random() * wodNames.length)] + ` #${i + 1}`
    const type = ['For time:', 'AMRAP 20 min:', '5 RFT:', 'EMOM 10:'][Math.floor(Math.random() * 4)]
    const exercises = [type, ...getRandomExercises(3 + Math.floor(Math.random() * 3))]
    wods.push({ title, exercises })
  }
  return wods
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await Workout.deleteMany()
    console.log('🗑️ Cleared old workouts')

    const workouts = generateWorkouts(15)
    await Workout.insertMany(workouts)

    console.log('🌱 Seeded workouts:')
    workouts.forEach(w => console.log(`→ ${w.title}`))

    process.exit()
  } catch (err) {
    console.error('❌ Error seeding data:', err)
    process.exit(1)
  }
}

seedDatabase()