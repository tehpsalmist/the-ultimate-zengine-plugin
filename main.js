import React, { useCallback, useState, useRef } from 'react'
import { render } from 'react-dom'
import { znMessage, znPluginData, znModal, znToolTip, client } from './post-rpc'
import { useSubscription, useAppContext, useLocationTest } from './hooks'

znMessage('wut wut')

const App = props => {
  const [backgroundColor, setBGColor] = useState('purple')
  const [count, setCount] = useState(0)
  const modalButtonRef = useRef()
  const counterButtonRef = useRef()
  const firstButtonRef = useRef()

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
      src: '/modal.html',
      events: [
        'something-else',
        { name: 'background-update', listening: true },
        { name: 'log-to-console', listening: true, sending: true }
      ]
    })
      .then(result => {
        console.log('closed:', result)
      })

    client.subscribe('something-else', stuff => console.log(stuff))
    setTimeout(() => {
      client.call({ method: 'close-modal' })
    }, 10000)
  }

  return <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    height: '100vh'
  }}>
    <p>Hey! Full page stuff!</p>
    <button
      ref={firstButtonRef}
      onMouseEnter={e => {
        znToolTip(firstButtonRef, 'top left?', 'left')
      }}
      onMouseLeave={e => {
        client.call({ method: 'closeTooltip' })
      }}
      onClick={e => znMessage('Hey!', 'saved', 1000)}>
      Trigger Events!
    </button>
    <button
      ref={modalButtonRef}
      onMouseEnter={e => {
        znToolTip(modalButtonRef, 'open a modal!', 'top')
      }}
      onMouseLeave={e => {
        client.call({ method: 'closeTooltip' })
      }}
      onClick={e => modalFunc()}>
      Open a Modal!
    </button>
    <button
      style={{ width: '300px', height: '300px' }}
      ref={counterButtonRef}
      onMouseEnter={e => {
        znToolTip(counterButtonRef, 'tooltip!', 'right')
      }}
      onMouseLeave={e => {
        client.call({ method: 'closeTooltip' })
      }}
      onClick={e => setCount(count + 1)}>
      Increment: {count}
    </button>
  </main>
}

render(<App />, document.getElementById('app'))
