import { h } from '@composi/core'
import { Counter } from './counter-component'

// Define a counter program.
// This will be consumed by another program.
// For that reason the view does not render
// the component, it just returns it
export const counter = {
  init() {
    // Initial value for child counter:
    return [66]
  },
  view(state, send) {
    // No need to render this component.
    // Just return it for the parent to render.
    return (
      <Counter {...{state, send}}/>
    )
  },
  update(state, msg) {
    // Increment the state
    return [state + 1]
  }
}
