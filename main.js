import React, { useCallback, useState } from 'react'
import { render } from 'react-dom'
import { znMessage, znPluginData } from './post-rpc'
import { useSubscription, useAppContext } from './hooks'

znMessage('wut wut')

const App = props => {
  useSubscription('zn-data-form-records-saved', item => console.log('event:', item))
  useSubscription('zn-ui-record-overlay-record-loaded', item => console.log('loaded:', item))
  const [count, setCount] = useState(0)

  const appContextReceiver = useCallback((err, data) => {
    if (err) return console.error('data err:', err)
    console.log('data!', data)
  }, [])

  useAppContext(appContextReceiver)

  const backendFunc = () => {
    znPluginData('ultimate-plugin', 'get', '/service')
      .then(result => {
        console.log(result)
      })
  }

  return <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: '100vh'
  }}>
    <p>Hey! Full page stuff!</p>
    <button onClick={e => znMessage('Hey!', 'saved', 1000)}>Trigger Events!</button>
    <button onClick={e => backendFunc()}>Hit the Backend!</button>
    <button onClick={e => setCount(count + 1)}>Increment: {count}</button>
  </main>
}

render(<App />, document.getElementById('app'))
