import { h } from '@composi/core'


export function Counter({state, send}) {
  return (
    <div class='child-container'>
      <h4>Child program</h4>
      <p>The count is: <strong>{state}</strong>.</p>
      <button class='counter-btn' onclick={() => send()}>Increment</button>
    </div>
  )
}
