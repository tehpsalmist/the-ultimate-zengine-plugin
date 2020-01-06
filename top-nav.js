import React from 'react'
import { render } from 'react-dom'
import { useSubscription } from './hooks'

export const App = props => {
  useSubscription('routeChange', (stuff) => {
    console.log('route', stuff)
  })

  useSubscription('locationChange', (stuff) => {
    console.log('location', stuff)
  })

  return <div>Hey</div>
}

render(<App />, document.getElementById('app'))
