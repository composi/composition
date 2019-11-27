import {h} from '@composi/core'
import {counterMessage} from '../effects/child-effects'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').Program} Program
 * @param {{state: State, send: Send, counter: Program}} props
 * @returns {import('../types').VNode} VNode
 */
export function ParentComponent({state, send, counter}) {
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
