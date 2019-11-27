import {h, render} from '@composi/core'
import {counter} from './child-program'
import {maxValueReached, counterMessage, MAX_VALUE} from '../effects'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Program} Program
 */

/**
 * Create init function for parent program using child program's state.
 * @type {() => State}
 */
const init = () => counter.init()

/**
 * @type {Program}
 */
export const CounterProgram = {
  // Here we're using the init function defined above to pass in state from child component.
  init,

  /**
   * Here the view consumes the child program's view.
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    render(
      <div class='parent-program'>
        <h2>This is the parent program.</h2>
        <p>The maximum value for the child program is: {MAX_VALUE}.</p>
        {
          // Use child program's view.
          // Supply it with hijacked message to update its state.
          counter.view(state, message => send(counterMessage(message)))
        }
      </div>
      , '.parent-program'
    )
  },

  /**
   * Here we capture the update details of the child.
   * We need to do that here so that when we return,
   * the parent and child both get re-rendered.
   * @param {State} state
   * @param {Message} message
   * @param {Send} send
   */
  update(state, message, send) {
    if (message.type === 'counterMessage') {
      /** @type {State} */
      const newCounterState = counter.update(state, message.data, send)
      if (maxValueReached(newCounterState)) {
        alert(`You've reached the maximum allowed value for this counter, which is ${MAX_VALUE}.`)
        // New state is too high, so return original state:
        return state
      } else {
        // Return incremented state.
        return newCounterState
      }
    }
  }
}
