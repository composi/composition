import { h } from '@composi/core'
import { counterMessage } from '../effects/child-effects'
import { counter } from './child-program'

/**
 * Define parent view, which also consumes child counter program.
 * Here we do one important thing. We hijack the send function
 * of the child component, replacing it with `counterMessage`.
 * That way when the user clicks the counter,
 * it executes `counterMesage` instead of send,
 * which gets intercepted by the parent.
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('../types').VNode} VNode
 */
export function ParentView({ state, send }) {
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
