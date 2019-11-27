import {h, render, run} from '@composi/core'
import {Title} from './components/title'
import {CounterProgram} from './components/parent-program'


render(<Title message='Child to Parent Communication' />, 'header')


// Run program:
run(CounterProgram)
