import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, znToolTip, client, znDropdown } from './post-rpc'
import { useSubscription, useRequestMoreRoom } from './hooks'
import { sizer } from './resizer'

const App = props => {
  const [bg, setBg] = useState('green')
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const confirmButtonRef = useRef()
  const dropdownButtonRef = useRef()

  useEffect(() => {
    Promise.all([
      client.call({ method: 'context' }),
      client.call({ method: 'context' }),
      client.call({ method: 'context' }),
      client.call({ method: 'context' }),
      client.call({ method: 'context' }),
      client.call({ method: 'context' })
    ])
      .then(res => console.log(res.map(r => !!r)))
      .catch(err => console.error(err))
    sizer.autoSize()
  })

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
      ref={confirmButtonRef}
      onMouseEnter={e => {
        znToolTip(confirmButtonRef, 'open a modal!', 'top', 2000)
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
      }}
    >
      Change Colors
    </button>
    <button
      ref={dropdownButtonRef}
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
        if (dropdownIsOpen) return

        setDropdownIsOpen(true)
        znDropdown({
          side: 'top',
          src: '/dropdown.html',
          events: [
            { name: 'background-update', listening: true },
            { name: 'log-to-console', listening: true, sending: true }
          ]
        }, dropdownButtonRef)
          .then(result => {
            console.log('closed:', result)
            setDropdownIsOpen(false)
          })
      }}
    >
      Open Dropdown
    </button>
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
