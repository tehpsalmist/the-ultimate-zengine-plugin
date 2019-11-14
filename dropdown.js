import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm, znMessage, client } from './post-rpc'
import { useSubscription, useRequestMoreRoom, useAppContext } from './hooks'
import { sizer } from './resizer'

const people = [
  { name: 'Ben', location: 'Sellersville' },
  { name: 'Marc', location: 'Collegeville' },
  { name: 'Ted', location: 'Langhorne' },
  { name: 'Anna', location: 'Pikes Peak' },
  { name: 'Joe', location: 'Jersey Somewhere' }
]

const App = props => {
  useEffect(() => {
    sizer.autoSize()
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
        client.call({ method: 'close', args: { payload: { name, location } } })
      }}>
      <span>{name}:{' '}</span>
      <span>{location}</span>
    </li>)}
  </ul>
}

ReactDOM.render(<App />, document.getElementById('app'))
