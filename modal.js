import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, rpcClient, autoSize } from '@zenginehq/zengine-sdk'
import { useSubscription, useRequestMoreRoom } from './hooks'

const App = props => {
  const [parentBg, setParentBg] = useState('purple')

  useSubscription('log-to-console', item => console.log('modal log:', item))
  useSubscription('close', item => console.log('close log:', item))
  useSubscription('something-else', item => console.log('something else log:', item))

  useEffect(() => {
    autoSize()
  })

  const context = () => {
    rpcClient.call({ method: 'context' })
      .then(console.log)
  }

  return <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}
  >
    <label style={{ width: '100%' }}>
      Main Background Color:
      <input onChange={e => setParentBg(e.target.value)} value={parentBg} />
    </label>
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'blue',
        color: 'white'
      }}
      onClick={e => {
        rpcClient.call({ method: 'child-to-parent', args: { key: 'log-to-console', payload: 'a message from the modal' } })
      }}
    >
      Log stuff to the consoles!
    </button>
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'blue',
        color: 'white'
      }}
      onClick={e => {
        rpcClient.call({ method: 'child-to-parent', args: { key: 'background-update', payload: parentBg } })
        rpcClient.call({ method: 'child-to-parent', args: { key: 'something-else', payload: 'yo something else' } })
      }}
    >
      Change Main Background Color
    </button>
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'red',
        color: 'white'
      }}
      onClick={e => {
        rpcClient.call({ method: 'close', args: { key: 'close', payload: {} } })
      }}
    >
      Close
    </button>
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
