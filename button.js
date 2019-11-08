import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, znToolTip, client } from './post-rpc'
import { useSubscription, useRequestMoreRoom } from './hooks'
import { sizer } from './resizer'

const App = props => {
  const [bg, setBg] = useState('green')
  const callbackButtonRef = useRef()

  useSubscription('item', item => console.log('item:', item))

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
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}
  >
    <button
      ref={callbackButtonRef}
      onMouseEnter={e => {
        znToolTip(callbackButtonRef, 'open a modal!', 'top', 2000)
      }}
      onMouseLeave={e => {
        client.call({ method: 'closeTooltip' })
      }}
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
        znConfirm(`<script>alert('oops!')</script>Want to make the buttons ${bg === 'green' ? 'red' : 'green'}?`, (err, yes) => yes && setBg(bg === 'green' ? 'red' : 'green'))
        context()
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
