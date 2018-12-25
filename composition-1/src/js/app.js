import { h, render, run } from '@composi/core'

// Define a counter program.
// This will be consumed by another program.
// For that reason the view does not render
// the component, it just returns it
const counter = {
  init() {
    // State is an integer to count
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
    // Increment the state
    return [state + 1]
  }
}

// Message to send from view.
// We'll use this to replace the default send function
// implemented above in the counter child program.
const counterMessage = message => ({
  type: 'counterMessage',
  data: message
})

// Capture the state of child program to be used by its parent.
// Notice the braces. That's because init returns a tuple: [state, effect].
const [counterState] = counter.init()

// Here we define the parent's init.
// We could also do this in the program itself.
const init = () => [counterState]

// Define parent view, which also consumes child counter program.
// Here we do one important thing. We hijack the send function
// of the child component, replacing it with `counterMessage`. 
// That way when the user clicks the counter, 
// it executes `counterMesage` instead of send,
// which gets intercepted by the parent.
function ParentView({ state, send }) {
  return (
    <div class='parent-program'>
      <h2>This is the parent program.</h2>
      <p>The child state is: <strong class='parent'>{state}</strong>.</p>
      {
        // Use child program's view.
        // Supply it with hijacked message to update its state.
        counter.view(state, message => send(counterMessage(message)))
      }
    </div>
  )
}

const CounterProgram = {
  // Here init is actually the function we defined above to capture the state of the child counter program.
  init,

  view(state, send) {
    render(<ParentView {...{ state, send }} />, 'section')
  },

  // Here we capture the state of the child through its update method.
  // We need to do that here so that when we return,
  // the parent and child both get re-rendered.
  update(state, message) {
    if (message.type === 'counterMessage') {
      const [newCounterState] = counter.update(state)
      return [newCounterState]
    }
  }
}

// Run the program:
run(CounterProgram)