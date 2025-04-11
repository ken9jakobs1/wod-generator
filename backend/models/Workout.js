// backend/models/Workout.js
import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  exercises: {
    type: [String],
    required: true
  }
})

export default mongoose.model('Workout', workoutSchema)