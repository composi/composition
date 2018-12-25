import { h } from '@composi/core'

export function Title({greeting}) {
  return (
    <nav>
      <h1 class="header--main">Hello, {greeting}!</h1>
    </nav>
  )
}
