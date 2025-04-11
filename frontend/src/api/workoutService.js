const API_URL = 'http://localhost:5000/api/workouts'

export async function fetchWorkouts() {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Failed to fetch workouts')
    return await response.json()
  } catch (err) {
    console.error('API error:', err)
    return []
  }
}