import {h} from '@composi/core'
import {Counter} from './child-component'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Program} Program
 */

/**
 * Define a counter program.
 * This will be consumed by another program.
 * For that reason the view does not render
 * the component, it just returns it
 * @type {Program}
 */
export const counter = {
  // State is an integer to count
  init() {
    return 0
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    // No need to render this component.
    // Just return it for the parent to render.
    return (
      <Counter {...{state, send}} />
    )
  },
  /**
   * @param {State} state
   * @param {Message} message
   * @param {Send} send
   */
  update(state, message, send) {
    // Increment the state
    state += 1
    return state
  }
}
