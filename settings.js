import React from 'react'
import ReactDOM from 'react-dom'

const App = props => <main style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'lightblue'
}}>
  <p>Hey! Imagine there is settings stuff here!</p>
  <h3>Pretty neat, huh?</h3>
</main>

ReactDOM.render(<App />, document.getElementById('app'))
