
// Counter message to use:
export const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

// Set the initial state for program to be used by its parent:
const [counterState] = [145]

// Define init function for parent program, capturing child program's state:
export const init = () => [{ counterState }]
