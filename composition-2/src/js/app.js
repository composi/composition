import { h, render, run } from '@composi/core'

// Define a counter program.
// This will be consumed by another program.
// For that reason the view does not render
// the component, it just returns it
const counter = {
  init() {
    // Initial value for child counter:
    return [66]
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
    // Increment the state
    return [state + 1]
  }
}

// Counter message to use:
const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

// Set the initial state for program to be used by its parent:
const [counterState] = [145]

// Define init function for parent program, capturing child program's state:
const init = () => [{ counterState }]

const CounterProgram = {
  // We use the init function that we defined above to set the initial state for the program.
  init,

  // Here the view consumes the child program's view
  view(state, send) {
    render(
      <div class='parent-program'>
        <h2>This is the parent program.</h2>
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
      const newState = { ...state, counterState: newCounterState }
      return [newState]
    }
  }
}

// Run the program:
run(CounterProgram)