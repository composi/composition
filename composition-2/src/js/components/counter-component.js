import { h } from '@composi/core'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('../types').VNode} VNode
 */
export function Counter({ state, send }) {
  return (
    <div class='child-container'>
      <h4>Child program</h4>
      <p>The count is: <strong>{state}</strong>.</p>
      <button class='counter-btn' onclick={() => send()}>Increment</button>
    </div>
  )
}
