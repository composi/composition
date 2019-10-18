import { counter } from '../components/child-program'


// Message to send from view.
// We'll use this to replace the default send function
// implemented above in the counter child program.
export const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

// Capture the state of child program to be used by its parent.
// Notice the braces. That's because init returns a tuple: [state, effect].
const counterState = counter.init()

// Here we define the parent's init.
// We could also do this in the program itself.
export const init = () => counterState
