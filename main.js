import React from 'react'
import { render } from 'react-dom'
import { znMessage } from './post-rpc'
import { useSubscription } from './hooks';

const App = props => {
  useSubscription('item', item => console.log('event:', item))

  return <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: '100vh'
  }}>
    <p>Hey! Full page stuff!</p>
    <button onClick={e => znMessage('Hey!', 'saved', 1000)}>Trigger Events!</button>
  </main>
}

render(<App />, document.getElementById('app'))
