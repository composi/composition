import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { counter } from './components/child-program'
import { init } from './effects/child-effects'
import { ParentView } from './components/parent-program'

render(<Title message='Parent Renders Child'/>, 'header')

const CounterProgram = {
  // Here init is actually the function we defined above to capture the state of the child counter program.
  init,

  view(state, send) {
    render(<ParentView {...{ state, send }} />, '.parent-program')
  },

  // Here we capture the state of the child through its update method.
  // We need to do that here so that when we return,
  // the parent and child both get re-rendered.
  update(state, message) {
    if (message.type === 'counterMessage') {
      const newCounterState = counter.update(state)
      return newCounterState
    }
  }
}

// Run the program:
run(CounterProgram)
