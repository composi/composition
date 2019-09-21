import { h, render } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { counter } from './child-program'
import { maxValueReached, counterMessage, MAX_VALUE } from '../effects'


// Capture the state of program to be used by its parent:
const [counterState] = counter.init()

// Create init function for parent program using child program's state:
const init = () => [{ counterState }]


export const CounterProgram = {
  // Here we're using the init function defined above to pass in state from child component.
  init,

  // Here the view consumes the child program's view
  view(state, send) {
    render(
      <div class='parent-program'>
        <h2>This is the parent program.</h2>
        <p>The maximum value for the child program is: {MAX_VALUE}.</p>
        {
          // Use child program's view.
          // Supply it with hijacked message to update its state.
          counter.view(state.counterState, message => send(counterMessage(message)))
        }
      </div>
      , 'section'
    )
  },

  // Here we capture the update details of the child.
  // We need to do that here so that when we return,
  // the parent and child both get re-rendered.
  update(state, message) {
    if (message.type === 'counterMessage') {
      const [newCounterState] = counter.update(state.counterState, message.data)
      let newState = mergeObjects(state, { counterState: newCounterState })
      if (maxValueReached(newCounterState)) {
        alert(`You've reached the maximum allowed value for this counter, which is ${MAX_VALUE}.`)
        // New state is too high, so return original state:
        return [state]
      } else {
        // Return incremented state.
        return [newState]
      }
    }
  }
}
