import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, rpcClient, znMessage, znFiltersPanel, autoSize } from '@zenginehq/zengine-sdk'
import { useSubscription, useRequestMoreRoom } from './hooks'

const App = props => {
  const [bg, setBg] = useState('green')
  const [longer, setLonger] = useState(false)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const confirmButtonRef = useRef()
  const dropdownButtonRef = useRef()

  useEffect(() => {
    autoSize()
  }, [])

  // useSubscription('background-update', color => setBGColor(color))
  // useSubscription('log-to-console', item => {
  //   console.log('log:', item)
  //   client.call({
  //     method: 'log-to-console',
  //     args: {
  //       payload: 'Successfully logged in both consoles!'
  //     }
  //   })
  // })

  return <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      height: '100vh',
      width: '100%'
    }}
  >
    <button
      ref={confirmButtonRef}
      onMouseEnter={e => {
        // znToolTip(confirmButtonRef, 'open a modal!', 'left', 2000)
      }}
      onMouseLeave={e => {
        // client.call({ method: 'closeTooltip' })
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
        setLonger(!longer)
        znConfirm(`Want to make the buttons ${bg === 'green' ? 'red' : 'green'}?`, (err, yes) => yes && setBg(bg === 'green' ? 'red' : 'green'))
      }}
    >
      {longer
        ? <>
          yay colors lets see if this wraps or not or whatever
          <p>wut</p>
          <h2>Yeah</h2>
        </>
        : 'Colors'}
    </button>
    <button
      ref={dropdownButtonRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: bg,
        color: 'white'
      }}
      onClick={e => {
        znFiltersPanel({
          formId: 2
        }).then(filter => console.log(filter))
        // znConfirm(`Want to make the buttons ${bg === 'green' ? 'red' : 'green'}?`)
        //   .then(yes => {
        //     if (yes) {
        //       setBg(bg === 'green' ? 'red' : 'green')
        //       znMessage('color set!', 'saved', 1000)
        //     } else {
        //       znMessage('color denied!', 'error')
        //     }
        //   })

        // if (dropdownIsOpen) return

        // setDropdownIsOpen(true)
        // znDropdown({
        //   side: 'top',
        //   src: '/dropdown.html',
        //   events: [
        //     { name: 'background-update', listening: true },
        //     { name: 'log-to-console', listening: true, sending: true }
        //   ]
        // }, dropdownButtonRef)
        //   .then(result => {
        //     console.log('closed:', result)
        //     setDropdownIsOpen(false)
        //   })
      }}
    >
      Dropdown
    </button>
    yo yo yo
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
