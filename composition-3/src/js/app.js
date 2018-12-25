import { h, render, run } from '@composi/core'

const MAX_VALUE = 5

// Helper function to determine max value for state.
// This will get used by child counter and an effect.
function maxValueReached(state) {
  return state > MAX_VALUE
}

// Define a counter program.
// This will be consumed by another program.
// For that reason the view does not render
// the component, it just returns it
const counter = {
  // State is an integer to count
  init() {
    return [0]
  },
  view(state, send) {
    // No need to render this component.
    // Just return it for the parent to render.
    return (
      <div class='child-container'>
        <h4>Child program</h4>
        <p>The count is: <strong>{state}</strong>.</p>
        <button class='counter-btn' onclick={() => send()}>Increment</button>
      </div>
    )
  },
  update(state, message) {
    return [state + 1] // Increment the state
  }
}

// Effect
const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

// Capture the state and effect of program to be used by its parent:
const [counterState] = counter.init()
const init = () => [{ counterState }]


const CounterProgram = {
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
      let newState = { ...state, counterState: newCounterState }
      if (maxValueReached(newCounterState)) {
        alert(`You've reached the maximum allowed value for this counter, which is ${MAX_VALUE}.`)
        newState = { ...state, counterState: newCounterState }
        // State is too high, so return original state:
        return [state]
      } else {
        return [newState]
      }
    }
  }
}

// Run program:
run(CounterProgram)