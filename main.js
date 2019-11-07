import React, { useCallback, useState } from 'react'
import { render } from 'react-dom'
import { znMessage, znPluginData, znModal, client } from './post-rpc'
import { useSubscription, useAppContext, useLocationTest } from './hooks'

znMessage('wut wut')

const App = props => {
  const [backgroundColor, setBGColor] = useState('purple')
  const [count, setCount] = useState(0)

  useSubscription('background-update', color => setBGColor(color))
  useSubscription('log-to-console', item => {
    console.log('log:', item)
    client.call({
      method: 'log-to-console',
      args: {
        payload: 'Successfully logged in both consoles!'
      }
    })
  })

  // const appContextReceiver = useCallback((err, data) => {
  //   if (err) return console.error('data err:', err)
  //   console.log('data!', data)
  // }, [])

  // useAppContext(appContextReceiver)
  // useLocationTest()

  const modalFunc = () => {
    znModal({
      src: '/modal.html', events: [
        { key: 'background-update', listening: true },
        { key: 'log-to-console', listening: true, sending: true }
      ]
    })
      .then(result => {
        console.log('closed:', result)
      })

    setTimeout(() => {
      client.call({ method: 'close-modal' })
    }, 2000)
  }

  return <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    height: '100vh'
  }}>
    <p>Hey! Full page stuff!</p>
    <button onClick={e => znMessage('Hey!', 'saved', 1000)}>Trigger Events!</button>
    <button onClick={e => modalFunc()}>Open a Modal!</button>
    <button onClick={e => setCount(count + 1)}>Increment: {count}</button>
  </main>
}

render(<App />, document.getElementById('app'))
