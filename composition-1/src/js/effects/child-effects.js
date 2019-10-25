import { counter } from '../components/child-program'

/**
 * @typedef {import('../types').State} State
 */

/**
 * Message to send from view.
 * We'll use this to replace the default send function
 * implemented above in the counter child program.
 * @param {{type: string, data: import('../types').Message}} message
 */
export const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

/**
 * Capture the state of child program to be used by its parent.
 * Notice the braces. That's because init returns a tuple: [state, effect].
 * @type {State}
 */
const counterState = counter.init()

/**
 * Here we define the parent's init.
 * We could also do this in the program itself.
 * @type {() => State}
 */
export const init = () => counterState
