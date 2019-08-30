import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, client, znMessage } from './post-rpc'
import { useSubscription } from './hooks';

const App = props => {
  const [bg, setBg] = useState('green')

  useSubscription('item', item => console.log('item:', item))

  return <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: bg,
        color: 'white'
      }}
      onClick={e => {
        znConfirm(`Want to make the button ${bg === 'green' ? 'red' : 'green'}?`, (firstArg, secondArg) => {
          console.log('firstArg', firstArg)
          console.log('secondArg', secondArg)
        })
        // .then((firstArg, secondArg) => (console.log('firstSuccessArg', firstArg) || console.log('secondSuccessArg', secondArg)))
        // .catch((firstArg, secondArg) => (console.log('firstErrArg', firstArg) || console.log('secondErrArg', secondArg)))
      }}
    >
      Callback!
    </button>
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: bg,
        color: 'white'
      }}
      onClick={e => {
        znConfirm(`Want to make the button ${bg === 'green' ? 'red' : 'green'}?`)
          .then((firstArg, secondArg) => {
            console.log('firstSuccessArg', firstArg)
            console.log('secondSuccessArg', secondArg)
          })
          .catch((firstArg, secondArg) => {
            console.log('firstErrArg', firstArg)
            console.log('secondErrArg', secondArg)
          })
        znMessage('button click', 'error')
      }}
    >
      Promise!
    </button>
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))

  // .then(() => setBg(bg === 'green' ? 'red' : 'green'))

