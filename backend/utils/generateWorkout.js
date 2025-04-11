// backend/utils/generateWorkout.js

const exerciseLibrary = [
    'Push-ups',
    'Air Squats',
    'Sit-ups',
    'Burpees',
    'Pull-ups',
    'Deadlifts',
    'Kettlebell Swings',
    'Box Jumps',
    'Wall Balls',
    'Double Unders',
    'Push Press',
    'Rowing (calories)',
    'Running (meters)',
    'Dumbbell Snatches',
    'Handstand Push-ups',
  ]
  
  const wodNames = [
    'The Grinder',
    'Sweat Storm',
    'Iron Inferno',
    'Burpee Madness',
    'Core Crusher',
    'Beast Mode',
    'WODzilla',
    'Pain Train',
    'The Finisher',
    'No Mercy',
  ]
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
  
  export function generateWorkout() {
    const title = wodNames[Math.floor(Math.random() * wodNames.length)]
    const rounds = getRandomInt(2, 5)
    const selectedExercises = getRandomItems(exerciseLibrary, getRandomInt(3, 5))
  
    const exercises = [`${rounds} rounds for time:`]
    selectedExercises.forEach((exercise) => {
      const reps = getRandomInt(10, 30)
      exercises.push(`${reps} ${exercise}`)
    })
  
    return {
      title,
      exercises,
    }
  }