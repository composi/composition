export const MAX_VALUE = 5

// Helper function to determine max value for state.
// This will get used by child counter and an effect.
export function maxValueReached(state) {
  return state > MAX_VALUE
}

// Effect
export const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})
