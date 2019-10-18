import { h } from '@composi/core'
import { Counter } from './child-component'

// Define a counter program.
// This will be consumed by another program.
// For that reason the view does not render
// the component, it just returns it
export const counter = {
  // State is an integer to count
  init() {
    return 0
  },
  view(state, send) {
    // No need to render this component.
    // Just return it for the parent to render.
    return (
      <Counter {...{state, send}}/>
    )
  },
  update(state, message, send) {
    // Increment the state
    state += 1
    return state
  }
}
