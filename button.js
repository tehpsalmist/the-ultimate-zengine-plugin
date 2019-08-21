import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { znConfirm } from './post-rpc'

const App = props => {
  const [bg, setBg] = useState('green')

  useEffect(() => {
    console.log(document.getElementById('app').clientWidth)
  })

  return <button
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      borderRadius: '4px',
      backgroundColor: bg,
      color: 'white'
    }}
    onClick={e => znConfirm(`Want to make the button ${bg === 'green' ? 'red' : 'green'}?`, () => setBg(bg === 'green' ? 'red' : 'green'))}
  >
    Click Me!
  </button>
}

ReactDOM.render(<App />, document.getElementById('app'))
