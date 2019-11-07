import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, client } from './post-rpc'
import { useSubscription, useRequestMoreRoom } from './hooks'
import { sizer } from './resizer'

const App = props => {
  const [parentBg, setParentBg] = useState('purple')

  useSubscription('log-to-console', item => console.log('modal log:', item))
  useSubscription('close', item => console.log('close log:', item))
  useSubscription('something-else', item => console.log('something else log:', item))

  useEffect(() => {
    sizer.autoSize()
  })

  const context = () => {
    client.call({ method: 'context', timeout: 60000 })
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
        client.call({ method: 'log-to-console', args: { payload: 'a message from the modal' } })
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
        client.call({ method: 'background-update', args: { payload: parentBg } })
        client.call({ method: 'something-else', args: { payload: 'yo something else' } })
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
        client.call({ method: 'close', args: { payload: {} } })
      }}
    >
      Close
    </button>
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
