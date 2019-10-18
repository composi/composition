import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { counter } from './components/child-program'
import { counterMessage, init } from './effects/child-effects'
import { ParentComponent } from './components/parent-component'

render(<Title message='Parent to Child Communication'/>, 'header')

const CounterProgram = {
  // We use the init function that we defined above to set the initial state for the program.
  init,

  // Here the view consumes the child program's view
  view(state, send) {
    render(
      <ParentComponent {...{ state, send, counter, init }}/>
      , '.parent-program'
    )
  },

  // Here we capture the update details of the child.
  // We need to do that here so that when we return,
  // the parent and child both get re-rendered.
  update(state, message, send) {
    if (message.type === 'counterMessage') {
      const newCounterState = counter.update(state, message)
      // const newState = mergeObjects(state, {counterState: newCounterState })
      return newCounterState
    }
  }
}

// Run the program:
run(CounterProgram)
