import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, rpcClient, autoSize, znOpenDropdown } from '@zenginehq/zengine-sdk'
import { useSubscription, useRequestMoreRoom, useAppContext } from './hooks'

const people = [
  { name: 'Marc', location: 'Collegeville' },
  { name: 'Ted', location: 'Langhorne' },
  { name: 'Anna', location: 'Pikes Peak' },
  { name: 'Joe', location: 'Jersey Somewhere' }
]

const App = props => {
  const ref = useRef()

  useEffect(() => {
    autoSize()
  })

  const context = useAppContext()

  return <ul
    style={{
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'stretch',
      height: '100vh',
      width: '100%',
      listStyle: 'none',
      padding: 0
    }}
  >
    {people.map(({ name, location }) => <li
      style={{ cursor: 'pointer' }}
      key={name}
      onClick={e => {
        rpcClient.call({ method: 'close', args: { key: 'close', payload: { name, location } } })
      }}>
      <span>{name}:{' '}</span>
      <span>{location}</span>
    </li>)}
    <li ref={ref} onClick={e => {
      const { top, right, left, bottom } = ref.current.getBoundingClientRect()

      znOpenDropdown({
        top,
        right,
        left,
        bottom,
        side: 'right',
        src: '/dropdown.html'
      })
    }}>Moar dropdown</li>
  </ul>
}

ReactDOM.render(<App />, document.getElementById('app'))
