import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { uploadFile, getWorkspaces, getForms } from './post-rpc'
import '@babel/polyfill'

const App = props => {
  useEffect(() => {
    getWorkspaces()
      .then(ws => console.log(ws))
      .then(() => getForms())
      .then(f => console.log(f))
      .catch(console.error)
  }, [])

  return <main style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'lightblue'
  }}>
    <p>Hey! Imagine there is settings stuff here!</p>
    <h3>Pretty neat, huh?</h3>
    <input type="file" onChange={e => uploadFile(1, 4, e.target.files[0]).catch(console.error)}></input>
  </main>
}

render(<App />, document.getElementById('app'))
