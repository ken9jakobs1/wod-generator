import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String, // fx "cardio", "strength", "bodyweight"
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise