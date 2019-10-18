import { h } from '@composi/core'
import { counterMessage } from '../effects/child-effects'

export function ParentComponent({ state, send, counter }) {
  return (
    <div class='parent-program'>
      <h2>This is the parent program.</h2>
      {
        // Use child program's view.
        // Supply it with hijacked message to update its state.
        counter.view(state, message => send(counterMessage(message)))
      }
    </div>
  )
}
