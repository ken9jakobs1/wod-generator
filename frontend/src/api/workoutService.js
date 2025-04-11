const API_BASE_URL = 'https://wod-generator.onrender.com'

export async function fetchWorkouts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/workouts`)
    if (!response.ok) throw new Error('Failed to fetch workouts')
    return await response.json()
  } catch (err) {
    console.error('API error:', err)
    return []
  }
}