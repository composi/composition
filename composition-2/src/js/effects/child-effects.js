/**
 * @typedef {import('../types').State} State
 */

/**
 * Counter message to use.
 * @param {{type: string, data: import('../types').Message}} message
 */
export const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

/**
 * Set the initial state for program to be used by its parent.
 * @type {State}
 */
const counterState = 145

/**
 * Define init function for parent program, capturing child program's state.
 * @type {() => State}
 */
export const init = () => counterState
