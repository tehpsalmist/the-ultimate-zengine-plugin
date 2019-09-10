import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage } from './post-rpc'
import { useSubscription, useRequestMoreRoom } from './hooks'
import { sizer } from './resizer'

const App = props => {
  const [bg, setBg] = useState('green')

  useSubscription('item', item => console.log('item:', item))

  useEffect(() => {
    sizer.autoSize()
  })

  return <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
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
        znConfirm(`Want to make the buttons ${bg === 'green' ? 'red' : 'green'}?`, (err, yes) => yes && setBg(bg === 'green' ? 'red' : 'green'))
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
          .then(yes => yes && setBg(bg === 'green' ? 'red' : 'green'))
        znMessage('button click', 'saved')
      }}
    >
      Promise!
    </button>
    Hey There!
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
